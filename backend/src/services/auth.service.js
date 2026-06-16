const {
  signToken,
  verifyToken,
  signRefreshToken,
  verifyRefreshToken,
} = require("../utils/jwt");
const hasdRefreshToken = require("../utils/crypto");
const UserModel = require("../models/UserModel");
const db = require("../config/db");
const client = require("../config/redis");
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

  resetRefreshToken = async (token ,conn) => {
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
      
      const newRefreshToken = signRefreshToken(getToken);
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
      // await conn.commit();
      // //  return decoded;
    return { newRefreshToken, newAccessToken };
  };

  // me = async(token)=>{
  //   const decoded = verifyRefreshToken(token);
  //   const id = decoded.id
  //   const refresh_token = hasdRefreshToken(token) 
  //   const checkme = await UserModel.getTokenMe(refresh_token ,id)
  //   return checkme;
  // }

  logOut = async (id, conn)=>{
    const getRefresh = await UserModel.getTokenLogout(id ,conn);
        const getupdateLogOut = await UserModel.updateRefeshTokenLogOut(id,conn)
        await conn.commit();
        return getupdateLogOut ;
  }
}

module.exports = new AuthService();
