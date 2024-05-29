import { IDependencies } from "@/application/interfaces/IDependencies";

export const getAllCoursesUseCase = (dependencies: IDependencies) => {
    const {
        repositories: { courseRepository }
    } = dependencies;
  return {
    execute: async () => {
      return await courseRepository();
    }
  };
};