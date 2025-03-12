import express from "express";
import { postUser } from "./postUser";
import { body } from "express-validator";
import { putUser } from "./putUser";
import { patchUser } from "./patchUser";

const router = express.Router();

router.post(
  "/:userId",
  body("email").exists(),
  body("dni").exists(),
  body("phone").exists(),
  postUser
);

router.put(
  "/:userId",
  body("email").exists(),
  body("dni").exists(),
  body("phone").exists(),
  putUser
);

router.patch("/:userId", body("updateBy").exists(), patchUser);

export default router;
