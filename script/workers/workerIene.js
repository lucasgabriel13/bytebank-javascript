async function connectAPI() {
  const response = await fetch(
    "https://economia.awesomeapi.com.br/json/last/JPY-BRL"
  );
  const data = await response.json();
  postMessage(data.JPYBRL);
}

addEventListener("message", (event) => {
  connectAPI();
  setInterval(() => connectAPI(), 5000);
});
