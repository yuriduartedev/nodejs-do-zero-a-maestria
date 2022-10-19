const express = require("express");
const expressHandlebars = require("express-handlebars");
const conn = require("./db/conn");

const User = require("./model/User");
const Address = require("./model/Address");

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", expressHandlebars.engine());
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.get("/users/new", (req, res) => {
  res.render("users");
});

app.get("/users/:id", async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({ where: { id }, raw: true });

  res.render("users/show", { user });
});

app.get("/users/edit/:id", async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({ include: Address, where: { id } });

  res.render("users/edit", { user: user.get({ plain: true }) });
});

app.post("/users/edit", async (req, res) => {
  const { id, name, occupation, newsletter } = req.body;
  const booleanNewsletter = newsletter === "on" ? true : false;

  const userData = {
    id,
    name,
    occupation,
    newsletter: booleanNewsletter,
  };

  await User.update(userData, { where: { id: id } }, {});

  res.redirect("/");
});

app.post("/users/delete/:id", async (req, res) => {
  const { id } = req.params;

  console.group("id");
  console.groupEnd();

  await User.destroy({ where: { id } });

  res.redirect("/");
});

app.post("/users", async (req, res) => {
  const user = req.body;
  const { name, occupation, newsletter } = user;

  const booleanNewsletter = newsletter === "on" ? true : false;

  await User.create({ name, occupation, newsletter: booleanNewsletter });

  res.redirect("/");
});

app.get("/", async (req, res) => {
  const users = await User.findAll({ raw: true });

  res.render("home", { users });
});

app.post("/address/create", async (req, res) => {
  const address = req.body;

  await Address.create(address);

  res.redirect(`/users/edit/${address.UserId}`);
});

app.post("/address/delete", async (req, res) => {
  const { id, UserId } = req.body;

  await Address.destroy({
    where: { id },
  });

  res.redirect(`/users/edit/${UserId}`);
});

conn
  // .sync({ force: true })
  .sync()
  .then(() => {
    app.listen(port, () => {});
  })
  .catch((error) => {});
