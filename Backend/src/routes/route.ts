import { Router, Request, Response } from 'express';
import { signUp, login, logout } from '../controller/user/user';
import { addNewProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from '../controller/product/product';
import { getUserCart, addToCart, updateQuantity, removeFromCart } from '../controller/cart/cart';
import {getAllOrders, updateOrderStatus } from '../controller/admin/admin';
import { createOrder, getUserOrders, getOrderById } from '../controller/order/order';
import auth from '../middleware/auth';
import path from 'path';




const router = Router();

router.post('/signup', signUp);
router.post('/login', login);
router.post('/logout', auth.authenticate, logout);

router.post('/products', auth.authenticate, auth.authorizeAdmin, addNewProduct);
router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);
router.put('/products/:id',auth.authenticate, auth.authorizeAdmin, updateProduct);
router.delete('/products/:id',auth.authenticate, auth.authorizeAdmin, deleteProduct);


router.post('/orders/:userId', auth.authenticate, auth.authorizeByUserId, createOrder);
router.get('/orders',auth.authenticate, auth.authorizeAdmin, getAllOrders);
router.put('/orders/:id/status', auth.authenticate, auth.authorizeAdmin, updateOrderStatus);
router.get('/orders/:userId',auth.authenticate, auth.authorizeByUserId, getUserOrders);
router.get('/orders/:orderId/:userId',auth.authenticate,auth.authorizeByUserId, getOrderById);


router.get('/cart/:userId', auth.authenticate, auth.authorizeByUserId, getUserCart);
router.post('/cart/add', addToCart);
router.put('/cart/update-quantity', updateQuantity);
router.delete('/cart/remove/:cartItemId', removeFromCart);



router.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});



export default router;
