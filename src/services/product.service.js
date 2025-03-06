import { Product } from "../models/product.model.js";

class ProductService {
    async getAll() {
        return Product.find();
    }

    /**
     *
     * @param { string } id
     * @returns { Promise<Product> }
     */
    async getById({ id }) {
        return Product.findById(id);
    }

    async create({ product }) {
        return Product.create(product);
    }

    async update({ id, product }) {
        return Product.findByIdAndUpdate(id, product, { new: true });
    }
}

export const productService = new ProductService();
