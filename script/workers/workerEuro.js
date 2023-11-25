async function connectAPI() {
  const response = await fetch(
    "https://economia.awesomeapi.com.br/json/last/EUR-BRL"
  );
  const data = await response.json();
  postMessage(data.EURBRL);
}

addEventListener("message", () => {
  connectAPI();
  setInterval(() => connectAPI(), 5000);
});
