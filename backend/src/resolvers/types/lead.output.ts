import { ObjectType, Field, Int } from "type-graphql";
import { Lead } from "../../entities/lead.entity";

@ObjectType()
export class LeadRecord {
  @Field(() => [Lead])
  leads!: Lead[];

  @Field(() => Int)
  totalCount!: number;
}
