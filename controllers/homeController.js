const { saveTodos, objectTodo, findTodo } = require("../utils/index");

const title = "Todo App";

// show todo page
exports.index = (req, res) => {
  try {
    const { todos } = findTodo(null);

    const qSearch = req.query.search || "";
    const qFilter = req.query.filter || "";

    let result = todos;

    if (qFilter == "done") {
      result = todos.filter((todo) => todo.done == true);
    } else if (qFilter == "notDone") {
      result = todos.filter((todo) => todo.done == false);
    }

    if (qSearch) {
      result = result.filter((todo) => {
        const title = todo.title.includes(qSearch);
        const desc = todo.desc.includes(qSearch);

        return title || desc;
      });
    }

    const error = req.flash("error");
    const success = req.flash("success");
    res.render("home", {
      title,
      todos: result,
      activeFilter: qFilter,
      activeSearch: qSearch,
      todo: null,
      error,
      success,
    });
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

    req.flash("success", "Daftar tugas Berhasil Ditambah");
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

    if (!todo) res.send("Daftar tugas tidak ditemukan");

    const qSearch = req.query.search || "";
    const qFilter = req.query.filter || "";

    let result = todos;

    if (qFilter == "done") {
      result = todos.filter((todo) => todo.done == true);
    } else if (qFilter == "notDone") {
      result = todos.filter((todo) => todo.done == false);
    }

    if (qSearch) {
      result = result.filter((todo) => {
        const title = todo.title.includes(qSearch);
        const desc = todo.desc.includes(qSearch);

        return title || desc;
      });
    }

    const error = req.flash("error");
    const success = req.flash("success");
    res.render("home", {
      title,
      todos: result,
      activeFilter: qFilter,
      activeSearch: qSearch,
      todo,
      error,
      success,
    });
  } catch (e) {
    console.error(e.message);
  }
};

exports.updateTodo = (req, res) => {
  try {
    const { todos, todo, todoIndex } = findTodo(req.params.id);

    if (todoIndex === -1) "Daftar tugas tidak ditemukan";

    todo.title = req.body.title;
    todo.desc = req.body.desc;

    saveTodos(todos);
    req.flash("success", "Daftar tugas Berhasil Diubah");

    res.redirect("/");
  } catch (e) {
    console.error(e.message);
  }
};

exports.updateCompleteTodo = (req, res) => {
  try {
    const { todos, todo, todoIndex } = findTodo(req.params.id);

    if (todoIndex === -1) "Daftar tugas tidak ditemukan";
    todo.done = !todo.done;
    console.log(todos);

    saveTodos(todos);
    req.flash(
      "success",
      `Todo ${
        todo.done
          ? "Daftar tugas dialihkan ke list"
          : "Daftar tugas terselesaikan"
      }`
    );

    res.redirect("/");
  } catch (e) {
    console.error(e.message);
  }
};

exports.deleteTodo = (req, res) => {
  try {
    const { todos, todoIndex } = findTodo(req.params.id);

    if (todoIndex === -1) res.send("Daftar tugas tidak ditemukan");

    todos.splice(todoIndex, 1);

    saveTodos(todos);

    req.flash("success", "Daftar tugas Berhasil Dihapus");
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
