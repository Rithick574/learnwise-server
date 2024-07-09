import { IDependencies } from "../../../application/interfaces/IDependencies";

export const getAllCoursesUseCase = (dependencies: IDependencies) => {
    const {
        repositories: { courseRepository }
    } = dependencies;
  return {
    execute: async (filter: any, page: number, limit: number) => {
      return await courseRepository(filter, page, limit);
    }
  };
};