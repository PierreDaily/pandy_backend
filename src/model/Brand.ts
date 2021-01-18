import { getRepository, Like, Repository } from "typeorm";

import { Brand as BrandEntity } from "../entity";

export class Brand {
  private brandRepository: Repository<BrandEntity>;

  constructor() {
    this.brandRepository = getRepository(BrandEntity);
  }

  public async create(name: string) {
    const newBrand = new BrandEntity();
    newBrand.nameEn = name;
    newBrand.nameZhHk = name;

    await this.brandRepository.save(newBrand);
    return newBrand;
  }

  public async findAll({
    limit,
    offset,
    order,
    search,
    strict,
  }: {
    limit?: number;
    offset?: number;
    order?: "ASC" | "DESC";
    search?: string;
    strict?: boolean;
  }) {
    return await this.brandRepository.find({
      order: {
        nameEn: order || "ASC",
      },
      skip: offset,
      take: limit,
      where: search
        ? [
            {
              nameEn: Like(`${search}${strict || false ? "" : "%"}`),
            },
            {
              nameZhHk: Like(`${search}${strict || false ? "" : "%"}`),
            },
          ]
        : undefined,
    });
  }

  public async findOne({ id, name }: { id?: string; name?: string }) {
    return await this.brandRepository.findOne({
      where: [{ nameEn: name }, { nameZhHk: name }, { id }],
    });
  }

  public async remove(id: string) {
    const brandToDelete = await this.brandRepository.findOne(id);

    if (brandToDelete) {
      this.brandRepository.remove(brandToDelete);
      return true;
    }
    return false;
  }
}
