import { Request, Response } from 'express';
import Order from '../../models/db/order';
import OrderItem from '../../models/db/orderItem';
import Product from '../../models/db/products';
import User from '../../models/db/users';
import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
    service: 'Gmail', 
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export const createOrder = async (req: Request, res: Response) => {
    try {
        const { userId, items } = req.body;

        if (!userId || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: 'Invalid data' });
        }

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        let totalPrice = 0;
        let totalItems = 0;
        let totalQuantity = 0;

        const orderItemsData = [];

        for (const item of items) {
            const product = await Product.findByPk(item.productId);
            if (!product) {
                throw new Error(`Product with ID ${item.productId} not found`);
            }

            const itemTotalPrice = product.price * item.quantity;
            totalPrice += itemTotalPrice;
            totalItems += 1; 
            totalQuantity += item.quantity;

            orderItemsData.push({
                productId: item.productId,
                quantity: item.quantity
            });
        }

       
        const order = await Order.create({
            userId,
            totalPrice,
            totalItems,
            totalQuantity,
            cancellable: true, 
            status: 'pending', 
            isDeleted: false 
        });

       
        await Promise.all(orderItemsData.map(item =>
            OrderItem.create({
                orderId: order.id, 
                productId: item.productId,
                quantity: item.quantity
            })
        ));

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email, 
            subject: 'Order Confirmation',
            text: `Your order with ID ${order.id} has been successfully placed.`
        };

        await transporter.sendMail(mailOptions);

        return res.status(201).json({ message: 'Order created successfully', orderId: order.id });
    } catch (error: any) {
        console.error('Error creating order:', error.message);
        return res.status(500).json({ message: error.message });
    }
};


export const getUserOrders = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;

        
        const orders = await Order.findAll({
            where: { userId },
            include: {
                model: OrderItem,
                as: 'orderItems' 
            }
        });

        if (orders.length === 0) {
            return res.status(404).json({ message: 'No orders found' });
        }

        return res.status(200).json(orders);
    } catch (error: any) {
        console.error('Error fetching user orders:', error.message);
        return res.status(500).json({ message: error.message });
    }
};
export const getOrderById = async (req: Request, res: Response) => {
    try {
        const orderId = req.params.orderId;

        const order = await Order.findByPk(orderId, {
            include: [
                {
                    model: OrderItem,
                    as: 'orderItems' 
                }
            ]
        });

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        return res.status(200).json(order);
    } catch (error: any) {
        console.error('Error fetching order by ID:', error.message);
        return res.status(500).json({ message: error.message });
    }
};