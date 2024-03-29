"use client";
import React, { useEffect, useState } from "react";
import { GetUserCourseList } from "../../../../_services/index";
import { useUser } from "@clerk/nextjs";
import CategoryItem from "../../../(home)/_components/CategoryItem";
import Link from "next/link";

const Dashboard = () => {
  const { user } = useUser();
  const [userCourseList, setUserCourseList] = useState([]);
  useEffect(() => {
    user ? getUserCourse() : null;
  }, [user]);

  const getUserCourse = async () => {
    await GetUserCourseList(user.primaryEmailAddress.emailAddress).then(
      (resp) => {
        console.log(resp?.userEnrollCourses);
        if (resp) setUserCourseList(resp?.userEnrollCourses);
      }
    );
  };
  return (
    <>
      <h2 className="text-[20px] font-medium text-center">
        My Enrolled Courses:
      </h2>
      <h2 className="text-red-500 text-[25px] text-center p-9 m-7 border border-orange-400">
        Work in Progress. This page is under construction.
      </h2>
    </>

    //   <div>
    //     {userCourseList.length > 0 ? (
    //       <>
    //         <h2 className="text-[20px] font-medium">My Enrolled Courses:</h2>
    //         <div
    //           className="grid grid-cols-1 sm:grid-cols-2
    // md:grid-cols-3 lg:grid-cols-4 mt-5 gap-5"
    //         >
    //           {userCourseList &&
    //             userCourseList.map((course, index) => (
    //               <Link
    //                 href={"/course-preview/" + course?.courseList?.id}
    //                 key={index}
    //               >
    //                 <CategoryItem course={course?.courseList} />
    //               </Link>
    //             ))}
    //         </div>
    //       </>
    //     ) : (
    //       <div
    //         className="flex justify-center items-center
    // text-[20px] mt-20 text-gray-500"
    //       >
    //         <h2>You don't have any course enrolled.</h2>
    //       </div>
    //     )}
    //   </div>
  );
};

export default Dashboard;
