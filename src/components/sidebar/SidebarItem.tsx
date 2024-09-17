import { NavLink } from "react-router-dom";

interface SidebarItemProps {
  icon: React.ReactElement<SVGElement>;
  link: string;
  text: string;
}


function SidebarItem({ icon, link, text }: SidebarItemProps) {
  return (
    <NavLink to={link}>
      <li className="flex py-2 pr-3 pl-2 gap-3 cursor-pointer items-center hover:bg-[--color-light] hover:text-[--color-primary] rounded-lg transition-all duration-300 text-base">
        {icon}
        {text}
      </li>
    </NavLink>
  );
}

export default SidebarItem