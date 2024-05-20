import { IRepositories } from "./IRepositories";
import { IUseCases } from "./IUsecases";

export interface IDependencies {
    repositories: IRepositories,
    useCases: IUseCases
}