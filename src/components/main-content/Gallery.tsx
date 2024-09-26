import { ImageItem, useImageStore } from "@/store/image-store";
import { Masonry } from "masonic"
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel,  DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useCollectionStore } from "@/store/collections-store";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";



import TAGS from "./TAGS";

import { WithContext as ReactTags, SEPARATORS } from "react-tag-input";
import TagsInput from "./TagsInput";



interface MasonryCardProps {
  data: {
    id: number;
    name: string;
    src: string;
    lastModified: number,
    artist: string,
    tags: string[]
  }
}




function MasonryCard({ data: { id, name, src, lastModified, artist, tags } }: MasonryCardProps) {
  const collections = useCollectionStore((state) => state.collections);
  const addImagetoCollection = useCollectionStore(
    (state) => state.addImageToCollection
  );
  const removeImageFromCollection = useCollectionStore(
    (state) => state.removeImageFromCollection
  );

  const addTagToImage = useImageStore((state) => state.addTagToImage);
  const deleteImage = useImageStore((state) => state.deleteImage)

  const [selectedCollections, setSelectedCollections] = useState<number[]>([]);

  


  // STATE TAGS
   const [tag, setTag] = useState([
     { id: "India", text: "India", className: "" },
     { id: "Vietnam", text: "Vietnam", className: "" },
     { id: "Turkey", text: "Turkey", className: "" },
   ]);

   const suggestions = TAGS.map((tag) => {
     return {
       id: tag,
       text: tag,
       className: "",
     };
   });

    const handleDelete = (index: number) => {
      setTag(tag.filter((_, i) => i !== index));
    };
    const onTagUpdate = (index: number, newTag) => {
      const updatedTags = [...tags];
      updatedTags.splice(index, 1, newTag);
      setTag(updatedTags);
    };

    const handleAddition = (tag) => {
      setTag((prevTags) => {
        return [...prevTags, tag];
      });
    };

    const handleDrag = (tag, currPos: number, newPos: number) => {
      const newTags = tags.slice();

      newTags.splice(currPos, 1);
      newTags.splice(newPos, 0, tag);

      // re-render
      setTag(newTags);
    };

    const handleTagClick = (index: number) => {
      console.log("The tag at index " + index + " was clicked");
    };

    const onClearAll = () => {
      setTag([]);
    };



  //COLLECTIONS

  function handleDeleteImage(imageId: number) {
    deleteImage(imageId)
  }

  function handleToggleImageCollection(
    imageId: number,
    imageName: string,
    imageUrl: string,
    imageDate: number,
    tags: string[],
    collectionId: number,
    artist: string,
    isAdded: boolean
  ) {
    if (isAdded) {
      removeImageFromCollection(collectionId, imageId);
    } else {
      addImagetoCollection(
        collectionId,
        imageId,
        imageName,
        imageUrl,
        imageDate,
        artist,
        tags
      );
    }
  }

  // Triggers when a collection is selected o deselected
  function handleSelectCollection(collectionId: number) {
    const isAdded = selectedCollections.includes(collectionId);
    const updatedCollections = isAdded
      ? selectedCollections.filter((colId) => colId !== collectionId)
      : [...selectedCollections, collectionId];

    setSelectedCollections(updatedCollections);
    handleToggleImageCollection(id, name, src, lastModified , tags, collectionId, artist, isAdded);
  }

  // Updating selected Collections when the component is mounted
  useEffect(() => {
    const imageCollections = collections
      .filter((collection) => collection.imagesCollected.some((image) => image.id === id))
      .map((collection) => collection.id);
    setSelectedCollections(imageCollections);
  }, [collections, id]);



  // SYSTEMS TAGGING

  

  return (
    <div className="relative group">
      <img src={src} alt={name} className="rounded-xl shadow w-full" />
      <div className="bg-black/0 hover:bg-black/50 absolute w-full h-full top-0 left-0 opacity-0 hover:opacity-100 p-3 flex flex-col justify-between transition-opacity duration-200 ease-in-out pointer-events-none group-hover:pointer-events-auto group-focus-within:pointer-events-auto ">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex justify-center w-28 h-6 mx-auto gap-1 items-center">
            {selectedCollections.length > 0 ? (
              <span className="text-sm">
                {selectedCollections
                  .map((collectionId) => {
                    const collection = collections.find(
                      (col) => col.id === collectionId
                    );
                    return collection?.name ?? ""; // Muestra el nombre de la colección si está
                  })
                  .slice(-1)
                  .join(", ")}
              </span>
            ) : (
              <span className="text-sm"></span> // Texto por defecto si no pertenece a ninguna colección
            )}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="icon icon-tabler icons-tabler-outline icon-tabler-chevron-down"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M6 9l6 6l6 -6" />
            </svg>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-40 rounded-2xl px-3 border-transparent bg-white/10 backdrop-blur z-auto">
            <DropdownMenuLabel>Save</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="flex flex-col gap-2">
              {collections.map((collection) => {
                const isAdded = selectedCollections.includes(collection.id);
                return (
                  <label key={collection.id}>
                    {/*  Añadimos la imagen al cambiar de selección */}
                    <input
                      type="checkbox"
                      value={collection.id}
                      onChange={() => handleSelectCollection(collection.id)}
                      checked={isAdded}
                      className="input"
                    />
                    <span className="custom-checkbox"></span>
                    {collection.name} {/* {isAdded && "(Added)"} */}
                  </label>
                );
              })}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* EDIT IMAGE */}

        <div className="flex justify-between items-end">
          <p className="text-xs text-[--color-light-tertiary]">@{artist}</p>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="bg-transparent border-[--color-light-tertiary] size-8 p-1 rounded-3xl"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="icon icon-tabler icons-tabler-outline icon-tabler-pencil"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
                  <path d="M13.5 6.5l4 4" />
                </svg>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Edit Image</DialogTitle>
              </DialogHeader>
              <div className="flex gap-7">
                <div className="flex flex-col w-[50%] gap-3">
                  <div className="flex flex-col gap-2 justify-between">
                    <span className="text-sm">Name</span>
                    <Input />
                  </div>

                  <div className="flex flex-col gap-2 justify-between">
                    <span className="text-sm">Tags</span>
                    {/* <ReactTags
                      tags={tag}
                      suggestions={suggestions}
                      handleDelete={handleDelete}
                      handleAddition={handleAddition}
                      handleTagClick={handleTagClick}
                      onTagUpdate={onTagUpdate}
                      delimiters={[188, 13]}
                      editable
                    /> */}
                    <TagsInput imageId={id} />
                  </div>

                  <div className="flex flex-col gap-2 justify-between">
                    <span className="text-sm">Artist</span>
                    <Select>
                      <SelectTrigger className="min-w-[180px]">
                        <SelectValue placeholder="Theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex-1">
                  <img src={src} alt="as" className="rounded-xl" />
                </div>
              </div>

              <DialogFooter className="justify-between mt-6">
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteImage(id)}
                >
                  Delete
                </Button>
                <Button variant="white"> Save Changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}  
   
 interface GalleryProps {
   images: ImageItem[]; 
 }

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  
  
  // Fetching images
  
  const fetchImages = useImageStore((state) => state.fetchImages);

  // handling the promise fetchImages
  useEffect(() => {
    fetchImages().catch(console.error); 
  }, []);

  
  return (
    <Masonry
      items={images}
      render={MasonryCard}
      columnGutter={16}
      columnWidth={172}
      overscanBy={20}
      maxColumnCount={4}
    ></Masonry>
  );
}



export default Gallery
