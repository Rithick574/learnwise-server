import { IDependencies } from "../../../application/interfaces/IDependencies";

export const PublishCoursesUseCase = (dependencies: IDependencies) => {
    const {
        repositories: { publishCourse }
    } = dependencies;
  return {
    execute: async (id:string,action:string) => {
      return await publishCourse(id,action);
    }
  };
};