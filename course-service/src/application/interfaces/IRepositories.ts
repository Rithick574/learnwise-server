import { EnrollmentEntity } from "@/domain/entities";
import { CourseEntity } from "@/domain/entities/CourseEntity";
import { CategoryEntity } from "@/domain/entities/categoryEntity";
import { IReview } from "@/domain/entities/reviewEntity";


export interface IRepositories {
    getAllCategories: (filter: any, page: number, limit: number) =>  Promise<{ result: CategoryEntity[]; totalAvailableCategories: number }>;
    getAvailableCategories: () => Promise<CategoryEntity[] | null>;
    createCategory: (data: CategoryEntity) => Promise<CategoryEntity | null>;
    updateCategory: (data: CategoryEntity) => Promise<CategoryEntity | null>;
    createCourse: (data: CourseEntity) => Promise<CourseEntity | null>;
    courseRepository:(filter: any, page: number, limit: number)=>Promise<CourseEntity[] | null>;
    getPublishedAndUnblocked:()=>Promise<CourseEntity[] | null >;
    getCourse:(id:string)=>Promise<CourseEntity | null>;
    updateCourseStatus:(id:string,status:string)=>Promise<CourseEntity | null>;
    getInstructorCourse:(id:string)=>Promise<CourseEntity[]| null >;
    publishCourse:(id:string,action:string)=>Promise<CourseEntity | null>;
    getEnrollment:(courseId:string,userId:string)=>Promise<EnrollmentEntity | null | boolean>;
    createReview:(data:IReview)=>Promise<IReview | boolean>;
    getReview:(courseId:string)=>Promise<IReview[] | boolean>;
    myStudents:(id:string,filter: any, page: number, limit: number)=>Promise<EnrollmentEntity[] | boolean>
    adminDashboard:()=>Promise<any | boolean>;
    getTopCourse:()=>Promise<any | boolean>; 
    salesReport:(startDate:string,endDate:string)=>Promise<any | boolean>;
    getEnrollmentsForInstructorOverTime:(instructorRef:string)=>Promise<any | boolean>;
    getTopCoursesForInstructor:(instructorRef:string)=>Promise<any | boolean>;
    getTotalStudentsForInstructor:(instructorRef:string)=>Promise<any | boolean>;
    getTotalCoursesForInstructor:(instructorRef:string)=>Promise<any | boolean>;
}