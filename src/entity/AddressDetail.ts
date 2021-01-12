import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

import { City } from "./City";

@Entity()
export class AddressDetail {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({
    type: "varchar",
    length: 200,
    unique: true,
  })
  detailEn!: string;

  @Column({
    type: "varchar",
    length: 200,
    unique: true,
  })
  detailZhHk!: string;

  @ManyToOne(() => City, (city) => city.addressDetailList, {nullable:false})
  city!:City;
}
