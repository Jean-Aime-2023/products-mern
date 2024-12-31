import express from 'express';
import { connectDB } from './config/dbConfig.js';
import productRouter from './routes/product.route.js';
import path from 'path';
import cors from 'cors';

const app = express();

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

connectDB();

// Middleware
app.use(cors({ origin: ['http://localhost:5000', 'http://localhost:5173'] }));
app.use(express.json());

// API Routes
app.use('/api/products', productRouter);

// Serve Frontend (in production)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
  });
}

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
