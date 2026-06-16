const mongoose = require("mongoose");
require("dotenv").config();

const connectMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "chatdb",
            serverSelectionTimeoutMS: 30000,
        });

        console.log("MongoDB connected: chatdb");

        await mongoose.connection.db.command({ ping: 1 });
        console.log("MongoDB ping OK");

    } catch (error) {
        console.log("MongoDB Error:", error.message);
        process.exit(1);
    }
};

module.exports = connectMongo;