import OverallStatModal from "../models/overallStat.js";

const getOverallStatTotalSales = async (req, res) => {
  try {
    const totalSales = await OverallStatModal.find({ year: "2021" });

    const data = totalSales[0]?.monthlyData?.map((item) => {
      return { month: item.month, totalSales: item.totalSales };
    });

    res.status(200).json({ errCode: 0, message: "successful", data: data });
  } catch (error) {
    res.status(404).json({
      errCode: -1,
      message: error.message,
    });
  }
};

const getOverallStatTotalUnits = async (req, res) => {
  try {
    const totalUnits = await OverallStatModal.find({ year: "2021" });

    const data = totalUnits[0]?.monthlyData?.map((item) => {
      return { month: item.month, totalUnits: item.totalUnits };
    });

    res.status(200).json({ errCode: 0, message: "successful", data: data });
  } catch (error) {
    res.status(404).json({
      errCode: -1,
      message: error.message,
    });
  }
};

const getOverallStatDaily = async (req, res) => {
  try {
    const data = await OverallStatModal.find();

    const dailyDataSale = data[0].dailyData.map((item) => ({
      date: item.date,
      totalSales: item.totalSales,
    }));

    const dailyDataUnit = data[0].dailyData.map((item) => ({
      date: item.date,
      totalUnits: item.totalUnits,
    }));
    res.status(200).json({
      errCode: 0,
      message: "successful",
      dailyDataSale: dailyDataSale,
      dailyDataUnit: dailyDataUnit,
    });
  } catch (error) {
    res.status(404).json({
      errCode: -1,
      message: error.message,
    });
  }
};

const getSalesByCategory = async (req, res) => {
  try {
    const data = await OverallStatModal.find();

    res.status(200).json({
      errCode: 0,
      message: "successful",
      data: data[0].salesByCategory,
    });
  } catch (error) {
    res.status(404).json({
      errCode: -1,
      message: error.message,
    });
  }
};
export {
  getOverallStatTotalSales,
  getOverallStatTotalUnits,
  getOverallStatDaily,
  getSalesByCategory,
};
