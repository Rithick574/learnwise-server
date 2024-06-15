import mongoose from "mongoose";
import { Enrollment } from "../../models/enrollment";

export const getEnrollmentsForInstructorOverTime = async (
  instructorRef: string
): Promise<any | boolean> => {
  try {
    const enrollments = await Enrollment.aggregate([
      {
        $lookup: {
          from: "courses",
          localField: "courseId",
          foreignField: "_id",
          as: "course",
        },
      },
      {
        $unwind: "$course",
      },
      {
        $match: { "course.instructorRef": new mongoose.Types.ObjectId(instructorRef) },
      },
      {
        $group: {
          _id: {
            year: { $year: "$enrolledAt" },
            month: { $month: "$enrolledAt" },
            day: { $dayOfMonth: "$enrolledAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } },
    ]);
    if(!enrollments){
      return false;
    }
    return enrollments;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
