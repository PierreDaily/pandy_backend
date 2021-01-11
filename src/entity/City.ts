import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

import { Region } from "./Region";

@Entity()
export class City {
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

  @ManyToOne(() => Region, (region) => region.cities, {nullable:false})
  region!:Region;
}
