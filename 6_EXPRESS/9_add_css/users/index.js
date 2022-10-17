const express = require("express");
const router = express.Router();

const path = require("path");
const basePath = path.join(__dirname, "../templates");

router.get("/", (req, res) => {
  res.sendFile(`${basePath}/userForm.html`);
});

router.post("/", (req, res) => {
  console.log(req.body);

  const { name, age } = req.body;

  console.log(`O nome do usuário é ${name}e sua idade é ${age} anos.`);

  res.sendFile(`${basePath}/userForm.html`);
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  console.log(`Estamos buscando pelo usuário id: ${id}`);

  res.sendFile(`${basePath}/users.html`);
});

module.exports = router;
