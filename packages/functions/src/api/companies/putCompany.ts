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
      companyFirestore?.identification.type !== company.identification.type ||
      companyFirestore?.identification.number !== company.identification.number;

    if (changeCompany) {
      const companyExists = await isCompanyExists(company.identification);
      if (companyExists) res.status(412).send("company_already_exists").end();
    }

    await updateCompany(companyId, company);

    res.sendStatus(200).end();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const isCompanyExists = async (
  identification: Company["identification"]
): Promise<boolean> => {
  const companies = await fetchCompanies([
    ["identification.type", "==", identification.type],
    ["identification.number", "==", identification.number],
    ["isDeleted", "==", false],
  ]);

  return !isEmpty(companies);
};

const fetchFirestoreCompany = async (companyId: string): Promise<Company> => {
  const company = await fetchCompany(companyId);

  assert(company, `Company doesn't exist: ${companyId}`);

  return company;
};
