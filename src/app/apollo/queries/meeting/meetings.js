import gql from "graphql-tag";

const MEETINGS_QUERY = gql`
  query Meetings {
    meetings {
      id
      name
      description
      date
      online
      speaker
      location
    }
  }
`;

export default MEETINGS_QUERY;
