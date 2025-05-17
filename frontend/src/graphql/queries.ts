import { gql } from "@apollo/client";

export const getLeads = gql`
  query GetLeads {
    getLeads {
      id
      name
      email
      mobile
      postcode
      services
    }
  }
`;

export const getLeadById = gql`
  query GetLeadById($id: Float!) {
    getLeadById(id: $id) {
      id
      name
      email
      mobile
      postcode
      services
    }
  }
`;
