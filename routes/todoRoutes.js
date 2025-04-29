const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");
const validateTodo = require("../middlewares/validateTodo");

router.get("/", todoController.getTodos);

// Apply validateTodo middleware for POST and PUT routes
router.post("/", validateTodo, todoController.addTodo);
router.put("/:id", validateTodo, todoController.updateTodo);
router.delete("/:id", todoController.deleteTodo);

module.exports = router;
