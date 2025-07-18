
import * as productService from '../services/products.service.js';

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (err) {
    console.error('Error en getAllProducts (controller):', err.message);
    next(err);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productService.getById(id);
    res.json(product);
  } catch (err) {
    console.error('Error en getProductById (controller):', err.message);
    next(err);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const data = req.body;
    const newProduct = await productService.create(data);
    res.status(201).json(newProduct);
  } catch (err) {
    console.error('Error en createProduct (controller):', err.message);
    next(err);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await productService.remove(id); 

    if (!deleted) { 
      return res.status(404).json({ error: 'Producto no encontrado para eliminar' });
    }

    res.json({ message: 'Producto eliminado correctamente' });
  } catch (err) {
    console.error('Error en deleteProduct (controller):', err.message);
    next(err); 
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedProduct = await productService.update(id, data);
    res.json(updatedProduct);
  } catch (err) {
    console.error('Error en updateProduct (controller):', err.message);
    next(err);
  }
};