const mongoose = require("mongoose");
require("dotenv").config();
async function connectDB() {
    try {
        await mongoose.connect(process.env.mongolink, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("✅ Connected to MongoDB");
    } catch (err) {
        console.error("❌ MongoDB Connection Error:", err.message);
        process.exit(1); // Exit if the connection fails
    }
}

module.exports = connectDB;
