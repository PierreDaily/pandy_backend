import express from "express";
import controller from "../controller";
export const item = express.Router();

item.route("/").get(controller.item.getAll).post(controller.item.create);
item.get("/:id", controller.item.get);
// item.get("/:id/price", controller.price.getList);
