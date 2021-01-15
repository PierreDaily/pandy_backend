import express from "express";
import controller from "../controller";
// import { permissionMiddleware } from "../middleware";
export const brand = express.Router();

brand.route("/").get(controller.brand.findAll).post(controller.brand.create);
brand.delete(
  "/:id",
  // permissionMiddleware("delete", "Brand"),
  controller.brand.remove
);
