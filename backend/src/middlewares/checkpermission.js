const permissionService = require("../services/permissionService");
const RoleService = require("../services/roleService")
const CheckPermission = (requiredPermission) =>{
  return async (req, res, next) => {
    const userRoleId = req.user.role_id; 
    const userRoleName = req.user.role_name;
    if (userRoleName === 'super_admin') {
      return next();
    }
    try {
      const roleId = await RoleService.getRole(userRoleId)
      if(roleId){
        const datas = await permissionService.getPermission(roleId)
        // console.log("Số quyền đã có là",datas)
        const userPermissions = datas.map(data => data.name);
        if (userPermissions.includes(requiredPermission)) {
        return next(); // Hợp lệ, cho phép truy cập API
      }
      }
      return res.status(403).json({ 
        message: `Bạn không có quyền thực hiện hành động này` 
      });
      
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}
module.exports = CheckPermission