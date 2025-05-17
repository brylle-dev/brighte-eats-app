import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { IsEmail } from "class-validator";
import { Lead } from "./lead.entity";

@Entity()
@ObjectType()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column("text", { unique: true })
  @IsEmail()
  email!: string;

  @Field()
  @Column()
  mobile!: string;

  @Field()
  @Column()
  postcode!: string;

  @OneToOne(() => Lead, (lead: Lead) => lead.user)
  lead!: Lead;
}
