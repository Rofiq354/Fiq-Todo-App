const express = require("express");
const app = express();
const port = 3000;

// View Engine with ejs
app.set("view engine", "ejs");

const indexRouter = require("./routes/index");
app.use("/", indexRouter);

app.listen(port, () => {
  console.log(`App running in http://localhost:${port}`);
});
