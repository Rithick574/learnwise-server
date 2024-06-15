import { IDependencies } from "@/application/interfaces/IDependencies";

export const salesReportUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { salesReport },
  } = dependencies;
  return {
    execute: async (startDate: string, endDate: string) => {
      return await salesReport(startDate, endDate);
    },
  };
};
