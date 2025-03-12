import express from "express";
import { getAdvertisements } from "./getAdvertisement";
import { postAdvertisement } from "./postAdvertisement";
import { putAdvertisement } from "./putAdvertisement";
import { body } from "express-validator";
import { patchAdvertisement } from "./patchAdvertisement";

const router = express.Router();

router.get("/", getAdvertisements);

router.post("/:advertisementId", postAdvertisement);

router.put("/:advertisementId", putAdvertisement);

router.patch(
  "/:advertisementId",
  body("updateBy").exists(),
  patchAdvertisement
);

export default router;
