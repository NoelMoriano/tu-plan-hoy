import { firebase, storage } from "./index";
import { currentConfig } from "../config";

// export type FirebaseStorage = firebase.storage.Storage;
// export type FirebaseStorageReference = firebase.storage.Reference;
// export type FirebaseStorageError = firebase.storage.FirebaseStorageError;
//
// export type BucketType = "default" | "photos";
// export type ImageResize = "100x50" | "200x150" | "700x450";

// type Buckets = Record<BucketType, FirebaseStorage>;

export const buckets = {
  default: storage,
  tphUsers: firebase.app().storage(currentConfig.buckets.tphUsers),
  tphCompanies: firebase.app().storage(currentConfig.buckets.tphCompanies),
  tphAdvertisements: firebase
    .app()
    .storage(currentConfig.buckets.tphAdvertisements),
};

export const imageResizes = ["400x400", "250x250", "836x522"];
