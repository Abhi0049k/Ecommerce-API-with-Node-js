const { Router } = require("express");
const userAuth = require("../middlewares/Auth.middleware");
const { placeOrder, increaseQty, decreaseQty, confirmOrder, allOrders, orderDetails } = require("../controllers/order.controllers");

const orderRouter = Router();

orderRouter.post('/placeOrder/:productId', userAuth(['admin', 'customer']), placeOrder)

orderRouter.delete('/removeProduct/:productId', userAuth(['admin', 'customer']), removeProduct)

orderRouter.patch('/increaseQty/:productId', userAuth(['admin', 'customer']), increaseQty)

orderRouter.patch('/decreaseQty/:productId', userAuth(['admin', 'customer']), decreaseQty)

orderRouter.delete('/removeOrder/:orderId', userAuth(['admin', 'customer']), deleteOrder)

orderRouter.get('/confirmOrder', userAuth(['admin', 'customer']), confirmOrder)

orderRouter.get('/all', userAuth(['admin', 'customer']), allOrders)

orderRouter.get('/:orderId', userAuth(['admin', 'customer']), orderDetails)

module.exports = orderRouter