import { IDependencies } from "../../../application/interfaces/IDependencies";

export const getPublishedCoursesUseCase = (dependencies: IDependencies) => {
    const {
        repositories: { getPublishedAndUnblocked }
    } = dependencies;
  return {
    execute: async (categoryStr :any,priceStr :any,searchStr :any,sortStr :any,pageNum :any,limitNum :any) => {
      return await getPublishedAndUnblocked(categoryStr, priceStr, searchStr, sortStr, pageNum, limitNum);
    }
  };
};
