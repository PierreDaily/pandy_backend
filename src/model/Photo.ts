import fs from "fs";
import path from "path";

import logger from "../logger";
import { getRepository, Repository } from "typeorm";
import { Item as ItemEntity, Photo as PhotoEntity } from "../entity";

export class Photo {
  private itemRepository: Repository<ItemEntity>;
  private photoRepository: Repository<PhotoEntity>;

  constructor() {
    this.itemRepository = getRepository(ItemEntity);
    this.photoRepository = getRepository(PhotoEntity);
  }

  static async removeImgFile(fileName: string) {
    const filePath = path.join("../upload/img/", fileName);
    try {
      await fs.promises.access(filePath, fs.constants.F_OK);
      await fs.promises.unlink(filePath);
    } catch (err) {
      logger.error(err);
    }
  }

  static saveImgFile(fileName: string) {
    const saveTo = path.join("../upload/img/", fileName);
    return fs.createWriteStream(saveTo);
  }

  public async create(fileName: string, itemId: string) {
    const newPhoto = new PhotoEntity();
    const reqItem = await this.itemRepository.findOne({
      where: { id: itemId },
    });

    if (reqItem) {
      newPhoto.fileName = fileName;
      newPhoto.item = reqItem;
      await this.photoRepository.save(newPhoto);
      return newPhoto;
    }
    return;
  }

  public getByItemId = async (itemId: string) => {
    const photoList = await this.photoRepository.find({
      where: { item: itemId },
    });

    return photoList;
  };

  public async remove(id: string) {
    const photoToRemove = await this.photoRepository.findOne({ where: { id } });
    if (photoToRemove) {
      await Photo.removeImgFile(photoToRemove.fileName);
      await this.photoRepository.remove(photoToRemove);
      return;
    }

    throw new Error(`There is no photo with id:${id}`);
  }
}
