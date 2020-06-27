import gql from "graphql-tag";

const MEETING_QUERY = gql`
  query Meetings($id: ID!) {
    meeting(id: $id) {
      id
      name
      description
      date
      online
      speaker
      city
    }
  }
`;

export default MEETING_QUERY;
