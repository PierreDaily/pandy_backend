import {MigrationInterface, QueryRunner} from "typeorm";

export class priceTable1610611174809 implements MigrationInterface {
    name = 'priceTable1610611174809'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "price" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "discountIndex" integer NOT NULL, "totalPrice" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "itemId" uuid NOT NULL, "storeId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_d163e55e8cce6908b2e0f27cea4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "price" ADD CONSTRAINT "FK_7d2d28622a23f2ad970f11bed98" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "price" ADD CONSTRAINT "FK_c6678c3b2ee5c2988c733cacd42" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "price" ADD CONSTRAINT "FK_4e0f084c9bc8bb0992519b8bcca" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "price" DROP CONSTRAINT "FK_4e0f084c9bc8bb0992519b8bcca"`);
        await queryRunner.query(`ALTER TABLE "price" DROP CONSTRAINT "FK_c6678c3b2ee5c2988c733cacd42"`);
        await queryRunner.query(`ALTER TABLE "price" DROP CONSTRAINT "FK_7d2d28622a23f2ad970f11bed98"`);
        await queryRunner.query(`DROP TABLE "price"`);
    }

}
