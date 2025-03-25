import { NextFunction, Request, Response } from "express";
import { logger } from "../../utils";
import { algoliaClient } from "../../algolia";

interface Body {
  searchKey?: string;
}

export const getSearchDataByFilters = async (
  req: Request<unknown, unknown, Body, unknown>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const {
    body: { searchKey },
  } = req;

  logger.log("「Search data by filters」Initialize", {
    query: req.body,
  });

  try {
    const { results } = await algoliaClient.search({
      requests: [
        {
          indexName: "tu-plan-hoy_search-data-by-filters",
          query: searchKey,
        },
      ],
    });

    res.status(200).json(results).end();
  } catch (error) {
    console.error(error);
    next(error);
  }
};
