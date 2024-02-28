"use client";
import React, { useEffect, useState } from "react";
import { getCourseById } from "../../../../../_services/index";
import VideoPlayer from "./_componenets/VideoPlayer";
import CourseDetails from "./_componenets/CourseDetails";
import EnrollmentSection from "./_componenets/EnrollmentSection";
import OptionSection from "./_componenets/OptionSection";
import { useUser } from "@clerk/nextjs";

const CoursePreview = ({ params }) => {
  const { user } = useUser();
  const [courseDetails, setCourseDetails] = useState([]);
  const [userCourse, setUserCourse] = useState([]);

  useEffect(() => {
    params.courseID
      ? getCourse(params.courseID, user?.primaryEmailAddress?.emailAddress)
      : null;
  }, [user]);

  const getCourse = () => {
    getCourseById(
      params.courseID,
      user?.primaryEmailAddress?.emailAddress
    ).then((resp) => {
      console.log(resp);
      setCourseDetails(resp.courseList);
      setUserCourse(resp?.userEnrollCourses[0]);
    });
  };

  return (
    courseDetails?.name && (
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="grid col-span-2">
            {courseDetails.chapter[0] ? (
              <VideoPlayer videoUrl={courseDetails.chapter[0]?.video?.url} />
            ) : null}
            <CourseDetails courseDetails={courseDetails} />
          </div>
          <div className="px-3">
            <OptionSection />
            <EnrollmentSection
              courseDetails={courseDetails}
              userCourse={userCourse}
            />
          </div>
        </div>
      </div>
    )
  );
};

export default CoursePreview;
