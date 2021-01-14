import {MigrationInterface, QueryRunner} from "typeorm";

export class itemTable1610609127591 implements MigrationInterface {
    name = 'itemTable1610609127591'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "item" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "barcode" character varying(30) NOT NULL, "barcodeType" character varying(15) NOT NULL, "description" text NOT NULL, "active" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "brandId" uuid, "createdById" uuid, CONSTRAINT "UQ_37d13d4530be2b2a772fc25fbbf" UNIQUE ("barcode"), CONSTRAINT "UQ_97b8b285cc2ef7616d46c7fe043" UNIQUE ("barcodeType"), CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "photo" ADD "itemId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "item" ADD CONSTRAINT "FK_9e2a16fa67338b5d7ba015b4e98" FOREIGN KEY ("brandId") REFERENCES "brand"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "item" ADD CONSTRAINT "FK_23842f1bc57d2d527bbf6d14d8d" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "photo" ADD CONSTRAINT "FK_6dc0845026d33557d52bfc936cc" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "photo" DROP CONSTRAINT "FK_6dc0845026d33557d52bfc936cc"`);
        await queryRunner.query(`ALTER TABLE "item" DROP CONSTRAINT "FK_23842f1bc57d2d527bbf6d14d8d"`);
        await queryRunner.query(`ALTER TABLE "item" DROP CONSTRAINT "FK_9e2a16fa67338b5d7ba015b4e98"`);
        await queryRunner.query(`ALTER TABLE "photo" DROP COLUMN "itemId"`);
        await queryRunner.query(`DROP TABLE "item"`);
    }

}
