const { Router } = require("express");
const userAuth = require("../middlewares/Auth.middleware");
const { allProducts, productDetails, categoryList, categoryProductList, addProduct } = require("../controllers/products.controllers");

const productRouter = Router();

productRouter.get('/', allProducts)

productRouter.get('/:id', productDetails)

productRouter.get('/category/categoryList', categoryList)

productRouter.get('/category/:id', categoryProductList)

productRouter.post('/addProduct', userAuth(['admin']), addProduct)

module.exports = productRouter;