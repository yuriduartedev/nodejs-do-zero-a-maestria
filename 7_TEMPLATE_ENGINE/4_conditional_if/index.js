const express = require("express");
const exphbs = require("express-handlebars");

const app = express();
const port = 3000;

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

app.get("/", (req, res) => {
  const user = {
    name: "Yuri",
    surname: "Duarte",
  };

  const auth = true;

  res.render("home", { user, auth });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}. 🚀`);
});
