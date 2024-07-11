import express from "express";
import { Book } from "../models/bookModel.js";

const Router = express.Router();

//Route to add Books from postman
Router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({ mesaage: "Send all the required fields" });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.mesaage });
  }
});

//Route to see all Books
Router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ mesaage: error.message });
  }
});

// Route to see Book by ID
Router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ mesaage: error.message });
  }
});

//Route to update a Book
Router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({ mesaage: "Send all the required fields" });
    }

    const { id } = req.params;

    const result = await Book.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res
        .status(404)
        .json({ message: "This Book does not exist in the Store..." });
    }
    return res.status(200).json({ message: "Book Update Successfull!!!!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ mesaage: error.message });
  }
});

//Route to delete a Book
Router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return res
        .status(404)
        .json({ message: "This Book does not exist in the Store..." });
    }
    return res.status(200).json({ message: "Book Deletion Successfull!!!!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ mesaage: error.message });
  }
});

export default Router;
