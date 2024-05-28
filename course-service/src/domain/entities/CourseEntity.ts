import { Types } from "mongoose";

export interface SubLesson {
  title: string;
  video: string;
  description:string;
}

export interface Lesson {
  title: string;
  subLessons: SubLesson[];
}

export interface Trial {
  title: string;
  description?: string[];
  thumbnail?: string;
  video?: string;
}

export interface Pricing {
  type: "free" | "paid";
  amount: number;
}

export interface CourseEntity {
  _id?: Types.ObjectId;
  title: string;
  description: string;
  thumbnail: string;
  instructorRef: Types.ObjectId;
  categoryRef: Types.ObjectId;
  language?: string;
  pricing: Pricing;
  isBlocked?: boolean;
  attachments?: string;
  isPublished?: boolean;
  lessons: Lesson[];
  trial?: Trial;
  createdAt?: Date;
  updatedAt?: Date;
}
