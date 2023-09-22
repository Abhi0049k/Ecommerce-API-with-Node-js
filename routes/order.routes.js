const { Router } = require("express");
const userAuth = require("../middlewares/Auth.middleware");
const { placeOrder, increaseQty, decreaseQty, confirmOrder, allOrders, orderDetails } = require("../controllers/order.controllers");

const orderRouter = Router();

// all Order Routes are Protected

orderRouter.post('/placeOrder/:productId', userAuth(['admin', 'customer']), placeOrder);            // This route is used to add products in the cart

orderRouter.delete('/removeProduct/:productId', userAuth(['admin', 'customer']), removeProduct);    // This route is used to remove products based on product id

orderRouter.patch('/increaseQty/:productId', userAuth(['admin', 'customer']), increaseQty);         // This route is used to increase quantity of a product present in the cart

orderRouter.patch('/decreaseQty/:productId', userAuth(['admin', 'customer']), decreaseQty);         // This route is used to decrease quantity of a product present in the cart

orderRouter.delete('/removeOrder/:orderId', userAuth(['admin', 'customer']), deleteOrder);          // This route is used to delete orders

orderRouter.get('/confirmOrder', userAuth(['admin', 'customer']), confirmOrder);                    // This route is used to confirm an order

orderRouter.get('/all', userAuth(['admin', 'customer']), allOrders)                                 // This route is used to fetch all the orders

orderRouter.get('/:orderId', userAuth(['admin', 'customer']), orderDetails)                         // This route is used to fetch order Details based on order id

module.exports = orderRouter