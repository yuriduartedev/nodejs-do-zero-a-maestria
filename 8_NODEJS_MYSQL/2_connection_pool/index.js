const express = require("express");
const expressHandlebars = require("express-handlebars");
const pool = require("./db/conn");

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", expressHandlebars.engine());
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.post("/books", (req, res) => {
  const { title, pageQuantity } = req.body;

  const sql = `INSERT INTO books (title, pagequantity) VALUES ('${title}', '${pageQuantity}')`;

  pool.query(sql, (error) => {
    if (error) {
      console.log(error);
    }

    res.redirect("/books");
  });
});

app.get("/books/edit/:id", (req, res) => {
  const { id } = req.params;

  const sql = `SELECT * FROM books WHERE id=${id}`;

  pool.query(sql, (error, data) => {
    if (error) {
      console.log(error);
    }

    const book = data[0];

    res.render("editBook", { book });
  });
});

app.post("/books/edit", (req, res) => {
  const book = req.body;

  const { id, title, pageQuantity } = book;

  const sql = `UPDATE books SET title = '${title}', pagequantity = '${pageQuantity}' WHERE id = ${id};`;

  pool.query(sql, (error, data) => {
    if (error) {
      console.log(error);
    }

    res.redirect("/books");
  });
});

app.post("/books/delete/:id", (req, res) => {
  const { id } = req.params;

  const sql = `DELETE FROM books WHERE id = ${id}`;

  pool.query(sql, (error) => {
    if (error) {
      console.log(error);
    }

    res.redirect("/books");
  });
});

app.get("/books/:id", (req, res) => {
  const { id } = req.params;

  const sql = `SELECT * FROM books WHERE id=${id}`;

  pool.query(sql, (error, data) => {
    if (error) {
      console.log(error);
      return;
    }

    const book = data[0];

    res.render("book", { book });
  });
});

app.get("/books", (req, res) => {
  const sql = "SELECT * FROM books";

  pool.query(sql, (error, data) => {
    if (error) {
      console.log(error);
    }

    res.render("books", { books: data });
  });
});

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}. 🚀`);
});
