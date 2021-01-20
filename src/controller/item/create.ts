import Busboy from "busboy";
import { Request, Response } from "express";
import Joi from "joi";
import { v4 } from "uuid";

import logger from "../../logger";
import * as model from "../../model";

declare global {
  namespace Express {
    // tslint:disable-next-line:no-empty-interface
    interface User {
      id: string;
      role: string;
    }
  }
}

export const create = function (req: Request, res: Response) {
  const schema = Joi.object({
    barcode: Joi.string().required(),
    barcodeType: Joi.string().required(),
    brand: Joi.string()
      .guid({
        version: ["uuidv4"],
      })
      .required(),
    fileName: Joi.string().required(),
    name: Joi.string().required(),
    userId: Joi.string()
      .guid({
        version: ["uuidv4"],
      })
      .required(),
  });

  const busboy = new Busboy({ headers: req.headers });
  const itemDetail = {
    fileName: "",
    barcode: undefined,
    barcodeType: undefined,
    brand: undefined,
    name: undefined,
    userId: req?.user?.id,
  };

  const fileRenamed = `${v4()}.jpg`;

  busboy.on("file", function (fieldname, file, filename, encoding, mimetype) {
    file.pipe(model.Photo.saveImgFile(fileRenamed));
    itemDetail.fileName = fileRenamed;
  });

  busboy.on(
    "field",
    function (
      fieldname,
      val,
      fieldnameTruncated,
      valTruncated,
      encoding,
      mimetype
    ) {
      switch (fieldname) {
        case "barcode":
          itemDetail.barcode = val;
          break;
        case "barcode_type":
          itemDetail.barcodeType = val;
          break;
        case "brand":
          itemDetail.brand = val;
          break;
        case "name":
          itemDetail.name = val;
          break;
        default:
          logger.error(`${fieldname} isn't an unknow field`);
          break;
      }
    }
  );

  busboy.on("finish", async function () {
    const { error, value } = schema.validate(itemDetail);

    if (error) {
      if (itemDetail.fileName) {
        model.Photo.removeImgFile(itemDetail.fileName);
      }

      return res.status(400).send({ error });
    }

    try {
      const itemModel = new model.Item();
      const newItem = await itemModel.create(
        value.userId,
        value.barcode,
        value.barcodeType,
        value.name,
        value.brand,
        value.fileName
      );

      res.status(201).send({ data: { newItem } });
    } catch (err) {
      logger.error(err);
      model.Photo.removeImgFile(itemDetail.fileName);
      res.status(500).send();
    }
  });

  return req.pipe(busboy);
};
