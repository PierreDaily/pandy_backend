import {MigrationInterface, QueryRunner} from "typeorm";

export class storeLocationUpdate1610608468986 implements MigrationInterface {
    name = 'storeLocationUpdate1610608468986'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "store"."location" IS NULL`);
        await queryRunner.query(`ALTER TABLE "store" ALTER COLUMN "location" TYPE geometry(Point,4326)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "store" ALTER COLUMN "location" TYPE geometry(GEOMETRY,0)`);
        await queryRunner.query(`COMMENT ON COLUMN "store"."location" IS NULL`);
    }

}
