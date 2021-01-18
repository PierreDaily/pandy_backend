import { getRepository, Repository } from "typeorm";

import { Branch as BranchEntity } from "../entity";

export class Branch {
  private branchRepository: Repository<BranchEntity>;

  constructor() {
    this.branchRepository = getRepository(BranchEntity);
  }

  public getList = async () => {
    const branchList = await this.branchRepository.find();
    return branchList;
  };
}
