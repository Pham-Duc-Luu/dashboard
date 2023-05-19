import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import general from "./router/general.mjs";
import { loginRouter } from "./router/login.mjs";
import {
  dataUser,
  dataProduct,
  dataProductStat,
  dataTransaction,
  dataOverallStat,
  dataAffiliateStat,
} from "./data/index.mjs";
import UserModal from "./models/user.mjs";
import ProductModal from "./models/product.js";
import ProductStatModal from "./models/productStat.js";
import products from "./router/products.mjs";
import customer from "./router/customer.mjs";
import TransactionModal from "./models/transaction.js";
import { transaction } from "./router/transaction.mjs";
import OverallStatModal from "./models/overallStat.js";
import overallStat from "./router/overallStat.mjs";
import AffiliateStat from "./models/affiliateStat.js";

/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/v1/general", general);
app.use("/api/v1/login", loginRouter);
app.use("/api/v1/products", products);
app.use("/api/v1/customer", customer);
app.use("/api/v1/transactions", transaction);
app.use("/api/v1/overallStat", overallStat);
/*MONGOOSE SETUP */
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    );

    // UserModal.insertMany(dataUser);
    // ProductModal.insertMany(dataProduct);
    // ProductStatModal.insertMany(dataProductStat);
    // TransactionModal.insertMany(dataTransaction);
    // OverallStatModal.insertMany(dataOverallStat);
    // AffiliateStat.insertMany(dataAffiliateStat);
  })
  .catch((error) => console.log(`${error} did not connect`));

// mongoose.set('useFindAndModify', false);
