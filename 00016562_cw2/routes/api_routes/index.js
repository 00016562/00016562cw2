import express from "express";
import {
  createTodo,
  deleteTodo,
  getUnfinishedTodos,
  updateTodo,
} from "../../controllers/toDos-crud/index.js";

const api = express.Router();
api.get("/todos", getUnfinishedTodos);
api.post("/todos", createTodo);
api.patch("/todos/:id", updateTodo);
api.delete("/todos/:id", deleteTodo);
export default api;
