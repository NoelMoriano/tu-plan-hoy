import { NextFunction, Request, Response } from "express";
import { updateAdvertisement } from "../../_firebase/collections";

interface Params {
  advertisementId: string;
}

interface Body {
  updateBy: string;
}

export const patchAdvertisement = async (
  req: Request<Params, unknown, Body, unknown>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const {
    params: { advertisementId },
    body: { updateBy },
  } = req;

  console.log("「Delete advertisement」Initialize", advertisementId, {
    params: req.params,
    body: req.body,
  });

  try {
    await updateAdvertisement(advertisementId, { updateBy });

    res.sendStatus(200).end();
  } catch (error) {
    console.error(error);
    next(error);
  }
};
