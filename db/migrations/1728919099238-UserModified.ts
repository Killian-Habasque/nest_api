import { MigrationInterface, QueryRunner } from "typeorm";

export class UserModified1728919099238 implements MigrationInterface {
    name = 'UserModified1728919099238'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying(150)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
    }

}
