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

      user.password= md5(user.password);
      
      const UserObject = new User(user);
      await UserObject.save();

      return{
        ...UserObject,
        code:"200",
        message:"register successfully"
      }

    },

    login: async(_, args)=>{
      const {email, password} = args.user;
      const existUser = await User.findOne({
        email: email,
        deleted: false
      });
    
      if(!existUser) {
        return {
          code: "400",
          message: "email doesn't exist"
        };
      }
    
      if(md5(password) != existUser.password) 
        return {
          code: "400",
          message: "wrong password"
        }
      
      const ObjectUser = existUser.toObject();
      ObjectUser["id"] = ObjectUser._id;
      return {
        code: "200",
        message: "login successfully",
        ...ObjectUser
      }
    }
  }
}