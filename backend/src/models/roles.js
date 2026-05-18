const db = require("../config/db")

class RoleModel {
    getRole = async (userRoleId)=>{
        const [rows] = await db.query(`
        WITH RECURSIVE role_tree AS (
            -- Bước khởi tạo: Lấy ID vai trò hiện tại của user
            SELECT id FROM roles WHERE id = ?
            UNION ALL
            -- Bước đệ quy: Tìm tất cả các vai trò con được kế thừa
            SELECT h.child_role_id
            FROM role_hierarchy h
            INNER JOIN role_tree t ON h.parent_role_id = t.id
        )
            SELECT id FROM role_tree`,[userRoleId])
        return rows
    }
}

module.exports = new RoleModel()