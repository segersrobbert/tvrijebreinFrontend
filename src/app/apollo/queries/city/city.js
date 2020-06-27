import gql from "graphql-tag";

const CITY_QUERY = gql`
  query Cities($id: ID!) {
    city(id: $id) {
      id
      name
      description
      contact
      image {
        url
      }
    }
  }
`;

export default CITY_QUERY;
