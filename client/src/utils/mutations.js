import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        jobCount
        savedJobs {
          jobId
          image
          link
          title
          description
          authors
        }
      }
      token
    }
  }
`;

export const SAVE_JOB = gql`
  mutation saveJob($input: savedJob!) {
    saveJob(input: $input) {
      _id
      username
      email
      jobCount
      savedJobs {
        jobId
        description
        title
        image
        link
        authors
      }
    }
  }
`;

export const REMOVE_JOB = gql`
  mutation removeJob($jobId: ID!) {
    removeJob(jobId: $jobId) {
      _id
      username
      email
      savedJobs {
        jobId
        authors
        description
        title
        image
        link
      }
    }
  }
`;
