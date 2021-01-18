import bcrypt from "bcrypt";
import { getManager, getRepository, Repository } from "typeorm";

import logger from "../logger";
import { ROLE } from "../constants";
import { Role } from "../entity/Role";
import { User as UserEntity } from "../entity";

const saltRounds = 10;

export class User {
  private userRepository: Repository<UserEntity>;

  constructor() {
    this.userRepository = getRepository(UserEntity);
  }

  static async create(name: string, email: string, password: string) {
    const user = new UserEntity();
    const hashPassword = await bcrypt.hash(password, saltRounds);
    const userRole = await getManager().findOne(Role, { name: ROLE.USER });

    if (userRole) {
      user.name = name;
      user.email = email;
      user.password = hashPassword;
      user.role = userRole;

      await getManager().save(user);
      logger.info(`create new user with id : ${user.id}`);
      return user.id;
    }
    throw new Error("Error during user creation process");
  }

  static async exist({ email, name }: { email?: string; name?: string }) {
    const user = await getManager().findOne(UserEntity, {
      where: [{ name }, { email }],
    });

    if (user) return true;
    return false;
  }

  async findOne({ id }: { id?: string }) {
    const user = await this.userRepository.findOne({
      where: { id: id },
      relations: ["role"],
    });

    return user;
  }
}
