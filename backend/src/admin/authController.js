const authService = require("../services/auth.service");
const userService = require("../services/userService");
const CacthAsync = require("../utils/cachAsync");
const cartItemService = require("../services/cartItemService");
const AppError = require("../utils/AppError");
const { validatePass } = require("../utils/argon2");
class AuthAdmin {
    login = CacthAsync(async(req , res ,next)=>{
         
      const { email, password } = req.body;
        console.log("language:", req.language);

      const checkPass = await userService.checkProfile(email);
      console.log("Check profile :",checkPass)
      if (!checkPass) {
        return next(new AppError(req.t("auth:auth.The account does not exist"), 422));
        
      }
      if(checkPass.role_name=="user"){
        return next(new AppError("Không tìm thấy trang", 404));
      }

      const validPass = await validatePass(checkPass.password, password);
      if (validPass) {
        const hasdPassWord = checkPass.password;
        const result = await userService.userLogin({ email, hasdPassWord });
        const accessToken = await authService.login(result);
        const refreshToken = await authService.refreshToken(checkPass.id);
        const cart = await cartItemService.createCart(checkPass.id);
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
    
);

}

module.exports = new AuthAdmin()
