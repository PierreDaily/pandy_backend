import express from "express";

import logger from "../../logger";
import * as model from "../../model";

export const getList = async (req: express.Request, res: express.Response) => {
  try {
    const branchModel = new model.Branch();
    const branchList = await branchModel.getList();

    res.status(200).send({ data: { branchList } });
  } catch (err) {
    logger.error(err);
    res.status(500).send();
  }
};
