import React from "react";
import Image from "next/image";
import { Book, YoutubeIcon } from "lucide-react";
import Link from "next/link";

const CourseList = ({ courses }) => {
  return (
    <div
      className="mt-5 grid grid-cols-1
    sm:grid-cols-2
    md:grid-cols-3
    lg:grid-cols-4
    gap-5"
    >
      {courses.map((course, index) => (
        <Link key={index} href={"/course-preview/" + course.id}>
          <div
            key={index}
            className="rounded-lg p-3  cursor-pointer hover:border-purple-300  border-2"
          >
            <Image
              src={course.banner.url}
              alt="course"
              width={1000}
              height={500}
              className="rounded-lg  border-purple-600 border-2 "
            />
            <div className="p-2 ">
              <h2>{course.name}</h2>
            </div>
            {course.totalChapters ? (
              <div className="flex items-center gap-2 mt-2">
                <Book
                  className="h-6 w-6 text-purple-600
                    rounded-full bg-purple-100 p-1"
                />
                <h2 className="text-[12px] text-gray-400 p-1">
                  {course?.totalChapters} Chapters
                </h2>
              </div>
            ) : null}
            {course.youtubeUrl ? (
              <div className="flex items-center gap-2 mt-2">
                <YoutubeIcon
                  className="h-6 w-6 text-red-600
                    rounded-full bg-red-100 p-1"
                />
                <h2 className="text-[12px] text-gray-400">Watch on Youtube</h2>
              </div>
            ) : null}
            <h2 className=" text-[14px] mr-2 mt-2">
              {course.free ? "Free" : "Paid"}
            </h2>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CourseList;
