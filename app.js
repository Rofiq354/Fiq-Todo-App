const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");

const app = express();
const port = 3000;

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(session({ secret: "rahasia", resave: false, saveUninitialized: true }));
app.use(flash());

// Activate public folder
app.use(express.static("public"));

// View Engine with ejs
app.set("view engine", "ejs");

const expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts);
app.set("layout", "./layouts/main");

const indexRouter = require("./routes/index");
app.use("/", indexRouter);

app.listen(port, () => {
  console.log(`App running in http://localhost:${port}`);
});
