
export const typeDefs = `#graphql
  # Query ~ get // Mutation ~ create, update, delete
  # type ~ kiểu dữ liệu trả về
  # input ~ kiểu dữ liệu truyền vào
  type Article{
    id: ID,
    title: String,
    avatar: String,
    description: String
  }
  type ResponseCode {
    code: String,
    message: String
  }
  #----------------
  input ArticleInput{
    title: String,
    avatar: String,
    description: String
  }
  #----------------
  union updateArticleOutput = Article | ResponseCode
  #----------------
  type Query{
    hello: String,
    getListArticle: [Article],
    getDetailArticle(id:ID): Article
  }
  #----------------
  type Mutation{
    createArticle(article:ArticleInput): Article
    deleteArticle(id: ID): ResponseCode
    updateArticle(id: ID, article: ArticleInput): updateArticleOutput
  }
`;