import { getRepository, Repository } from "typeorm";

import { Photo as PhotoEntity } from "../entity";

export class Photo {
  private photoRepository: Repository<PhotoEntity>;

  constructor() {
    this.photoRepository = getRepository(PhotoEntity);
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
      await this.photoRepository.remove(photoToRemove);
      return;
    }

    throw new Error(`There is no photo with id:${id}`);
  }
}
