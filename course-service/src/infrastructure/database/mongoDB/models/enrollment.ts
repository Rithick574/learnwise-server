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
        required: true
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
        }
    },
    progress: {
        completedLessons: [Schema.Types.ObjectId],
        completedAssessments: [Schema.Types.ObjectId],
        currentLesson: Schema.Types.ObjectId,
        lessonProgress: [LessonProgressSchema]
    }
});

export const Enrollment = model<EnrollmentEntity>("enrollments", enrollmentSchema);