import { NextFunction, Request, Response } from "express";
import { fetchCategories } from "../../_firebase/collections";
import { orderBy } from "lodash";
import { logger } from "../../utils";

export const getCategories = async (
  req: Request<unknown, unknown, unknown, unknown>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    logger.log("「Get categories」Initialize");

    const categories = await fetchCategories([["isDeleted", "==", false]]);

    res.status(200).json(orderBy(categories, "createAt", "desc")).end();
  } catch (error) {
    console.error(error);
    next(error);
  }
};
