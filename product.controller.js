import mongoose from "mongoose";
import Product from "../models/product.model.js";
import jwt from 'jsonwebtoken';
export const creatProduct = async (req, res) => {
    const product = req.body;
    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: "Please provide all the fields" });
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

export const getProducts = async (req, res) => {

    const token = req.header('Authorization');
    console.log('token', token);

    const jt = process.env.JWT_SECRET;
    console.log('jt', jt);
    console.log('res', res);

    let value = jwt.verify(token, jt);
    console.log('value', value);

    //         if(err)
    //      {
    //        res.json(err)
    //        console.log('res',res);

    //      }
    //      else{
    //      //  data = decoded;
    //        req.product = data.checkproduct;
    //        console.log('req.product',req.product);
    //        console.log('data.checkproduct',data.checkproduct);

    //      }
    //    });
    //     try {
    //       const products = await Product.find({})
    //         res.status(200).json({ success: true, data: products});
    //     } catch (error) {
    //         console.log('Error in creating Product', error.message);
    //         res.status(500).json({ success: false, message: "server Error" });
    // }
}

export const deteleProduct = async (req, res) => {
    const { id } = req.params;
    try {
        await Product.findByIdAndDelete(id)
        res.status(200).json({ success: true, message: "Product deleted" });
    } catch (error) {
        console.log('Error in creating Product', error.message);
        res.status(404).json({ success: false, message: "Product not fond" });
    }
}

export const updateProduct = async (req, res) => {
    console.log('productproductproductdassddsadsadsadsa');
    const { id } = req.params;
    const { name, price, image } = req.body;
    const token = req.header('token');

    const jt = process.env.JWT_SECRET;
    jwt.verify(token, jt, (err, data) => {
        if (err) {
            res.json(err)
        }
        else {
            //  data = decoded;
            req.product = data.checkproduct;

        }
    });
    try {
        const updateProduct = await Product.findByIdAndUpdate(id, name, price, image, { new: true })
        res.status(200).json({ success: true, data: updateProduct });
    } catch (error) {
        console.log('Error in creating Product', error.message);
        res.status(404).json({ success: false, message: "Product not fond" });
    }
}