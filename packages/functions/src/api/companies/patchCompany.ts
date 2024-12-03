import { NextFunction, Request, Response } from "express";
import { updateCompany } from "../../_firebase/collections";

interface Params {
  companyId: string;
}

interface Body {
  updateBy: string;
}

export const patchCompany = async (
  req: Request<Params, unknown, Body, unknown>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const {
    params: { companyId },
    body: { updateBy },
  } = req;

  console.log("「Delete company」Initialize", companyId, {
    params: req.params,
    body: req.body,
  });

  try {
    await updateCompany(companyId, { updateBy });

    res.sendStatus(200).end();
  } catch (error) {
    console.error(error);
    next(error);
  }
};
