// rember by using nodenext , running commonJS and Es modules , so while importing files local to project use exc with them

import express, { Express, Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import usersRouter from "./routes/users.js";

//mongoose mongodb connection
//as string , to counter the undifines, its set as string
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);
// import express there and usng a virble to use express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
//cors for security , it reject certain request

//  any requst for /api/users as endpoint  this is our entpoint setup
app.use("/api/users", usersRouter);
//task the endpoint with api client like postman

// start the server here at 7000

app.listen(7000, () => {
  return console.log(`hello world , server is running`);
});
