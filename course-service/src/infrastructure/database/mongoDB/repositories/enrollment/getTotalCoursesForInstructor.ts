import mongoose from "mongoose";
import { Enrollment } from "../../models/enrollment";

export const getTotalCoursesForInstructor = async (
  instructorRef: string
): Promise<any | boolean> => {
  try {
    const totalCourses = await Enrollment.aggregate([
      {
        $lookup: {
          from: "courses",
          localField: "courseId",
          foreignField: "_id",
          as: "course",
        },
      },
      { $unwind: "$course" },
      { $match: { "course.instructorRef": new mongoose.Types.ObjectId(instructorRef) } },
      {
        $group: {
          _id: null,
          totalCourses: { $addToSet: "$courseId" },
        },
      },
      {
        $project: {
          totalCourses: { $size: "$totalCourses" },
        },
      },
    ]);
    if(!totalCourses){
      return false;
    }
    return totalCourses.length ? totalCourses[0].totalCourses : 0;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
