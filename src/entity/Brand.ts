import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Brand {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({
    type: "varchar",
    length: 100,
    unique: true,
  })
  nameEn!: string;

  @Column({
    type: "varchar",
    length: 100,
    unique: true,
  })
  nameZhHk!: string;
}
