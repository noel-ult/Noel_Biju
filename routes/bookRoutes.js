const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// @route   POST /api/books
// @desc    Add a new book
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { title, author, genre, price, stock, publishedYear } = req.body;

    // Create new book
    const book = new Book({
      title,
      author,
      genre,
      price,
      stock,
      publishedYear
    });

    const savedBook = await book.save();
    res.status(201).json({
      success: true,
      data: savedBook
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        error: errors
      });
    }
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

// @route   GET /api/books
// @desc    Get all books
// @access  Public
router.get('/', async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: books.length,
      data: books
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

// @route   PUT /api/books/:id
// @desc    Update a book's details
// @access  Public
router.put('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        error: 'Book not found'
      });
    }

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      data: updatedBook
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        error: errors
      });
    }
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        error: 'Book not found'
      });
    }
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

// @route   DELETE /api/books/:id
// @desc    Delete a book
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        error: 'Book not found'
      });
    }

    await Book.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      data: {},
      message: 'Book deleted successfully'
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        error: 'Book not found'
      });
    }
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

module.exports = router;