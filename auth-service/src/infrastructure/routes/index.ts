import { Router } from "express";
import {controllers} from "@/presentation/controllers";
import { IDependencies } from "@/application/interfaces/IDependencies";

export const routes = (dependencies: IDependencies) => {
  const { signup,login } = controllers(dependencies);

  const router = Router();

  router.route("/signup").post(signup);
  router.route("/login").post(login);
  
  return router;
};
