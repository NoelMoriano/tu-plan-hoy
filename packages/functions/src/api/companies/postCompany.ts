import { NextFunction, Request, Response } from "express";
import { isEmpty, uniq } from "lodash";
import {
  addCompany,
  fetchCategories,
  fetchCompanies,
  getCompanyId,
} from "../../_firebase/collections";
import { Category, Company } from "../../globalTypes";
import {
  defaultFirestoreProps,
  getCategoriesByIds,
  getNameId,
} from "../../utils";

export const postCompany = async (
  req: Request<unknown, unknown, Company, unknown>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { assignCreateProps } = defaultFirestoreProps();

  const { body: company } = req;

  console.log("「Add company」Initialize", {
    body: req.body,
  });

  try {
    const categories = await fetchCategories([["isDeleted", "==", false]]);

    const _isCompanyExists = await isCompanyExists(company.document);
    if (_isCompanyExists) {
      res
        .status(412)
        .send("company/company_already_exists_with_that_document")
        .end();
      return;
    }

    await addCompany(assignCreateProps(mapCompany(company, categories)));

    res.sendStatus(200).end();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const mapCompany = (company: Company, categories: Category[]): Company => {
  const companyId = getCompanyId();

  const { categoryIds, name, city, address } = company;

  const categoriesNames = getCategoriesByIds(categories, categoryIds).map(
    (category) => category.name
  );

  return {
    ...company,
    id: companyId,
    nameId: getNameId(name),
    active: false,
    isHighlighted: false,
    searchData: uniq([name, ...categoriesNames, city, address]),
  };
};

const isCompanyExists = async (
  document: Company["document"]
): Promise<boolean> => {
  const companies = await fetchCompanies([
    ["document.number", "==", document.number],
    ["isDeleted", "==", false],
  ]);

  return !isEmpty(companies);
};
