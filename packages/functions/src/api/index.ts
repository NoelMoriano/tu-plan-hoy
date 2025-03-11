import express from "express";
import cors from "cors";
import { errorHandler, hostingToApi } from "./_middlewares";
import { body } from "express-validator";
import { patchUser, postUser, putUser } from "./users";
import {
  getCompanies,
  patchCompany,
  postCompany,
  putCompany,
} from "./companies";
import {
  patchAdvertisement,
  postAdvertisement,
  putAdvertisement,
  getAdvertisements,
} from "./advertisements";
import { getSearchData } from "./search";

const app: express.Application = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(hostingToApi);

app.get("/", (req, res) => res.status(200).send("Welcome!").end());

app.post(
  "/user",
  [body("email").exists(), body("dni").exists(), body("phone").exists()],
  postUser
);
app.put("/users/:userId", putUser);
app.patch("/users/:userId", [body("updateBy").exists()], patchUser);

app.get("/companies", getCompanies);
app.post(
  "/company",
  [
    body("identification").exists(),
    body("name").exists(),
    body("userId").exists(),
  ],
  postCompany
);
app.put("/companies/:companyId", putCompany);
app.patch("/companies/:companyId", [body("updateBy").exists()], patchCompany);

app.get("/advertisements", getAdvertisements);
app.post("/advertisement", postAdvertisement);
app.put("/advertisements/:advertisementId", putAdvertisement);
app.patch(
  "/advertisements/:advertisementId",
  [body("updateBy").exists()],
  patchAdvertisement
);

app.get("/search", getSearchData);

app.use(errorHandler);

export { app };
