import { gql } from "@apollo/client";

export const GET_LEAD_LIST = gql`
  query leadList($take: Int!, $skip: Int!) {
    leadList(take: $take, skip: $skip) {
      leads {
        id
        services
        user {
          id
          mobile
          name
          postcode
          email
        }
      }
      totalCount
    }
  }
`;

export const GET_LEAD_BY_ID = gql`
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
