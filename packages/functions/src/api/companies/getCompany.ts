import { NextFunction, Request, Response } from "express";
import {
  fetchCategories,
  fetchCompanies,
  fetchUser,
} from "../../_firebase/collections";
import { getCategoriesByIds, logger } from "../../utils";
import assert from "assert";
import { isEmpty } from "lodash";
import { Company } from "../../globalTypes";

interface Params {
  nameId: string;
}

export const getCompany = async (
  req: Request<Params, unknown, unknown, unknown>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      params: { nameId },
    } = req;

    logger.log("「Get company」Initialize", {
      params: req.params,
    });

    const companies = await fetchCompanies(
      [
        ["isDeleted", "==", false],
        ["nameId", "==", nameId],
      ],
      1
    );
    const company: Company | undefined = companies?.[0];

    if (isEmpty(company)) {
      res.status(412).send("companies/no_company_found");
      return;
    }

    assert(company, "Missing company!");

    const p0 = fetchCategories();
    const p1 = fetchUser(company.userId);

    const [categories, user] = await Promise.all([p0, p1]);

    const _categories = getCategoriesByIds(categories, company?.categoryIds);

    const companyData = {
      ...company,
      user,
      categories: _categories,
    };

    res.status(200).json(companyData).end();
  } catch (error) {
    console.error(error);
    next(error);
  }
};
