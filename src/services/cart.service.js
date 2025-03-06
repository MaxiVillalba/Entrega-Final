import { Cart } from "../models/cart.model.js";

class CartService {
    async getAll(){
        return Cart.find();
    }
    async getById({ id }){
        return Cart.findById(id);
    }
    async create({ cart }){
        return Cart.create(cart);
    }
    async update({ id, cart }) {
        return Cart.findByIdAndUpdate(id, cart, { new: true });
    }
    
}export const cartService = new CartService();