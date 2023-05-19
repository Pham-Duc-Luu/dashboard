import TransactionModal from "../models/transaction.js";

export const getAllTransactions = async (req, res) => {
  try {
    let { page, pageSize, sort, search } = req.body;

    const all_transactions = await TransactionModal.find();

    const options_transactions = await TransactionModal.find()
      .limit(pageSize)
      .skip(pageSize * page);
    res.status(200).json({
      errCode: 0,
      page: Math.ceil(all_transactions.length / pageSize),
      data: options_transactions,
    });
  } catch (error) {
    res.status(404).json({
      errCode: 1,
      message: error.message,
    });
  }
};
