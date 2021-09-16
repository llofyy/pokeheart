import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class TrainerFragments1631625718377 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'trainer_fragments',
      columns: [
        {
          name: 'id',
          type: 'integer',
          isPrimary: true,
          isNullable: false,
        },

        {
          name: 'trainerId',
          type: 'integer',
          isNullable: false,
        },
        {
          name: 'fragment',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'counter',
          type: 'integer',
          isNullable: false,
        },
        {
          name: 'createdAt',
          type: 'timestamp',
          default: 'now()',
          isNullable: false,
        },
      ],
      foreignKeys: [
        {
          name: 'FKTrainer',
          columnNames: ['trainerId'],
          referencedTableName: 'trainers',
          referencedColumnNames: ['id'],
          onDelete: 'CASCADE',
        },
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('trainer_fragments');
  }
}
