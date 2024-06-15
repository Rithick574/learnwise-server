import { Enrollment } from "../../models/enrollment";

export const salesReport = async (
  startDate: string,
  endDate: string
): Promise< any | boolean> => {
  try {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const salesReportResult = await Enrollment.aggregate([
      {
        $match: {
          enrolledAt: {
            $gte: start,
            $lte: end,
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$enrolledAt" },
            month: { $month: "$enrolledAt" },
            day: { $dayOfMonth: "$enrolledAt" },
          },
          totalSales: { $sum: 1 },
          courses: { $push: "$courseId" },
        },
      },
      {
        $lookup: {
          from: "courses",
          localField: "courses",
          foreignField: "_id",
          as: "courseDetails",
        },
      },
      {
        $addFields: {
          totalProfit: { $sum: "$courseDetails.pricing.amount" },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 },
      },
    ]);
    if(!salesReportResult){
      return false
    }
    return salesReportResult;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
