import { NextFunction, Request, Response } from "express";
import { fetchAdvertisements } from "../../_firebase/collections";

export const getAdvertisements = async (
  req: Request<unknown, unknown, unknown, unknown>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const advertisements = await fetchAdvertisements();

    res.status(200).json(advertisements).end();
  } catch (error) {
    console.error(error);
    next(error);
  }
};
