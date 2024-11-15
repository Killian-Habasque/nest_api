import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCategories1731681045017 implements MigrationInterface {
    name = 'CreateCategories1731681045017'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "label" character varying(500) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category_tags_tag" ("categoryId" integer NOT NULL, "tagId" integer NOT NULL, CONSTRAINT "PK_6f36e7376e43305d9bbe8538752" PRIMARY KEY ("categoryId", "tagId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8744a0a3d7cfe4c05ea8b37437" ON "category_tags_tag" ("categoryId") `);
        await queryRunner.query(`CREATE INDEX "IDX_73d55448198d6acc88f9c2fbad" ON "category_tags_tag" ("tagId") `);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_32b856438dffdc269fa84434d9f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category_tags_tag" ADD CONSTRAINT "FK_8744a0a3d7cfe4c05ea8b374372" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "category_tags_tag" ADD CONSTRAINT "FK_73d55448198d6acc88f9c2fbadc" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category_tags_tag" DROP CONSTRAINT "FK_73d55448198d6acc88f9c2fbadc"`);
        await queryRunner.query(`ALTER TABLE "category_tags_tag" DROP CONSTRAINT "FK_8744a0a3d7cfe4c05ea8b374372"`);
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_32b856438dffdc269fa84434d9f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_73d55448198d6acc88f9c2fbad"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8744a0a3d7cfe4c05ea8b37437"`);
        await queryRunner.query(`DROP TABLE "category_tags_tag"`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
