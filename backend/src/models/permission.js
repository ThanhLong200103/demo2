
const db = require("../config/db")
class PermissionMode {
    getPermission = async (roleId)=>{
        if (!roleId || !Array.isArray(roleId) || roleId.length === 0) {
            return []; // Trả về mảng rỗng luôn, không chạy SQL nữa
        }

        const placeholders = roleId.map((r) => r.id);

        // 2. Dự phòng trường hợp map xong ra mảng toàn undefined/null
        if (placeholders.filter(Boolean).length === 0) {
            return [];
        }
    
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