import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  ManyToOne,
  ManyToMany,
} from "typeorm";
import { Geometry } from "geojson";

import { AddressDetail, Branch } from ".";

@Entity()
export class Store {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "geometry" })
  location!: Geometry;

  @ManyToOne(() => Branch, (branch) => branch.id, { nullable: false })
  branch!: Branch;

  @ManyToMany(() => AddressDetail)
  @JoinTable()
  addressList!: AddressDetail[];
}
