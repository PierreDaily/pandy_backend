import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
} from "typeorm";

import { Item, Store, User } from ".";

@Entity()
export class Price {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({
    type: "int",
  })
  discountIndex!: number;

  @Column({
    type: "int",
  })
  totalPrice!: number;

  @ManyToOne(() => Item, (item) => item.id, { nullable: false })
  item!: Item;

  @ManyToOne(() => Store, (store) => store.id, { nullable: false })
  store!: Store;

  @ManyToOne(() => User, (user) => user.id, { nullable: false })
  user!: User;

  @CreateDateColumn() public createdAt!: Date;
}
