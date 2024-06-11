import { Enrollment } from "@/infrastructure/database/mongoDB/models/enrollment";
import { EnrollmentEntity } from "@/domain/entities";

export const myStudents = async (
  id: string
): Promise<EnrollmentEntity[] | boolean> => {
  try {
    const students = await Enrollment.find({ instructorRef:id }).populate("courseId");

    if (!students) {
      return false;
    }

    return students;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};
