import express from "express";
import authRouter from "../auth/routes";
import { auth } from "../middleware/authMiddleware";
import categoryRouter from "../category/routes";
import entryRouter from "../entry/routes";

const router = express.Router();

router.use("/auth", authRouter);

router.use("/categories", auth, categoryRouter);

router.use("/entries", auth, entryRouter);

export default router;
