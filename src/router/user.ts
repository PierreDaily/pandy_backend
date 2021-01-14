import express from "express";

import controller from "../controller";
import { permissionMiddleware } from "../middleware";

export const user = express.Router();

user
  .route("/")
  .get(controller.user.get)
  .post(permissionMiddleware("create", "User"), controller.user.create);
