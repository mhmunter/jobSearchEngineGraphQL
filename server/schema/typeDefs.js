const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
  _id: ID
  username: String
  email: String
  jobCount: Int
  savedJobs: [Job]
}

type Job {
  _id: ID
  name: String
  company: String
  category: String
  level: String
  location: String
  link: String
}

type Auth {
  token: ID!
  user: User
}

type Query {
  me: User
}

type Mutation {
  login(email: String!, password: String!): Auth
  addUser(username: String!, email: String!, password: String!): Auth
  saveJob(name: String, company: String!, level: String!, location: String!, link: String, category: String): User
  removeJob(_id: ID): User
}
`;

module.exports = typeDefs;