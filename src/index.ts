import { createConnection } from "typeorm";

import express from "express";
import passport from "./config/passport";

import controller from "./controller";
import * as router from "./router";
import { accessTokenMiddleWare, permissionMiddleware } from "./middleware";

import * as model from "./model";
const port = process.env.API_PORT;

(async () => {
  await createConnection();
  const app = express();
  app.use(passport.initialize());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.post("/auth", controller.auth.authenticateUser);
  app.use(accessTokenMiddleWare);

  app.use("/brand", router.brand);
  app.use("/branch", router.branch);
  app.use("/user", router.user);
  const photoModel = new model.Item();
  app.post("/item", controller.item.create);

  app.listen(port, () => console.log(`myapi listening on port ${port}!`));
})();
