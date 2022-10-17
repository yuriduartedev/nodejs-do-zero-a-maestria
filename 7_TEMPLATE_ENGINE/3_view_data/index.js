const express = require("express");
const exphbs = require("express-handlebars");

const app = express();
const port = 3000;

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  const user = {
    name: "Yuri",
    surname: "Duarte",
  };

  res.render("home", { user });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}. 🚀`);
});
