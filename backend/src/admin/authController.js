const authService = require("../services/auth.service");
const userService = require("../services/userService");
const CacthAsync = require("../utils/cachAsync");
const cartItemService = require("../services/cartItemService");
const AppError = require("../utils/AppError");
const { validatePass, hasdPass } = require("../utils/argon2");
const AdminService = require("../services/admin");
const roleService = require("../services/roleService");
class AuthAdmin {
  login = CacthAsync(async (req, res, next) => {
    const { email, password } = req.body;
    console.log("language:", req.language);

    const checkPass = await userService.checkProfile(email);
    console.log("Check profile :", checkPass);
    if (!checkPass) {
      return next(
        new AppError(req.t("auth:auth.The account does not exist"), 422),
      );
    }
    if (checkPass.role_name == "user") {
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
  });

  getAllPays = CacthAsync(async (req, res, next) => {
    const data = await AdminService.getAllPays();
    res.json(data);
  });

  getAllOrderAdmin = CacthAsync(async (req, res, next) => {
    const { page, pageSize } = req.query;

    const data = await AdminService.getAllOrderAdmin(
      Number(page),
      Number(pageSize),
    );

    res.json(data);
  });
  getAllOrderAdmins = CacthAsync(async (req, res, next) => {
    const data = await AdminService.getAllOrderAdmins();

    res.json(data);
  });
  getAllProductAdmin = CacthAsync(async (req, res, next) => {
    const { page, pageSize } = req.query;
    const data = await AdminService.getAllProductAdmin(page, pageSize);
    res.json(data);
  });
  getAllCustomers = CacthAsync(async (req, res, next) => {
    const { page, pageSize } = req.query;
    const data = await AdminService.getAllCustomers(page, pageSize);
    res.json(data);
  });

  createCustomer = CacthAsync(async (req, res, next) => {
    const { name, password, email, phone, role_id } = req.body;
    const hasdPassWord = await hasdPass(password);
    const data = await AdminService.createCustomers({
      name,
      hasdPassWord,
      email,
      phone,
      role_id,
    });
    res.json(data);
  });

  getAllRole = CacthAsync(async (req, res, next) => {
    const data = await roleService.getAllRole();
    res.json(data);
  });
  getOneCustomer = CacthAsync(async (req, res, next) => {
    const { id } = req.params;
    const data = await AdminService.getOneCustomer(id);
    res.json(data);
  });
  editCustomer = CacthAsync(async (req, res, next) => {
    const { name, email, phone, role_id, status, id, password } = req.body;
    console.log(name, email, phone, role_id, status, id, password);
    if (!id) {
      return next(new AppError("User id is required", 400));
    }
    if (!name || !email || !phone || role_id == null || status == null) {
      return next(new AppError("Missing required customer fields", 400));
    }
    const hasdPassWord = password ? await hasdPass(password) : undefined;
    const data = await AdminService.editCustomer({
      name,
      email,
      phone,
      role_id,
      status,
      id,
      hasdPassWord,
    });
    res.json(data);
  });
  deteleCustomer = CacthAsync(async (req, res, next) => {
    const { id } = req.params;
    const data = await AdminService.deteleCustomer(id);
    res.json(data);
  });

  getOneUser = CacthAsync(async (req, res, next) => {
    const { id } = req.params;
    const data = await AdminService.getOneUser(id);
    res.json(data);
  });
  updateUser = CacthAsync(async (req, res, next) => {
    const { name, password, email, phone, id } = req.body;
    const passwordH = await hasdPass(password);
    const data = await AdminService.updateUser({
      name,
      passwordH,
      email,
      phone,
      id,
    });
    res.json(data);
  });
  deleteUser = CacthAsync(async (req, res, next) => {
    const { id } = req.params;
    const data = await AdminService.deleteUser(id);
    res.json(data);
  });
  getAllCustomersNoPage = CacthAsync(async (req, res, next) => {
    const currentUserId = req.user.id;
    const data = await AdminService.getAllCustomersNoPage(currentUserId);
    res.json(data);});
}

module.exports = new AuthAdmin();
