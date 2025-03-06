import { NextFunction, Request, Response } from "express";
import {
  addAdvertisement,
  getAdvertisementId,
} from "../../_firebase/collections";
import { Advertisement } from "../../globalTypes";
import { defaultFirestoreProps, getNameId } from "../../utils";
import { uniq } from "lodash";

export const postAdvertisement = async (
  req: Request<unknown, unknown, Advertisement, unknown>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { body: advertisement } = req;
  const { assignCreateProps } = defaultFirestoreProps();

  console.log("「Add advertisement」Initialize", {
    body: req.body,
  });

  try {
    await addAdvertisement(assignCreateProps(mapAdvertisement(advertisement)));

    res.sendStatus(200).end();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const mapAdvertisement = (advertisement: Advertisement): Advertisement => {
  const advertisementId = getAdvertisementId();

  const { categoryIds, name } = advertisement?.advertisementSetup.detail;
  const { city, address } = advertisement?.advertisementSetup.location;

  return {
    ...advertisement,
    id: advertisementId,
    nameId: getNameId(name),
    active: false,
    isHighlighted: false,
    searchData: uniq(
      [advertisementId, ...categoryIds, name, city, address].filter(
        (advertisement) => advertisement
      )
    ),
  };
};
