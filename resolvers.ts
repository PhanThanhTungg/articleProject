import Article from "./Model/Article.model";
export const resolvers = {
    Query:{
      hello:()=>{
        return "hello worlddd";
      },
      getListArticle: async ()=>{
        const articles = await Article.find({
          deleted: false
        })
        return articles;
      }
    }
  }; 