import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ImageItem, useImageStore } from "@/store/image-store";
import { useEffect, useMemo, useState } from "react";

interface ControlButtonsProps {
  images: ImageItem[];
}

function ControlButtons({images}: ControlButtonsProps) {
  const setImages = useImageStore((state) => state.setImages);

  const [order, setOrder] = useState("date-c");
  const [sortBy, setSortBy] = useState("asc");
  const [media, setMedia] = useState("all-media");
  const [layout, setLayout] = useState("masonry");
  const [size, setSize] = useState("large");

  const sortedImages = useMemo(() => {
    const sorted = [...images];

    // Order by (name, date, dateCreated)
    if (order === "name") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (order === "date-m") {
      sorted.sort((a, b) => (b.lastModified || 0) - (a.lastModified || 0));
    } else if (order === "date-c") {
      sorted.sort((a, b) => (b.createdDate || 0) - (a.createdDate || 0));
    }

    // Order by (Ascending, Descending)
    if (sortBy === "desc") {
      sorted.reverse();
    }

    return sorted;
  }, [sortBy, order, images]);

  // Comparing if sortedImages are different of actualImages
  useEffect(() => {
    const imagesChanged = sortedImages.some(
      (image, index) => image.id !== images[index].id
    );

    if (imagesChanged) {
      setImages(sortedImages);
    }
  }, [sortedImages, images, setImages]);

  return (
    <div className="flex gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex gap-3 px-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.3"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-arrows-sort"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M3 9l4 -4l4 4m-4 -4v14" />
              <path d="M21 15l-4 4l-4 -4m4 4v-14" />
            </svg>
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
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup value={order} onValueChange={setOrder}>
            <DropdownMenuRadioItem value="date-c">
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
                class="icon icon-tabler icons-tabler-outline icon-tabler-calendar-clock"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M10.5 21h-4.5a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v3" />
                <path d="M16 3v4" />
                <path d="M8 3v4" />
                <path d="M4 11h10" />
                <path d="M18 18m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                <path d="M18 16.5v1.5l.5 .5" />
              </svg>
              Date created
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="date-m">
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
                class="icon icon-tabler icons-tabler-outline icon-tabler-calendar-cog"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 21h-6a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v5" />
                <path d="M16 3v4" />
                <path d="M8 3v4" />
                <path d="M4 11h16" />
                <path d="M19.001 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                <path d="M19.001 15.5v1.5" />
                <path d="M19.001 21v1.5" />
                <path d="M22.032 17.25l-1.299 .75" />
                <path d="M17.27 20l-1.3 .75" />
                <path d="M15.97 17.25l1.3 .75" />
                <path d="M20.733 20l1.3 .75" />
              </svg>
              Date modified
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="name">
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
                class="icon icon-tabler icons-tabler-outline icon-tabler-letter-a"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M7 20v-12a4 4 0 0 1 4 -4h2a4 4 0 0 1 4 4v12" />
                <path d="M7 13l10 0" />
              </svg>
              Name
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
            <DropdownMenuRadioItem value="asc">
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
                class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-up"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 5l0 14" />
                <path d="M16 9l-4 -4" />
                <path d="M8 9l4 -4" />
              </svg>
              Ascending
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="desc">
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
                class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-down"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 5l0 14" />
                <path d="M16 15l-4 4" />
                <path d="M8 15l4 4" />
              </svg>
              Descending
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex gap-3 px-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.3"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-filter"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 4h16v2.172a2 2 0 0 1 -.586 1.414l-4.414 4.414v7l-6 2v-8.5l-4.48 -4.928a2 2 0 0 1 -.52 -1.345v-2.227z" />
            </svg>
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
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup value={media} onValueChange={setMedia}>
            <DropdownMenuRadioItem value="all-media">
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
                class="icon icon-tabler icons-tabler-outline icon-tabler-photo-video"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M9 15h-3a3 3 0 0 1 -3 -3v-6a3 3 0 0 1 3 -3h6a3 3 0 0 1 3 3v3" />
                <path d="M9 9m0 3a3 3 0 0 1 3 -3h6a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-6a3 3 0 0 1 -3 -3z" />
                <path d="M3 12l2.296 -2.296a2.41 2.41 0 0 1 3.408 0l.296 .296" />
                <path d="M14 13.5v3l2.5 -1.5z" />
                <path d="M7 6v.01" />
              </svg>
              All media
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="photos">
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
            <DropdownMenuRadioItem value="videos">
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
                class="icon icon-tabler icons-tabler-outline icon-tabler-movie"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
                <path d="M8 4l0 16" />
                <path d="M16 4l0 16" />
                <path d="M4 8l4 0" />
                <path d="M4 16l4 0" />
                <path d="M4 12l16 0" />
                <path d="M16 8l4 0" />
                <path d="M16 16l4 0" />
              </svg>
              Videos
            </DropdownMenuRadioItem>
            {/*    <DropdownMenuRadioItem value="date-m">
                  Gifs
                </DropdownMenuRadioItem> */}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex gap-3 px-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.3"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-layout-2"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v1a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
              <path d="M4 13m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
              <path d="M14 4m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
              <path d="M14 15m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v1a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
            </svg>
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
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup value={layout} onValueChange={setLayout}>
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
          <DropdownMenuSeparator />
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
                class="icon icon-tabler icons-tabler-outline icon-tabler-square"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
              </svg>
              Large
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default ControlButtons