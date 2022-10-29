const express = require("express");
const expressHandlebars = require("express-handlebars");

const app = express();
const port = 3000;

const conn = require("./db/conn");

const productsRouter = require("./routes/productsRoutes");

app.engine("handlebars", expressHandlebars.engine());
app.set("view engine", "handlebars");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use("/products", productsRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}. 🚀`);
});
