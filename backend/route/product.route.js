import express from "express";
import { creatProduct, deteleProduct, getProducts, updateProduct } from "../controller/product.controller.js";
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/', authMiddleware, creatProduct);
router.get('/', getProducts);
router.delete('/:id', authMiddleware, deteleProduct);
router.put('/:id', authMiddleware, updateProduct);

export default router;
