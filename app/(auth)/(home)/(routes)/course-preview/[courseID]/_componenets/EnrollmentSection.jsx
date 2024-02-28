import React from "react";
import { useUser } from "@clerk/nextjs";
import {
  enrollCourse,
  PublishCourse,
} from "./../../../../../../_services/index";
import { useRouter } from "next/navigation";
import CourseDetails from "./CourseDetails";

const EnrollmentSection = ({ courseDetails, userCourse }) => {
  const { user } = useUser();
  const router = useRouter();

  const EnrollCourse = async () => {
    if (user) {
      await enrollCourse(
        courseDetails.id,
        user.primaryEmailAddress.emailAddress
      ).then(async (resp) => {
        console.log("Enrollcourse: ", resp);
        if (resp) {
          await PublishCourse(resp?.createUserEnrollCourse?.id).then(
            (result) => {
              console.log(result);
              if (result) {
                router.push("/view-course/" + courseDetails.id);
              }
            }
          );
        }
      });
    } else {
      router.push("/auth/sign-in");
    }
  };

  return (
    <div>
      {userCourse?.courseId ? (
        <div className="mt-5 border rounded-lg p-4 text-center">
          <h2 className="text-gray-500 ">
            Continue to Build Project,Access Source Code and Track your Progress
            for free!
          </h2>
          <button
            className="p-2 w-full bg-purple-500
        text-white rounded-lg text-[14px] mt-2 
        hover:bg-purple-700"
            onClick={() =>
              courseDetails?.totalChapters
                ? router.push("/view-course/" + courseDetails.id)
                : window.location.reload()
            }
          >
            Continue
          </button>
        </div>
      ) : null}
      {courseDetails.free && !userCourse?.courseId ? (
        <div className="mt-5 border rounded-lg p-4 text-center">
          <h2 className="text-gray-500">
            Learn and Build Project,Access Source Code and Track your Progress
            for free!
          </h2>
          <button
            className="p-2 w-full bg-purple-500
                text-white rounded-lg text-[14px] mt-2 
           hover:bg-purple-700"
            onClick={() => EnrollCourse()}
          >
            Enroll Now
          </button>
        </div>
      ) : !userCourse?.courseId ? (
        <div className="mt-5 border rounded-lg p-4 text-center">
          <h2 className="text-gray-500 font-light">
            Buy Monthly membership and get access to all course, Source code and
            Track your progress
          </h2>
          <button
            onClick={() => router.push("/membership")}
            className="p-2 w-full bg-purple-500
           text-white rounded-lg text-[14px] mt-2 
           hover:bg-purple-700"
          >
            Buy Membership $2.99/Month
          </button>
        </div>
      ) : courseDetails.youtubeUrl ? (
        <div
          className="mt-5 
       border rounded-lg p-4 text-center"
        >
          <h2 className="text-gray-500">
            Watch Comlete Course on Youtube for Free!
          </h2>
          <button
            className="p-2 w-full bg-red-500
           text-white rounded-lg text-[14px] mt-2 
           hover:bg-red-700"
            onClick={() => window.open(CourseDetails.youtubeUrl)}
          >
            Watch On Youtube
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default EnrollmentSection;
