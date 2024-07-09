import { CourseEntity } from "../../../domain/entities/CourseEntity";

export interface IGetPublishedCoursesUseCase {
  execute(
    categoryStr: string | undefined,
    priceStr: string | undefined,
    searchStr: string | undefined,
    sortStr: string | undefined,
    pageNum: number,
    limitNum: number
  ): Promise<{ courses: CourseEntity[]; totalAvailableCourses: number } | null>;
}
