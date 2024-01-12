"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const bodyParser = require('body-parser');
const logRouter = require('./routes/logRouter');
const mongoose_1 = require("mongoose");
const app = express();
const port = 3000;
app.use(bodyParser.json());
// Routes 
app.use('/', logRouter);
app.all('*', (req, res) => {
    res.status(404).json({
        message: `can't find ${req.originalUrl} on the server`,
    });
});
const password = "tQNekdyYBw5snOT1";
const MONGODB_URI = `mongodb+srv://user1:${password}@cluster0.i51fnk9.mongodb.net/`;
mongoose_1.default.connect(MONGODB_URI);
const db = mongoose_1.default.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
    console.log("Connected to MongoDB");
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
