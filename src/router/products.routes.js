import { Router } from "express";
import { productDao } from "../dao/mongoDao/products.dao.js";

const router = Router();

// Obtener todos los productos con filtros, paginación y ordenamiento
router.get("/", async (req, res) => {
  const { limit = 10, page = 1, sort, category, status } = req.query;

  try {
    // Definir las opciones para paginación y ordenamiento
    const options = {
      limit: parseInt(limit), 
      page: parseInt(page), 
      lean: true,  // Mejora el rendimiento al evitar la creación de instancias de Mongoose
      ...(sort && { sort: { price: sort === "asc" ? 1 : -1 } }) // Ordenar por precio ascendente o descendente
    };

    let query = {};

    if (status) {
      query.status = status; // Filtro por estado
    }

    if (category) {
      query.category = category; // Filtro por categoría
    }

    // Obtener productos desde la base de datos con los filtros y opciones
    const products = await productDao.getAll(query, options);
    
    // Obtener el total de productos para mostrar información de paginación
    const totalProducts = await productDao.getTotalProducts(query);

    // Calcular el número total de páginas
    const totalPages = Math.ceil(totalProducts / options.limit);

    // Responder con los productos y datos de paginación
    res.json({
      status: "ok",
      payload: products,
      pagination: {
        totalProducts,
        totalPages,
        currentPage: page,
        limit: options.limit
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "An error occurred", error: error.message });
  }
});

// Obtener los detalles de un producto específico
router.get("/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const product = await productDao.getById(pid);
    if (!product) {
      return res.status(404).json({ status: "error", message: `Product id ${pid} not found` });
    }
    res.json({ status: "ok", payload: product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "An error occurred", error: error.message });
  }
});

// Crear un nuevo producto
router.post("/", async (req, res) => {
  const body = req.body;
  try {
    const product = await productDao.create(body);
    res.status(201).json({ status: "ok", payload: product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "An error occurred", error: error.message });
  }
});

// Actualizar un producto
router.put("/:pid", async (req, res) => {
  const { pid } = req.params;
  const body = req.body;
  try {
    const product = await productDao.update(pid, body);
    if (!product) {
      return res.status(404).json({ status: "error", message: `Product id ${pid} not found` });
    }
    res.json({ status: "ok", payload: product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "An error occurred", error: error.message });
  }
});

// Eliminar un producto
router.delete("/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const product = await productDao.delete(pid);
    if (!product) {
      return res.status(404).json({ status: "error", message: `Product id ${pid} not found` });
    }
    res.json({ status: "ok", payload: `Product id ${pid} deleted` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "An error occurred", error: error.message });
  }
});

export default router;
