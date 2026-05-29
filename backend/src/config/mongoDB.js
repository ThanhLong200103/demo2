const mongoose = require("mongoose");
require("dotenv").config();


const connectMongo = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        .then(() => {

        console.log("Kết nối  thành công với mongoDB")
        });
    } catch (error) {
        console.log("MongoDB Error:", error);
    }
}

module.exports = connectMongo;