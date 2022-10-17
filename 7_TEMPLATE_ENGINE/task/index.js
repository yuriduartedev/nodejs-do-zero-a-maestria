const express = require("express");
const expressHandlebars = require("express-handlebars");

const app = express();
const port = 3000;

const hbs = expressHandlebars.create({
  partialsDir: ["views/partials"],
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.get("/products/:id", (req, res) => {
  const { id } = req.params;

  const products = [
    {
      id: 1,
      name: "iPhone 13 pro",
      price: 6999,
      category: "phone",
    },
    {
      id: 2,
      name: "Macbook Air",
      price: 8999,
      category: "computer",
    },
    {
      id: 3,
      name: "Apple Watch Series 8",
      price: 6229,
      category: "smartwatch",
    },
  ];

  const product = products.filter((product) => product.id == id);

  res.render("productPage", { product });
});

app.get("/", (req, res) => {
  const products = [
    {
      id: 1,
      name: "iPhone 13 pro",
      price: 6999,
      category: "phone",
    },
    {
      id: 2,
      name: "Macbook Air",
      price: 8999,
      category: "computer",
    },
    {
      id: 3,
      name: "Apple Watch Series 8",
      price: 6229,
      category: "smartwatch",
    },
  ];

  res.render("home", { products });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}. 🚀`);
});
