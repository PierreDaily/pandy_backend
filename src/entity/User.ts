import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  UpdateDateColumn,
} from "typeorm";
import { IsEmail } from "class-validator";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "varchar",
    length: 64,
    unique: true,
  })
  name: string;

  @Column({
    type: "varchar",
    length: 320,
    unique: true,
  })
  @IsEmail()
  email: string;

  @Column({
    type: "varchar",
    length: 60,
  })
  password: string;

  @Column({
    type: "varchar",
    length: 10,
  })
  role: string;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn() public createdAt: Date;
  @UpdateDateColumn() public updatedAt: Date;
}
