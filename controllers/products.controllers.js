const productModel = require("../models/product.model");
const categoryModel = require("../models/category.model");

const allProducts = async (req, res) => {
    try {
        let products = await productModel.find();
        res.status(200).send(products);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
}

const productDetails = async(req, res)=>{
    try {
        const {id} = req.params;
        const product = await productModel.findById(id);
        res.status(200).send(product);
    } catch (err) {
        res.status(500).send({error: err.message});
    }
}

const categoryList = async(req, res)=>{
    try{
        const list = await categoryModel.find();
        res.status(200).send(list);
    }catch(err){
        res.status(500).send({error: err.message});
    }
}

const categoryProductList = async (req, res) => {
    try {
        const {id} = req.params;
        const category = await categoryModel.findById(id);
        const products = await productModel.find({category: category.category});
        res.status(200).send(products);
    } catch (err) {
        res.status(500).send({error: err.message});
    }
}

const addProduct = async (req, res) => {
    try {
        const { title, price, description, availability, category } = req.body;
        let ctgry = await categoryModel.findOne({category: category});
        if(!ctgry){
            ctgry = new categoryModel({category: category});
            await ctgry.save();
        }
        const newProduct = new productModel({ title, price, description, availability, category });
        await newProduct.save();
        res.status(201).send({ msg: 'Product Added' });
    } catch (err) {
        console.log(err);
        res.status(500).send({ error: err.message });
    }
}

module.exports = {
    addProduct, categoryProductList, categoryList, productDetails, allProducts
}