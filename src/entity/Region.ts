import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany
  } from "typeorm";

  import {City} from "./City";
  
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

    @OneToMany(() => City, city => city.region)
    cities!: City[];
  }