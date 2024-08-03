import { Request, Response } from 'express';
import Product from '../../models/db/products';
import { ValidationError } from 'sequelize';

export const addNewProduct = async (req: Request, res: Response) => {
    try {
        const { title, description, price, isFreeShipping, productImage, category, isDeleted } = req.body;

        const newProduct = await Product.create({
            title,
            description,
            price,
            isFreeShipping,
            productImage,
            category,
            isDeleted
        });

        return res.status(201).json({ message: `Product ${newProduct.title} created successfully`, product: newProduct });
    } catch (error: any) {
        console.error('Error creating product:', error);

        if (error instanceof ValidationError) {
            return res.status(400).json({ message: 'Validation error', details: error.errors });
        }

        return res.status(500).json({ message: 'An unexpected error occurred' });
    }
};


export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.findAll();

        return res.status(200).json({ products });
    } catch (error: any) {
        console.error('Error fetching products:', error.message);
        return res.status(500).json({ message: error.message });
    }
};

export const getProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        return res.status(200).json({ product });
    } catch (error: any) {
        console.error('Error fetching product by ID:', error.message);
        return res.status(500).json({ message: error.message });
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, description, price, isFreeShipping, productImage, category, availableSizes, isDeleted } = req.body;

        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await product.update({
            title,
            description,
            price,
            isFreeShipping,
            productImage,
            category,
            isDeleted
        });

        return res.status(200).json({ message: `Product ${product.title} updated successfully`, product });
    } catch (error: any) {
        console.error('Error updating product:', error.message);
        return res.status(500).json({ message: error.message });
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await product.destroy();

        return res.status(200).json({ message: `Product ${product.title} deleted successfully` });
    } catch (error: any) {
        console.error('Error deleting product:', error.message);
        return res.status(500).json({ message: error.message });
    }
};
