const Product = require("../models/Product");

module.exports = class ProductController {
  static index = async (req, res) => {
    const products = await Product.getProducts();

    res.render("products", { products });
  };

  static new = (req, res) => {
    res.render("products/new");
  };

  static create = (req, res) => {
    const { name, image, price, description } = req.body;

    const product = new Product(name, image, price, description);

    product.save();

    res.redirect("/products");
  };

  static show = async (req, res) => {
    const { id } = req.params;

    const product = await Product.getProduct(id);

    res.render("products/show", { product });
  };

  static delete = async (req, res) => {
    const { id } = req.params;

    await Product.deleteProduct(id);

    res.redirect("/products");
  };

  static edit = async (req, res) => {
    const { id } = req.params;

    const product = await Product.getProduct(id);

    res.render("products/edit", { product });
  };

  static update = async (req, res) => {
    const { id, name, image, price, description } = req.body;

    const product = new Product(name, image, price, description);

    await product.updateProduct(id);

    res.redirect(`/products`);
  };
};
