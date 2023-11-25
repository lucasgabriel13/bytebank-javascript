async function connectAPI() {
  const response = await fetch(
    "https://economia.awesomeapi.com.br/json/last/USD-BRL"
  );
  const data = await response.json();
  postMessage(data.USDBRL);
}

addEventListener("message", (event) => {
  connectAPI();
  setInterval(() => {
    connectAPI();
  }, 5000);
});
