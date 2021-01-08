import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
  } from "typeorm";
  
  @Entity()
  export class Role {
    @PrimaryGeneratedColumn("uuid")
    id!: string;
  
    @Column({
      default: "user",
      type: "varchar",
      length: 10,
      unique: true,
    })
    name!: string;
  }
  