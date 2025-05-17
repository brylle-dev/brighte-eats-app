import { gql } from "@apollo/client";

export const REGISTER_LEAD = gql`
  mutation RegisterLead($data: RegisterInput!) {
    registerLead(data: $data) {
      id
      services
      user {
        email
        mobile
        name
        postcode
      }
    }
  }
`;
