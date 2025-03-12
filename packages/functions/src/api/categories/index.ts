import express from "express";
import { getCategories } from "./getCategories";

const router = express.Router();

router.get("/", getCategories);

export default router;
