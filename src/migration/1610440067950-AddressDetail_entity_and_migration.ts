import {MigrationInterface, QueryRunner} from "typeorm";

export class AddressDetailEntityAndMigration1610440067950 implements MigrationInterface {
    name = 'AddressDetailEntityAndMigration1610440067950'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address_detail" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "detailEn" character varying(200) NOT NULL, "detailZhHk" character varying(200) NOT NULL, "cityId" uuid NOT NULL, CONSTRAINT "UQ_26e7a07677cc924c55034815484" UNIQUE ("detailEn"), CONSTRAINT "UQ_ab81923384d42cd89abed9ebad1" UNIQUE ("detailZhHk"), CONSTRAINT "PK_30d6456017efe972dcd5d2e45ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "address_detail" ADD CONSTRAINT "FK_308e1d3739d447cc8d8ad108dd0" FOREIGN KEY ("cityId") REFERENCES "city"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address_detail" DROP CONSTRAINT "FK_308e1d3739d447cc8d8ad108dd0"`);
        await queryRunner.query(`DROP TABLE "address_detail"`);
    }

}
