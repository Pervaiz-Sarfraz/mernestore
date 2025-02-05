import Product from "../models/Product.js";
import jwt from 'jsonwebtoken';
export const creatProduct = async (req, res) => {
    const { name, price, image } = req.body;
    if (!name || !price || !image) {
        return res.status(400).json({ success: false, message: "Please provide all the fields" });
    }

    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json({ success: false, message: "Authentication token is missing" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(' Decoded Token Data:', decoded);
        if (!decoded.userId) {
            return res.status(401).json({ success: false, message: "Invalid token structure" });
        }
        req.user = decoded.userId;
        console.log('User ID:', req.user);
        const product = new Product({
            name,
            price,
            image,
            user: req.user
        });

        await product.save();

        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            product
        });

    } catch (error) {
        console.error(" JWT Verification Error:", error.message);
        return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
};

export const getProducts = async (req, res) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json({ success: false, message: "Authentication token is missing" });
    }
    try {
        // Verify JWT Token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(' Decoded Token Data:', decoded);

        if (!decoded.userId) {
            return res.status(401).json({ success: false, message: "Invalid token structure" });
        }

        const user_products = await Product.find({ user: decoded.userId })
        res.json({ user_products, status: true })


    } catch (error) {
        console.error(" JWT Verification Error:", error.message);
        return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }

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
    const { id } = req.params;
    const { name, price, image } = req.body;
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json({ success: false, message: "Authentication token is missing" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(' Decoded Token Data:', decoded);
        if (!decoded.userId) {
            return res.status(401).json({ success: false, message: "Invalid token structure" });
        }
        req.user = decoded.userId;
        console.log('User ID:', req.user);

        const updateProduct = await Product.findByIdAndUpdate(id, { name, price, image, user: req.user }, { new: true })
        res.status(200).json({ success: true, data: updateProduct });
    } catch (error) {
        console.log('Error in creating Product', error.message);
        res.status(404).json({ success: false, message: "Product not fond" });
    }
}

export const getallproducts = async (req, res) => {
    const allproduct = await Product.find();
    res.json(allproduct);
}