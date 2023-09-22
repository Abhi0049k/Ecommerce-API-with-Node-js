const { Router } = require("express");
const userAuth = require("../middlewares/Auth.middleware");
const { allProducts, productDetails, categoryList, categoryProductList, addProduct } = require("../controllers/products.controllers");

const productRouter = Router();

productRouter.get('/', allProducts)                                         // This route is used to fetch all the products

productRouter.get('/:id', productDetails)                                   // This route is used to fetch product details based on product id

productRouter.get('/category/categoryList', categoryList)                   // This route is used to fetch list of categories

productRouter.get('/category/:id', categoryProductList)                     // This route is used to fetch products based on category id

productRouter.post('/addProduct', userAuth(['admin']), addProduct)          // This is protected route to add products [Only admins can add products]

module.exports = productRouter;