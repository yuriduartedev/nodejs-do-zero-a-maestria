const express = require("express");
const router = express.Router();

const ProductController = require("../controllers/ProductController");

router.get("/", ProductController.index);
router.get("/new", ProductController.new);
router.post("/new", ProductController.create);
router.get("/show/:id", ProductController.show);
router.get("/edit/:id", ProductController.edit);
router.post("/edit", ProductController.update);
router.post("/delete/:id", ProductController.delete);

module.exports = router;
