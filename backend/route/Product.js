import express from "express";
import { creatProduct, deteleProduct, getProducts, updateProduct,getallproducts } from "../controller/Product.js";

const router = express.Router();
router.post('/addproduct', creatProduct);
router.get('/', getProducts);
router.get('/all', getallproducts);
router.delete('/:id', deteleProduct);
router.put('/:id', updateProduct);

export default router;
