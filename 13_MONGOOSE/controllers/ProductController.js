const Product = require("../models/Product");

module.exports = class ProductController {
  static index = async (req, res) => {
    const products = await Product.find().lean();

    res.render("products", { products });
  };

  static new = (req, res) => {
    res.render("products/new");
  };

  static create = async (req, res) => {
    const { name, image, price, description } = req.body;

    const product = new Product({ name, image, price, description });

    await product.save();

    res.redirect("/products");
  };

  static show = async (req, res) => {
    const { id } = req.params;

    const product = await Product.findById(id).lean();

    res.render("products/show", { product });
  };

  static edit = async (req, res) => {
    const { id } = req.params;

    const product = await Product.findById(id).lean();

    res.render("products/edit", { product });
  };

  static update = async (req, res) => {
    const { id, name, image, price, description } = req.body;
    const product = { name, image, price, description };

    await Product.updateOne({ _id: id }, product);

    res.redirect(`/products`);
  };

  static delete = async (req, res) => {
    const { id } = req.params;

    await Product.deleteOne({ _id: id });

    res.redirect("/products");
  };
};
