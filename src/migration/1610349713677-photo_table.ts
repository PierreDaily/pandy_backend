import {MigrationInterface, QueryRunner} from "typeorm";

export class photoTable1610349713677 implements MigrationInterface {
    name = 'photoTable1610349713677'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "photo" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fileName" character varying(40) NOT NULL, CONSTRAINT "UQ_8eaed92bb332d14292025cbc2b4" UNIQUE ("fileName"), CONSTRAINT "PK_723fa50bf70dcfd06fb5a44d4ff" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "photo"`);
    }

}
