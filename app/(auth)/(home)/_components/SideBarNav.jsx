"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Layout, Mail, Search, Shield } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideBarNav = () => {
  const pathName = usePathname();
  const menuList = [
    {
      id: 1,
      name: "Browse",
      icon: Search,
      path: "/browse",
    },
    {
      id: 2,
      name: "Dashboard",
      icon: Layout,
      path: "/dashboard",
    },
    {
      id: 3,
      name: "Upgrade",
      icon: Shield,
      path: "/Upgrad",
    },
    {
      id: 4,
      name: "Newsletter",
      icon: Mail,
      path: "/newsletter",
    },
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="h-full flex flex-col border shadow-md overflow-y-auto">
      <div className="p-5 border-b z-50">
        <Image src="/logo.png" alt="logo" width={170} height={100} />
      </div>
      <div className="flex flex-col">
        {menuList.map((item, index) => (
          <Link
            href={item.path}
            key={index}
            className={`flex gap-2 m-3 items-center border border-purple-500 rounded-lg
          p-3 px-4 text-gray-700
          hover:bg-gray-100 cursor-pointer
          ${pathName == item.path ? "bg-purple-300 text-purple-800" : null}`}
            onClick={() => {
              setActiveIndex(index);
              toggleSideBar(false);
            }}
          >
            <item.icon />
            <h2>{item.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideBarNav;
