import { getManager, MigrationInterface, QueryRunner } from "typeorm";

import { role } from "../constants";
import { Role } from "../entity";

export class rolePopulate1610029637701 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const roleAdmin = new Role();
    roleAdmin.name = role.ADMIN;
    await getManager().save(roleAdmin);

    const roleUser = new Role();
    roleUser.name = role.USER;
    await getManager().save(roleUser);
    // need to add role: USER to all users without role
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // need to delete the role on all existing user first

    const roleAdmin = await getManager().findOne(Role, { name: role.ADMIN });
    const roleUser = await getManager().findOne(Role, { name: role.USER });
    await getManager().remove([roleAdmin, roleUser]);
  }
}
