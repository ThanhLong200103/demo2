const { assert } = require("node:console");
const db = require("../config/db.js");

const User = {
  getAll: async () => {
    const [row] = await db.query(
      "SELECT u.id , u.name ,u.email,u.phone , u.status , r.name AS role_name FROM users u  JOIN roles r ON u.role_id = r.id WHERE r.name = 'user'",
    );
    return row;
  },
  getUserUpdate: async (id) => {
    const [oneUser] = await db.query(
      "SELECT * FROM users WHERE id = ? FOR UPDATE ",
      [id],
    );
    return oneUser[0];
  },
  getUser: async (email) => {
    const [oneUser] = await db.query(
      "SELECT u.id, u.email, u.password,u.phone, u.role_id, r.name AS role_name FROM users u JOIN  roles r ON u.role_id = r.id WHERE email = ? ",
      [email],
    );
    return oneUser[0];
  },
  userLogin: async (data) => {
    const { email, hasdPassWord } = data;
    const password = hasdPassWord;
    const [oneUser] = await db.execute(
      "SELECT u.id, u.email, u.password,u.phone, u.role_id, r.name AS role_name FROM users u JOIN  roles r ON u.role_id = r.id WHERE u.email = ? AND u.password =?",
      [email, password],
    );
    return oneUser[0];
  },
  createUser: async (user) => {
    const { name, hasdPassWord, email, phone } = user;
    const password = hasdPassWord;
    const [result] = await db.query(
      "INSERT INTO users (name,password ,email,phone, role_id ) VALUES (?,?,?,?,6)",
      [name, password, email, phone],
    );
    return result;
  },
  editUser: async (id, user) => {
    const { name, password, email, phone } = user;
    const [result] = await db.query(
      "UPDATE users SET name = ?, password = ?, email = ? ,phone = ? WHERE id = ?",
      [name, password, email, phone, id],
    );
    return result;
  },
  deleteUser: async (id) => {
    const [oneUser] = await db.query("DELETE FROM  users  WHERE id = ?", [id]);
    return oneUser;
  },

  editRefeshToken: async (refresh_token, id) => {
    const [result] = await db.query(
      "UPDATE users SET refresh_token = ? ,time_refresh_token	= ?  WHERE id = ?",
      [refresh_token, new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), id],
    );
    return result;
  },
  getToken: async (refresh_token, id, connection = db) => {
    const [row] = await connection.execute(
      "SELECT u.id , u.email ,u.password , u.phone, u.role_id, r.name AS role_name FROM users  u JOIN  roles r ON u.role_id = r.id WHERE u.refresh_token = ? AND  u.id =? FOR UPDATE  ",
      [refresh_token, id],
    );
    return row[0];
  },
  updateRefeshToken: async (newHasdToken, id, connection = db) => {
    const refresh_token = newHasdToken;
    const [result] = await connection.execute(
      "UPDATE users SET refresh_token = ? ,time_refresh_token	= ?  WHERE id = ?",
      [refresh_token, new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), id],
    );
    return result;
  },
  getTokenLogout: async (id, connection = db) => {
    const [row] = await connection.execute(
      "SELECT * FROM users WHERE  id =? FOR UPDATE  ",
      [id],
    );
    return row[0];
  },
  updateRefeshTokenLogOut: async (id, connection = db) => {
    const refresh_token = null;
    const [result] = await connection.execute(
      "UPDATE users SET refresh_token = ? ,time_refresh_token	= ?  WHERE id = ?",
      [refresh_token, null, id],
    );
    return result;
  },
  //  getTokenMe: async (refresh_token ,id )=>{

  //     const [row] = await db.execute("SELECT id , email,name ,password FROM users WHERE refresh_token = ? AND  id =? FOR UPDATE  ",[refresh_token,id])
  //     return row[0];
  // },

  // admin
  getAll: async () => {
    const [row] = await db.query(
      "SELECT u.id , u.name ,u.email,u.phone , u.status , r.name AS role_name FROM users u  JOIN roles r ON u.role_id = r.id WHERE r.name = 'user'",
    );
    return row;
  },
  getAllPage: async (
  page,
  pageSize
) => {

  const limit = Number(pageSize);

  const offset =
    (Number(page) - 1) * limit;

  // query data
  const [rows] = await db.query(
    `
    SELECT 
      u.id,
      u.name,
      u.email,
      u.phone,
      u.status,
      r.name AS role_name
    FROM users u
    JOIN roles r 
      ON u.role_id = r.id
    WHERE r.name = 'user'
    LIMIT ? OFFSET ?
    `,
    [limit, offset]
  );

// query total
  const [countRows] = await db.query(
    `
    SELECT COUNT(*) as total
    FROM users u
    JOIN roles r 
      ON u.role_id = r.id
    WHERE r.name = 'user'
    `
  );

  return {
    data: rows,
    total: countRows[0].total,
    page: Number(page),
    pageSize: limit,
  };
},
getAllCustomers: async (
  page,
  pageSize
) => {

  const limit = Number(pageSize);

  const offset =
    (Number(page) - 1) * limit;

  // query data
  const [rows] = await db.query(
    `
    SELECT 
      u.id,
      u.name,
      u.email,
      u.phone,
      u.status,
      r.name AS role_name
    FROM users u
    JOIN roles r 
      ON u.role_id = r.id
    WHERE r.name != 'user'
      AND r.name != 'super_admin'
      AND u.status = 'active'
    LIMIT ? OFFSET ?
    `,
    [limit, offset]
  );

  // query total
  const [countRows] = await db.query(
    `
    SELECT COUNT(*) as total
    FROM users u
    JOIN roles r 
      ON u.role_id = r.id
    WHERE r.name != 'user'
      AND r.name != 'super_admin'
      AND u.status = 'active'
    `
  );

  return {
    data: rows,
    total: countRows[0].total,
    page: Number(page),
    pageSize: limit,
  };
},
  getOneCustomer: async (id) => {
    const [row] = await db.query(
      "SELECT   u.name ,u.email,u.phone , u.status ,u.role_id , r.name AS role_name FROM users u  JOIN roles r ON u.role_id = r.id WHERE r.name != 'user' AND r.name !='super_admin' AND u.id=?",
      [id],
    );
    return row;
  },
  createCustomer: async (data) => {
    const { name, hasdPassWord, email, phone, role_id } = data;
    const password = hasdPassWord;
    const [result] = await db.query(
      "INSERT INTO users (name,password ,email,phone, role_id ) VALUES (?,?,?,?,?)",
      [name, password, email, phone, role_id],
    );
    return result;
  },
  editCustomer: async (data) => {
    const { name, email, phone, role_id, status, id ,hasdPassWord } = data;
    const sql = `
  UPDATE users
  SET
    name = ?,
    email = ?,
    phone = ?,
    password=?,
    role_id = ?,
    status = ?
  WHERE id = ?
`;
    const res = await db.execute(sql, [
      name,
      email,
      phone,
      hasdPassWord,
      role_id,
      status,
      id,
    ]);

    return res
  },

  deteleCustomer :async (id)=>{
    const res = await db.query("UPDATE users SET status = 'deleted' WHERE id = ? AND role_id != 6 ",[id])
    return res
  },
  getOneUser : async (id) => { 
    const [rows] = await db.query("SELECT id,name,email,phone FROM users WHERE id = ?",[id]); 
    return rows[0]
   },
   updateUser : async (data) => {
     const { name,passwordH,email,phone ,id} = data;
     
    const [result] = await db.query("UPDATE users SET name = ?, password = ?, email = ?, phone = ? WHERE id = ?",[name,passwordH,email,phone,id])
   return result 
  },
  deleteUser : async (id) => { 
    const [result] = await db.query("UPDATE users SET status = 'deleted' WHERE id = ?",[id]); 
    return result; 
  },
  getAllCustomersNoPage: async (currentUserId) => {
  const [rows] = await db.query(
    `
    SELECT 
      u.id,
      u.name,
    
      r.name AS role_name

    FROM users u

    JOIN roles r
      ON u.role_id = r.id

    WHERE r.name NOT IN ('user')
      AND u.status = 'active'
      AND u.id != ?

      AND NOT EXISTS (
        SELECT 1
        FROM room_members rm1
        JOIN room_members rm2
          ON rm1.room_id = rm2.room_id

        WHERE rm1.user_id = ?
          AND rm2.user_id = u.id
      )
    `,
    [currentUserId, currentUserId]
  );

  return rows;
},


};
module.exports = User;
