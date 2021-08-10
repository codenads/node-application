import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity("collaborators")
class Collaborator {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  cpf: string;

  @Column()
  phone: string;

  @Column({ array: true })
  techs: string;

  @Column()
  status?: boolean;

  @Column()
  validatedAt: Date;
}

export default Collaborator;
