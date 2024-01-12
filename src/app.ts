const express = require('express');
import { Request, Response } from "express";
const bodyParser = require('body-parser');
const logRouter = require('./routes/logRouter');
import mongoose from "mongoose";

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Routes 
app.use('/', logRouter)
app.all('*', (req: Request, res:Response)=>{
    res.status(404).json({
        message: `can't find ${req.originalUrl} on the server`,
    })
})

const password: string = "tQNekdyYBw5snOT1";
const MONGODB_URI: string = `mongodb+srv://user1:${password}@cluster0.i51fnk9.mongodb.net/`;

mongoose.connect(MONGODB_URI);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
