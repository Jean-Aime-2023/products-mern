import Product from '../models/product.model.js';
import mongoose from 'mongoose';

/**
 * Create a new product
 */
export const createProduct = async (req, res) => {
  const { name, image, price } = req.body;

  // Validate input
  if (!name || !image || !price) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields: name, image, or price',
    });
  }

  try {
    const newProduct = new Product({ name, image, price });
    await newProduct.save();
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: newProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating product',
    });
  }
};

/**
 * Get all products
 */
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error while retrieving products',
    });
  }
};

/**
 * Get a product by ID
 */
export const getProductById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid product ID',
    });
  }

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error while retrieving product',
    });
  }
};

/**
 * Update a product by ID
 */
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid product ID',
    });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating product',
    });
  }
};

/**
 * Delete a product by ID
 */
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid product ID',
    });
  }

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting product',
    });
  }
};
