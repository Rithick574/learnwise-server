import { EnrollmentEntity } from "@/domain/entities";
import { Enrollment } from "../../models/enrollment";
import { ErrorResponse } from "@learnwise/common";

export const enrollmentProgress=async(progressData:any):Promise<EnrollmentEntity | null>=>{
    try {
        const enrollment = await Enrollment.findOne({
          userId: progressData.userId,
          courseId: progressData.courseId,
        });
  
        if (!enrollment) {
          throw ErrorResponse.notFound('Enrollment not found');
        }
  
        const currentLesson = enrollment.progress.currentLesson;
        const currentSubLesson = enrollment.progress.currentSubLesson;
  
        if (currentLesson && currentSubLesson) {
          const isCompleted = enrollment.progress.completedLessons.some(
            (lesson) =>
              lesson.lessonId.toString() === currentLesson.toString() &&
              lesson.subLessonId.toString() === currentSubLesson.toString()
          );
  
          if (!isCompleted) {
            enrollment.progress.completedLessons.push({
              lessonId: currentLesson,
              subLessonId: currentSubLesson,
            });
          }
        }
  
        enrollment.progress.currentLesson = progressData.progress.lessonId;
        enrollment.progress.currentSubLesson = progressData.progress.subLessonId;
  
        await enrollment.save();
        return enrollment;
      } catch (error) {
        return null;
      }
}