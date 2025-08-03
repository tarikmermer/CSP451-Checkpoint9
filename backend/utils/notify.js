const axios = require("axios");

const functionUrl = "https:/tmermer-functions.azurewebsites.net/api/StockEventHandler?code=AjgSwxTvvM3b1Q19lg6usg9Nulf_cLbGNpcVohM_MDpXAzFua-5yMg==";

async function notifyStockChange(product, quantity) {
  try {
    await axios.post(functionUrl, { product, quantity });
    console.log("Azure Function triggered for:", product);
  } catch (error) {
    console.error("Error calling Azure Function:", error.message);
  }
}

module.exports = notifyStockChange;
