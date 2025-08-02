import express from "express";
import { getProducts, saveproduct, deleteProduct } from "../controllers/productController.js"; 

const productRouter = express.Router();

productRouter.get("/", getProducts);
productRouter.post("/", saveproduct);
productRouter.delete("/:productId", deleteProduct); 

export default productRouter;