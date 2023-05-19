import { Router } from "express";
import { getGeography, getUser } from "../controller/general.mjs";

const general = Router();

general.get("/user/:id", getUser);
general.get("/geography", getGeography);

export default general;
