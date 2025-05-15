// src/dto/RegisterInput.ts
import { InputType, Field } from "type-graphql";
import { ServiceType } from "../../../constants/serviceTypes";

@InputType()
export class RegisterInput {
  @Field()
  name!: string;

  @Field()
  email!: string;

  @Field()
  mobile!: string;

  @Field()
  postcode!: string;

  @Field(() => [ServiceType])
  services!: ServiceType[];
}
