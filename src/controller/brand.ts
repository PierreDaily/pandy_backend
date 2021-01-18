import express from "express";
import Joi from "joi";
import { getRepository, Like } from "typeorm";

import * as model from "../model";
import logger from "../logger";

export const brand = {
  create: async function (req: express.Request, res: express.Response) {
    const schema = Joi.object({
      name: Joi.string().required(),
    });

    const { name } = req.body;

    const validation = schema.validate({ name });

    if (validation.error) {
      return res.status(400).send({ error: validation.error });
    }

    try {
      const brandModel = new model.Brand();
      const formatedName = validation.value.name.toLowerCase();

      const reqBrand = await brandModel.findOne({ name: formatedName });

      if (reqBrand) {
        return res
          .status(403)
          .json({ error: { message: "brand already exist" } });
      }

      const newBrand = await brandModel.create(formatedName);

      return res
        .status(201)
        .send({ data: { name: formatedName, id: newBrand.id } });
    } catch (err) {
      logger.error(err);
      res.status(500).send({
        error: { message: "error during the brand creation process" },
      });
    }
  },
  findAll: async function (req: express.Request, res: express.Response) {
    const schema = Joi.object({
      limit: Joi.number(),
      offset: Joi.number(),
      order: Joi.string().valid(...["ASC", "DESC"]),
      search: Joi.string(),
      strict: Joi.boolean(),
    });

    const {
      query: { limit, offset, order, search, strict },
    } = req;

    interface ValidValues {
      limit?: number;
      offset?: number;
      order?: "ASC" | "DESC";
      search?: string;
      strict?: boolean;
    }

    interface Validation extends Joi.ValidationResult {
      value: ValidValues;
    }

    const validation: Validation = schema.validate(
      { limit, offset, order, search, strict },
      { convert: true }
    );

    if (validation.error) {
      return res.status(400).send({ error: validation.error });
    }

    try {
      const brandModel = new model.Brand();
      const result = await brandModel.findAll({
        limit: validation.value.limit,
        offset: validation.value.offset,
        order: validation.value.order,
        search: validation.value.search,
        strict: validation.value.strict,
      });

      res.send({ data: { brand: result } });
    } catch (err) {
      logger.error(err);
      res.status(404);
    }
  },
  remove: async function (req: express.Request, res: express.Response) {
    const schema = Joi.object({
      id: Joi.string()
        .guid({
          version: ["uuidv4"],
        })
        .required(),
    });

    const {
      params: { id },
    } = req;

    interface Validation extends Joi.ValidationResult {
      value: {
        id: string;
      };
    }

    const validation: Validation = schema.validate({
      id,
    });

    if (validation.error) {
      return res.status(400).send({ error: validation.error });
    }

    const brandModel = new model.Brand();
    try {
      if (await brandModel.remove(validation.value.id)) {
        return res.status(204).send();
      }

      return res.status(404).send();
    } catch (err) {
      logger.error(err);
      return res.status(500).send();
    }
  },
};
