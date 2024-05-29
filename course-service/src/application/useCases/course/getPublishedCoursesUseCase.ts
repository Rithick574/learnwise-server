import { IDependencies } from "@/application/interfaces/IDependencies";

export const getPublishedCoursesUseCase = (dependencies: IDependencies) => {
    const {
        repositories: { getPublishedAndUnblocked }
    } = dependencies;
  return {
    execute: async () => {
      return await getPublishedAndUnblocked();
    }
  };
};
