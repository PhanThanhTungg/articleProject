
export const typeDefs = `#graphql
  # Query ~ get // Mutation ~ create, update, delete
  # type ~ kiểu dữ liệu trả về
  # input ~ kiểu dữ liệu truyền vào
  type Article{
    id: ID,
    title: String,
    avatar: String,
    description: String,
    category: Category
  }
  type Category{
    id: String,
    title: String,
    avatar: String
  }
  type ResponseCode {
    code: String,
    message: String
  }
  #----------------
  input ArticleInput{
    title: String,
    avatar: String,
    description: String,
    categoryId: ID
  }
  input CategoryInput {
    title: String,
    avatar: String
  }
  #----------------
  union updateArticleOutput = Article | ResponseCode
  #----------------
  type Query{
    hello: String,
    getListArticle: [Article],
    getDetailArticle(id:ID): Article
    getListCategory: [Category],
    getDetailCategory(id: ID): Category,
  }
  #----------------
  type Mutation{
    createArticle(article:ArticleInput): Article
    deleteArticle(id: ID): ResponseCode
    updateArticle(id: ID, article: ArticleInput): updateArticleOutput
    createCategory(category: CategoryInput): Category,
    deleteCategory(id: ID): ResponseCode,
    updateCategory(id: ID, category: CategoryInput): Category,
  }
`;