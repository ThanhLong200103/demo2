const db = require("../config/db.js")

const User = {
    getAll : async()=>{
        const [row] = await db.query("SELECT * FROM users")
        return row;
    },
    getUser : async(id) =>{
       
        const[oneUser] = await db.query("SELECT * FROM users WHERE id = ? ",[id] );
        return oneUser;
    },
    createUser : async(user)=>{
        const{email ,password , name ,quantity} = user;
        const[result] = await db.query("INSERT INTO users (email, password, name,quantity) VALUES (?,?,?,?)" ,[email ,password , name ,quantity]);
        return result;
    },
    editUser : async(id,user)=>{
        const{email ,password , name ,quantity} = user;
        const[result] = await db.query("UPDATE users SET email = ?, password = ?, name = ? ,quantity = ? WHERE id = ?" ,[email ,password , name ,quantity , id]);
        return result;
    },
    deleteUser : async(id) =>{
        const[oneUser] = await db.query("DELETE FROM  users  WHERE id = ?",[id] );
        return oneUser;
    },
    editUserQuanTiTy : async(id_user,quantity ,connection = db)=>{
        
        const[result] = await connection.query("UPDATE users SET quantity = ? WHERE id = ?" ,[quantity , id_user]);
        return result;
    },
}
module.exports = User