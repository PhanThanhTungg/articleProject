
export default `#graphql
  # Query ~ get // Mutation ~ create, update, delete
  # type ~ kiểu dữ liệu trả về
  # input ~ kiểu dữ liệu truyền vào
  type Category{
    id: String,
    title: String,
    avatar: String
  }
  #----------------
  input CategoryInput {
    title: String,
    avatar: String
  }
  #----------------
  type Query{
    getListCategory: [Category],
    getDetailCategory(id: ID): Category,
  }
  #----------------
  type Mutation{
    createCategory(category: CategoryInput): Category,
    deleteCategory(id: ID): ResponseCode,
    updateCategory(id: ID, category: CategoryInput): Category,
  }
`;