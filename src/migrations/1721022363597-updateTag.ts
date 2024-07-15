import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTag1721022363597 implements MigrationInterface {
  name = 'UpdateTag1721022363597';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tag" ADD "description" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "company" ADD "recommendation" integer NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "company" DROP COLUMN "recommendation"`,
    );
    await queryRunner.query(`ALTER TABLE "tag" DROP COLUMN "description"`);
  }
}
