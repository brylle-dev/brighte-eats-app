import { InputType, Field } from "type-graphql";
import { IsEmail, Length } from "class-validator";
import { ServiceType } from "../../constants/serviceTypes";

@InputType()
export class RegisterInput {
  @Field()
  @Length(1, 2)
  name!: string;

  @Field()
  @IsEmail()
  email!: string;

  @Field()
  @Length(11, 11)
  mobile!: string;

  @Field()
  @Length(4, 4)
  postcode!: string;

  @Field(() => [ServiceType])
  services!: ServiceType[];
}
