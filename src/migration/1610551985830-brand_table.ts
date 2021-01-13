import { MigrationInterface, QueryRunner } from "typeorm";

export class brandTable1610551985830 implements MigrationInterface {
  name = "brandTable1610551985830";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "brand" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nameEn" character varying(100) NOT NULL, "nameZhHk" character varying(100) NOT NULL, CONSTRAINT "UQ_00b7653566701647a5eae453eb4" UNIQUE ("nameEn"), CONSTRAINT "UQ_0ee71d4d8dec9be85566cbac83b" UNIQUE ("nameZhHk"), CONSTRAINT "PK_a5d20765ddd942eb5de4eee2d7f" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "brand"`);
  }
}
