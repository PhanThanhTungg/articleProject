import Article from "../Model/Article.model";
import Category from "../Model/Category.model";
export default {
    Query:{
      getListArticle: async (_, args)=>{
        const {sortKey, sortValue} = args;
        const sort = {};
        if(sortKey && sortValue) sort[sortKey] = sortValue;

        const articles = await Article.find({
          deleted: false
        }).sort(sort);
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
      }
    },

    Article:{
      // item là object trả vê ở phần query
      category: async(item)=>{
        const categoryId = item.categoryId;
        const category = await Category.findOne({
          _id: categoryId,
          deleted: false
        });
  
        return category;
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