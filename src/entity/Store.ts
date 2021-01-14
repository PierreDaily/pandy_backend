import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  ManyToOne,
  ManyToMany,
} from "typeorm";
import { Point } from "geojson";

import { AddressDetail, Branch } from ".";

@Entity()
export class Store {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("geometry", { srid: 4326, spatialFeatureType: "Point" })
  location!: Point;

  @ManyToOne(() => Branch, (branch) => branch.id, { nullable: false })
  branch!: Branch;

  @ManyToMany(() => AddressDetail)
  @JoinTable()
  addressList!: AddressDetail[];
}
