import mongoose from "mongoose";
import UserModal from "../models/user.mjs";
import AffiliateStat from "../models/affiliateStat.js";
import TransactionModal from "../models/transaction.js";

const getAllCustomers = async (req, res) => {
  try {
    const allUsers = await UserModal.find({ role: "user" }).select({
      createdAt: 0,
      updatedAt: 0,
      __v: 0,
      password: 0,
      state: 0,
    });

    res.status(200).json({ errCode: 0, message: "successful", data: allUsers });
  } catch (error) {
    res.status(404).json({
      errCode: -1,
      message: error.message,
    });
  }
};
const getAllAdmin = async (req, res) => {
  try {
    const allUsers = await UserModal.find({ role: "admin" }).select({
      createdAt: 0,
      updatedAt: 0,
      __v: 0,
      password: 0,
      state: 0,
    });

    res.status(200).json({ errCode: 0, message: "successful", data: allUsers });
  } catch (error) {
    res.status(404).json({
      errCode: -1,
      message: error.message,
    });
  }
};

const getUserPerformance = async (req, res) => {
  try {
    const { id } = req.query;
    console.log(id);
    const userWithStats = await UserModal.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      // {
      //   $lookup: {
      //     from: "affiliatestats",
      //     localField: "_id",
      //     foreignField: "userId",
      //     as: "affiliatestats",
      //   },
      // },
      // { $unwind: "$affiliateStats" },
    ]);

    const myAffiliateStat = await AffiliateStat.find({
      userId: new mongoose.Types.ObjectId(id),
    });
    console.log(myAffiliateStat);

    userWithStats[0] = await {
      ...userWithStats[0],
      affiliatestats: myAffiliateStat[0],
    };

    let saleTransactions = await Promise.all(
      userWithStats[0]?.affiliatestats?.affiliateSales?.map(async (id) => {
        let item = await TransactionModal.findById(id);
        return item;
      })
    );

    const filteredSaleTransactions = saleTransactions.filter(
      (transaction) => transaction !== null
    );

    res
      .status(200)
      .json({
        errCode: 0,
        user: userWithStats[0],
        sales: filteredSaleTransactions,
      });
  } catch (error) {
    res.status(404).json({ errCode: -1, message: error.message });
  }
};

export { getAllCustomers, getAllAdmin, getUserPerformance };
