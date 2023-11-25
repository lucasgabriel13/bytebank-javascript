const list = document.querySelectorAll("[data-lista]");

function selectQuote(name, value) {
  list.forEach((listSelected) => {
    if (listSelected.id === name) {
      printQuote(listSelected, name, value);
    }
  });
}

function formatCurrency(value) {
  const currency = Intl.NumberFormat("pt-BR", {
    currency: "BRL",
    style: "currency",
  }).format(value);

  return currency;
}

function printQuote(list, name, value) {
  list.innerHTML = "";

  const plural = {
    dolar: "dólares",
    iene: "Ienes",
    euro: 'Euros',
  };

  for (let multiple = 1; multiple <= 1000; multiple *= 10) {
    const itemList = document.createElement("li");
    itemList.innerHTML = `${multiple} ${
      multiple === 1 ? name : plural[name]
    }: ${formatCurrency(value * multiple)}`;
    list.appendChild(itemList);
  }
}

export default selectQuote;
