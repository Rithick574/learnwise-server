import { Router } from "express";
import {controllers} from "@/presentation/controllers";
import { IDependencies } from "@/application/interfaces/IDependencies";
import {jwtMiddleware} from "@/_lib/common"

export const routes = (dependencies: IDependencies) => {
  const { signup,login,getUser } = controllers(dependencies);

  const router = Router();

  router.route("/signup").post(signup);
  router.route("/login").post(login);
  router.route("/").get(jwtMiddleware,getUser)
  
  return router;
};
