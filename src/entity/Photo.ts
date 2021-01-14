import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

import { Item } from ".";
@Entity()
export class Photo {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({
    type: "varchar",
    length: 40,
    unique: true,
  })
  fileName!: string;

  @ManyToOne(() => Item, (item) => item.photoList, { nullable: false })
  item!: Item;
}
