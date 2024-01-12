"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const password = "tQNekdyYBw5snOT1";
const MONGODB_URI = `mongodb+srv://user1:${password}@cluster0.i51fnk9.mongodb.net/`;
mongoose_1.default.connect(MONGODB_URI);
const db = mongoose_1.default.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
    console.log("Connected to MongoDB");
});
exports.default = mongoose_1.default;
