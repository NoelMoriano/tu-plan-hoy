import { NextFunction, Request, Response } from "express";
import { fetchCategories, fetchCompanies } from "../../_firebase/collections";
import { WhereClauses } from "../../_firebase";
import type { Company } from "../../globalTypes";
import { orderBy } from "lodash";
import { getCategoriesByIds, logger } from "../../utils";

interface Query {
  active?: boolean;
  isHighlighted?: boolean;
  limit?: number;
}

export const getCompanies = async (
  req: Request<unknown, unknown, unknown, Query>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      query: { active, isHighlighted, limit },
    } = req;

    logger.log("「Get companies」Initialize", {
      query: req.query,
    });

    let whereClauses: WhereClauses<Company>[] = [["isDeleted", "==", false]];

    if (active) {
      whereClauses.push(["active", "==", true]);
    }

    if (isHighlighted) {
      whereClauses.push(["isHighlighted", "==", true]);
    }

    const p0 = fetchCategories();
    const p1 = await fetchCompanies(whereClauses, limit ? +limit : undefined);

    const [categories, companies] = await Promise.all([p0, p1]);

    const companiesData = companies.map((company) => ({
      ...company,
      categories: getCategoriesByIds(categories, company?.categoryIds),
    }));

    res.status(200).json(orderBy(companiesData, "createAt", "desc")).end();
  } catch (error) {
    console.error(error);
    next(error);
  }
};
