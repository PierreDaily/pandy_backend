import { createConnection } from "typeorm";

import express from "express";
import passport from "./config/passport";

import controller from "./controller";
import * as router from "./router";
import { accessTokenMiddleWare, permissionMiddleware } from "./middleware";

const port = process.env.API_PORT;

// Top level await needed here
createConnection();

const app = express();
app.use(passport.initialize());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/auth", controller.auth.authenticateUser);
app.use(accessTokenMiddleWare);

app
  .route("/user")
  .post(permissionMiddleware("create", "User"), controller.user.create);
app.get("/user", controller.user.get);

app.use("/branch", router.branch);

app.listen(port, () => console.log(`myapi listening on port ${port}!`));
