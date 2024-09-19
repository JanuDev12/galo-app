import React from "react";

interface LayoutProps {
  title: string;
  icon: React.ReactElement<SVGElement>;
  control?: React.ReactNode;
  subControl?: React.ReactNode;
  children: React.ReactNode;
}

function Layout({ title, icon, control, subControl, children }: LayoutProps) {
  return (
    <>
      <div className="px-2 mt-2 mb-4">
        <div className="mb-2 text-2xl flex items-center justify-between">
          <div className="flex gap-3 items-center">
            {icon}
            <span>{title}</span>
          </div>

          {control}
        </div>
         {subControl}
      </div>
      <div>{children}</div>
    </>
  );
}

export default Layout;
