const express = require("express");
const app = express();
const port = 3000;

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
