import { cartModel } from "../models/cart.model.js";

class CartDao {
  // Obtener todos los carritos
  async getAll() {
    try {
      return await cartModel.find();
    } catch (error) {
      throw new Error("Error while fetching carts");
    }
  }

  // Obtener un carrito por ID
  async getById(id) {
    try {
      const cart = await cartModel.findById(id);
      if (!cart) throw new Error(`Cart with id ${id} not found`);
      return cart;
    } catch (error) {
      throw new Error(error.message || "Error while fetching cart");
    }
  }

  // Crear un carrito
  async create(data) {
    try {
      return await cartModel.create(data);
    } catch (error) {
      throw new Error("Error while creating cart");
    }
  }

  // Actualizar un carrito
  async update(id, data) {
    try {
      return await cartModel.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
      throw new Error("Error while updating cart");
    }
  }

  // Eliminar un carrito
  async delete(id) {
    try {
      return await cartModel.findByIdAndDelete(id);
    } catch (error) {
      throw new Error("Error while deleting cart");
    }
  }

  // Agregar un producto al carrito
  async addProductToCart(cid, pid) {
    try {
      const cart = await this.getById(cid); // Asegúrate de que el carrito existe

      // Verificar si el producto ya existe en el carrito
      const existingProduct = cart.products.find((product) => product.product.toString() === pid);
      if (existingProduct) {
        existingProduct.quantity += 1; // Si existe, incrementamos la cantidad
      } else {
        cart.products.push({ product: pid, quantity: 1 }); // Si no existe, lo agregamos
      }

      return await cartModel.findByIdAndUpdate(cid, { products: cart.products }, { new: true });
    } catch (error) {
      throw new Error(`Error while adding product to cart: ${error.message}`);
    }
  }

  // Eliminar un producto del carrito
  async removeProductFromCart(cid, pid) {
    try {
      const cart = await this.getById(cid); // Asegúrate de que el carrito existe
      const productIndex = cart.products.findIndex((product) => product.product.toString() === pid);

      if (productIndex === -1) {
        throw new Error(`Product with id ${pid} not found in cart`);
      }

      cart.products.splice(productIndex, 1); // Eliminamos el producto
      return await cartModel.findByIdAndUpdate(cid, { products: cart.products }, { new: true });
    } catch (error) {
      throw new Error(`Error while removing product from cart: ${error.message}`);
    }
  }

  // Vaciar el carrito
  async clearCart(cid) {
    try {
      const cart = await this.getById(cid); // Asegúrate de que el carrito existe
      cart.products = []; // Vaciamos los productos
      return await cartModel.findByIdAndUpdate(cid, { products: [] }, { new: true });
    } catch (error) {
      throw new Error(`Error while clearing cart: ${error.message}`);
    }
  }
}

export const cartDao = new CartDao();
