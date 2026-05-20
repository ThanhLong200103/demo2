const AdminOrderService = require("../services/adminOrder");
const CatchAsync = require("../utils/cachAsync"); // bọc async để gom lỗi
const AppError = require("../utils/AppError"); // class định nghĩa lỗi sẵn
const AdminService = require("../services/admin");

class OrderAdmin {
  getOrderByStatus = CatchAsync(async (req, res, next) => {
    let { status } = req.query;

   
 if (!status) {
    return next(new AppError("Trạng thái (status) không được để trống", 400));
  }
  if (!Array.isArray(status)) {
    status = [status];
  }
       console.log("StatusOrder :",status)
      const orders = await AdminOrderService.getOrderByStatus(status);
      return res.status(200).json({ data: orders });
    
    
  });

  getOneOrder = CatchAsync(async (req, res, next) => {
    const { id } = req.params;

    const order = await AdminOrderService.getOneOrder(id);

    if (!order) {
      return next(new AppError("Không tìm thấy đơn hàng này", 404));
    }

    return res.status(200).json({ data: order });
  });

  updateStatusOrder = CatchAsync(async (req, res, next) => {
    const { status, id } = req.body;

    if (!status) {
      return next(new AppError("Trạng thái mới không được để trống", 400));
    }

    const result = await AdminOrderService.updateStatusOrder(id, status);

    if (result.affectedRows === 0) {
      return next(new AppError("Không tìm thấy đơn hàng để cập nhật", 404));
    }

    return res
      .status(200)
      .json({ message: "Cập nhật trạng thái đơn hàng thành công" });
  });

  updateTotalPriceOrder = CatchAsync(async (req, res, next) => {
    
    const { total_price ,id } = req.body;

    if (total_price === undefined || total_price < 0) {
      return next(new AppError("Tổng tiền không hợp lệ", 400));
    }

    const result = await AdminOrderService.updateTotalPriceOrder(
      id,
      total_price,
    );

    if (result.affectedRows === 0) {
      return next(new AppError("Không tìm thấy đơn hàng để cập nhật", 404));
    }

    return res
      .status(200)
      .json({ message: "Cập nhật tổng tiền đơn hàng thành công" });
  });
}

module.exports = new OrderAdmin();
