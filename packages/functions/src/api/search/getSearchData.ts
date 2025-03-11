import { NextFunction, Request, Response } from "express";
import { logger } from "../../utils";
import { algoliaClient } from "../../algolia";

interface Filters {
  name: string;
  categories: string[];
  cities: string[];
  address: string;
}

export const getSearchData = async (
  req: Request<unknown, unknown, unknown, Filters>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const {
    query: { name, categories, cities, address },
  } = req;

  logger.log("「Search data」Initialize", {
    query: req.query,
  });

  try {
    const { results } = await algoliaClient.search({
      requests: [
        {
          indexName: "TuPlanHoy-companies",
          query: name,
        },
      ],
    });

    console.log(JSON.stringify(results));

    // Fusionar resultados
    // const mergedResults = [...results[0].hits, ...results[1].hits];

    res.status(200).json(results).end();
  } catch (error) {
    console.error(error);
    next(error);
  }
};
