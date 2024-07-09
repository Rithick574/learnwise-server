import { IDependencies } from "../../../application/interfaces/IDependencies";

export const getInstructorCourseUseCase = (dependencies: IDependencies) => {
    const {
        repositories: { getInstructorCourse }
    } = dependencies;
  return {
    execute: async (id:string) => {
      return await getInstructorCourse(id);
    }
  };
};