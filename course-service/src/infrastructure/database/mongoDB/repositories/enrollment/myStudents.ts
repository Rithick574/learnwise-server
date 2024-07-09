import { Enrollment } from "../../models/enrollment";
import { EnrollmentEntity } from "../../../../../domain/entities";
import mongoose from "mongoose";

export const myStudents = async (
  id: string,
  search: any,
  page: number = 1,
  limit: number = 10
): Promise<EnrollmentEntity[] | boolean> => {
  try {
    const searchPattern = new RegExp(search as string, "i");
    let filter: any = {};
    if (search) {
      filter = {
        $or: [
          { "userDetails.firstName": { $regex: searchPattern } },
          { "userDetails.lastName": { $regex: searchPattern } },
          { "courseDetails.title": { $regex: searchPattern } },
        ],
      };
    }
    const query = {
      instructorRef: new mongoose.Types.ObjectId(id),
      ...(search && filter),
    };

    const pipeline = [
      {
        $lookup: {
          from: `users`,
          localField: "userId",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      { $unwind: "$userDetails" },
      {
        $lookup: {
          from: `courses`,
          localField: "courseId",
          foreignField: "_id",
          as: "courseDetails",
        },
      },
      { $unwind: "$courseDetails" },
      {
        $match: query,
      },
      // { $match: { instructorRef: new mongoose.Types.ObjectId(id) } },
      { $skip: (page - 1) * limit },
      { $limit: limit },
      {
        $project: {
          _id: 1,
          progress: 1,
          enrolledAt: 1,
          "userDetails.firstName": 1,
          "userDetails.lastName": 1,
          "userDetails.email": 1,
          "userDetails.profile.avatar": 1,
          "courseDetails.title": 1,
          "courseDetails.thumbnail": 1,
          "courseDetails.description": 1,
        },
      },
    ];

    const students = await Enrollment.aggregate(pipeline);

    if (!students) {
      return false;
    }

    return students;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
