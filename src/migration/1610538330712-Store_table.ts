import {MigrationInterface, QueryRunner} from "typeorm";

export class temp1610538330712 implements MigrationInterface {
    name = 'temp1610538330712'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "store" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "location" geometry NOT NULL, "branchId" uuid NOT NULL, CONSTRAINT "PK_f3172007d4de5ae8e7692759d79" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "store_address_list_address_detail" ("storeId" uuid NOT NULL, "addressDetailId" uuid NOT NULL, CONSTRAINT "PK_adde26d5f9fd9b736a60437e889" PRIMARY KEY ("storeId", "addressDetailId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_69c46675fcd4fc8fc868a647b7" ON "store_address_list_address_detail" ("storeId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d4f410f74cffd19d4c18f13772" ON "store_address_list_address_detail" ("addressDetailId") `);
        await queryRunner.query(`ALTER TABLE "store" ADD CONSTRAINT "FK_6f202a405e2209d741f8ec7e554" FOREIGN KEY ("branchId") REFERENCES "branch"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "store_address_list_address_detail" ADD CONSTRAINT "FK_69c46675fcd4fc8fc868a647b79" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "store_address_list_address_detail" ADD CONSTRAINT "FK_d4f410f74cffd19d4c18f137729" FOREIGN KEY ("addressDetailId") REFERENCES "address_detail"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "store_address_list_address_detail" DROP CONSTRAINT "FK_d4f410f74cffd19d4c18f137729"`);
        await queryRunner.query(`ALTER TABLE "store_address_list_address_detail" DROP CONSTRAINT "FK_69c46675fcd4fc8fc868a647b79"`);
        await queryRunner.query(`ALTER TABLE "store" DROP CONSTRAINT "FK_6f202a405e2209d741f8ec7e554"`);
        await queryRunner.query(`DROP INDEX "IDX_d4f410f74cffd19d4c18f13772"`);
        await queryRunner.query(`DROP INDEX "IDX_69c46675fcd4fc8fc868a647b7"`);
        await queryRunner.query(`DROP TABLE "store_address_list_address_detail"`);
        await queryRunner.query(`DROP TABLE "store"`);
    }

}
