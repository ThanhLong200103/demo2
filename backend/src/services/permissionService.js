const PermissionMode = require("../models/permission")
class PermissionService  {
    getPermission = async (roleId)=>{
        const data = await PermissionMode.getPermission(roleId)
        return data
    }
}

module.exports = new PermissionService()