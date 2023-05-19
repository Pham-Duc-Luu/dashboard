import { Router } from "express";
import {
  getOverallStatDaily,
  getOverallStatTotalSales,
  getOverallStatTotalUnits,
  getSalesByCategory,
} from "../controller/overallStat.mjs";

const overallStat = Router();

overallStat.get("/get-overallStat-total-sales", getOverallStatTotalSales);
overallStat.get("/get-overallStat-total-units", getOverallStatTotalUnits);
overallStat.get("/get-overallStat-daily", getOverallStatDaily);
overallStat.get("/get-overallStat-sale-by-category", getSalesByCategory);

export default overallStat;
