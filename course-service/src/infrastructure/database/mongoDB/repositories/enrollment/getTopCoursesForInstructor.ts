import mongoose from "mongoose";
import { Enrollment } from "../../models/enrollment";

export const getTopCoursesForInstructor=async(instructorRef:string):Promise<any | boolean>=>{
try {
    const topCoursesForInstructor = await Enrollment.aggregate([
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
              _id: '$courseId',
              totalEnrollments: { $sum: 1 },
            },
          },
          { $sort: { totalEnrollments: -1 } },
          { $limit: 5 },
          {
            $lookup: {
              from: 'courses',
              localField: '_id',
              foreignField: '_id',
              as: 'course',
            },
          },
          { $unwind: '$course' },
    ]);
    if(!topCoursesForInstructor){
      return false;
    }
    return topCoursesForInstructor;
} catch (error) {
    throw new Error((error as Error).message);
}
}