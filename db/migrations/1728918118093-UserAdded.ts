import { MigrationInterface, QueryRunner } from "typeorm";

export class UserAdded1728918118093 implements MigrationInterface {
    name = 'UserAdded1728918118093'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "filename"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "views"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isPublished"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "username" character varying(500) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "isPublished" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "views" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "filename" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "description" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "name" character varying(500) NOT NULL`);
    }

}
