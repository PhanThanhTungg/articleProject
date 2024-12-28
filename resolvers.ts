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
      },
      getDetailArticle: async(_,args)=>{ //_: tham số truyền vào chưa cần dùng
        //args là 1 object
        const {id} = args;
        const article = await Article.findOne({
          _id: id,
          deleted: false
        })
        return article;
      }
    },

    Mutation:{
      createArticle: async(_, args)=>{
        const {article} = args;
        const articleObject = new Article(article);
        await articleObject.save();
        return articleObject;
      },
      deleteArticle: async(_, args)=>{
        const {id} = args;
        await Article.updateOne({_id: id},{deleted: true, deletedAt: new Date()});
        return "delete successfully";
      }
    }
  }; 