import { Router } from "express";
import {
  getAllCustomers,
  getAllAdmin,
  getUserPerformance,
} from "../controller/customer.mjs";

const customer = Router();

customer.get("/get-all-customers", getAllCustomers);
customer.get("/get-all-admin", getAllAdmin);
customer.post("/get-performance", getUserPerformance);

export default customer;
