import { Arg, Mutation, Query, Resolver, Int } from "type-graphql";
import { Lead } from "../entities/lead.entity";
import { AppDataSource } from "../config/datasource";
import { RegisterInput } from "./types/register.inputs";

import {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
} from "../constants/http";
import { GraphQLError } from "graphql";
import { User } from "../entities/user.entity";
import { LeadRecord } from "./types/lead.output";

@Resolver()
export class LeadResolver {
  private leadRepository = AppDataSource.getRepository(Lead);
  private userRepository = AppDataSource.getRepository(User);

  @Query(() => LeadRecord)
  async leadList(
    @Arg("skip", () => Int, { defaultValue: 0 }) skip: number,
    @Arg("take", () => Int, { defaultValue: 10 }) take: number
  ): Promise<LeadRecord> {
    try {
      const [leads, totalCount] = await this.leadRepository.findAndCount({
        skip,
        take,
        relations: ["user"],
        order: { createdAt: "DESC" },
      });

      return { leads, totalCount };
    } catch (error) {
      console.log("Error fetching leads", error);
      throw new GraphQLError("Error fetching leads", {
        extensions: { code: INTERNAL_SERVER_ERROR },
      });
    }
  }

  @Query(() => Lead, { nullable: true })
  async getLeadById(@Arg("id") id: number): Promise<Lead | null> {
    try {
      return await this.leadRepository.findOne({
        where: { id },
        relations: ["user"],
      });
    } catch (error) {
      throw new GraphQLError(`Lead with id ${id} not found`, {
        extensions: { code: NOT_FOUND },
      });
    }
  }

  @Query(() => Lead, { nullable: true })
  async getLeadByEmail(@Arg("email") email: string): Promise<Lead | null> {
    try {
      return await this.leadRepository.findOne({
        where: { user: { email } },
        relations: ["user"],
      });
    } catch (error) {
      throw new GraphQLError(`Lead with email ${email} not found`, {
        extensions: { code: NOT_FOUND },
      });
    }
  }

  @Mutation(() => Lead)
  async registerLead(@Arg("data") data: RegisterInput): Promise<Lead> {
    try {
      const { name, email, mobile, postcode, services } = data;

      // Check if a user with this email already exists
      const existingUser = await this.userRepository.findOne({
        where: { email },
        relations: ["lead"],
      });

      if (existingUser) {
        // Update user fields
        existingUser.name = name;
        existingUser.mobile = mobile;
        existingUser.postcode = postcode;
        existingUser.email = email;
        await this.userRepository.save(existingUser);

        // Update or create lead
        if (existingUser.lead) {
          existingUser.lead.services = services;
          const updatedLead = await this.leadRepository.save(existingUser.lead);

          updatedLead.user = existingUser;
          return updatedLead;
        } else {
          const newLead = this.leadRepository.create({
            services,
            user: existingUser,
          });
          const savedLead = await this.leadRepository.save(newLead);
          savedLead.user = existingUser;
          return savedLead;
        }
      }

      // Create new user and lead
      const newUser = this.userRepository.create({
        name,
        email,
        mobile,
        postcode,
      });
      const newLead = this.leadRepository.create({ services, user: newUser });
      const savedLead = await this.leadRepository.save(newLead);

      const leadWithUser = await this.leadRepository.findOne({
        where: { id: savedLead.id },
        relations: ["user"],
      });
      if (!leadWithUser) {
        throw new GraphQLError("Lead creation failed", {
          extensions: { code: BAD_REQUEST },
        });
      }
      return leadWithUser;
    } catch (error) {
      console.error("Register Lead Error:", error);
      throw new GraphQLError("Failed to register lead", {
        extensions: { code: BAD_REQUEST },
      });
    }
  }
}
