import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  OneToMany,
  UpdateDateColumn,
} from "typeorm";

import { Brand, Photo, User } from ".";

@Entity()
export class Item {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({
    type: "varchar",
    length: 30,
    unique: true,
  })
  barcode!: string;

  @Column({
    type: "varchar",
    length: 15,
    unique: true,
  })
  barcodeType!: string;

  @Column({
    type: "text",
  })
  description!: string;

  @ManyToOne(() => Brand, (brand) => brand.id)
  brand!: User;

  @ManyToOne(() => User, (user) => user.name)
  createdBy!: User;

  @OneToMany(() => Photo, (photo) => photo.item)
  photoList!: Photo[];

  @Column({ default: true })
  active!: boolean;

  @CreateDateColumn() public createdAt!: Date;
  @UpdateDateColumn() public updatedAt!: Date;
}
