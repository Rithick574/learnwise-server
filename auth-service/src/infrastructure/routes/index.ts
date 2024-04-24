import { Router } from "express";
import {controllers} from "@/presentation/controllers";
import { IDependencies } from "@/application/interfaces/IDependencies";

export const routes = (dependencies: IDependencies) => {
  const { signup } = controllers(dependencies);

  const router = Router();

  router.route("/signup").post(signup);
  
  return router;
};
