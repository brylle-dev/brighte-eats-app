import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Lead } from "../../entities/lead.entity";
import { AppDataSource } from "../../config/datasource";
import { RegisterInput } from "./types/register.inputs";

import {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
} from "../../constants/http";
import { GraphQLError } from "graphql";

@Resolver()
export class LeadResolver {
  private leadRepository = AppDataSource.getRepository(Lead);

  @Query(() => [Lead])
  async getLeads(): Promise<Lead[]> {
    try {
      return await this.leadRepository.find();
    } catch (error) {
      throw new GraphQLError("Error fetching leads", {
        extensions: { code: INTERNAL_SERVER_ERROR },
      });
    }
  }

  @Query(() => Lead, { nullable: true })
  async getLeadById(@Arg("id") id: number): Promise<Lead | null> {
    try {
      return await this.leadRepository.findOneBy({ id });
    } catch (error) {
      throw new GraphQLError(`Lead with id ${id} not found`, {
        extensions: { code: NOT_FOUND },
      });
    }
  }

  @Mutation(() => Lead)
  async registerLead(@Arg("data") data: RegisterInput): Promise<Lead> {
    try {
      const lead = this.leadRepository.create(data);
      return await this.leadRepository.save(lead);
    } catch (error) {
      console.error("Register Lead Error:", error);
      throw new GraphQLError("Failed to register lead", {
        extensions: { code: BAD_REQUEST },
      });
    }
  }
}
