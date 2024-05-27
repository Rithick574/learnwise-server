import { Date,Types } from "mongoose";


interface SubLesson {
    title: string;
    video: string;
  }
  
interface Lesson {
    title: string;
    subLessons: SubLesson[];
  }

interface Trial {
    title: string;
    description: string;
    thumbnail: string;
    video: string;
}

enum PricingType {
    free = 'free',
    paid = 'paid'
}

interface Pricing {
    amount: number;
    type: PricingType;
}

export interface CourseEntity {
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
    trial: Trial;
    createdAt?: Date;
    updatedAt?: Date;
}
