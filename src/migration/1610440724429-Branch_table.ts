import {MigrationInterface, QueryRunner} from "typeorm";

export class BranchTable1610440724429 implements MigrationInterface {
    name = 'BranchTable1610440724429'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "branch" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nameEn" character varying(50) NOT NULL, "nameZhHk" character varying(50) NOT NULL, CONSTRAINT "UQ_6d9279fd758a92a4b712417342e" UNIQUE ("nameEn"), CONSTRAINT "UQ_96e8f84513c2110917942543064" UNIQUE ("nameZhHk"), CONSTRAINT "PK_2e39f426e2faefdaa93c5961976" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "branch"`);
    }

}
