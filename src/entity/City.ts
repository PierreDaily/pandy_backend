import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";

import { AddressDetail, Region } from ".";

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

  @ManyToOne(() => Region, (region) => region.cities, { nullable: false })
  region!: Region;

  @OneToMany(() => AddressDetail, (addressDetail) => addressDetail.city)
  addressDetailList!: AddressDetail[];
}
