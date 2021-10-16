import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateCities1634328588904 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cities',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'state_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()'
          }
        ]
      })
    )

    await queryRunner.createForeignKey('cities', new TableForeignKey({
      name: 'CitiesState',
      columnNames: ['state_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'states'
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('cities', 'CitiesState')
    await queryRunner.dropTable('cities')
  }

}
