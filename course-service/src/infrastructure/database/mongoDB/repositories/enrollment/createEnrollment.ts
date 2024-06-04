import { Enrollment } from "@/infrastructure/database/mongoDB/models/enrollment";
import { EnrollmentEntity } from "@/domain/entities";

export const createEnrollment = async (
  data: EnrollmentEntity
): Promise<EnrollmentEntity | null> => {
  try {
    const enrollment = await Enrollment.create(data);

    if (!enrollment) {
      throw new Error("Course enrollment failed!");
    }

    return enrollment;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};
