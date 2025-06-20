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

  input UserLoginInput{
    email: String!,
    password: String!
  }

  type Query{
    getUser: User
  }

  type Mutation{
    register(user: UserRegisterInput): User
    login(user: UserLoginInput): User
  }
`