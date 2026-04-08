const {
  signToken,
  verifyToken,
  signRefreshToken,
  verifyRefreshToken,
} = require("../utils/jwt");
const hasdRefreshToken = require("../utils/crypto");
const UserModel = require("../models/UserModel");
const db = require("../config/db");
class AuthService {
  login = async (data) => {
    const token = signToken(data);
    return token;
  };
  refreshToken = async (id) => {
    const token = signRefreshToken({ id: id });
    const refresh_token =  hasdRefreshToken(token);
    const updateRefreshToken = await UserModel.editRefeshToken(
      refresh_token,
      id,
    );
    return { token, updateRefreshToken };
  };

  resetRefreshToken = async (token) => {
    const conn = await db.getConnection();
    console.log("TOKEN FROM CLIENT:", token);
    try {
     
      await conn.beginTransaction();
      const decoded = verifyRefreshToken(token);
      const refresh_token = hasdRefreshToken(token);
      const id = decoded.id;
      console.log(decoded);
    
      const getToken = await UserModel.getToken(refresh_token, id, conn);
      if (!getToken) {
        throw new Error("Invalid refresh token");
      }
      // console.log(getToken)
      // return getToken
      
      const newRefreshToken = signRefreshToken({ id: id });
      // console.log(newRefreshToken)
      const newHasdToken = hasdRefreshToken(newRefreshToken);
      // console.log(newHasdToken)
      const updateToken = await UserModel.updateRefeshToken(
        newHasdToken,
        id,
        conn,
      );
      // console.log(updateToken)
      const newAccessToken = signToken(getToken);
      await conn.commit();
      // //  return decoded;
    return { newRefreshToken, newAccessToken };
    } catch (error) {
      if (conn) await conn.rollback();
        
        throw error;
    } finally {
      conn.release();
    }
  };

  // me = async(token)=>{
  //   const decoded = verifyRefreshToken(token);
  //   const id = decoded.id
  //   const refresh_token = hasdRefreshToken(token) 
  //   const checkme = await UserModel.getTokenMe(refresh_token ,id)
  //   return checkme;
  // }

  logOut = async (id)=>{
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();
        const getRefresh = await UserModel.getTokenLogout(id ,connection);
        const getupdateLogOut = await UserModel.updateRefeshTokenLogOut(id,connection)
        await connection.commit();
        return getupdateLogOut ;
    } catch (error) {
      await connection.rollback();
    } finally {
      connection.release();
    }
  }
}

module.exports = new AuthService();
