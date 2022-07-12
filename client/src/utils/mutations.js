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
      }
      token
    }
  }
`;

export const SAVE_JOB = gql`
  mutation saveJob($name: String, $company: String!, $level: String!, $location: String!, $link: String, $category: String) {
    saveJob(name: $name, company: $company, level: $level, location: $location, link: $link, category: $category) {
      _id
    
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
        name
        company
        catagory
        level
        location
        link
      }
    }
  }
`;
