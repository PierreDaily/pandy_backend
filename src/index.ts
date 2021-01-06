import { createConnection } from "typeorm";

import express from "express";
import passport from "./config/passport";

import controller from "./controller";
import {accessTokenMiddleWare} from "./middleware";

const port = process.env.API_PORT;

// Top level await needed here
createConnection();

const app = express();
app.use(passport.initialize());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/auth", controller.auth.authenticateUser);
app.use(accessTokenMiddleWare);

app.get("/", (req,res) => {
  res.status(200).send("Hi there");
});

app.post("/user", controller.user.create);


app.listen(port, () => console.log(`myapi listening on port ${port}!`));
