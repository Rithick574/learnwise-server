import { Course } from "../../models/course";
import { Enrollment } from "../../models/enrollment";


export const getTopCourse=async():Promise<any | false > =>{
try {
    const [topCourses, totalCourseCount] = await Promise.all([
        Enrollment.aggregate([
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
          {
            $lookup:{
              from:'users',
              localField:'course.instructorRef',
              foreignField:'_id',
              as:'instructors'
            }
          },
          { $unwind:'$instructors' }
        ]),
        Course.countDocuments({}).then((count) => count),
      ]);
      return { topCourses, totalCourseCount };
} catch (error) {
    throw new Error((error as Error).message)
}
}