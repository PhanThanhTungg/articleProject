export default `#graphql
  type User{
    id: String,
    fullName: String,
    email: String,
    token: String,
    code: String,
    message: String
  }

  input UserRegisterInput{
    fullName: String!,
    email: String!,
    password: String!
  }

  type Mutation{
    register(user: UserRegisterInput): User
  }
`