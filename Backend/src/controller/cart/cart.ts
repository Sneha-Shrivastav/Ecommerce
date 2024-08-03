import { Request, Response } from 'express';
import Cart from '../../models/db/cart';
import CartItem from '../../models/db/cartItems';
import Product from '../../models/db/products';
import User from '../../models/db/users';

export const getUserCart = async (req: Request, res: Response) => {
    try {
        const userId = req.userId; 
        if (!userId) {
            return res.status(400).json({ message: 'User ID is missing' });
        }

        const cart = await Cart.findOne({
            where: { userId },
            include: [
                {
                    model: CartItem,
                    as: 'cartItems',
                    include: [
                        {
                            model: Product,
                            attributes: ['price'] 
                        }
                    ]
                }
            ]
        });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        return res.status(200).json(cart);
    } catch (error: any) {
        console.error('Error fetching user cart:', error.message);
        return res.status(500).json({ message: error.message });
    }
};


export const addToCart = async (req: Request, res: Response) => {
    try {
        const { userId, productId, quantity } = req.body;

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        let cart = await Cart.findOne({ where: { userId } });
        if (!cart) {
            cart = await Cart.create({ userId, totalPrice: 0, totalItems: 0 });
        }

        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        let cartItem = await CartItem.findOne({ where: { cartId: cart.id, productId } });
        if (cartItem) {
            cartItem.quantity += quantity;
            await cartItem.save();
        } else {
            cartItem = await CartItem.create({ cartId: cart.id, productId, quantity });
        }

        const updatedCart = await updateCartTotals(cart.id);

        return res.status(200).json(updatedCart);
    } catch (error: any) {
        console.error('Error adding to cart:', error.message);
        return res.status(500).json({ message: error.message });
    }
};


export const updateQuantity = async (req: Request, res: Response) => {
    try {
        const { cartItemId, quantity } = req.body;

        const cartItem = await CartItem.findByPk(cartItemId);
        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        cartItem.quantity = quantity;
        await cartItem.save();

        const updatedCart = await updateCartTotals(cartItem.cartId);

        return res.status(200).json(updatedCart);
    } catch (error: any) {
        console.error('Error updating quantity:', error.message);
        return res.status(500).json({ message: error.message });
    }
};

export const removeFromCart = async (req: Request, res: Response) => {
    try {
        const { cartItemId } = req.params;

        const cartItem = await CartItem.findByPk(cartItemId);
        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        await cartItem.destroy();

        const updatedCart = await updateCartTotals(cartItem.cartId);

        return res.status(200).json(updatedCart);
    } catch (error: any) {
        console.error('Error removing from cart:', error.message);
        return res.status(500).json({ message: error.message });
    }
};

const updateCartTotals = async (cartId: number) => {
    const cartItems = await CartItem.findAll({ where: { cartId } });
    let totalPrice = 0;
    let totalItems = 0;

    for (const item of cartItems) {
        const product = await Product.findByPk(item.productId);
        if (product) {
            totalPrice += product.price * item.quantity;
            totalItems += item.quantity;
        }
    }

    const cart = await Cart.findByPk(cartId);
    if (cart) {
        cart.totalPrice = totalPrice;
        cart.totalItems = totalItems;
        await cart.save();
    }

    return cart;
};
