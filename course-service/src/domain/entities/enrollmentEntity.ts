import { Types } from "mongoose";

interface LessonProgress {
    lessonId: string;
    totalTimeWatched: number;
}

export interface EnrollmentEntity {
    _id?: Types.ObjectId;
    userId: Types.ObjectId;
    courseId: Types.ObjectId;
    enrolledAt?: Date | string;
    progress?: {
        completedLessons?: Types.ObjectId[] | [] | null;
        completedAssessments?: Types.ObjectId[] | [] | null;
        currentLesson?: Types.ObjectId | string;
        lessonProgress?: LessonProgress[] | null;
    };
};