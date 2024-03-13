import express from "express";
import fs from "fs";
const web = express.Router();
web.get("/", (req, res) => {
  fs.readFile(global.mock_db, (err, data) => {
    if (err) return res.status(500).json("Server Error");
    const { toDos } = JSON.parse(data);
    const unfinishedTodos = toDos.filter((todo) => !todo.done);
    res.render("list", { toDos: unfinishedTodos });
  });
});
web.get("/completed", (req, res) => {
  fs.readFile(global.mock_db, (err, data) => {
    if (err) return res.status(500).json("Server Error");
    const { toDos } = JSON.parse(data);
    const completedTodos = toDos.filter((todo) => todo.done);
    res.render("completed-list", { toDos: completedTodos });
  });
});

export default web;
