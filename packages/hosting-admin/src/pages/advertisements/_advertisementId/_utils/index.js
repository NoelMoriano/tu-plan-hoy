import { firebase, firestore } from "../../../../firebase";
import { notification } from "../../../../components";
import { isEmpty } from "lodash";
import {
  addAdvertisement,
  advertisementsRef,
} from "../../../../firebase/collections/index.js";

export const onSaveAdvertisement = async (advertisementId, advertisement) => {
  try {
    await addAdvertisement(advertisement);

    notification({
      type: "success",
      title: "Anuncio guardado exitosamente!",
    });
  } catch (e) {
    notification({ type: "error" });
  }
};

export const onUpdateAdvertisement = (advertisementId, advertisement) => {
  try {
    const batch = firestore.batch();

    batch.update(advertisementsRef.doc(advertisementId), advertisement);

    batch.commit();

    notification({
      type: "success",
      title: "Anuncio guardado exitosamente!",
    });
  } catch (e) {
    notification({ type: "error" });
  }
};

export const onDeleteFieldAdvertisement = async (
  advertisementId,
  fieldName
) => {
  const documentRef = advertisementsRef.doc(advertisementId);

  await documentRef.update({
    [fieldName]: firebase.firestore.FieldValue.delete(),
  });
};

export const deactivateAdvertisementAndDeleteSearchBatch = (
  advertisements,
  batch
) => {
  advertisements.map((advertisement) =>
    batch.update(advertisementsRef.doc(advertisement.id), {
      active: false,
    })
  );

  advertisements.map((advertisement) =>
    batch.delete(firestore.collection("_search").doc(advertisement.id))
  );
};

export const onDeactivateAdvertisementsBatch = (advertisements) => {
  const batch = firestore.batch();

  deactivateAdvertisementAndDeleteSearchBatch(advertisements, batch);

  batch.commit();
};

export const onActivateAdvertisementsBatch = (advertisements) => {
  const batch = firestore.batch();

  activeAdvertisementAndSaveSearchBatch(advertisements, batch);

  batch.commit();
};

export const activeAdvertisementAndSaveSearchBatch = (
  advertisements,
  batch
) => {
  advertisements.map((advertisement) =>
    batch.update(advertisementsRef.doc(advertisement.id), {
      active: true,
    })
  );

  advertisements.map((advertisement) =>
    batch.set(
      firestore.collection("_search").doc(advertisement.id),
      mapSearch(advertisement.id, advertisement)
    )
  );
};

export const validateToActiveAdvertisement = (advertisement) => {
  const observations = {
    "advertisement-setup": [],
  };

  const { advertisementSetup } = advertisement;

  //validate photos
  if (isEmpty(advertisementSetup?.adImage)) {
    observations["advertisement-image"].push("Agregar imagen");
  }

  //validate tags
  // if (isEmpty(productContent?.productSetup.tags)) {
  //   observations["advertisement-setup"].push("Agregar tags");
  // }

  return observations;
};

export const mapSearch = (advertisementId, advertisement) => {
  const advertisementName = advertisement.advertisementSetup?.detail?.name;
  const advertisementImage = advertisement.advertisementSetup?.adImage;

  return {
    id: advertisementId,
    imageName: advertisementImage?.name || null,
    title: advertisementName || null,
  };
};

export const isExistObservations = (observations) =>
  Object.entries(observations).some(([, items]) => !isEmpty(items));

export const advertisementsWithoutObservations = (advertisements) =>
  advertisements.filter(
    (advertisement) =>
      !isExistObservations(validateToActiveAdvertisement(advertisement))
  );

export const advertisementsWithObservations = (advertisements) =>
  advertisements.filter((advertisement) =>
    isExistObservations(validateToActiveAdvertisement(advertisement))
  );
