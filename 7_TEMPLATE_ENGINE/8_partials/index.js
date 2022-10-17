const express = require("express");
const expressHandlebars = require("express-handlebars");

const app = express();
const port = 3000;

const hbs = expressHandlebars.create({
  partialsDir: ["views/partials"],
});

app.engine("handlebars", hbs.engine);
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

app.get("/blog", (req, res) => {
  const posts = [
    {
      title: "Learning nodejs",
      category: "Javascript",
      body: "Lorem ipsum dolor sit ammet",
      comments: 4,
    },
    {
      title: "Learning PHP",
      category: "PHP",
      body: "Lorem ipsum dolor sit ammet",
      comments: 3,
    },
    {
      title: "Learning Python",
      category: "Python",
      body: "Lorem ipsum dolor sit ammet",
      comments: 2,
    },
    {
      title: "Learning Javascript",
      category: "Javascript",
      body: "Lorem ipsum dolor sit ammet",
      comments: 6,
    },
  ];

  res.render("blog", { posts });
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
