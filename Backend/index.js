import { Port, mongoDBURL } from "./config.js";
import express from "express";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./Routes/bookRoute.js";
import { title } from "process";
import cors from "cors";

const app = express();

app.use(express.json());

//MiddleWare for CORS policy
// app.use(
//   cors({
//     origin: 'https://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type']
//   })
// )
app.use(cors());

app.get("/", (req, res) => {
  return res.status(234).send("Hello World!");
});

app.use("/books", booksRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(Port, () => {
      console.log(`App is listening to port: ${Port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
