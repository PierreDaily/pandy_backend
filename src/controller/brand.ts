import express from "express";
import Joi from "joi";
import { getRepository, Like } from "typeorm";

import logger from "../logger";
import { Brand } from "../entity";

export const brand = {
  create: async function (req: express.Request, res: express.Response) {
    const brandRepository = getRepository(Brand);

    const schema = Joi.object({
      name: Joi.string().required(),
    });

    const { name } = req.body;

    const validation = schema.validate({ name });

    if (validation.error) {
      return res.status(400).send({ error: validation.error });
    }

    try {
      const formatedName = validation.value.name.toLowerCase();
      const reqBrand = await brandRepository.findOne({
        where: [
          {
            nameEn: formatedName,
          },
          {
            nameZhHk: formatedName,
          },
        ],
      });

      if (reqBrand) {
        return res
          .status(403)
          .json({ error: { message: "brand already exist" } });
      }

      const newBrand = new Brand();
      newBrand.nameEn = formatedName;
      newBrand.nameZhHk = formatedName;

      await brandRepository.save(newBrand);

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

    const brandRepository = getRepository(Brand);

    try {
      const result = await brandRepository.find({
        order: {
          nameEn: validation.value.order || "ASC",
        },
        skip: validation.value.offset,
        take: validation.value.limit,
        where: search
          ? [
              {
                nameEn: Like(
                  `${validation.value.search}${
                    validation.value.strict || false ? "" : "%"
                  }`
                ),
              },
              {
                nameZhHk: Like(
                  `${validation.value.search}${
                    validation.value.strict || false ? "" : "%"
                  }`
                ),
              },
            ]
          : undefined,
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

    const brandRepository = getRepository(Brand);
    try {
      const brandToDelete = await brandRepository.findOne(validation.value.id);

      if (brandToDelete) {
        brandRepository.remove(brandToDelete);
        return res.status(204).send();
      }

      return res.status(404).send();
    } catch (err) {
      logger.error(err);
      return res.status(500).send();
    }
  },
};
