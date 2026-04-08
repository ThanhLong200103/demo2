const UserService = require("../services/userService");
const AuthService = require("../services/auth.service");
const CartService = require("../services/cartItemService");
const { hasdPass, validatePass } = require("../utils/argon2");
class UserController {
  getAllUser = async (req, res) => {
    try {
      const data = await UserService.getAll();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: err.message });
    }
  };
  login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const checkPass = await UserService.checkProfile(email);
      if (!checkPass) {
        return res.status(404).json({ message: "User không tồn tại" });
      }
      const validPass = await validatePass(checkPass.password, password);

      if (validPass) {
        const hasdPassWord = checkPass.password;
        const result = await UserService.userLogin({ email, hasdPassWord });
        const accessToken = await AuthService.login(result);
        const refreshToken = await AuthService.refreshToken(checkPass.id);
       const cart = await CartService.createCart(checkPass.id);
        res.cookie("refreshToken", refreshToken.token, {
          httpOnly: true,
          secure: false,
          sameSite: "Lax",
          path: "/",
          domain: "localhost",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.json({
          result: result,
          accessToken: accessToken,
          cartId: cart,
          // refreshToken: refreshToken.token,
        });
      }
      // res.json(checkPass.password)
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  proFile = async (req, res) => {
    try {
      const profile = await UserService.checkProfile(req.user.email);
      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  register = async (req, res) => {
    try {
      const { name, password, email, phone } = req.body;
      const hasdPassWord = await hasdPass(password);
      const register = await UserService.register({
        name,
        hasdPassWord,
        email,
        phone,
      });
      res.json(register);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  resetRefreshToken = async (req, res) => {
    try {
      const token = req.cookies.refreshToken;
      if (!token) {
        return res.status(401).json({ message: "No refresh token" });
      }
      console.log("COOKIE:", req.cookies.refreshToken);
      const data = await AuthService.resetRefreshToken(token);
      if (!data || !data.newRefreshToken) {
        return res.status(401).json({ message: "Invalid refresh token" });
      }
      res.cookie("refreshToken", data.newRefreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
        path: "/",
        domain: "localhost",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      // res.json(data)
      res.json({ accessToken: data.newAccessToken });
    } catch (error) {
      res.status(500).json({ error: error.message });
      return res.status(401).json({
        message: "Refresh token expired or invalid",
      });
    }
  };
  userLogout = async (req, res) => {
    try {
      const id = req.user.id;
      console.log(id);
      const result = await AuthService.logOut(id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  // me = async (req, res)=>{
  //   try {
  //     const token = req.cookies.refreshToken;
  //     const data = await AuthService.me(token)
  //     res.json(data)
  //   } catch (error) {
  //     res.status(500).json({ error: error.message });

  //   }
  // }
}

module.exports = new UserController();
