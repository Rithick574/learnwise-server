import { IDependencies } from "@/application/interfaces/IDependencies";

export const updateCourseStatusUseCase = (dependencies: IDependencies) => {
    const {
        repositories: { updateCourseStatus }
    } = dependencies;
  return {
    execute: async (id:string,status:string) => {
      return await updateCourseStatus(id,status);
    }
  };
};