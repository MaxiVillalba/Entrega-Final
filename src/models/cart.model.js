import { Schema, model } from 'mongoose'

const cartSchema = new Schema({
  name: { type: String, required: true},
  description: { type: String, required: true},

  products: {
    type: [
      {
        product: { type: Schema.Types.ObjectId, ref: 'Product'},
        quantity: { type: Number, required: true},
        name: { type: String, required: true}
      }
    ]
  }
})

export const Cart = model("cart", cartSchema);

