import express from "express";
import cors from "cors";
import { errorHandler, hostingToApi } from "./_middlewares";
import UsersRouter from "./users";
import CompaniesRouter from "./companies";
import AdvertisementsRouter from "./advertisements";
import CategoriesRouter from "./categories";
import { getSearchData } from "./search";

const app: express.Application = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(hostingToApi);

app.get("/", (req, res) => res.status(200).send("Welcome!").end());

// USERS
app.use("/users", UsersRouter);

// CATEGORIES
app.use("/categories", CategoriesRouter);

// COMPANIES
app.use("/companies", CompaniesRouter);

// ADVERTISEMENTS
app.use("/advertisements", AdvertisementsRouter);

// SEARCH
app.get("/search", getSearchData);

app.use(errorHandler);

export { app };
