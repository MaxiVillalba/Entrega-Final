import mongoose from "mongoose";

const cartsCollection = "carts";

const productInCartSchema = new mongoose.Schema({
  product: {type: mongoose.Schema.Types.ObjectId, ref: "products", required: true},
  quantity: { type: Number, required: true, min: 1,  default: 1 },
});

const cartSchema = new mongoose.Schema({
  products: [productInCartSchema], // arreglo para los productos en el carrito
}, { timestamps: true   
});

export const cartModel = mongoose.model(cartsCollection, cartSchema);
