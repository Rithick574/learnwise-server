import { IDependencies } from "../../../application/interfaces/IDependencies";

export const getCourseUseCase = (dependencies: IDependencies) => {
    const {
        repositories: { getCourse }
    } = dependencies;
  return {
    execute: async (id:string) => {
      return await getCourse(id);
    }
  };
};