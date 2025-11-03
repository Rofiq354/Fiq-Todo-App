const title = "Todo App";

exports.index = (req, res) => {
  res.render("home", { title });
};

exports.about = (req, res) => {
  res.render("about", {
    title: `${title} | About`,
    name: "Rofiq",
    hobby: "Programming",
  });
};
