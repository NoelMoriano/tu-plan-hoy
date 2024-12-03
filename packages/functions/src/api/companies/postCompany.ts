import { NextFunction, Request, Response } from "express";
import { isEmpty } from "lodash";
import {
  addCompany,
  fetchCompanies,
  getCompanyId,
} from "../../_firebase/collections";
import { Company } from "../../globalTypes";

export const postCompany = async (
  req: Request<unknown, unknown, Company, unknown>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { body: company } = req;

  console.log("「Add company」Initialize", {
    body: req.body,
  });

  try {
    const _isCompanyExists = await isCompanyExists(company.identification);
    if (_isCompanyExists) res.status(412).send("company_already_exists").end();

    await addCompany(mapCompany(company));

    res.sendStatus(200).end();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const mapCompany = (company: Company): Company => ({
  ...company,
  id: getCompanyId(),
});

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
