const title = "Todo App";

const todos = [];

// obj todo
const objectTodo = ({ title, desc }) => {
  if (!title || !title.trim === "") {
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

// show todo page
exports.index = (req, res) => {
  const error = req.flash("error");
  const success = req.flash("success");
  res.render("home", { title, todos, error, success });
};

// add todo
exports.addTodo = (req, res) => {
  try {
    const todo = objectTodo(req.body);
    todos.push(todo);

    req.flash("success", "Data Berhasil Ditambah");
    // console.log('addTodo');
    // console.log(todos);
    return res.redirect("/");
  } catch (e) {
    req.flash("error", e.message);
    return res.redirect("/");
  }
};

exports.deleteTodo = (req, res) => {
  try {
    const todoIndex = todos.findIndex((todo) => todo.id == req.params.id);

    if (todoIndex > -1) {
      todos.splice(todoIndex, 1);
    }

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
