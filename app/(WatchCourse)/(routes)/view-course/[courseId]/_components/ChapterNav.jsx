"use client";
import React, { useEffect, useState, useContext } from "react";
import { CheckCircle2, PauseCircle, PlayCircle } from "lucide-react";
import { CompletedChapterContext } from "../../../../../_context/CompletedChapterContext";
const ChapterNav = ({ course, userCourse, setActiveChapter }) => {
  const [activeIndex, setActiveIndex] = useState([0]);
  //console.log(course);
  const { completedChapter, setCompletedChapter } = useContext(
    CompletedChapterContext
  );
  useEffect(() => {
    setActiveChapter(course?.chapter[0]);
  }, []);

  const isChapterCompleted = (chapterId) => {
    return completedChapter.find((item) => item.chapterId == chapterId);
  };

  return (
    <div className=" ">
      <div className="p-4 text-xl border-b">{course.name}</div>
      <div>
        {course?.chapter?.map((chapter, index) => (
          <div
            onClick={() => {
              setActiveIndex(index);
              setActiveChapter(chapter);
            }}
            key={index}
            className={` flex gap-1 p-5 border-b cursor-pointer hover:bg-gray-100 
            ${
              isChapterCompleted(chapter.chapterNumber) && activeIndex != index
                ? "bg-purple-100 text-purple-600"
                : null
            }
            ${activeIndex == index ? "bg-purple-100 text-green-600 " : null}`}
          >
            {activeIndex == index ? (
              <PauseCircle height={25} width={25} />
            ) : isChapterCompleted(chapter.chapterNumber) ? (
              <CheckCircle2 height={25} width={25} />
            ) : (
              <PlayCircle height={25} width={25} />
            )}
            {chapter.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChapterNav;
