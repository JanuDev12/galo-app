import { useImageStore } from "@/store/image-store";
import { Button } from "../ui/button";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";

const sidebarItems = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="icon icon-tabler icons-tabler-outline icon-tabler-library-photo"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M7 3m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" />
        <path d="M4.012 7.26a2.005 2.005 0 0 0 -1.012 1.737v10c0 1.1 .9 2 2 2h10c.75 0 1.158 -.385 1.5 -1" />
        <path d="M17 7h.01" />
        <path d="M7 13l3.644 -3.644a1.21 1.21 0 0 1 1.712 0l3.644 3.644" />
        <path d="M15 12l1.644 -1.644a1.21 1.21 0 0 1 1.712 0l2.644 2.644" />
      </svg>
    ),
    link: "/",
    text: "All Photos",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="icon icon-tabler icons-tabler-outline icon-tabler-folders"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M9 4h3l2 2h5a2 2 0 0 1 2 2v7a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" />
        <path d="M17 17v2a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2h2" />
      </svg>
    ),
    link: "/collections",
    text: "Collections",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="icon icon-tabler icons-tabler-outline icon-tabler-user-heart"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
        <path d="M6 21v-2a4 4 0 0 1 4 -4h.5" />
        <path d="M18 22l3.35 -3.284a2.143 2.143 0 0 0 .005 -3.071a2.242 2.242 0 0 0 -3.129 -.006l-.224 .22l-.223 -.22a2.242 2.242 0 0 0 -3.128 -.006a2.143 2.143 0 0 0 -.006 3.071l3.355 3.296z" />
      </svg>
    ),
    link: "/artist",
    text: "Artists",
  },
];

function Sidebar() {

   const images = useImageStore((state) => state.images);


   

const tagColors: Record<string, string> = {
  Furry: "text-amber-500",
  Nature: "text-lime-500",
  NSFW: "text-red-500",
  FOX: "text-orange-500",
  Ocean: "text-indigo-400",
  Sky: "text-sky-400",
};


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


          <div className="mt-3 rounded bg-[--color-gray] w-full h-[1px]"></div>

          {/* TAGS PART */}
          <div className="mt-2 px-2 flex flex-col">
            <div className="flex items-center justify-between">
              <span className="font-medium text-sm">TAGS</span>

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
             
            </div>
          </div>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar