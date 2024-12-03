import { NextFunction, Request, Response } from "express";
import { isEmpty } from "lodash";
import assert from "assert";
import { Company } from "../../globalTypes";
import {
  fetchCompanies,
  fetchCompany,
  updateCompany,
} from "../../_firebase/collections";

interface Params {
  companyId: string;
}

export const putCompany = async (
  req: Request<Params, unknown, Company, unknown>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const {
    params: { companyId },
    body: company,
  } = req;

  console.log(companyId, "「Update company」Initialize", {
    param: req.params,
    body: req.body,
  });

  try {
    const companyFirestore = await fetchFirestoreCompany(companyId);
    const changeCompany =
      companyFirestore?.document.type !== company.document.type ||
      companyFirestore?.document.number !== company.document.number;

    if (changeCompany) {
      const companyExists = await isCompanyExists(company.document);
      if (companyExists)
        res.status(412).send("company/company_already_exists").end();
    }

    await updateCompany(companyId, company);

    res.sendStatus(200).end();
  } catch (error) {
    console.error(error);
    next(error);
  }
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
