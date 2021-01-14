import express from "express";
import controller from "../controller";

export const branch = express.Router();

branch.get("/", controller.branch.getList);
