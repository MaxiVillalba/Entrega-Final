import { Router } from "express";
import { cartDao } from "../dao/mongoDao/carts.dao.js";
import { productDao } from "../dao/mongoDao/products.dao.js"; // Usar productDao

const router = Router();

// Crear un carrito
router.post("/", async (req, res) => {
  try {
    const cart = await cartDao.create({});

    res.status(200).json({ status: "ok", payload: cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "An error occurred", error: error.message });
  }
});

// Obtener un carrito por id
router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await cartDao.getById(cid);
    res.json({ status: "ok", payload: cart });
  } catch (error) {
    console.error(error);
    res.status(404).json({ status: "error", message: error.message });
  }
});

// Agregar un producto a un carrito
router.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  try {
    // Validar que el producto exista
    const product = await productDao.getById(pid);
    if (!product) {
      return res.status(404).json({ status: "error", message: `Product id ${pid} not found` });
    }

    // Usar el DAO para agregar el producto al carrito
    const updatedCart = await cartDao.addProductToCart(cid, pid);
    res.status(200).json({ status: "ok", payload: updatedCart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: error.message });
  }
});

// Eliminar un producto seleccionado del carrito
router.delete("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  try {
    // Eliminar el producto del carrito usando el DAO
    const updatedCart = await cartDao.removeProductFromCart(cid, pid);
    res.status(200).json({ status: "ok", message: "Product deleted successfully", payload: updatedCart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: error.message });
  }
});

// Vaciar un carrito por id
router.delete("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    // Vaciar el carrito usando el DAO
    const updatedCart = await cartDao.clearCart(cid);
    res.status(200).json({ status: "ok", message: `Cart with id ${cid} emptied successfully`, payload: updatedCart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: error.message });
  }
});

export default router;
