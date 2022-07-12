import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
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
    }
  }
`;
// returning only id, fix it if nesserary
export const SAVE_JOB = gql`
  mutation saveJob($name: String, $company: String!, $level: String!, $location: String!, $link: String, $category: String) {
    saveJob(name: $name, company: $company, level: $level, location: $location, link: $link, catagory: $category) {
      _id
    
    }
  }
`;

export const REMOVE_JOB = gql`
  mutation removeJob($jobId: ID!) {
    removeJob(_id: $jobId) {
      _id
      username
      email
      savedJobs {
        name
        company
        category
        level
        location
        link
      }
    }
  }
`;
