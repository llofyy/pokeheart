import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class Trainers1631112599467 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'trainers',
      columns: [
        {
          name: 'id',
          type: 'integer',
          isPrimary: true,
          isNullable: false,
        },
        {
          name: 'name',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'username',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'genre',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'password',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'region',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'age',
          type: 'integer',
          isNullable: false,
        },
        {
          name: 'captures',
          type: 'integer',
          isNullable: false,
        },
        {
          name: 'createdAt',
          type: 'timestamp',
          default: 'now()',
          isNullable: false,
        },
        {
          name: 'updatedAt',
          type: 'timestamp',
          default: 'now()',
          isNullable: false,
        },
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('trainers');
  }
}
