import { MigrationInterface, QueryRunner } from "typeorm";

export class AddGithubnameToUser1733581753117 implements MigrationInterface {
    name = 'AddGithubnameToUser1733581753117'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "githubname" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "githubname"`);
    }

}
