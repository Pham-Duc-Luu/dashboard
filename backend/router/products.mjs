import { Router } from "express";
import { getAllProduct } from "../controller/products.mjs";

const products = Router();

products.get("/get-all-products", getAllProduct);

export default products;
