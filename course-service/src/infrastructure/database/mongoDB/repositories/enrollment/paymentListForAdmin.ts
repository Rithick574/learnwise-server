import { ErrorResponse } from "@learnwise/common";
import { Enrollment } from "../../models/enrollment";
import { Types } from "mongoose";


interface User {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  profile:{
    avatar:string
  }
}

interface Course {
  _id: Types.ObjectId;
  title: string;
  pricing: { amount: number };
  instructorRef: User;
  thumbnail:string;
}

interface EnrollmentDocument extends Document {
  userId: User;
  courseId: Course;
  enrolledAt: Date;
  status: string;
}

export const paymentListForAdmin = async (status: string, search: string, page: number, limit: number): Promise<any | null> => {
  try {
    let filter: any = {};

    if (status) {
      filter.status = status;
    }
    if (search) { 
      filter['userId.firstName'] = { $regex: new RegExp(search, "i") };
    }

    const skip = (page - 1) * limit;
    const payments = await Enrollment.find(filter)
      .skip(skip)
      .limit(limit)
      .populate("userId", { firstName: 1, lastName: 1,email:1,'profile.avatar': 1 })
      .populate({
        path: "courseId",
        select: { title: 1, pricing: 1, instructorRef: 1,thumbnail:1 },
        populate: {
          path: "instructorRef",
          select: { firstName: 1, lastName: 1, email: 1,'profile.avatar':1 },
        },
      })
      .sort({ createdAt: -1 }) as unknown as EnrollmentDocument[];

    const totalAvailablePayments = await Enrollment.countDocuments(filter);

    const formattedPayments = payments.map((payment) => ({
      studentName: `${payment.userId.firstName} ${payment.userId.lastName}`,
      studentEmail: payment.userId.email,
      studentAvatar: payment.userId.profile.avatar,
      course: payment.courseId.title,
      courseThumbnail:payment.courseId.thumbnail,
      createdBy: `${payment.courseId.instructorRef.firstName} ${payment.courseId.instructorRef.lastName}`,
      instructorEmail: payment.courseId.instructorRef.email,
      instructorAvatar: payment.courseId.instructorRef.profile.avatar,
      date: payment.enrolledAt,
      price: payment.courseId.pricing.amount,
    }));

    return { formattedPayments, totalAvailablePayments };
  } catch (error) {
    if (error instanceof ErrorResponse) {
      throw error;
    }
    throw ErrorResponse.internalError(
      (error as Error).message || "An unexpected error occurred"
    );
  }
};
