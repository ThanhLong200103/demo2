
const db = require("../config/db")
class PermissionMode {
    getPermission = async (roleId)=>{
        const placeholders = roleId.map((r) => r.id);
        const [rows] = await db.query(`
            SELECT  p.name 
        FROM permissions p
        INNER JOIN role_permissions rp ON p.id = rp.permission_id
        WHERE rp.role_id IN (?)
            `,[placeholders])
            // console.log("datta quyền" , placeholders)
            return rows
    }
}

module.exports = new PermissionMode()