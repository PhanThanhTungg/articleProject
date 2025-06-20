import Category from "../Model/Category.model";
export default{
    Query:{
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
    }
  }; 