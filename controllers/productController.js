import Product from "../models/product.js";
import { isAdmin } from "./userController.js";

export async function getProducts(req, res) {
    /*Product.find().then(
        (data) => {
            res.json({
                message: "product details",
                products: data 

            });
        }
    ).catch(
        (err) => {
            res.json({
                message: "failed to get product details",
                error: err
            });
        }
    );*/


    try {
        if(isAdmin(req)){
           const products = await Product.find()
            res.json({
                message: "product details to successfully ",
                products: products
            });
        }else{
            const products = await Product.find({isAvailable: true})
            res.json({
                message: "product details successfully ",
                products: products
            })
        }

    } catch (err) {
        res.json({
            message: "failed to get product details",
            error: err
        });
    }
}
export function saveproduct(req, res) {

    if(!isAdmin(req)){
        res.status(403).json({
            message : "you are not authorized to add product"
        })
        return
    }

    const product = new Product(req.body);
    product.save().then(() => {
        res.json({
            message: "product save details"
        });
    }).catch(() => {
        res.json({
            message: "failed to details"
        });
    });
}

export async function deleteProduct(req, res) {
    if(!isAdmin(req)){
        res.status(403).json({
            message : "you are not authorized to delete product"
        })
        return
    }
    try {
    await Product.deleteOne({productId : req.params.productId})

    res.json({
        message : "product deleted successfully"
    });
} catch (err) {
    res.status(500).json({
        message : "failed to delete product",
        error : err
    });
}
}