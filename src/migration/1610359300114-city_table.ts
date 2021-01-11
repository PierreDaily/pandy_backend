import {MigrationInterface, QueryRunner} from "typeorm";

export class cityTable1610359300114 implements MigrationInterface {
    name = 'cityTable1610359300114'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "city" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nameEn" character varying(16) NOT NULL, "nameZhHk" character varying(16) NOT NULL, "regionId" uuid NOT NULL, CONSTRAINT "UQ_1dd137d019bebeb2e0a06c82746" UNIQUE ("nameEn"), CONSTRAINT "UQ_9b9c642eeb9072e885bddca367f" UNIQUE ("nameZhHk"), CONSTRAINT "PK_b222f51ce26f7e5ca86944a6739" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "city" ADD CONSTRAINT "FK_a702dde63cef536819298d776b5" FOREIGN KEY ("regionId") REFERENCES "region"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "city" DROP CONSTRAINT "FK_a702dde63cef536819298d776b5"`);
        await queryRunner.query(`DROP TABLE "city"`);
    }

}
