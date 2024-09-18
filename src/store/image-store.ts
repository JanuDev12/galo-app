import { addImageToDB, getImagesFromDB, initDB } from "@/db/db-image";
import {create} from "zustand"

export interface ImageItem {
    id: number,
    name: string,
    src: string,
    createdDate: number,
    lastModified: number,
    artist: string,
    tags: string[]
}

interface ImageStore {
  images: ImageItem[];
  setImages: (newImages: ImageItem[]) => void;
  fetchImages: () => Promise<void>;
  handleImageUploaded: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => Promise<void>;
}

export const useImageStore = create<ImageStore>((set, get) => ({
    images: [],
    setImages: (newImages) => set({ images: newImages}),
    fetchImages: async () => {
        try {
            await initDB(); // Starting index database
            const storedImages: ImageItem[] = await getImagesFromDB();
            console.log(storedImages)

            /* const loadedImages = await loadImages(); In case it need load local images*/

            set({
                images: storedImages.map((image, index) => ({
                    id: index,
                    name: image.name,
                    src: image.src,
                    createdDate: image.createdDate,
                    lastModified: image.lastModified || Date.now(),
                    artist: image.artist,
                    tags: [""]
                })),
            });
        } catch (error) {
            console.error("Error fetching images:", error);
        }
    },
    
    // logic to handle images loaded for the user
    handleImageUploaded: async (event) => {
        const files = event.target.files;
        console.log(files);
        if (files && files.length > 0) {
            // Creating array to store promises for each images 
            const imagesUploaded = Array.from(files).map(async (file, index) => {
                if ( file && file instanceof Blob) {
                    // Reading the promise for each archive
                    return new Promise<{id: number, name: string, src: string, createdDate: number, lastModified: number, artist: string, tags: string[] }>((resolve, reject) => {
                        const reader = new FileReader()
                        reader.onloadend = async () => {
                            try {
                                const imageSrc = reader.result;
                                if (typeof imageSrc === "string") {
                                    // adding image to databe and state
                                    console.log(imageSrc)
                                    const artistName = window.prompt(
                                        "Ingresa el nombre del artista:",
                                        "Unknown"
                                      ) ?? "Unknown Artist";

                                      const date = Date.now()
                                      await addImageToDB(imageSrc, file.name, date, file.lastModified, artistName);

                                      resolve({ id: get().images.length + index, name: file.name, src: imageSrc, createdDate: date, lastModified: file.lastModified, artist: artistName, tags: [""]});
                                     }
                                    } catch (error) {
                                        console.error("Error adding image to database:", error);
                                        reject(
                                          new Error(
                                            "Error adding image to database"
                                          )
                                        );
                                    }
                                };
                                reader.readAsDataURL(file);
                            });
                        }else {
                            return Promise.reject(new Error("Invalid file"))
                        }
                    });

                    // waiting for all promises for update the state
                    try {
                        const newImages = await Promise.all(imagesUploaded);
                        set((prevImages) => ({ images: [... prevImages.images, ...newImages] }));
                    } catch (error) {
                        console.error("Error processing images:" , error)
                    }
                }
        },
}));