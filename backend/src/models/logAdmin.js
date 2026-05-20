const db = require("../config/db")
class LogAdmin {
   createLog = async (data) => {
     const { user_id, product_id, action, description, created_by } = data;
      const [result] = await db.query("INSERT INTO logs (user_id,product_id,action,description,created_by) VALUES (?,?,?,?,?)",[user_id,product_id,action,description,created_by]); 
   return result; };
}