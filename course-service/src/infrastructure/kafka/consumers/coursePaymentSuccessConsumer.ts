import { EnrollmentEntity } from "@/domain/entities";
import {
    createEnrollment,
    getEnrollmentByUserId
} from "@/infrastructure/database/mongoDB/repositories";


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

    } catch (error) {
        console.log("coursePaymentSuccessConsumer error: ", (error as Error).message);
    }
};
