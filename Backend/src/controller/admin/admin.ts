import { Request, Response } from 'express';
import Product from '../../models/db/products';
import Order from '../../models/db/order';


export const getAllOrders = async (req: Request, res: Response) => {
    try {
        
        const orders = await Order.findAll();

        return res.status(200).json({ orders });
    } catch (error: any) {
        console.error('Error fetching orders:', error.message);
        return res.status(500).json({ message: error.message });
    }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const order = await Order.findByPk(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        await order.update({ status });

        return res.status(200).json({ message: `Order status updated to ${status}`, order });
    } catch (error: any) {
        console.error('Error updating order status:', error.message);
        return res.status(500).json({ message: error.message });
    }
};
