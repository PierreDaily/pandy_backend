import { createConnection, getManager } from "typeorm";
import { User } from "./entity/User";

import express from "express";
import passport from "./config/passport";

import {accessTokenMiddleWare} from "./middleware";

const port = process.env.API_PORT;

const app = express();
app.use(passport.initialize());

app.use(accessTokenMiddleWare);

app.get("/", (req,res) => {
  res.status(200).send("Hi there");
});

app.listen(port, () => console.log(`myapi listening on port ${port}!`));

// createConnection()
//   .then(async (connection) => {
//     // console.log("Inserting a new user into the database...");
//     // const user = new User();
//     // user.name = "Timber";
//     // user.email = "Saw";
//     // user.password = "dsfds";
//     // user.role = "admin";

//     // await connection.manager.save(user);
//     // console.log("Saved a new user with id: " + user.id);

//     // console.log("Loading users from the database...");
//     // const users = await connection.manager.find(User);
//     // console.log("Loaded users: ", users);



//     // console.log("Here you can setup and run express/koa/any other framework.");
//   })
//   .catch((error) => console.log(error));
