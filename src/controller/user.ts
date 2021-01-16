import bcrypt from "bcrypt";
import express from "express";
import Joi from "joi";
import { getManager, getRepository } from "typeorm";

import logger from "../logger";
import { ROLE } from "../constants";
import { Role } from "../entity/Role";
import { User } from "../entity/User";

declare global {
  namespace Express {
    // tslint:disable-next-line:no-empty-interface
    interface User {
      id: string;
      role: string;
    }
  }
}

const saltRounds = 10;

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
      const user = new User();
      const hashPassword = await bcrypt.hash(value.password, saltRounds);

      const existingUser = await getManager().findOne(User, {
        where: [{ name }, { email }],
      });

      if (existingUser) {
        return res
          .status(303)
          .send({ error: [{ message: "user name or email already exist" }] });
      }

      const userRole = await getManager().findOne(Role, { name: ROLE.USER });

      if (userRole) {
        user.name = value.name;
        user.email = value.email;
        user.password = hashPassword;
        user.role = userRole;

        await getManager().save(user);
        logger.info(`create new user with id : ${user.id}`);
        return res.status(201).send({ data: { id: user.id } });
      }

      logger.error("role 'user' doesn't exist");
      return res
        .status(500)
        .send({ error: [{ message: "error during user creation process" }] });
    } catch (err) {
      logger.error(err);
      res
        .status(500)
        .send({ error: [{ message: "error during user creation process" }] });
    }
  },
  get: async function (req: express.Request, res: express.Response) {
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

      const userRepository = getRepository(User);
      const user = await userRepository.findOne({
        where: { id: value.id },
        relations: ["role"],
      });
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
