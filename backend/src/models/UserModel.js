const db = require("../config/db.js")

const User = {
    getAll : async()=>{
        const [row] = await db.query("SELECT * FROM users")
        return row;
    },
    getUser : async(id) =>{
       
        const[oneUser] = await db.query("SELECT * FROM users WHERE id = ? FOR UPDATE ",[id] );
        return oneUser[0];
    },
    userLogin : async(data)=>{
        const {name , password} = data
        const[oneUser] = await db.execute("SELECT * FROM users WHERE name = ? AND password =?",[name ,password] );
        return oneUser[0];
    },
    createUser : async(user)=>{
        const{name,password ,email,phone} = user;
        const[result] = await db.query("INSERT INTO users (name,password ,email,phone ) VALUES (?,?,?,?)" ,[name,password ,email,phone]);
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
}
module.exports = User