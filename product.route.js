import express from "express";
import { creatProduct, deteleProduct, getProducts, updateProduct } from "../controller/product.controller.js";

const router = express.Router();
router.post('/', creatProduct);
router.get('/', getProducts);
router.delete('/:id', deteleProduct);
router.put('/:id', updateProduct);

export default router;
