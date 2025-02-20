import { firebase, firestore } from "../../../../firebase";
import { notification } from "../../../../components";
import { isEmpty } from "lodash";
import {
  addAdvertisement,
  advertisementsRef,
} from "../../../../firebase/collections/index.js";

export const onSaveAdvertisement = async (productId, product) => {
  try {
    await addAdvertisement(product);

    notification({
      type: "success",
      title: "Anuncio guardado exitosamente!",
    });
  } catch (e) {
    notification({ type: "error" });
  }
};

export const onUpdateAdvertisement = (productId, product) => {
  try {
    const batch = firestore.batch();

    batch.update(advertisementsRef.doc(productId), product);

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
  products,
  batch
) => {
  products.map((product) =>
    batch.update(advertisementsRef.doc(product.id), {
      active: true,
    })
  );

  products.map((product) =>
    batch.delete(firestore.collection("_search").doc(product.id))
  );
};

export const onDeactivateAdvertisementsBatch = (products) => {
  const batch = firestore.batch();

  deactivateAdvertisementAndDeleteSearchBatch(products, batch);

  batch.commit();
};

export const onActivateAdvertisementsBatch = (products) => {
  const batch = firestore.batch();

  activeAdvertisementAndSaveSearchBatch(products, batch);

  batch.commit();
};

export const activeAdvertisementAndSaveSearchBatch = (products, batch) => {
  products.map((product) =>
    batch.update(advertisementsRef.doc(product.id), {
      active: true,
    })
  );

  products.map((product) =>
    batch.set(
      firestore.collection("_search").doc(product.id),
      mapSearch(product.id, product)
    )
  );
};

export const validateToActiveAdvertisement = (product) => {
  const observations = {
    "advertisement-setup": [],
  };

  const { productContent } = product;

  //validate photos
  if (isEmpty(productContent.photos)) {
    observations["product-photos"].push("Agregar fotos");
  }

  //validate tags
  // if (isEmpty(productContent?.productSetup.tags)) {
  //   observations["advertisement-setup"].push("Agregar tags");
  // }

  return observations;
};

export const mapSearch = (productId, product) => {
  const productName = product.productContent?.productSetup["name"];
  const productTags = product.productContent?.productSetup.tags;
  const productFirstPhoto = product.productContent?.photos?.[0];

  return {
    id: productId,
    photoName: productFirstPhoto?.name || null,
    title: productName || null,
    tags: [productTags, ...productName.split(" ")].join(" "),
  };
};

export const isExistObservations = (observations) =>
  Object.entries(observations).some(([, items]) => !isEmpty(items));

export const advertisementsWithoutObservations = (products) =>
  products.filter(
    (product) => !isExistObservations(validateToActiveAdvertisement(product))
  );

export const productsWithObservations = (tours) =>
  tours.filter((tour) =>
    isExistObservations(validateToActiveAdvertisement(tour))
  );
