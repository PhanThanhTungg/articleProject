import Article from "./Model/Article.model";
import Category from "./Model/Category.model";
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
      },
      getListCategory: async ()=>{
        const categorys = await Category.find({
          deleted: false
        })
        return categorys;
      },
      getDetailCategory: async(_,args)=>{ //_: tham số truyền vào chưa cần dùng
        //args là 1 object
        const {id} = args;
        const category = await Category.findOne({
          _id: id,
          deleted: false
        })
        return category;
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
        const article = await Article.findOne({_id: id, deleted: false});
        if(!article) return{
          code: "400",
          message: "error!"
        }
        await Article.updateOne({_id: id, deleted: false},{deleted: true, deletedAt: new Date()});
        return {
          code: "200",
          message: "delete successfully"
        };
      },
      updateArticle: async(_, args)=>{
        const {id, article} = args;
        let articleObject = await Article.findOne({_id: id, deleted: false});

        if(!articleObject) 
          return{
            code: "400",
            message: "error"
          }
          
        await Article.updateOne({_id: id}, article);
        articleObject = await Article.findOne({_id: id});
        return articleObject;
      },
      createCategory: async(_, args)=>{
        const {category} = args;
        const categoryObject = new Category(category);
        await categoryObject.save();
        return categoryObject;
      },
      deleteCategory: async(_, args)=>{
        const {id} = args;
        const category = await Category.findOne({_id: id, deleted: false});
        if(!category) return{
          code: "400",
          message: "error!"
        }
        await Category.updateOne({_id: id, deleted: false},{deleted: true, deletedAt: new Date()});
        return {
          code: "200",
          message: "delete successfully"
        };
      },
      updateCategory: async(_, args)=>{
        const {id, category} = args;
        await Category.updateOne({_id: id, deleted: false}, category);
        const categoryObject = await Category.findOne({_id: id});
        return categoryObject;
      }
    },
    updateArticleOutput:{
      __resolveType(Obj){
        if(Obj.code) return "ResponseCode";
        if(Obj.title) return "Article";
        return null;
      }
    }
  }; 