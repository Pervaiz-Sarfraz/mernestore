import mongoose from "mongoose";
import Product from "../models/product.model.js";
export const creatProduct = async (req, res) => {
    const product = req.body;
    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({success:false,message:"Please provide all the fields"});
    }
    
    const newProduct = new Product(product);
    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.log('Error in creating Product', error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const getProducts= async (req,res)=>{
    try {
      const products = await Product.find({})
        res.status(200).json({ success: true, data: products});
    } catch (error) {
        console.log('Error in creating Product', error.message);
        res.status(500).json({ success: false, message: "server Error" });
    }
}

export const deteleProduct = async (req, res) => {
    const {id} = req.params;
    try {
        await Product.findByIdAndDelete(id)
        res.status(200).json({ success: true, message:"Product deleted"});
    } catch (error) {
        console.log('Error in creating Product', error.message);
        res.status(404).json({ success: false, message: "Product not fond" });
    }
}

export const updateProduct =  async (req, res) => {
    const {id} = req.params;
    const product = req.body;
    if (mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ success: false, message: "Invalid Id" });
    }
    try {
       const updateProduct= await Product.findByIdAndUpdate(id,product,{new:true})
        res.status(200).json({ success: true, data:updateProduct});
    } catch (error) {
        console.log('Error in creating Product', error.message);
        res.status(404).json({ success: false, message: "Product not fond" });
    }
}