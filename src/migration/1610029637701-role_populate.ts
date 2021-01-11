import { getManager, MigrationInterface, QueryRunner } from "typeorm";

import { ROLE } from "../constants";
import { Role } from "../entity";

export class rolePopulate1610029637701 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const roleAdmin = new Role();
    roleAdmin.name = ROLE.ADMIN;
    await getManager().save(roleAdmin);

    const roleUser = new Role();
    roleUser.name = ROLE.USER;
    await getManager().save(roleUser);
    // need to add role: USER to all users without role
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // need to delete the role on all existing user first

    const roleAdmin = await getManager().findOne(Role, { name: ROLE.ADMIN });
    const roleUser = await getManager().findOne(Role, { name: ROLE.USER });
    await getManager().remove([roleAdmin, roleUser]);
  }
}
