import { ImageItem } from "@/store/image-store";
import { openDB } from "idb";

const DB_NAME = "imageDB"
const STORE_NAME = "images"
const DB_VERSION = 1;

export const initDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    },
  });
};

export const getImagesFromDB = async () => {
  const db = await openDB(DB_NAME, DB_VERSION);
  return (await db.getAll(STORE_NAME)) as ImageItem[];
};

export const updateImageInDB = async (image: ImageItem) => {
    const db = await openDB(DB_NAME, DB_VERSION);
    return db.put(STORE_NAME, image); 
};

export const deleteImageFromDB = async (imageId: number) => {
  const db = await openDB(DB_NAME, DB_VERSION);
  console.log("img eliminated trust me" , imageId)
  return await db.delete(STORE_NAME, imageId);
};