const db = require("../config/db.js")

const User = {
    getAll : async()=>{
        const [row] = await db.query("SELECT * FROM users")
        return row;
    },
    getUserUpdate : async(id) =>{
       
        const[oneUser] = await db.query("SELECT * FROM users WHERE id = ? FOR UPDATE ",[id] );
        return oneUser[0];
    },
    getUser : async(email) =>{
       
        const[oneUser] = await db.query("SELECT u.id, u.email, u.password,u.phone, u.role_id, r.name AS role_name FROM users u JOIN  roles r ON u.role_id = r.id WHERE email = ? ",[email] );
        return oneUser[0];
    },
    userLogin : async(data)=>{
        const {email , hasdPassWord} = data
        const password = hasdPassWord
        const[oneUser] = await db.execute("SELECT u.id, u.email, u.password,u.phone, u.role_id, r.name AS role_name FROM users u JOIN  roles r ON u.role_id = r.id WHERE u.email = ? AND u.password =?",[email ,password] );
        return oneUser[0];
    },
    createUser : async(user)=>{
        const{name,hasdPassWord ,email,phone} = user;
        const password = hasdPassWord
        const[result] = await db.query("INSERT INTO users (name,password ,email,phone, role_id ) VALUES (?,?,?,?,6)" ,[name,password ,email,phone]);
        return result;
    },
    editUser : async(id,user)=>{
        const{name,password ,email,phone} = user;
        const[result] = await db.query("UPDATE users SET name = ?, password = ?, email = ? ,phone = ? WHERE id = ?" ,[name,password ,email,phone, id]);
        return result;
    },
    deleteUser : async(id) =>{
        const[oneUser] = await db.query("DELETE FROM  users  WHERE id = ?",[id] );
        return oneUser;
    },

    editRefeshToken : async (refresh_token ,id)=>{
       
        const[result] = await db.query("UPDATE users SET refresh_token = ? ,time_refresh_token	= ?  WHERE id = ?" ,[refresh_token,new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), id]);
        return result;
    },
    getToken : async (refresh_token ,id  ,connection = db)=>{
        const [row] = await connection.execute("SELECT id , email,name ,password FROM users WHERE refresh_token = ? AND  id =? FOR UPDATE  ",[refresh_token,id])
        return row[0];
    },
    updateRefeshToken : async (newHasdToken ,id , connection = db)=>{
       const refresh_token = newHasdToken
        const[result] = await connection.execute("UPDATE users SET refresh_token = ? ,time_refresh_token	= ?  WHERE id = ?" ,[refresh_token,new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), id]);
        return result;
    },
    getTokenLogout : async (id  ,connection = db)=>{
        const [row] = await connection.execute("SELECT * FROM users WHERE  id =? FOR UPDATE  ",[id])
        return row[0];
    },
    updateRefeshTokenLogOut : async ( id , connection = db)=>{
       const refresh_token = null
        const[result] = await connection.execute("UPDATE users SET refresh_token = ? ,time_refresh_token	= ?  WHERE id = ?" ,[refresh_token,null, id]);
        return result;
    },
    //  getTokenMe: async (refresh_token ,id )=>{

    //     const [row] = await db.execute("SELECT id , email,name ,password FROM users WHERE refresh_token = ? AND  id =? FOR UPDATE  ",[refresh_token,id])
    //     return row[0];
    // },
}
module.exports = User