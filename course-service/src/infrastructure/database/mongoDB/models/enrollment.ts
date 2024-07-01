import { EnrollmentEntity } from "@/domain/entities";
import { Schema, model } from "mongoose";

const LessonProgressSchema = new Schema({
  lessonId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  totalTimeWatched: {
    type: Number,
    default: 0,
  },
});

const enrollmentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "courses",
    required: true,
  },
  instructorRef: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  enrolledAt: {
    type: Schema.Types.Date,
    default: function () {
      return Date.now();
    },
  },
  progress: {
    completedLessons: {
      type: [
        { lessonId: Schema.Types.ObjectId, subLessonId: Schema.Types.ObjectId },
      ],
      default: [],
    },
    currentLesson: { type: Schema.Types.ObjectId, default: null },
    currentSubLesson: { type: Schema.Types.ObjectId, default: null },
    totalTimeWatched: { type: Number, default: 0 },
  },
});

export const Enrollment = model<EnrollmentEntity>(
  "enrollments",
  enrollmentSchema
);
