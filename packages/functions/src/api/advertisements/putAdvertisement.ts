import { NextFunction, Request, Response } from "express";
import { Advertisement } from "../../globalTypes";
import { updateAdvertisement } from "../../_firebase/collections";

interface Params {
  advertisementId: string;
}

export const putAdvertisement = async (
  req: Request<Params, unknown, Advertisement, unknown>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const {
    params: { advertisementId },
    body: company,
  } = req;

  console.log(advertisementId, "「Update advertisement」Initialize", {
    param: req.params,
    body: req.body,
  });

  try {
    await updateAdvertisement(advertisementId, company);

    res.sendStatus(200).end();
  } catch (error) {
    console.error(error);
    next(error);
  }
};
