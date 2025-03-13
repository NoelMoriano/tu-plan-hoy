import express from "express";
import { getCompanies } from "./getCompanies";
import { body } from "express-validator";
import { getCompany } from "./getCompany";
import { postCompany } from "./postCompany";
import { putCompany } from "./putCompany";
import { patchCompany } from "./patchCompany";
import { getCompaniesWithFilters } from "./getCompaniesWithFilters";

const router = express.Router();

router.get("/", getCompanies);
router.get("/filters", getCompaniesWithFilters);

router.get("/:nameId", getCompany);

router.post(
  "/:companyId",
  [
    body("identification").exists(),
    body("name").exists(),
    body("userId").exists(),
  ],
  postCompany
);

router.put("/:companyId", putCompany);

router.patch("/:companyId", [body("updateBy").exists()], patchCompany);

export default router;
