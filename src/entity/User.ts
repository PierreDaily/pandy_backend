import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  UpdateDateColumn,
} from "typeorm";
import { IsEmail } from "class-validator";

import {Role} from "./Role";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({
    type: "varchar",
    length: 64,
    unique: true,
  })
  name!: string;

  @Column({
    type: "varchar",
    length: 320,
    unique: true,
  })
  @IsEmail()
  email!: string;

  @Column({
    type: "varchar",
    length: 60,
  })
  password!: string;

  @ManyToOne(() => Role, role => role.name)
  role!: Role;

  @Column({ default: true })
  active!: boolean;

  @CreateDateColumn() public createdAt!: Date;
  @UpdateDateColumn() public updatedAt!: Date;
}
