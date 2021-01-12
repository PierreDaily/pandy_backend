import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
  } from "typeorm";
  
  @Entity()
  export class Branch{
    @PrimaryGeneratedColumn("uuid")
    id!: string;
  
    @Column({
      type: "varchar",
      length: 50,
      unique: true,
    })
    nameEn!: string;

    @Column({
        type: "varchar",
        length: 50,
        unique: true,
      })
    nameZhHk!: string;
  }