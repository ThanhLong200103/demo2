const mongoose = require("mongoose");
require("dotenv").config();

const connectMongo = async () => {
    try {
        // Truyền thêm object { dbName: "chatdb" } ở tham số thứ 2
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "chatdb"
        });
        
        console.log("Kết nối thành công với database: chatdb");

        // Ping kiểm tra database hiện tại
        const pingResult = await mongoose.connection.db.command({ ping: 1 });
        console.log("Ping test:", pingResult);

    } catch (error) {
        console.log("MongoDB Error:", error);
    }
}

module.exports = connectMongo;