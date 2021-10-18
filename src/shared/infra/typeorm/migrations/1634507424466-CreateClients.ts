import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateClients1634507424466 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'clients',
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
            name: 'gender',
            type: 'varchar',
          },
          {
            name: 'birthDate',
            type: 'timestamp',
          },
          {
            name: 'city_id',
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
    );

    await queryRunner.createForeignKey('clients', new TableForeignKey({
      name: 'ClientsCity',
      columnNames: ['city_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'cities'
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('clients', 'ClientsCity')
    await queryRunner.dropTable('ClientsCity')
  }

}
