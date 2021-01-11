import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
  } from "typeorm";
  
  @Entity()
  export class Region{
    @PrimaryGeneratedColumn("uuid")
    id!: string;
  
    @Column({
      type: "varchar",
      length: 16,
      unique: true,
    })
    nameEn!: string;

    @Column({
        type: "varchar",
        length: 16,
        unique: true,
      })
    nameZhHk!: string;
  }