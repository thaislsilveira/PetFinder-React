import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class createPets1608984897440 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'pets',
        columns: [
          {
            name: 'id',
            type: 'integer',
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'type',
            type: 'boolean',
            default: false,
          },
          {
            name: 'latitude',
            type: 'decimal',
            scale: 10,
            precision: 2,
          },
          {
            name: 'longitude',
            type: 'decimal',
            scale: 10,
            precision: 2,
          },
          {
            name: 'sex',
            type: 'boolean',
            default: false,
          },
          {
            name: 'port',
            type: 'text',
          },
          {
            name: 'breed',
            type: 'text',
          },
          {
            name: 'information',
            type: 'text',
          },
          {
            name: 'responsible_name',
            type: 'text',
          },
          {
            name: 'phone',
            type: 'text',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('pets');
  }
}
