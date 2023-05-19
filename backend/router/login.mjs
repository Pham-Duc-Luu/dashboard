import { Router } from "express";
import { loginController } from "../controller/login.mjs";

const router = Router();

const loginRouter = router.post("/", loginController);

export { loginRouter };
