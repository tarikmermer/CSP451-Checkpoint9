const notifyStockChange = require("../utils/notify"); // ✅ Azure Function trigger module
const express = require("express");
const serverResponses = require("../utils/helpers/responses");
const messages = require("../config/messages");
const { Todo } = require("../models/todos/todo");

const routes = (app) => {
  const router = express.Router();

  // ✅ Create new todo & call Azure Function
  router.post("/todos", (req, res) => {
    const todo = new Todo({
      text: req.body.text,
    });

    todo
      .save()
      .then((result) => {
        // 🔔 Azure Function trigger after saving todo
        const productName = result.text;
        const quantity = Math.floor(Math.random() * 10); // Simulated quantity

        notifyStockChange(productName, quantity)
          .then(() => {
            console.log("Azure Function triggered for:", productName);
          })
          .catch((error) => {
            console.error("Azure Function error:", error.message);
          });

        // ✅ Respond to client
        serverResponses.sendSuccess(res, messages.SUCCESSFUL, result);
      })
      .catch((e) => {
        serverResponses.sendError(res, messages.BAD_REQUEST, e);
      });
  });

  // ✅ Get all todos
  router.get("/", (req, res) => {
    Todo.find({}, { __v: 0 })
      .then((todos) => {
        serverResponses.sendSuccess(res, messages.SUCCESSFUL, todos);
      })
      .catch((e) => {
        serverResponses.sendError(res, messages.BAD_REQUEST, e);
      });
  });

  // ✅ Route prefix
  app.use("/api", router);
};

module.exports = routes;

