import React from "react";

interface LayoutProps {
  title: string;
  icon: React.ReactElement<SVGElement>;
  pageHeader?: React.ReactNode;
  info?: React.ReactNode;
  children: React.ReactNode;
}

function Layout({ title, icon, pageHeader, info, children }: LayoutProps) {
  return (
    <>
      <div className="px-2 mt-2 mb-4">
        <div className="mb-2 text-2xl flex items-center justify-between">
          <div className="flex gap-3 items-center">
            {icon}
            <span>{title}</span>
          </div>

          {pageHeader}
        </div>
         {info}
      </div>
      <div>{children}</div>
    </>
  );
}

export default Layout;
