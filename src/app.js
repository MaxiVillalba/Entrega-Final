import express from "express";
import productsRoutes from "./router/products.routes.js";
import cartsRoutes from "./router/carts.routes.js";
import { connectToMongoDb } from "./config/mongoDb.config.js";

await connectToMongoDb();
const PORT = 8080;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productsRoutes);
app.use("/api/carts", cartsRoutes);

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
