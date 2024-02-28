import request, { gql } from "graphql-request";

const MASTER_URL =
  "https://api-ap-south-1.hygraph.com/v2/" +
  process.env.NEXT_PUBLIC_HYGRAPH_kEY +
  "/master";

export const getCourseList = async () => {
  const query = gql`
    query Courses {
      courseLists {
        id
        name
        banner {
          url
        }
        tags
        totalChapters
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

export const getCourseById = async (id, userEmail) => {
  const query =
    gql`
  query course {
    courseList(where: {id: "` +
    id +
    `"}) {
      chapter (first: 30){
        ... on Chapter {
          id
          name
          chapterNumber
          video {
            url
          }
        }
      }
      courseDescription
      name
      id
      free
    
      sourceCode
      
      totalChapters
      
      banner {
        url
      }
    }
    userEnrollCourses(where: {courseId: "` +
    id +
    `", 
    userEmail: "` +
    userEmail +
    `"}) {
    courseId
    userEmail
    id
    completedChapter {
      ... on CompletedChapter {
        chapterId
      }
    }
    
  }
  }
  `;

  const result = await request(MASTER_URL, query);
  return result;
};

export const enrollCourse = async (courseId, userEmail) => {
  const mutationQuery =
    gql`
    mutation MyMutation {
      createUserEnrollCourse(data: { courseId: "` +
    courseId +
    `", userEmail: "` +
    userEmail +
    `" }) {
        id
      }
    }
  `;
  const result = await request(MASTER_URL, mutationQuery);
  return result;
};

export const PublishCourse = async (id) => {
  const mutationQuery =
    gql`
  mutation EnrollCourse {
    publishUserEnrollCourse(where: {id: "` +
    id +
    `"})
    {
      id
    }
  }
  `;
  const result = await request(MASTER_URL, mutationQuery);
  return result;
};

export const markChapterCompleted = async (recordId, chapterNumber) => {
  const mutationQuery =
    gql`
  mutation MarkChapterComplete {
    updateUserEnrollCourse(
      where: {id: "` +
    recordId +
    `"}
      data: {completedChapter: {create: {CompletedChapter: 
        {data: {chapterId: "` +
    chapterNumber +
    `"}}}}}
    ) {
      id
    }
    publishManyUserEnrollCoursesConnection(to: PUBLISHED) {
      edges { 
        node {
          id
        }
      }
    }
  }
  `;
  const result = await request(MASTER_URL, mutationQuery);
  return result;
};

export const GetUserCourseList = async (userEmail) => {
  const query =
    gql`
  query UserCourseList {
    userEnrollCourses(where: {userEmail: "` +
    userEmail +
    `"}) {
      courseList {
        banner {
          url
        }
        courseDescription
        name
        id
        free
        sourceCode
        tags
        totalChapters
       
      }
    }
  }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};
