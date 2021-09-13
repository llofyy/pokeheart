import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class TrainerPokemons1631113487086 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'trainer_pokemons',
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
          name: 'pokemonId',
          type: 'integer',
          isNullable: false,
        },

        {
          name: 'cp',
          type: 'integer',
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
        {
          name: 'FKPokemon',
          columnNames: ['pokemonId'],
          referencedTableName: 'pokemons',
          referencedColumnNames: ['id'],
          onDelete: 'CASCADE',
        },
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('trainer_pokemons');
  }
}
