
export default `#graphql
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
  #----------------
  union updateArticleOutput = Article | ResponseCode
  #----------------
  type Query{
    getListArticle(
      sortKey: String,
      sortValue: String,
      currentPage: Int = 1, # neu khong truyen gi thi = 1
      limit: Int = 3,
      filterKey: String,
      filterValue: String,
      keySearch: String
    ):[Article],
    getDetailArticle(id:ID): Article
  }
  #----------------
  type Mutation{
    createArticle(article:ArticleInput): Article
    deleteArticle(id: ID): ResponseCode
    updateArticle(id: ID, article: ArticleInput): updateArticleOutput
  }
`;