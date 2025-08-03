/**
 * Created by Syed Afzal
 */
require("./config/config");

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");

const app = express();
const axios = require('axios');

//connection from db here
db.connect(app);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//  adding routes
require("./routes")(app);

app.on("ready", () => {
  app.listen(3000, '0.0.0.0', () => {
    console.log("Server is up on port", 3000);
  });
});

module.exports = app;
const functionUrl = "https://tmermer-functions-dsd2g6hvhpa7cgcu.canadacentral-01.azurewebsites.net/api/StockEventHandler?code=AjgSwxTvvM3b1Q19lg6usg9Nulf_cLbGNpcVohM_MDpXAzFua-5yMg==";

async function notifyStockChange(product, quantity) {
  try {
    await axios.post(functionUrl, {
      product,
      quantity
    });
    console.log("Azure Function triggered for product:", product);
  } catch (error) {
    console.error("Error calling Azure Function:", error.message);
  }
}

