import { getRepository, Repository } from "typeorm";

import {
  Brand,
  Item as ItemEntity,
  Photo as PhotoEntity,
  User as UserEntity,
} from "../entity";

export class Item {
  private brandRepository: Repository<Brand>;
  private itemRepository: Repository<ItemEntity>;
  private photoRepository: Repository<PhotoEntity>;
  private userRepository: Repository<UserEntity>;

  constructor() {
    this.brandRepository = getRepository(Brand);
    this.itemRepository = getRepository(ItemEntity);
    this.photoRepository = getRepository(PhotoEntity);
    this.userRepository = getRepository(UserEntity);
  }

  public async create(
    userId: string,
    barcode: string,
    barcodeType: string,
    name: string,
    brand: string,
    fileName: string
  ) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (user === undefined) {
      throw new Error(`user with id: ${userId} can't be founded`);
    }
    const reqBrand = await this.brandRepository.findOne({
      where: { id: brand },
    });

    if (reqBrand === undefined) {
      throw new Error(`brand with id: ${brand} can't be founded`);
    }

    const newItem = new ItemEntity();

    newItem.barcode = barcode;
    newItem.barcodeType = barcodeType;
    newItem.description = name;
    newItem.brand = reqBrand;
    newItem.createdBy = user;

    await this.itemRepository.save(newItem);

    const newPhoto = new PhotoEntity();
    newPhoto.fileName = fileName;
    newPhoto.item = newItem;
    await this.photoRepository.save(newPhoto);

    return newItem;
  }

  public getList = async () => {
    const itemList = await this.itemRepository.find();
    return itemList;
  };
}
