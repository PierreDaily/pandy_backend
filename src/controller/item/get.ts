import { Request, Response } from "express";
import Joi from "joi";

import logger from "../../logger";
import * as model from "../../model";

export const get = async (req: Request, res: Response) => {
  const schema = Joi.object({
    id: Joi.string()
      .guid({
        version: ["uuidv4"],
      })
      .required(),
  });

  const { error, value } = schema.validate(
    { id: req.params.id },
    { convert: true }
  );

  if (error) {
    return res.status(400).send({ error });
  }

  try {
    const itemModel = new model.Item();
    const item = await itemModel.findOneById(value.id);
    if (item === undefined) res.status(404).send();
    res.status(200).send({ data: item });
  } catch (err) {
    logger.error(err);
    res.status(500).send();
  }
};
