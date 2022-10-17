const express = require("express");
const exphbs = require("express-handlebars");

const app = express();
const port = 3000;

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.get("/dashboard", (req, res) => {
  const items = ["Item 1", "Item 2", "Item 3"];

  res.render("dashboard", { items });
});

app.get("/post", (req, res) => {
  const post = {
    title: "Learning NodeJS",
    category: "Javascript",
    body: "This article will help you learn NodeJS",
    comments: 4,
  };

  res.render("blogpost", { post });
});

app.get("/", (req, res) => {
  const user = {
    name: "Yuri",
    surname: "Duarte",
  };

  const auth = true;
  const approved = false;

  res.render("home", { user, auth, approved });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}. 🚀`);
});
