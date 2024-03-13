import fs from "fs";
import { genRanId } from "../../services/generate-id/index.js";
import { generateCurrentDate } from "../../services/generate-date/index.js";
import { writeToFile } from "../../services/write-to-file/index.js";

export const getUnfinishedTodos = async (req, res) => {
  try {
    const db = JSON.parse(fs.readFileSync(global.mock_db));
    const { toDos } = db;
    const unfinishedTodos = toDos.filter((todo) => !todo.done);
    res.status(200).json(unfinishedTodos);
  } catch (error) {
    res.status(500).json(`Error: ${error}`);
  }
};

export const createTodo = async (req, res) => {
  try {
    const { task, deadline } = req.body;
    const db = JSON.parse(fs.readFileSync(global.mock_db));
    const { toDos } = db;
    const newTodo = {
      id: genRanId(),
      task,
      done: false,
      deadline,
      createdAt: generateCurrentDate(),
      finishedAt: "In the process...",
    };
    toDos.push(newTodo);
    await writeToFile(db);
    res.status(201).json("Created");
  } catch (error) {
    res.status(500).json(`Error: ${error}`);
  }
};

export const updateTodo = async (req, res) => {
  const todoId = parseInt(req.params.id);
  try {
    const { task, deadline, done } = req.body;
    const db = JSON.parse(fs.readFileSync(global.mock_db));
    const { toDos } = db;
    const requestedTodo = toDos.find((todo) => {
      return todo.id === todoId;
    });
    if (task) requestedTodo.task = task;
    if (deadline) requestedTodo.deadline = deadline;
    if (done === true) {
      requestedTodo.done = true;
      requestedTodo.finishedAt = generateCurrentDate();
    } else {
      requestedTodo.done = false;
    }
    await writeToFile(db);
    res.status(200).json("Updated");
  } catch (error) {
    res.status(500).json(`Error: ${error}`);
  }
};

export const deleteTodo = async (req, res) => {
  const todoId = parseInt(req.params.id);
  try {
    const db = JSON.parse(fs.readFileSync(global.mock_db));
    const { toDos } = db;
    const deletedTodoIndex = toDos.findIndex((todo) => {
      return todo.id === todoId;
    });
    toDos.splice(deletedTodoIndex, 1);
    await writeToFile(db);
    res.status(200).json("Deleted");
  } catch (error) {
    res.status(500).json(`Error: ${error}`);
  }
};
