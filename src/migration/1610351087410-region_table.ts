import {MigrationInterface, QueryRunner} from "typeorm";

export class regionTable1610351087410 implements MigrationInterface {
    name = 'regionTable1610351087410'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "region" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nameEn" character varying(16) NOT NULL, "nameZhHk" character varying(16) NOT NULL, CONSTRAINT "UQ_f5b86f23a34fa179412ae1855de" UNIQUE ("nameEn"), CONSTRAINT "UQ_8a3827f8c1644dcb075bde46049" UNIQUE ("nameZhHk"), CONSTRAINT "PK_5f48ffc3af96bc486f5f3f3a6da" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "region"`);
    }

}
