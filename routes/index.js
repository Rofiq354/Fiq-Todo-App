const express = require("express");
const router = express.Router();

const homeController = require("../controllers/homeController");

router.get("/", homeController.index);
router.post("/add-todo", homeController.addTodo);
router.post("/delete-todo/:id", homeController.deleteTodo);
router.get("/edit-todo/:id", homeController.editTodo);
router.post('/update-todo/:id', homeController.updateTodo);

router.get("/about", homeController.about);

module.exports = router;
