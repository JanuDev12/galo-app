import { getImagesFromDB, updateImageInDB, deleteImageFromDB , initDB } from "@/db/db-image";
import { ImageItem } from "@/type";
import { determineFileType } from "@/utils/fileUtils";
import {create} from "zustand"


interface ImageStore {
  images: ImageItem[];
  filteredImages: ImageItem[];
  size: string;
  setSize: (count: string) => void;
  setImages: (newImages: ImageItem[]) => void;
  setFilteredImages: (newImages: ImageItem[]) => void;
  fetchImages: () => Promise<void>;
  handleImageUploaded: (
    event: React.ChangeEvent<HTMLInputElement>,
    artistFromEvent: string
  ) => Promise<void>;
  updateImageAttributes: (
    imageId: number,
    payload: Partial<ImageItem>
  ) => Promise<void>;
  deleteImage: (imageId: number) => Promise<void>;
}

export const useImageStore = create<ImageStore>((set, get) => ({
  images: [],
  filteredImages: [],
  size: "small" || "medium || large",
  setImages: (newImages) => set({ images: newImages }),

  setFilteredImages: (newImages) => {
    set({ filteredImages: newImages });
  },

  setSize: (count) => set({ size: count }),

  fetchImages: async () => {
    try {
      await initDB(); // Starting index database
      const storedImages: ImageItem[] = await getImagesFromDB();

      /* const loadedImages = await loadImages(); In case it need load local images*/

      set({ images: storedImages, filteredImages: storedImages });
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  },

  // logic to handle images loaded for the user
  handleImageUploaded: async (event, artistFromEvent: string) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      // Creating array to store promises for each images
      const imagesUploaded = Array.from(files).map(async (file, index) => {
     console.log("artista de evento" , artistFromEvent)
        if (file && file instanceof Blob) {
          // Reading the promise for each archive
          return new Promise<ImageItem>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = async () => {
              try {
                const imageSrc = reader.result;
                if (typeof imageSrc === "string") {
                  // adding image to databe and state
                  const fileType = determineFileType(file);

                  const imageItem = {
                    id: get().images.length + index,
                    name: file.name,
                    src: imageSrc,
                    createdDate: Date.now(),
                    lastModified: file.lastModified,
                    artist: artistFromEvent,
                    tags: [],
                    type: fileType,
                  };

                  await updateImageInDB(imageItem);
                  resolve(imageItem);
                }
              } catch (error) {
                console.error("Error adding image to database:", error);
                reject(new Error("Error adding image to database"));
              }
            };
            reader.readAsDataURL(file);
          });
        } else {
          return Promise.reject(new Error("Invalid file"));
        }
      });

      // waiting for all promises for update the state
      try {
        const newImages = await Promise.all(imagesUploaded);
        set((prevImages) => ({ images: [...prevImages.images, ...newImages] }));
      } catch (error) {
        console.error("Error processing images:", error);
      }
    }
  },

  updateImageAttributes: async (imageId, payload) => {
    try {
      const { images } = get();
      const updatedImages = images.map((img) => {
        if (img.id === imageId) {
          // update the atributes
          const updatedImage: ImageItem = { ...img, ...payload };

          // update the img in the database
          updateImageInDB(updatedImage).catch(console.error);
          return updatedImage;
        }
        return img; // If not match return the img without changes
      });
      // update the store global
      set({ images: updatedImages });
    } catch (error) {
      console.error("Error adding tag to image:", error);
    }
  },

   deleteImage: async (imageId) => {
    try {
      await deleteImageFromDB(imageId);

      set((state) => ({
        images: state.images.filter((image) => image.id !== imageId),
      }));
    } catch (error) {
      console.error("Error al eliminar la imagen de la base de datos:", error);
    }
  }, 


}));