import { useImageStore } from "@/store/image-store";
import { Button } from "../ui/button";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import { useSearchContext } from "@/context/SearchContext";
import { IconLibraryPhoto, IconFolders, IconUserHeart } from "@tabler/icons-react";

const sidebarItems = [
  {
    icon: <IconLibraryPhoto size={24} stroke={2} />,
    link: "/",
    text: "All Photos",
  },
  {
    icon: <IconFolders size={24} stroke={2} />,
    link: "/collections",
    text: "Collections",
  },
  {
    icon: <IconUserHeart size={24} stroke={2} />,
    link: "/artist",
    text: "Artists",
  },
];

function Sidebar() {

   const images = useImageStore((state) => state.images);
   const {tags, setTags } = useSearchContext();

   const tagCounts = images.reduce((acc, image) => {
     image.tags.forEach((tag) => {
       acc[tag] = (acc[tag] || 0) + 1;
     });
     return acc;
   }, {} as Record<string, number>);

   const handleTagClick = (tag: string) => {

    if (tags.includes(tag)) {
      setTags(tags.filter((t) => t !== tag))
    } else {
      setTags( [...tags, tag])
    }

    
   }

/* const tagColors: Record<string, string> = {
  Furry: "text-amber-500",
  Nature: "text-lime-500",
  NSFW: "text-red-500",
  FOX: "text-orange-500",
  Ocean: "text-indigo-400",
  Sky: "text-sky-400",
};
 */

  return (
    <aside className="sidebar bg-[--color-secondary] w-48 h-full">
      <Logo />
      <nav className="px-3 py-4">
        <ul className="flex flex-col gap-1">
          {sidebarItems.map((item, index) => (
            <SidebarItem
              key={index}
              icon={item.icon}
              link={item.link}
              text={item.text}
            />
          ))}


            {/* DIVIDER */}
          <div className="mt-3 rounded bg-[--color-gray] w-full h-[1px]"></div>

          {/* TAGS PART */}
          <div className="mt-2 px-2 flex flex-col">
            <div className="flex items-center justify-between">
              <span className="font-medium text-sm">TAGS</span>

            {/*   ADD TAGS BUTTON // NOT WORKING YET*/}

              <Button variant="outline" className="py-1 h-6 px-2 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="icon icon-tabler icons-tabler-outline icon-tabler-plus"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 5l0 14" />
                  <path d="M5 12l14 0" />
                </svg>
              </Button>
            </div>

            <div className=" mt-4 flex flex-col gap-2 font-medium">
              {Object.entries(tagCounts).map(([tag, count]) => (
                <div
                  key={tag}
                  className="flex justify-between items-center text-sm border border-[--color-gray] rounded-[10px] p-2 text--400  w-full cursor-pointer"
                  onClick={() => handleTagClick(tag)}
                >

                  <div>
                    <span className={"text-gray-500"}>#</span>
                    <span> {tag}</span>
                  </div>

                  <div className="text-xs">{count}</div>
                
                </div>
              ))}
            </div>
          </div>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar