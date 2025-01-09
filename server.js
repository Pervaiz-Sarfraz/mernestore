import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './route/product.route.js';
import authRoutes from './route/auth.js'; 
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json()); 
app.use(cors());

const PORT = process.env.PORT || 4000;

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes); 

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});
