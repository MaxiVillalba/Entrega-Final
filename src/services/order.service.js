import { Order } from "../models/order.model.js";

class OrderService{
    async getAll() {
        return Order.find().populate('user').populate('products.product').populate('cart');
  }

  async getById({ id }) {
    return Order.findById(id).populate('user').populate('products.product').populate('cart');
  }

  async create({ order }) {
    return Order.create(order);
  }

  async update({ id, order }) {
    return Order.findByIdAndUpdate(id, order, { new: true }).populate('user').populate('products.product').populate('cart');
  }

  async getOrderNumber() {
    return Number(Date.now() + Math.floor(Math.random() * 10000 + 1));
  }
}

export const orderService = new OrderService();