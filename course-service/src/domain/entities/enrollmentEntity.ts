import { Types } from "mongoose";

interface CompletedLesson {
    lessonId: Types.ObjectId;
    subLessonId: Types.ObjectId;
  }

interface Progress {
    completedLessons: CompletedLesson[];
    currentLesson: Types.ObjectId | null;
    currentSubLesson: Types.ObjectId | null;
    totalTimeWatched: number;
  }

export interface EnrollmentEntity {
    _id?: Types.ObjectId;
    userId: Types.ObjectId;
    courseId: Types.ObjectId;
    enrolledAt?: Date | string;
    instructorRef?:Types.ObjectId;
    progress: Progress;
};