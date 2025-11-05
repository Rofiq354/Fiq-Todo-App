const fs = require("fs");
const path = require("path");

const folderPath = path.join(__dirname, "../data");
const filePath = path.join(folderPath, "todos.json");

if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath);
}

if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, "[]");
}

const objectTodo = ({ title, desc }) => {
  if (!title || title.trim() === "") {
    throw new Error("Judul wajib di isi");
  }

  return {
    id: Date.now(),
    title: title.trim(),
    desc: desc?.trim() || "",
    done: false,
    createdAt: new Date(),
  };
};

const loadTodos = () => {
  const file = fs.readFileSync(filePath, "utf8");
  return JSON.parse(file);
};

const findTodo = (id) => {
  const todos = loadTodos();
  const todoId = Number(id);
  const todoIndex = todos.findIndex((todo) => todo.id === todoId);
  const todo = todos[todoIndex] || null;

  return { todos, todo, todoIndex };
};

const saveTodos = (todos) => {
  fs.writeFileSync(filePath, JSON.stringify(todos));
};

module.exports = { objectTodo, loadTodos, saveTodos, findTodo };
