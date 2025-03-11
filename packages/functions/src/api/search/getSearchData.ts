import { NextFunction, Request, Response } from "express";
import { logger } from "../../utils";
import { algoliaClient } from "../../algolia";

interface Filters {
  inputData: string;
}

export const getSearchData = async (
  req: Request<unknown, unknown, unknown, Filters>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const {
    query: { inputData },
  } = req;

  logger.log("「Search data」Initialize", {
    query: req.query,
  });

  try {
    const { results } = await algoliaClient.search({
      requests: [
        {
          indexName: "tu-plan-hoy_search-data",
          query: inputData,
        },
      ],
    });

    res.status(200).json(results).end();
  } catch (error) {
    console.error(error);
    next(error);
  }
};
