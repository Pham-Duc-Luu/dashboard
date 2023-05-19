import mongoose from "mongoose";

const OverallStatSchema = new mongoose.Schema(
  {
    totalCustomers: Number,
    yearlySalesTotal: Number,
    yearlyTotalSoldUnits: Number,
    year: Number,
    monthlyData: [
      {
        month: String,
        totalSales: Number,
        totalUnits: Number,
      },
    ],
    dailyData: [{ date: String, totalSales: Number, totalUnits: Number }],
    salesByCategory: {
      type: Map,
      of: String,
    },
  },
  { timestamps: true }
);

const OverallStatModal = mongoose.model("OverallStat", OverallStatSchema);
export default OverallStatModal;
