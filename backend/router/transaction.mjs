import { Router } from "express";
import { getAllTransactions } from "../controller/transactions.mjs";

const router = Router();

const transaction = router.post("/get-all-transactions", getAllTransactions);

export { transaction };
