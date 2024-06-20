import { Exam } from "../../models/exams";

export const getExam = async (
  courseId: string,
): Promise<any | boolean> => {
    try {
        const exam = await Exam.findOne({ courseId });
        return exam;
    } catch (error) {
        throw new Error((error as Error)?.message);
    }
}