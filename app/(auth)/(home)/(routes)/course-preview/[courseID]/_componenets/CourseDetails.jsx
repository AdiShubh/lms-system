import { Book } from "lucide-react";
import React from "react";

function CourseDetails({ courseDetails }) {
  return (
    <div className="mt-5 p-5 rounded-lg border">
      <h2 className="text-[20px] font-medium">{courseDetails.name}</h2>
      <div className="flex items-center gap-2 mt-2">
        <Book
          className="h-6 w-6 text-purple-600
                rounded-full bg-purple-100 p-1"
        />
        <h2 className="text-[12px] text-gray-400">
          {courseDetails?.totalChapters} Chapters
        </h2>
      </div>
      <p className="line-clamp-4 mt-3 text-gray-500">
        {courseDetails.courseDescription}
      </p>
    </div>
  );
}

export default CourseDetails;
