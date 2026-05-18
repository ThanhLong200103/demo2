const RoleModel = require("../models/roles")
class RoleService {
    getRole = async (userRoleId)=>{
        const data = await RoleModel.getRole(userRoleId);
        return data
    }
}

module.exports = new RoleService()