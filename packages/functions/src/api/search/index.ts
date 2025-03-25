import express from "express";
import { getSearchData } from "./getSearchData";
import { body, param } from "express-validator";
import { getSearchDataByFilters } from "./getSearchDataByFilters";

const router = express.Router();

router.get("/", param("inputData").exists(), getSearchData);

router.post("/filters", [body("searchKey").exists()], getSearchDataByFilters);

export default router;
