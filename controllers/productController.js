const Product = require('../models/productModel');


/**
 * for getting the product list
 * 
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
 * 
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


/**
 * for getting the single product
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.productDetails = async(req,res,next)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        return res.status(500).json({
            status:false,
            message:"Product not found"
        })
    }
    res.status(200).json({
        success:true,
        product
    })
}


/**
 * for update the product with given id
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.updateProduct = async(req,res,next)=>{
    let product = await Product.findById(req.params.id);
    console.log(product);
    if(!product){
        return res.status(500).json({
            status:false,
            message:"Product not found"
        })
    }
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });
    res.status(200).json({
        status:true,
        product
    })

}

/**
 * for delete the product
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.deleteProduct = async(req,res,next)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        return res.status(500).json({
            status:false,
            message:"Product not found"
        })
    }
    await product.remove();
    res.status(200).json({
        status:true,
        message:"Product deleted successfully"
    })
}