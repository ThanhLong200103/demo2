const db = require("../config/db")

class AddressUserModel {
    getAllAddressUser = async (userId)=>{
        const [row] = await db.query("SELECT ud.id ,ud.home_number , 	ud.district , ud.province ,ud.is_default ,u.name, u.phone FROM user_addresses ud JOIN users u ON u.id = ud.user_id  WHERE ud.user_id = ? AND ud.status = 'active'",[userId])
        return row;
    }
    getOneAddressUser = async (userId ,id ,conn = db)=>{
        const [row] = await conn.query("SELECT id ,home_number , 	district , province ,is_default FROM user_addresses WHERE id = ? AND user_id = ? AND status = 'active' FOR UPDATE  ",[id, userId])
        return row[0];
    }
    createAddressUser = async (data, conn = db)=>{
        const {userId ,home_number , 	district , province ,is_default} = data;
        console.log("userId:", userId);
        const [row] = await conn.query("INSERT INTO user_addresses (user_id,home_number,district,province,is_default) VALUES (?,?,?,?,?)",[userId ,home_number , 	district , province ,is_default])
        return row;
    }
    editAddressUser = async (data, conn = db)=>{
        const {id ,home_number ,userId ,district , province ,is_default} = data;
        const [row] = await conn.query("UPDATE user_addresses SET home_number = ? , district = ? , province = ? , is_default = ? WHERE id = ? AND user_id = ?",[home_number , 	district , province ,is_default, id, userId])
        return row;
    }
    deleteAddressUser = async (id, userId)=>{
        const [row] = await db.query("UPDATE user_addresses SET status = 'delete' WHERE id = ? AND user_id = ?",[id, userId])
        return row;
    }
///default
    updateDefaultAddress = async (userID , conn = db) => {
        const res = await conn.query("UPDATE user_addresses SET is_default = false WHERE is_default = true AND user_id = ?", [userID]);
        return res;
    }
    getAllAddressUserDefault = async (userId, conn = db)=>{
        const [row] = await conn.query("SELECT  ud.id ,ud.home_number , 	ud.district , ud.province ,ud.is_default ,u.name, u.phone FROM user_addresses ud JOIN users u ON u.id = ud.user_id  WHERE ud.user_id = ? AND ud.is_default = true",[userId])
        return row;
    }
}

module.exports = new AddressUserModel();