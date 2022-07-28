const Product = require('../models/productModel');


/**
 * for getting the product list
 * @param {*} req 
 * @param {*} res 
 */
exports.getAllProducts = async(req,res)=>{
    const products = await Product.find();
    res.status(200).json({
        success:true,
        products
    });
}

/**
 * for creating the product
 * @param {*} req 
 * @param {*} res 
 */
exports.createProduct = async(req,res,next)=>{
    const product = await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    })
}