/* import { ImageItem } from "@/store/image-store"; */
import { openDB } from "idb";

const DB_NAME = "collectionsDB";
const STORE_NAME = "collections";
const DB_VERSION = 1;

export const initDB = async () => {
  // INICIAR BASE DE DATOS INDEXADA
  const db = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    },
  });
  return db;
};
