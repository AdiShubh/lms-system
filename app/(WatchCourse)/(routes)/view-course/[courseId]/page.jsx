"use client";
import React, { useEffect, useState } from "react";
import ChapterNav from "./_components/ChapterNav";
import FullVideoPlayer from "./_components/FullVideoPlayer";
import { UserButton, useUser } from "@clerk/nextjs";
import { getCourseById } from "./../../../../_services/index";
import { CompletedChapterContext } from "../../../../_context/CompletedChapterContext";

const ViewCourse = ({ params }) => {
  const { user } = useUser();
  const [course, setCourse] = useState([]);
  const [userCourse, setUserCourse] = useState();
  const [activeChapter, setActiveChapter] = useState();
  const [completedChapter, setCompletedChapter] = useState();

  useEffect(() => {
    user
      ? getCourse(params?.courseId, user.primaryEmailAddress.emailAddress)
      : null;
  }, [user]);

  const getCourse = async () => {
    await getCourseById(
      params?.courseId,
      user.primaryEmailAddress.emailAddress
    ).then((resp) => {
      console.log(resp?.userEnrollCourses[0]?.completedChapter);
      setCourse(resp.courseList);
      setUserCourse(resp?.userEnrollCourses[0]);
      setCompletedChapter(resp?.userEnrollCourses[0]?.completedChapter);
    });
  };

  return (
    course.name && (
      <div className="flex">
        <CompletedChapterContext.Provider
          value={{ completedChapter, setCompletedChapter }}
        >
          <div className="w-64 z-50 shadow-md h-screen">
            <ChapterNav
              course={course}
              userCourse={userCourse}
              setActiveChapter={(chapter) => setActiveChapter(chapter)}
            />
          </div>
          <div className="mx-auto">
            <div className="float-right p-5">
              <UserButton />
            </div>
            <FullVideoPlayer
              activeChapter={activeChapter}
              userCourse={userCourse}
            />
          </div>
        </CompletedChapterContext.Provider>
      </div>
    )
  );
};

export default ViewCourse;
