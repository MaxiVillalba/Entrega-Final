import { productService } from "../services/product.service.js";

class ProductController {
  async getAll(req, res) {
    try {
      const products = await productService.getAll();
      res.status(200).json({ products });
    } catch (error) {
      res.status(500).json({
        error: "Internal server error",
        details: error.message,
      });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const product = await productService.getById({ id });

      if (!product) {
        return res.status(404).json({
          error: "Product not found",
        });
      }

      res.status(200).json({ product });
    } catch (error) {
      res.status(500).json({
        error: "Internal server error",
        details: error.message,
      });
    }
  }

  async create(req, res) {
    try {
      const product = await productService.create({
        product: req.body,
      });

      res.status(201).json({ product });
    } catch (error) {
      res.status(500).json({
        error: "Internal server error",
        details: error.message,
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const product = await productService.update({ id, product: req.body });

      if (!product) {
        return res.status(404).json({
          error: "Product not found",
        });
      }

      res.status(200).json({ product });
    } catch (error) {
      res.status(500).json({
        error: "Internal server error",
        details: error.message,
      });
    }
  }
}

export const productController = new ProductController();
