import {
  EnrollmentEntity,
  IExamResult,
  IReview,
  CategoryEntity,
  CourseEntity,
} from "@/domain/entities";

export interface IRepositories {
  getAllCategories: (
    filter: any,
    page: number,
    limit: number
  ) => Promise<{ result: CategoryEntity[]; totalAvailableCategories: number }>;
  getAvailableCategories: () => Promise<CategoryEntity[] | null>;
  createCategory: (data: CategoryEntity) => Promise<CategoryEntity | null>;
  updateCategory: (data: CategoryEntity) => Promise<CategoryEntity | null>;
  createCourse: (data: CourseEntity) => Promise<CourseEntity | null>;
  courseRepository: (
    filter: any,
    page: number,
    limit: number
  ) => Promise<CourseEntity[] | null>;
  getPublishedAndUnblocked: (
    category: string | undefined,
    price: string | undefined,
    search: string | undefined,
    sort: string | undefined,
    page: number,
    limit: number
  ) => Promise<{
    courses: CourseEntity[];
    totalAvailableCourses: number;
  } | null>;
  getCourse: (id: string) => Promise<CourseEntity | null>;
  updateCourseStatus: (
    id: string,
    status: string
  ) => Promise<CourseEntity | null>;
  getInstructorCourse: (id: string) => Promise<CourseEntity[] | null>;
  publishCourse: (id: string, action: string) => Promise<CourseEntity | null>;
  getEnrollment: (
    courseId: string,
    userId: string
  ) => Promise<EnrollmentEntity | null | boolean>;
  createReview: (data: IReview) => Promise<IReview | boolean>;
  getReview: (courseId: string) => Promise<IReview[] | boolean>;
  myStudents: (
    id: string,
    filter: any,
    page: number,
    limit: number
  ) => Promise<EnrollmentEntity[] | boolean>;
  adminDashboard: () => Promise<any | boolean>;
  getTopCourse: () => Promise<any | boolean>;
  salesReport: (startDate: string, endDate: string) => Promise<any | boolean>;
  getEnrollmentsForInstructorOverTime: (
    instructorRef: string
  ) => Promise<any | boolean>;
  getTopCoursesForInstructor: (instructorRef: string) => Promise<any | boolean>;
  getTotalStudentsForInstructor: (
    instructorRef: string
  ) => Promise<any | boolean>;
  getTotalCoursesForInstructor: (
    instructorRef: string
  ) => Promise<any | boolean>;
  paymentListForAdmin: (
    status: string,
    search: string,
    page: number,
    limit: number
  ) => Promise<any | null>;
  editCourse: (
    courseId: string,
    data: CourseEntity
  ) => Promise<CourseEntity | boolean>;
  createExam: (courseId: string, questions: any) => Promise<any | boolean>;
  getExam: (courseId: string) => Promise<any | boolean>;
  submitExam: (
    userId: string,
    courseId: string,
    result: any
  ) => Promise<IExamResult | boolean>;
  enrollmentProgress:(progressData:any)=>Promise<EnrollmentEntity | null>
  getEnrollmentByUserId:(userId:string)=>Promise<any |null>
}
