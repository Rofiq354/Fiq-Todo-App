const { saveTodos, objectTodo, findTodo } = require("../utils/index");

const title = "Todo App";

// show todo page
exports.index = (req, res) => {
  try {
    const { todos } = findTodo(null);

    const error = req.flash("error");
    const success = req.flash("success");
    res.render("home", { title, todos, todo: null, error, success });
  } catch (e) {
    console.error(e.message);
  }
};

// add todo
exports.addTodo = (req, res) => {
  try {
    const { todos } = findTodo(null);
    todos.push(objectTodo(req.body));

    saveTodos(todos);

    req.flash("success", "Data Berhasil Ditambah");
    // console.log('addTodo');
    // console.log(todos);
    return res.redirect("/");
  } catch (e) {
    req.flash("error", e.message);
    return res.redirect("/");
  }
};

exports.editTodo = (req, res) => {
  try {
    const { todos, todo } = findTodo(req.params.id);

    if (!todo) res.send("Data tidak ditemukan");

    const error = req.flash("error");
    const success = req.flash("success");
    res.render("home", { title, todos, todo, error, success });
  } catch (e) {
    console.error(e.message);
  }
};

exports.updateTodo = (req, res) => {
  try {
    const { todos, todoIndex } = findTodo(req.params.id);

    if (todoIndex === -1) "Data tidak ditemukan";

    todos[todoIndex].title = req.body.title;
    todos[todoIndex].desc = req.body.desc;

    saveTodos(todos);
    req.flash("success", "Data Berhasil Diubah");

    res.redirect("/");
  } catch (e) {
    console.error(e.message);
  }
};

exports.deleteTodo = (req, res) => {
  try {
    const { todos, todoIndex } = findTodo(req.params.id);

    if (todoIndex === -1) res.send("Data tidak ditemukan");

    todos.splice(todoIndex, 1);

    saveTodos(todos);

    req.flash("success", "Data Berhasil Dihapus");
    // console.log('deleteTodo');
    // console.log(test);
    return res.redirect("/");
  } catch (e) {
    req.flash("error", e.message);
    return res.redirect("/");
  }
};

exports.about = (req, res) => {
  res.render("about", {
    title: `${title} | About`,
    name: "Rofiq",
    hobby: "Programming",
  });
};
