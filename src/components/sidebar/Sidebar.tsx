import { useImageStore } from "@/store/image-store";
import { Button } from "../ui/button";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import { useSearchContext } from "@/context/SearchContext";
import { IconLibraryPhoto, IconFolders, IconUserHeart, IconPlus, IconMenu } from "@tabler/icons-react";
import { useState } from "react";

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
   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  return (
    <>
      <Button
        variant="transparent"
        className="lg:hidden px-1 h-7 w-7 fixed top-4 left-24 z-30"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <IconMenu size={20} stroke={2} />
      </Button>
      <aside
        className="bg-[--color-secondary] h-16 w fixed sm:w-44 md:w-48 lg:h-full z-20 transition-transform "
      >
        <Logo />
        <nav
          className={`px-3 py-4 transition-transform lg:block ${
            isSidebarOpen
              ? "translate-x-0 bg-[--color-secondary] h-[800px] w-[320px] "
              : "-translate-x-full lg:translate-x-0 "
          }`}
        >
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
                  <IconPlus size={14} stroke={2} />
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
    </>
  );
}

export default Sidebar