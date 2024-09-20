import { useImageStore } from "@/store/image-store";
import { Masonry } from "masonic"
import { useEffect } from "react";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";

interface MasonryCardProps {
  data: {
    id: number;
    name: string;
    src: string;
    artist: string
  }
}

function MasonryCard({ data: { id, name, src, artist } }: MasonryCardProps) {
  
  return (
    <div className="relative group">
      <img src={src} alt={name} className="rounded-xl shadow w-full" />
      <div className="bg-black/0 hover:bg-black/50 absolute w-full h-full top-0 left-0 opacity-0 hover:opacity-100 p-3 flex flex-col justify-between transition-opacity duration-200 ease-in-out pointer-events-none group-hover:pointer-events-auto group-focus-within:pointer-events-auto ">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex justify-center w-28 h-6 mx-auto gap-1 items-center">
            <span className="text-sm">Collection</span>
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
            <DropdownMenuGroup>
              <DropdownMenuItem>Collection 1</DropdownMenuItem>
              <DropdownMenuItem>Collection 2</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex justify-between items-end">
          <p className="text-xs text-[--color-light-tertiary]">@{artist}</p>
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
        </div>
      </div>
    </div>
  );
}  
   
 

const Gallery: React.FC = () => {
  // Fetching images
  const images = useImageStore((state) => state.images);
  const fetchImages = useImageStore((state) => state.fetchImages);

  useEffect(() => {
    // handling the promise fetchImages
    fetchImages().catch(console.error); // Manejar errores de fetchImages
  }, [fetchImages]);

  return (
      <Masonry
        items={images}
        render={MasonryCard}
        columnGutter={16}
        columnWidth={172}
        overscanBy={5}
        maxColumnCount={4}
      ></Masonry>
  );
}






export default Gallery



   {
     /* <Button
          variant="transparent"
          className="flex w-24 h-6 px-0 gap-1 justify-start items-center"
        >
          <span className="text-sm">Collection</span>
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
        </Button> */
   }