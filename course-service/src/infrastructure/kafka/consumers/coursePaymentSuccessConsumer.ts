import {
    createEnrollment,
    getEnrollmentByUserId
} from "@/infrastructure/database/mongoDB/repositories";


export default async (data: any) => {
    try {
        const exist = await getEnrollmentByUserId(data.userId);
        const match = exist?.find((item) => item.courseId?._id.toString() === data.courseId.toString());
        if (match) return;
        await createEnrollment({
            userId: data.userId,
            courseId: data.courseId,
            enrolledAt: Date.now().toString()
        });

    } catch (error) {
        console.log("coursePaymentSuccessConsumer error: ", (error as Error).message);
    }
};
