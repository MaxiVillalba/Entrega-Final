import { cartService } from "../services/cart.service.js";

class CartController {
  async getAll(req, res) {
    try {
      const carts = await cartService.getAll();
      res.status(200).json({ carts });
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
      const cart = await cartService.getById({ id });

      if (!cart) {
        return res.status(404).json({
          error: "Cart not found",
        });
      }

      res.status(200).json({ cart });
    } catch (error) {
      res.status(500).json({
        error: "Internal server error",
        details: error.message,
      });
    }
  }

  async create(req, res) {
    try {
      const cart = await cartService.create({
        cart: req.body,
      });

      res.status(201).json({ cart });
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
      const cart = await cartService.update({ id, cart: req.body });

      if (!cart) {
        return res.status(404).json({
          error: "Cart not found",
        });
      }

      res.status(200).json({ cart });
    } catch (error) {
      res.status(500).json({
        error: "Internal server error",
        details: error.message,
      });
    }
  }
}

export const cartController = new CartController();
