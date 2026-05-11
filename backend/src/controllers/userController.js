const UserService = require("../services/userService");
const AuthService = require("../services/auth.service");
const CartService = require("../services/cartItemService");
const { hasdPass, validatePass } = require("../utils/argon2");
const runInTransaction = require("../utils/runTransaction");
const AppError = require("../utils/AppError");
const CacthAsync = require("../utils/cachAsync");
const cachAsync = require("../utils/cachAsync");
class UserController {
  getAllUser = CacthAsync(async (req, res) => {
    const data = await UserService.getAll();
    res.json(data);
  });
  login = CacthAsync(
    async (req, res, next) => {
      const { email, password } = req.body;
        console.log("language:", req.language);

      const checkPass = await UserService.checkProfile(email);
      console.log("Check profile :",checkPass)
      if (!checkPass) {
        return next(new AppError(req.t("auth:auth.The account does not exist"), 422));
        
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
      } else {
        return next(new AppError("Mật khẩu không chính xác", 422));
      }
    },
    // res.json(checkPass.password)
  );
  proFile = CacthAsync(async (req, res) => {
    const profile = await UserService.checkProfile(req.user.email);
    console.log("Profile:", req.user.email);
    res.json(profile);
  });
  register = cachAsync(async (req, res , next) => {
    const { name, password, email, phone } = req.body;
    const hasdPassWord = await hasdPass(password);
    const register = await UserService.register({
      name,
      hasdPassWord,
      email,
      phone,
    });
    res.json(register);
  });
  resetRefreshToken = CacthAsync(async (req, res , next) => {
    const token = req.cookies.refreshToken;
    if (!token) {
      return next(new AppError("Refresh token không tồn tại", 401));
    }
    console.log("COOKIE:", req.cookies.refreshToken);
    const data = await runInTransaction(async (conn) => {
      return await AuthService.resetRefreshToken(token, conn);
    });
    if (!data || !data.newRefreshToken) {
      return next(new AppError("Refresh token không hợp lệ", 401));
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
  });
  userLogout = CacthAsync(async (req, res) => {
    const id = req.user.id;
    console.log(id);
    const result = await runInTransaction(async (conn) => {
      return await AuthService.logOut(id, conn);
    });
    res.json(result);
  });
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