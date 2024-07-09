import { Enrollment } from "../../models/enrollment";

export const adminDashboard = async () => {
  try {
    const EnrollmentData = await Enrollment.aggregate([
      {
        $lookup: {
          from: "courses",
          localField: "courseId",
          foreignField: "_id",
          as: "course",
        },
      },
      { $unwind: "$course" },
      {
        $lookup: {
          from: "categories",
          localField: "course.categoryRef",
          foreignField: "_id",
          as: "category",
        },
      },
      { $unwind: "$category" },
      {
        $group: {
          _id: {
            categoryName: "$category.title",
            year: { $year: "$enrolledAt" },
            month: { $month: "$enrolledAt" },
            day: { $dayOfMonth: "$enrolledAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } },
    ]);
    return EnrollmentData;
  } catch (error) {
    throw new Error((error as Error)?.message);
  }
};
