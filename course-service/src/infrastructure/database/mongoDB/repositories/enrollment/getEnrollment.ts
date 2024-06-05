import { Enrollment } from "@/infrastructure/database/mongoDB/models/enrollment";
import { EnrollmentEntity } from "@/domain/entities";

export const getEnrollment=async(courseId:string,userId:string):Promise<EnrollmentEntity | null | false > =>{
try {
    const isEnrolled = await Enrollment.findOne({courseId: courseId, userId:userId })
    if(!isEnrolled){
        return false;
    }
    return isEnrolled;
} catch (error) {
    throw new Error((error as Error).message)
}
}