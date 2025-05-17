import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ServiceType } from "../constants/serviceTypes";
import { User } from "./user.entity";

registerEnumType(ServiceType, {
  name: "ServiceType", // GraphQL enum name
});

@Entity()
@ObjectType()
export class Lead extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => [ServiceType])
  @Column({
    type: "enum",
    enum: ServiceType,
    array: true,
  })
  services!: ServiceType[];

  @OneToOne(() => User, { cascade: true })
  @JoinColumn()
  @Field(() => User)
  user!: User;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
