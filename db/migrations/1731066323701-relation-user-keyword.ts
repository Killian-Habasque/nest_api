import { MigrationInterface, QueryRunner } from "typeorm";

export class RelationUserKeyword1731066323701 implements MigrationInterface {
    name = 'RelationUserKeyword1731066323701'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "keyword" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "keyword" ADD CONSTRAINT "FK_a5072e1cad201e2caf5efa7e8c5" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "keyword" DROP CONSTRAINT "FK_a5072e1cad201e2caf5efa7e8c5"`);
        await queryRunner.query(`ALTER TABLE "keyword" DROP COLUMN "userId"`);
    }

}
