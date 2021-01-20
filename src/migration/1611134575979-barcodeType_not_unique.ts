import {MigrationInterface, QueryRunner} from "typeorm";

export class barcodeTypeNotUnique1611134575979 implements MigrationInterface {
    name = 'barcodeTypeNotUnique1611134575979'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "item"."barcodeType" IS NULL`);
        await queryRunner.query(`ALTER TABLE "item" DROP CONSTRAINT "UQ_97b8b285cc2ef7616d46c7fe043"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" ADD CONSTRAINT "UQ_97b8b285cc2ef7616d46c7fe043" UNIQUE ("barcodeType")`);
        await queryRunner.query(`COMMENT ON COLUMN "item"."barcodeType" IS NULL`);
    }

}
