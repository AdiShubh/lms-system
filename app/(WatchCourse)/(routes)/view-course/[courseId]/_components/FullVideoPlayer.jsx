"use client";
import React, { useContext } from "react";
import { CheckCircle2 } from "lucide-react";
import { CompletedChapterContext } from "../../../../../_context/CompletedChapterContext";
import { markChapterCompleted } from "../../../../../_services/index";

const FullVideoPlayer = ({ userCourse, activeChapter }) => {
  const { completedChapter, setCompletedChapter } = useContext(
    CompletedChapterContext
  );

  console.log(userCourse);

  const isChapterCompleted = (chapterId) => {
    return completedChapter.find((item) => item.chapterId == chapterId);
  };

  const markAsChapterCompleted = async () => {
    if (!completedChapter.length) {
      setCompletedChapter([]);
    }
    completedChapter
      ? setCompletedChapter([
          ...completedChapter,
          {
            chapterId: activeChapter?.chapterNumber + "",
          },
        ])
      : setCompletedChapter([
          {
            chapterId: activeChapter?.chapterNumber + "",
          },
        ]);
    await markChapterCompleted(
      userCourse.id,
      activeChapter?.chapterNumber
    ).then((resp) => console.log(resp));
  };

  console.log(completedChapter);
  return (
    <div>
      <video
        key={activeChapter?.video?.url}
        width={1000}
        height={250}
        controls
        controlsList="nodownload"
      >
        <source src={activeChapter?.video?.url} type="video/mp4" />
      </video>
      <div className="p-5 border rounded-lg mt-5 flex justify-between items-center">
        <h2 className="text-[20px] font-md">{activeChapter?.name}</h2>
        {!isChapterCompleted(activeChapter?.chapterNumber) ? (
          <button
            className="bg-purple-500
         text-white p-2 px-5 rounded-lg flex gap-2 hover:bg-purple-600"
            onClick={() => markAsChapterCompleted()}
          >
            <CheckCircle2 />
            <h2>Mark as Complete</h2>
          </button>
        ) : (
          <button
            className="border border-purple-800
         text-purple-600 p-2 px-5 rounded-lg flex gap-2 hover:bg-purple-100"
          >
            <CheckCircle2 />
            <h2>Mark as Incomplete</h2>
          </button>
        )}
      </div>
    </div>
  );
};

export default FullVideoPlayer;
