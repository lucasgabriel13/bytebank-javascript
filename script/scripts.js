import printQuote from "./printQuote.js";

const dollarChart = document.getElementById("dollarChart");
const ieneChart = document.getElementById("ieneChart");
const euroChart = document.getElementById("euroChart");

const chartToDollar = new Chart(dollarChart, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "Dólar",
        data: [],
        borderWidth: 1,
      },
    ],
  },
});

const chartToIene = new Chart(ieneChart, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "Iene",
        data: [],
        borderWidth: 1,
      },
    ],
  },
});

const chartToEuro = new Chart(euroChart, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "Euro",
        data: [],
        borderWidth: 1,
      },
    ],
  },
});

function getHours() {
  let date = new Date();
  const hour = date.getHours().toLocaleString().padStart(2, "0");
  const minutes = date.getMinutes().toLocaleString().padStart(2, "0");
  const seconds = date.getSeconds().toLocaleString().padStart(2, "0");

  let hours = `${hour}:${minutes}:${seconds}`;
  return hours;
}

function addDataChart(chart, label, data) {
  chart.data.labels.push(label);
  chart.data.datasets.forEach((dataset) => {
    dataset.data.push(data);
  });
  chart.update();
}

let workerDollar = new Worker("./script/workers/workerDollar.js");
let workerIene = new Worker("./script/workers/workerIene.js");
let workerEuro = new Worker("./script/workers/workerEuro.js");

workerDollar.postMessage("usd");
workerIene.postMessage("iene");
workerEuro.postMessage("eur");

workerDollar.addEventListener("message", (event) => {
  let time = getHours();
  let value = event.data.ask;
  printQuote("dolar", value);
  addDataChart(chartToDollar, time, value);
});

workerIene.addEventListener("message", (event) => {
  let time = getHours();
  let value = event.data.ask;
  printQuote("iene", value);
  addDataChart(chartToIene, time, value);
});

workerEuro.addEventListener("message", (event) => {
  let time = getHours();
  let value = event.data.ask;
  printQuote('euro', value);
  addDataChart(chartToEuro, time, value);
})
