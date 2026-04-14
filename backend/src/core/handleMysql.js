const AppError = require("../utils/AppError");

const handleDuplicate = (err) => {
  const match = err.sqlMessage.match(/for key '(.+)'/);

  let field = "field";

  if (match) {
    const key = match[1]; // users.email
    field = key.split(".").pop(); // email
  }

  return new AppError(`${field} đã tồn tại`, 422);
};

module.exports = { handleDuplicate };