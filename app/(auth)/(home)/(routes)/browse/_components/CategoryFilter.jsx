"use client";

import React, { useState } from "react";

const CategoryFilter = ({ selectedCategory }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const filterOption = [
    {
      id: 1,
      name: "All",
      value: "all",
    },
    {
      id: 2,
      name: "React JS",
      value: "ReactJS",
    },
    {
      id: 3,
      name: "Node JS",
      value: "NodeJS",
    },
    {
      id: 4,
      name: "Next JS",
      value: "NextJS",
    },
    {
      id: 4,
      name: "Tailwind CSS",
      value: "TailwindJS",
    },
  ];

  return (
    <div className="flex gap-5">
      {filterOption.map((item, index) => (
        <button
          key={index}
          className={`border p-2 px-4 text-sm rounded-md
           hover:border-purple-800 font-semibold hover:bg-gray-50 ${
             activeIndex == index
               ? "border-purple-800 bg-purple-50 text-purple-800"
               : null
           }`}
          onClick={() => {
            setActiveIndex(index);
            selectedCategory(item.value);
          }}
        >
          <h2>{item.name}</h2>
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
