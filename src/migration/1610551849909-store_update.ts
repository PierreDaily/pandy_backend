import {MigrationInterface, QueryRunner} from "typeorm";

export class storeUpdate1610551849909 implements MigrationInterface {
    name = 'storeUpdate1610551849909'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "store"."location" IS NULL`);
        await queryRunner.query(`ALTER TABLE "store" ALTER COLUMN "location" TYPE geometry`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "store" ALTER COLUMN "location" TYPE geometry(GEOMETRY,0)`);
        await queryRunner.query(`COMMENT ON COLUMN "store"."location" IS NULL`);
    }

}
