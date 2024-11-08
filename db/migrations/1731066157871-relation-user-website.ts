import { MigrationInterface, QueryRunner } from "typeorm";

export class RelationUserWebsite1731066157871 implements MigrationInterface {
    name = 'RelationUserWebsite1731066157871'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "website" ADD "userId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "website" ADD CONSTRAINT "FK_b3d649e45a6839b13478885388a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "website" DROP CONSTRAINT "FK_b3d649e45a6839b13478885388a"`);
        await queryRunner.query(`ALTER TABLE "website" DROP COLUMN "userId"`);
    }

}
