const db = require("../config/db");
const runInTransaction = async (work) => {
  const conn = await db.getConnection(); 
  await conn.beginTransaction(); 
  try {
    
    const result = await work(conn); 
    
    await conn.commit(); 
    return result;
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release(); 
  }
};

module.exports = runInTransaction;