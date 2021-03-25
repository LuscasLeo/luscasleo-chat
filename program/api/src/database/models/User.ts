import { Column, Entity, getRepository, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  username: string;
}

export const getUsersRepo = () => getRepository(User);
