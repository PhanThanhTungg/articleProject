import md5 from "md5";
import User from "../Model/User.model";
export default {
  Mutation:{
    register: async(_, args)=>{
      const {user} = args;
      const checkUser = await User.findOne({
        email: user.email,
        deleted: false
      })

      if(checkUser) 
        return{
          code: "400",
          message: "email exists"
        }

      user.password= md5[user.password];
      
      const UserObject = new User(user);
      await UserObject.save();

      return{
        ...UserObject,
        code:"200",
        message:"register successfully"
      }

    }
  }
}