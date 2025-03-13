import { NextFunction, Request, Response } from "express";
import { fetchCategories, fetchCompanies } from "../../_firebase/collections";
import { orderBy } from "lodash";
import { getCategoriesByIds, logger } from "../../utils";

export const getCompanies = async (
  req: Request<unknown, unknown, unknown, unknown>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    logger.log("「Get companies」Initialize");

    const p0 = fetchCategories();
    const p1 = await fetchCompanies([["isDeleted", "==", false]]);

    const [categories, companies] = await Promise.all([p0, p1]);

    const companiesData = companies.map((company) => ({
      ...company,
      categories: getCategoriesByIds(categories, company?.categoryIds),
    }));

    res.status(200).json(orderBy(companiesData, "createAt", "desc")).end();
  } catch (error) {
    console.error(error);
    next(error);
  }
};
