import { NextFunction, Request, Response } from "express";
import { isEmpty } from "lodash";
import {
  addCompany,
  fetchCompanies,
  getCompanyId,
} from "../../_firebase/collections";
import { Company } from "../../globalTypes";
import { defaultFirestoreProps } from "../../utils";

export const postCompany = async (
  req: Request<unknown, unknown, Company, unknown>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { body: company } = req;
  const { assignCreateProps } = defaultFirestoreProps();

  console.log("「Add company」Initialize", {
    body: req.body,
  });

  try {
    const _isCompanyExists = await isCompanyExists(company.document);
    if (_isCompanyExists) {
      res.status(412).send("company/company_already_exists").end();
      return;
    }

    await addCompany(assignCreateProps(mapCompany(company)));

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
  document: Company["document"]
): Promise<boolean> => {
  const companies = await fetchCompanies([
    ["document.number", "==", document.number],
    ["isDeleted", "==", false],
  ]);

  return !isEmpty(companies);
};
