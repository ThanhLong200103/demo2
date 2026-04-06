const UserModel = require("../models/UserModel")

class UserService {
    getAll = async ()=>{
        const data = await UserModel.getAll();
        return data
    }
    userLogin = async (data)=>{
        const result = await UserModel.userLogin(data);
        return result ;
    }
    checkProfile = async (email)=>{
        const profile = await UserModel.getUser(email) ;
        return profile;
    }
    register = async (data)=>{
        const result = await UserModel.createUser(data);
        return result;
    }
    
}
module.exports = new UserService();