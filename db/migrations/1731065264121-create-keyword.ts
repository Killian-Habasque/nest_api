import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateKeyword1731065264121 implements MigrationInterface {
    name = 'CreateKeyword1731065264121'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "keyword" ("id" SERIAL NOT NULL, "label" character varying(500) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_affdb8c8fa5b442900cb3aa21dc" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "keyword"`);
    }

}
