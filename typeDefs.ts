
export const typeDefs = `#graphql
  type Article{
    id: ID,
    title: String,
    avatar: String,
    description: String
  }
  # Query ~ get // Mutation ~ create, update, delete
  # type ~ kiểu dữ liệu trả về
  # input ~ kiểu dữ liệu truyền vào
  type Query{
    hello: String,
    getListArticle: [Article],
    getDetailArticle(id:ID): Article
  }

  input ArticleInput{
    title: String,
    avatar: String,
    description: String
  }

  type Mutation{
    createArticle(article:ArticleInput): Article
    deleteArticle(id: ID): String
  }
`;