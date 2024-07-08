import { EnrollmentEntity, UserEntity } from "@/domain/entities";
import { Course } from "@/infrastructure/database/mongoDB/models/course";
import { User } from "@/infrastructure/database/mongoDB/models/user";
import {
    createEnrollment,
    getEnrollmentByUserId
} from "@/infrastructure/database/mongoDB/repositories";
import { Schema, Document } from "mongoose";


export default async (data: any) => {
    try {
        const exist = await getEnrollmentByUserId(data.userId);
        const match = exist?.find((item) => item.courseId?._id.toString() === data.courseId.toString());
        if (match) return;
        const enrollmentData: EnrollmentEntity = {
            userId: data.userId,
            courseId: data.courseId,
            instructorRef: data.instructorRef,
            enrolledAt: new Date(),
            progress: {
                completedLessons: [],
                currentLesson: null,
                currentSubLesson: null,
                totalTimeWatched: 0
            }
        };
        await createEnrollment(enrollmentData);

        const course = await Course.findById(data.courseId);
        if (!course) {
            throw new Error("Course not found");
        }
        const coursePrice = course.pricing.amount;
        const admin: Document<unknown, {}, UserEntity> & UserEntity & { _id: Schema.Types.ObjectId } = await User.findOne({ role: "admin" }) as any;
        if (!admin) {
            throw new Error("Admin account not found");
        }

        if (admin.profit === undefined) {
            admin.profit = 0;
        }

        admin.profit += coursePrice;
        await admin.save();
    } catch (error) {
        console.log("coursePaymentSuccessConsumer error: ", (error as Error).message);
    }
};
