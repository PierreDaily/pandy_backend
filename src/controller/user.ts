import express from "express";
import Joi from "joi";

import logger from "../logger";
import { User as UserModel } from "../model";

declare global {
  namespace Express {
    // tslint:disable-next-line:no-empty-interface
    interface User {
      id: string;
      role: string;
    }
  }
}

export const user = {
  create: async function (req: express.Request, res: express.Response) {
    const { name, email, password } = req.body;
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).max(20).required(),
    });

    const { error, value } = schema.validate({ name, email, password });

    if (error) {
      return res.status(400).send({ error });
    }

    try {
      const existingUser = await UserModel.exist({ name, email });

      if (existingUser) {
        return res
          .status(303)
          .send({ error: [{ message: "user name or email already exist" }] });
      }

      const userId = await UserModel.create(
        value.name,
        value.email,
        value.password
      );
      return res.status(201).send({ data: { id: userId } });
    } catch (err) {
      logger.error(err);
      res
        .status(500)
        .send({ error: [{ message: "error during user creation process" }] });
    }
  },
  get: async function (req: express.Request, res: express.Response) {
    const userModel = new UserModel();
    const schema = Joi.object({
      id: Joi.string()
        .guid({
          version: ["uuidv4"],
        })
        .required(),
    });

    try {
      const id = req?.user?.id;
      const { error, value } = schema.validate({ id });

      if (error) {
        return res.status(400).send({ error });
      }

      const user = await userModel.findOne({ id });
      if (user) {
        return res.status(200).send({ data: user });
      }

      return res.status(404).send({ error: { message: "user doesn't exist" } });
    } catch (err) {
      logger.warn(err);
      res
        .status(500)
        .send({ error: [{ message: "error during user creation process" }] });
    }
  },
};
