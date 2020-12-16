import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateCommitsStats1607903938276
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.createTable(
      new Table({
        name: 'commitsStats',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'oid',
            type: 'varchar',
          },
          {
            name: 'user_login',
            type: 'varchar',
          },
          {
            name: 'lines_added',
            type: 'int',
          },
          {
            name: 'lines_removed',
            type: 'int',
          },
          {
            name: 'date',
            type: 'timestamp',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('commitsStats');
  }
}
