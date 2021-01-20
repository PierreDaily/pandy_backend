import { Request, Response } from "express";
import Joi from "joi";

import logger from "../../logger";
import * as model from "../../model";

export const getAll = async (req: Request, res: Response) => {
  const schema = Joi.object({
    brand_name: Joi.string(),
    limit: Joi.number(),
    name: Joi.string(),
    offset: Joi.number(),
    order: Joi.string().valid(...["asc", "desc"]),
    strict: Joi.boolean(),
  });

  try {
    const {
      query: { brand_name, limit, name, offset, order, strict },
    } = req;

    const { error, value } = schema.validate(
      { brand_name, limit, name, offset, order, strict },
      { convert: true }
    );

    if (error) {
      return res.status(400).send({ error });
    }

    const itemModel = new model.Item();
    const items = await itemModel.getList();
    res.status(200).send({ data: { item: items } });
  } catch (err) {
    logger.error(err);
    res.status(500).send();
  }
};
