import { ImageItem } from "@/store/image-store";
import { openDB } from "idb";

const DB_NAME = "imageDB"
const STORE_NAME = "images"
const DB_VERSION = 1;

export const initDB = async () => { // INICIAR BASE DE DATOS INDEXADA
    const db = await openDB(DB_NAME, DB_VERSION, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(STORE_NAME)){
                db.createObjectStore(STORE_NAME, {
                    keyPath: "id",
                    autoIncrement: true,
                });
            }
        },
    });
    return db
};

export const getImagesFromDB = async () => {
    const db = await openDB(DB_NAME, DB_VERSION);
    const images = await db.getAll(STORE_NAME) as ImageItem[];
    return images.map((image) => ({
        id: image.id,
        src: image.src,
        name: image.name || `image_${image.id}`, // If got not name, assign one based in ID
        createdDate: image.createdDate,
        lastModified: image.lastModified,
        artist: image.artist,
        tags: image.tags || []
    }))
}

/* export const getImagesFromDB = async () => {
  const db = await openDB(DB_NAME, DB_VERSION);
  return db.getAll(STORE_NAME) as ImageItem[];
}; */

export const addImageToDB = async (
  imageSrc: string,
  name: string,
  createdDate: number,
  lastModified: number,
  artist: string,
  tags: string[] = []
) => {
  const db = await openDB(DB_NAME, DB_VERSION);
  return db.add(STORE_NAME, {
    id: Date.now(),
    name,
    src: imageSrc,
    createdDate,
    lastModified,
    artist,
    tags,
  });
};

// Actualizar una imagen en la base de datos
export const updateImageInDB = async (image: ImageItem) => {
    const db = await openDB(DB_NAME, DB_VERSION);
    return db.put(STORE_NAME, image); // Utiliza put para actualizar o añadir si no existe
};

export const deleteImageFromDB = async (imageId: number) => {
  const db = await openDB(DB_NAME, DB_VERSION);
  console.log("se esta eliminando confia en mi" , imageId)
  return db.delete(STORE_NAME, imageId);
};