import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './route/product.route.js';
import authRoutes from './route/auth.js'; // Import auth routes

dotenv.config();

const app = express();
app.use(express.json()); // Middleware for parsing JSON request body

const PORT = process.env.PORT || 5000;

// Mount routes
app.use('/api/products', productRoutes); // CRUD routes for products
app.use('/api/auth', authRoutes); // Authentication routes

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});
