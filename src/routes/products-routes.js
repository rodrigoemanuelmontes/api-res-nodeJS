
import express from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct
} from '../controllers/products.controller.js';
import authenticate from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/',authenticate,  getAllProducts); 
router.get('/:id', authenticate, getProductById); 
router.post('/create', authenticate, createProduct); 
router.put('/:id', authenticate, updateProduct); 
router.delete('/:id', authenticate, deleteProduct); 

export default router;