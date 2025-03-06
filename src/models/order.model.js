import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const orderSchema = new Schema({
  ticketNumber:{
    type: String,
    default: () => uuidv4(),
    unique: true,
  }, 
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  products: {
    type: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    required: true,
  },
  cart: {
    type: Schema.Types.ObjectId,
    ref: "cart",
  },
  total: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["pending", "shipped", "delivered", "cancelled"],
    default: "pending",
  },
});

orderSchema.pre("find", function() {
  this.populate("products.product");
  this.populate("user");
  this.populate("cart");
});

orderSchema.pre("findOne", function() {
  this.populate("products.product");
  this.populate("user");
})

export const Order = model("order", orderSchema);
