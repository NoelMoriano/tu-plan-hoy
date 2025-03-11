import { NextFunction, Request, Response } from "express";
import { isEmpty, uniq } from "lodash";
import assert from "assert";
import { Category, Company } from "../../globalTypes";
import {
  fetchCategories,
  fetchCompanies,
  fetchCompany,
  updateCompany,
} from "../../_firebase/collections";
import {
  defaultFirestoreProps,
  getCategoriesByIds,
  getNameId,
} from "../../utils";

interface Params {
  companyId: string;
}

export const putCompany = async (
  req: Request<Params, unknown, Company, unknown>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { assignUpdateProps } = defaultFirestoreProps();

  const {
    params: { companyId },
    body: company,
  } = req;

  console.log(companyId, "「Update company」Initialize", {
    param: req.params,
    body: req.body,
  });

  try {
    const categories = await fetchCategories([["isDeleted", "==", false]]);

    const companyFirestore = await fetchFirestoreCompany(companyId);
    const changeCompany =
      companyFirestore?.document.type !== company.document.type ||
      companyFirestore?.document.number !== company.document.number;

    if (changeCompany) {
      const companyExists = await isCompanyExists(company.document);
      if (companyExists)
        res
          .status(412)
          .send("company/company_already_exists_with_that_document")
          .end();
    }

    await updateCompany(
      companyId,
      assignUpdateProps(mapCompany(company, categories))
    );

    res.sendStatus(200).end();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const mapCompany = (company: Company, categories: Category[]): Company => {
  const { categoryIds, name, city, address } = company;

  const categoriesNames = getCategoriesByIds(categories, categoryIds).map(
    (category) => category.name
  );

  return {
    ...company,
    nameId: getNameId(name),
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

const fetchFirestoreCompany = async (companyId: string): Promise<Company> => {
  const company = await fetchCompany(companyId);

  assert(company, `Company doesn't exist: ${companyId}`);

  return company;
};
