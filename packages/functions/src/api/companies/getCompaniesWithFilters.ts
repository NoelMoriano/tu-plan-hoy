import { NextFunction, Request, Response } from "express";
import { fetchCategories, fetchCompanies } from "../../_firebase/collections";
import { WhereClauses } from "../../_firebase";
import type { Company } from "../../globalTypes";
import { isEmpty, orderBy } from "lodash";
import { getCategoriesByIds, logger } from "../../utils";

interface Query {
  active?: string;
  isHighlighted?: string;
  limit?: string;
}

export const getCompaniesWithFilters = async (
  req: Request<unknown, unknown, unknown, Query>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      query: { active, isHighlighted, limit },
    } = req;

    logger.log("「Get companies with filters」Initialize", {
      query: req.query,
    });

    let whereClauses: WhereClauses<Company>[] = [["isDeleted", "==", false]];

    if (!isEmpty(active)) {
      whereClauses.push(["active", "==", active === "true"]);
    }

    if (!isEmpty(isHighlighted)) {
      whereClauses.push(["isHighlighted", "==", isHighlighted === "true"]);
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
