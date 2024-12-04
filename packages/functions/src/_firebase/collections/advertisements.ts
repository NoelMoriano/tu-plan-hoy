import type { Advertisement } from "../../globalTypes";
import { firestore, setDocument } from "../index";
import {
  fetchCollection,
  fetchDocument,
  mergeDocument,
  updateDocument,
  WhereClauses,
} from "../index";

export const advertisementsRef = firestore.collection("advertisements");

export const getAdvertisementId = (): string => advertisementsRef.doc().id;

export const fetchAdvertisements = async (
  whereClauses?: WhereClauses<Advertisement>[]
): Promise<Advertisement[]> =>
  fetchCollection<Advertisement>(advertisementsRef, whereClauses);

export const advertisementRef = (id: string) => advertisementsRef.doc(id);

export const fetchAdvertisement = async (
  advertisementId: string
): Promise<Advertisement | undefined> =>
  fetchDocument<Advertisement>(advertisementsRef.doc(advertisementId));

export const addAdvertisement = async (advertisement: Advertisement) =>
  setDocument<Advertisement>(
    advertisementsRef.doc(advertisement.id),
    advertisement
  );

export const updateAdvertisement = async (
  advertisementId: string,
  advertisement: Partial<FirestoreFieldValue<Advertisement>>
) =>
  updateDocument<Partial<FirestoreFieldValue<Advertisement>>>(
    advertisementsRef.doc(advertisementId),
    advertisement
  );

export const mergeAdvertisement = async (
  advertisementId: string,
  advertisement: Partial<FirestoreFieldValue<Advertisement>>
) => mergeDocument(advertisementsRef.doc(advertisementId), advertisement);
