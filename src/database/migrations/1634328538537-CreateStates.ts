import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateStates1634328538537 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'states',
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
            name: 'abbreviation',
            type: 'varchar',
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

    await queryRunner.query(
      `INSERT INTO states (name, abbreviation)
       VALUES ('Acre', 'AC'),
              ('Alagoas', 'AL'),
              ('Amapá', 'AP'),
              ('Amazonas', 'AM'),
              ('Bahia', 'BA'),
              ('Ceará', 'CE'),
              ('Espírito Santo', 'ES'),
              ('Goiás', 'GO'),
              ('Maranhão', 'MA'),
              ('Mato Grosso', 'MT'),
              ('Mato Grosso do Sul', 'MS'),
              ('Minas Gerais', 'MG'),
              ('Pará', 'PA'),
              ('Paraíba', 'PB'),
              ('Paraná', 'PR'),
              ('Pernambuco', 'PE'),
              ('Piauí', 'PI'),
              ('Rio de Janeiro', 'RJ'),
              ('Rio Grande do Norte', 'RN'),
              ('Rio Grande do Sul', 'RS'),
              ('Rondônia', 'RO'),
              ('Roraima', 'RR'),
              ('Santa Catarina', 'SC'),
              ('Sergipe', 'SE'),
              ('Tocantins', 'TO'),
              ('Distrito Federal', 'DF')`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('states')
  }

}
