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
    
}
module.exports = new UserService();