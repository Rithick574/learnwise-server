import { Router } from "express";
import { controllers } from "@/presentation/controllers";
import { IDependencies } from "@/application/interfaces/IDependencies";
import { jwtMiddleware } from "@/_lib/common";

export const routes = (dependencies: IDependencies) => {
  const { signup, login, getUser, logout, googleAuth,forgotPassword,updatePassword,getAllUsers,findUserByEmail } =
    controllers(dependencies);

  const router = Router();

  router.route("/signup").post(signup);
  router.route("/login").post(login);
  router.route("/").get(jwtMiddleware, getUser);
  router.route("/logout").delete(logout);
  router.route("/google").post(googleAuth);
  router.route("/forgotpassword").post(forgotPassword);
  router.route("/reset-password").post(updatePassword);
  router.route("/getallusers").get(getAllUsers);
  router.route("/find/:email").get(findUserByEmail)

  return router;
};
