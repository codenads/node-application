import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCollaboratorsTable1628572224991
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "collaborators",
        columns: [
          { name: "id", type: "varchar", isPrimary: true },
          { name: "cpf", type: "varchar", length: "14", isUnique: true },
          { name: "name", type: "varchar", length: "100" },
          { name: "email", type: "varchar", length: "100" },
          { name: "techs", type: "varchar[]" },
          { name: "phone", type: "varchar", isNullable: true },
          { name: "validatedAt", type: "date", isNullable: true },
          {
            name: "status",
            type: "boolean",
            isNullable: true,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("collaborators");
  }
}
