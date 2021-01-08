import bcrypt from "bcrypt";
import express from "express";
import Joi from "joi";
import jwt from "jsonwebtoken";
import { getRepository } from "typeorm";

import logger from "../../logger";
import { User } from "../../entity/User";

import * as constants from "../../constants";

const {
  auth: { ACCESS_TOKEN_EXPIRY_TIME, REFRESH_TOKEN_EXPIRY_TIME },
} = constants;

const {
  env: { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY },
} = process;

interface Payload {
  id: string;
  role: string;
}

const jwtVerifyPromise = (token: string, key: string): Promise<Payload> =>
  new Promise((resolve, reject) => {
    jwt.verify(token, key, function (err, decoded: any) {
      if (!err) {
        resolve(decoded);
      } else {
        reject(err);
      }
    });
  });

export const auth = {
  authenticateUser: async function (
    req: express.Request,
    res: express.Response
  ) {
    function _createAccessToken(payload: string | Payload) {
      if (ACCESS_TOKEN_KEY) {
        return jwt.sign(payload, ACCESS_TOKEN_KEY, {
          expiresIn: ACCESS_TOKEN_EXPIRY_TIME,
        });
      }
      return;
    }

    function _createRefreshToken(payload: string | Payload) {
      if (REFRESH_TOKEN_KEY) {
        return jwt.sign(payload, REFRESH_TOKEN_KEY, {
          expiresIn: REFRESH_TOKEN_EXPIRY_TIME,
        });
      }
      return;
    }

    const {
      body: { email, password },
      headers: { refresh_token },
    } = req;

    try {
      if (refresh_token && typeof refresh_token === "string") {
        const schemaRefreshToken = Joi.object({
          refresh_token: Joi.string(),
        });

        const { error } = schemaRefreshToken.validate({ refresh_token });

        if (error) {
          return res.status(400).send({ error });
        }

        let decoded: Payload = { id: "", role: "" };

        try {
          if (REFRESH_TOKEN_KEY) {
            decoded = await jwtVerifyPromise(refresh_token, REFRESH_TOKEN_KEY);
          } else {
            logger.error("REFRESH_TOKEN_KEY is udefined");
            res.status(500).send();
          }
        } catch (err) {
          logger.warn(err);
          return res
            .status(401)
            .send({ error: { message: "Invalid refresh token" } });
        }

        return res.send({
          data: {
            access_token: _createAccessToken({
              id: decoded.id,
              role: decoded.role,
            }),
          },
        });
      }

      const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      });

      const { error } = schema.validate({ email, password });

      if (error) {
        return res.status(400).send({ error });
      }

      const userRepository = getRepository(User);
      const existingUser = await userRepository.findOne({ where: {email}, relations: ["role"] });

      if (existingUser && existingUser.password) {
        const isValid = await bcrypt.compare(password, existingUser.password);

        if (isValid) {
          return res.send({
            data: {
              access_token: _createAccessToken({
                id: existingUser.id,
                role: existingUser.role.name,
              }),
              refresh_token: _createRefreshToken({
                id: existingUser.id,
                role: existingUser.role.name,
              }),
            },
          });
        }

        return res.status(401).send({ error: { message: "Wrong password" } });
      }

      return res.status(401).send({ error: { message: "Unknow email" } });
    } catch (err) {
      logger.error(err);
      res.status(500).send();
    }
  },
};
