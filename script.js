const form = document.getElementById("converterForm");
const amount = document.getElementById("amount");
const fromCurrency = document.getElementById("fromCurrency");
const convertedAmount = document.getElementById("convertedAmount");
const toCurrency = document.getElementById("toCurrency");
const converterBtn = document.getElementById("converterBtn");
const loading = document.querySelector(".loading");
const result = document.querySelector(".result");
const error = document.querySelector(".error");

const API_URL = "https://open.er-api.com/v6/latest/";

async function convertMoney() {
  loading.style.display = "block";
  converterBtn.style.display = "none";
  error.style.display = "none";
  result.style.display = "none";

  try {
    const response = await fetch(API_URL + fromCurrency.value);
    const data = await response.json();

    const rate = data.rates[toCurrency.value];
    const convertedRate = (amount.value * rate).toFixed(2);

    convertedAmount.value = convertedRate;

    result.style.display = "block";

    result.innerHTML = `
        <div style="font-size: 1.4rem;">
            ${amount.value} ${fromCurrency.value} = ${convertedAmount.value} ${toCurrency.value}
        </div>
        <div style="font-size: 0.9rem; opacity: 0.8; margin-top: 10px">
            Taxa: 1 ${fromCurrency.value} = ${rate} ${toCurrency.value}
        </div>
    `;
  } catch (err) {
    error.style.display = "block";
    error.innerHTML = "Falha ao converter moeda! Tente novamente";
  }

  loading.style.display = "none";
  converterBtn.style.display = "block";
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  convertMoney();
});
