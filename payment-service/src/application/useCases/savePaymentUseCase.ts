import { IDependencies } from "../interfaces/IDependencies"; 

export const savePaymentUseCase = (dependencies: IDependencies) => {
  const {repositories: {savePayment}} = dependencies;
  return {
    execute: async (data: any) => {
      return await savePayment(data);
    }
  }
}