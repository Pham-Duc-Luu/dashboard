import ProductModal from "../models/product.js";
import ProductStatModal from "../models/productStat.js";

const getAllProduct = async (req, res) => {
  try {
    const allProducts = await ProductModal.find().select({
      createdAt: 0,
      updatedAt: 0,
      __v: 0,
    });

    const productWithStat = await Promise.all(
      allProducts.map(async (product) => {
        const stat = await ProductStatModal.find({
          productId: product._id,
        });
        return { ...product._doc, stat };
      })
    );

    res
      .status(200)
      .json({ errCode: 0, message: "successful", data: productWithStat });
  } catch (error) {
    res.status(404).json({
      errCode: -1,
      message: error.message,
    });
  }
};

export { getAllProduct };
