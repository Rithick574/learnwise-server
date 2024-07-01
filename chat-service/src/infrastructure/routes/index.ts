import { IDependencies } from "@/application/interfaces/IDependencies";
import { controllers } from "@/presentation/controllers";
import { Router } from "express";

export const router = (dependencies: IDependencies) => {
  const { createChat, createMessage, getChatByUserId, getChat,findNotification } =
    controllers(dependencies);
    
  const router = Router();

  router.route("/").post(createChat);

  router.route("/:id").get(getChat);
  router.route("/message").post(createMessage);

  router.route("/chats/:id").get(getChatByUserId);

  router.route('/notification/:id')
  .get(findNotification)

  return router;
};
