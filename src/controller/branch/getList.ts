import express from "express";
import { getRepository } from "typeorm";

import logger from "../../logger";
import { Branch } from "../../entity";

export const getList = async (req: express.Request, res: express.Response) => {
  try {
    console.log(req.headers.acce);
    const branchRepository = getRepository(Branch);
    const branchList = await branchRepository.find();

    res.status(200).send({ data: { branchList } });
  } catch (err) {
    logger.error(err);
    res.status(500).send();
  }
};
