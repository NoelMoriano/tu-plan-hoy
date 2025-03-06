import { NextFunction, Request, Response } from "express";
import { fetchCompanies } from "../../_firebase/collections";

export const getCompanies = async (
  req: Request<unknown, unknown, unknown, unknown>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const companies = await fetchCompanies([
      ["isDeleted", "==", false],
      ["active", "==", true],
    ]);

    res.status(200).json(companies).end();
  } catch (error) {
    console.error(error);
    next(error);
  }
};
