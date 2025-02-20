import { firestore } from "../index";
import { fetchDocumentOnce } from "../utils";
import { setDocument, updateDocument, fetchCollectionOnce } from "../firestore";
import { firebase } from "../index.js";

export const advertisementsRef = firestore.collection("advertisements");

export const getAdvertisementId = () => advertisementsRef.doc().id;

export const fetchAdvertisement = () => async (id) =>
  fetchDocumentOnce(advertisementsRef.doc(id));

export const fetchCompanies = async () =>
  fetchCollectionOnce(advertisementsRef.where("isDeleted", "==", false));

export const addAdvertisement = async (advertisement) =>
  setDocument(advertisementsRef.doc(advertisement.id), advertisement);

export const updateAdvertisement = async (advertisementId, advertisement) =>
  updateDocument(advertisementsRef.doc(advertisementId), advertisement);
