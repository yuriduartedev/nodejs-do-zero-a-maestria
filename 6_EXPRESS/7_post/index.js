const express = require("express");
const app = express();
const port = 3000;

const path = require("path");

const basePath = path.join(__dirname, "templates");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/users", (req, res) => {
  res.sendFile(`${basePath}/userForm.html`);
});

app.post("/users", (req, res) => {
  console.log(req.body);

  const { name, age } = req.body;

  console.log(`O nome do usuário é ${name}e sua idade é ${age} anos.`);

  res.sendFile(`${basePath}/userForm.html`);
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  console.log(`Estamos buscando pelo usuário id: ${id}`);

  res.sendFile(`${basePath}/users.html`);
});

app.get("/", (req, res) => {
  res.sendFile(`${basePath}/index.html`);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}! 🚀`);
});
