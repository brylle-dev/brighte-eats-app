import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ServiceType } from "../constants/serviceTypes";

registerEnumType(ServiceType, {
  name: "ServiceType", // GraphQL enum name
});

@Entity()
@ObjectType()
export class Lead extends BaseEntity {
  @Field((_type) => ID)
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  email!: string;

  @Field()
  @Column()
  mobile!: string;

  @Field()
  @Column()
  postcode!: string;

  @Field(() => [ServiceType])
  @Column({
    type: "enum",
    enum: ServiceType,
    array: true,
  })
  services!: ServiceType[];
}
