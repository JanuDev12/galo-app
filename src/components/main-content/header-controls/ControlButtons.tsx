import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useCollectionStore } from "@/store/collections-store";
import {  useImageStore } from "@/store/image-store";
import { ImageItem } from "@/type";
import { IconArrowNarrowDown, IconArrowNarrowUp, IconArrowsSort, IconCalendarClock, IconCalendarCog, IconChevronDown, IconFilter, IconLayout2, IconLetterA, IconLetterASmall, IconMovie, IconPhotoVideo, IconSquare } from "@tabler/icons-react";
import { useEffect, useMemo, useState } from "react";

interface ControlButtonsProps {
  images: ImageItem[];
  collectionId?: number,
  isCollectionPage?:boolean,
}

function ControlButtons({images, collectionId, isCollectionPage, }: ControlButtonsProps) {
  const setImages = useImageStore((state) => state.setImages);
  const setFilteredImages = useImageStore((state) => state.setFilteredImages);
  const setImagesCollections = useCollectionStore((state) => state.setImagesCollections)
  const setFilteredImagesCollections = useCollectionStore((state) => state.setFilteredImagesCollections)
  
  const setMaxColumnCount = useImageStore((state) => state.setSize);

  const originalImages = useImageStore((state) => state.images)
  const collections = useCollectionStore((state) => state.collections)

  const [order, setOrder] = useState("date-c");
  const [sortBy, setSortBy] = useState("asc");
  const [media, setMedia] = useState("all-media");
  const [layout, setLayout] = useState("masonry");
  const [size, setSize] = useState("medium");

  useEffect(() => {
    setMaxColumnCount(size)
  }, [size])


const sortedImages = useMemo(() => {
   let filtered

  // If in Collection Page, use the images in collection
  if (isCollectionPage && collectionId) {
       /* const actualCollection = collections.find(
         (col) => col.id === collectionId
       );
      
        filtered = actualCollection?.imagesCollected
 */
        filtered = [...images]
      
  }else{
     filtered = [...originalImages];
  }

  // Filter for image or gif
   if (!isCollectionPage) {
     switch (media) {
       case "image":
         filtered = filtered.filter((image) => image.type === "image");
         break;
       case "gif":
         filtered = filtered.filter((image) => image.type === "gif");
         break;
       case "all-media":
       default:
         break;
     }
   }

  // Order by name, date or lastModified 
  filtered.sort((a, b) => {
    switch (order) {
      case "name":
        return a.name.localeCompare(b.name);
      case "date-m":
        return b.lastModified - a.lastModified;
      case "date-c":
      default:
        return b.createdDate - a.createdDate;
    }
  });

  // If desc, reverse
  if (sortBy === "desc") {
    filtered.reverse(); 
  }

  return filtered;
}, [
  sortBy,
  order,
  media,
  originalImages,
  isCollectionPage,
  collectionId,
  images
]);



   // Comparing if sortedImages are different of actualImages
  useEffect(() => {
   
    const imagesChanged = sortedImages.some((image, index) => {
      const originalImage = images[index];

      //  Verify if both images exist
      if (!image || !originalImage) {
        return false; 
      }

      return image.id !== originalImage.id;
    });

    // If has changed, sort images
    if (imagesChanged) {
      setFilteredImages(sortedImages);
    }

    // if is collectionPage, sorted for the collection.
    if (isCollectionPage && imagesChanged) {
       if (collectionId !== undefined) {
      /*   setFilteredImagesCollections(sortedImages) */
         setImagesCollections(collectionId, sortedImages).catch(console.error);
       } else {
         console.error("Collection ID is undefined.");
       }
    }

  }, [sortedImages, images, setImages, isCollectionPage, setImagesCollections, collectionId, setFilteredImages,setFilteredImagesCollections]);


  


  return (
    <div className="flex gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex gap-3 px-2">
            <IconArrowsSort size={22} stroke={1.3} />
            <IconChevronDown size={15} stroke={1} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup value={order} onValueChange={setOrder}>
            <DropdownMenuRadioItem value="date-c">
              <IconCalendarClock size={20} stroke={1.6} />
              Date created
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="date-m">
              <IconCalendarCog size={20} stroke={1.6} />
              Date modified
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="name">
              <IconLetterA size={18} stroke={1.5} />
              Name
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
            <DropdownMenuRadioItem value="asc">
              <IconArrowNarrowUp size={20} stroke={1.6} />
              Ascending
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="desc">
              <IconArrowNarrowDown size={20} stroke={1.6} />
              Descending
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex gap-3 px-2">
            <IconFilter size={22} stroke={1.3} />
            <IconChevronDown size={15} stroke={1} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup value={media} onValueChange={setMedia}>
            <DropdownMenuRadioItem value="all-media">
              <IconPhotoVideo size={20} stroke={1.6} />
              All media
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="image">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.6"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="icon icon-tabler icons-tabler-outline icon-tabler-photo"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M15 8h.01" />
                <path d="M3 6a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-12z" />
                <path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l5 5" />
                <path d="M14 14l1 -1c.928 -.893 2.072 -.893 3 0l3 3" />
              </svg>
              Photos
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="gif">
              <IconMovie size={20} stroke={1.6} />
              Gifs
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex gap-3 px-2">
            <IconLayout2 size={22} stroke={1.3} />
            <IconChevronDown size={15} stroke={1} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {/* <DropdownMenuRadioGroup value={layout} onValueChange={setLayout}>
            <DropdownMenuRadioItem value="masonry">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.6"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="icon icon-tabler icons-tabler-outline icon-tabler-layout-dashboard"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 4h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1" />
                <path d="M5 16h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1" />
                <path d="M15 12h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1" />
                <path d="M15 4h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1" />
              </svg>
              Masonry
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="river">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.6"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="icon icon-tabler icons-tabler-outline icon-tabler-layout-grid"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
                <path d="M14 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
                <path d="M4 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
                <path d="M14 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
              </svg>
              River
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
          <DropdownMenuSeparator /> */}
          <DropdownMenuRadioGroup value={size} onValueChange={setSize}>
            <DropdownMenuRadioItem value="small">
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
                class="lucide lucide-grid-3x3"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M3 9h18" />
                <path d="M3 15h18" />
                <path d="M9 3v18" />
                <path d="M15 3v18" />
              </svg>
              Small
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="medium">
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
                class="lucide lucide-grid-2x2"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M3 12h18" />
                <path d="M12 3v18" />
              </svg>
              Medium
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="large">
              <IconSquare size={18} stroke={1.5} />
              Large
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default ControlButtons