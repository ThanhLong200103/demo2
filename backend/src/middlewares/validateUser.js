const validateUser = (req, res, next) => {
    const { email, password, name ,quantity} = req.body;

    let errors = [];

    if (!email) {
        errors.push("Email không được để trống");
    } else if (!email.includes("@")) {
        errors.push("Email không hợp lệ");
    }

    if (!password) {
        errors.push("Password không được để trống");
    } else if (password.length < 6) {
        errors.push("Password phải >= 6 ký tự");
    }

    if (!name) {
        errors.push("Name không được để trống");
    }
    if (!quantity) {
        errors.push("Quantity không được để trống");
    }
    
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    next(); // pass qua controller
};

module.exports = validateUser;