import mongoose from "mongoose";
import { Enrollment } from "../../models/enrollment";

export const getTotalStudentsForInstructor = async (instructorRef: string): Promise<number | boolean> => {

  try {
    const totalStudents = await Enrollment.aggregate([
      {
        $lookup: {
          from: 'courses',
          localField: 'courseId',
          foreignField: '_id',
          as: 'course',
        },
      },
      { $unwind: '$course' },
      { $match: { 'course.instructorRef': new mongoose.Types.ObjectId(instructorRef) } },
      {
        $group: {
          _id: null,
          totalStudents: { $addToSet: '$userId' },
        },
      },
      {
        $project: {
          totalStudents: { $size: '$totalStudents' },
        },
      },
    ]);
    return totalStudents.length ? totalStudents[0].totalStudents : 0;
  } catch (error) {
    console.error("Error in getTotalStudentsForInstructor:", error);
    throw new Error((error as Error).message);
  }
};
