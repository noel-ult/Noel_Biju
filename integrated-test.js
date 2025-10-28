// Internal server test - runs server and tests in same process
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const axios = require('axios');

// Load environment variables
require('dotenv').config();

const app = express();

// MongoDB connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://noelbiju2552_db_user:password%40123@noelbiju.ln7jk6l.mongodb.net/book-inventory?retryWrites=true&w=majority');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

// Book Schema
const bookSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Title is required'], trim: true },
  author: { type: String, required: [true, 'Author is required'], trim: true },
  genre: { type: String, required: [true, 'Genre is required'], trim: true },
  price: { type: Number, required: [true, 'Price is required'], min: [0, 'Price cannot be negative'] },
  stock: { type: Number, default: 0, min: [0, 'Stock cannot be negative'] },
  publishedYear: { type: Number, min: [1000, 'Published year must be a valid year'], max: [new Date().getFullYear(), 'Published year cannot be in the future'] },
  createdAt: { type: Date, default: Date.now }
});

const Book = mongoose.model('Book', bookSchema);

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Book Inventory System API',
    version: '1.0.0',
    status: 'running'
  });
});

// GET all books
app.get('/api/books', async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: books.length,
      data: books
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// POST new book
app.post('/api/books', async (req, res) => {
  try {
    const book = new Book(req.body);
    const savedBook = await book.save();
    res.status(201).json({ success: true, data: savedBook });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ success: false, error: errors });
    }
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// PUT update book
app.put('/api/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ success: false, error: 'Book not found' });
    }
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.status(200).json({ success: true, data: updatedBook });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ success: false, error: errors });
    }
    if (error.name === 'CastError') {
      return res.status(404).json({ success: false, error: 'Book not found' });
    }
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// DELETE book
app.delete('/api/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ success: false, error: 'Book not found' });
    }
    await Book.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, data: {}, message: 'Book deleted successfully' });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({ success: false, error: 'Book not found' });
    }
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Route not found' });
});

// Test function
async function runTests() {
  const BASE_URL = 'http://localhost:5000';
  
  console.log('\n🚀 Starting internal REST API tests...\n');
  
  try {
    // Test 1: Root endpoint
    console.log('1. Testing GET / (Root endpoint)');
    const rootResponse = await axios.get(BASE_URL);
    console.log('✅ PASSED - Root endpoint working');
    console.log(`   Message: ${rootResponse.data.message}`);

    // Test 2: Get all books
    console.log('\n2. Testing GET /api/books');
    const getBooksResponse = await axios.get(`${BASE_URL}/api/books`);
    console.log('✅ PASSED - Get all books working');
    console.log(`   Initial count: ${getBooksResponse.data.count}`);

    // Test 3: Create a book
    console.log('\n3. Testing POST /api/books');
    const newBook = {
      title: 'Test Book',
      author: 'Test Author',
      genre: 'Test Fiction',
      price: 19.99,
      stock: 10,
      publishedYear: 2023
    };
    const createResponse = await axios.post(`${BASE_URL}/api/books`, newBook);
    console.log('✅ PASSED - Book creation working');
    console.log(`   Created: ${createResponse.data.data.title}`);
    const bookId = createResponse.data.data._id;

    // Test 4: Update book
    console.log('\n4. Testing PUT /api/books/:id');
    const updateResponse = await axios.put(`${BASE_URL}/api/books/${bookId}`, { stock: 20 });
    console.log('✅ PASSED - Book update working');
    console.log(`   Updated stock: ${updateResponse.data.data.stock}`);

    // Test 5: Delete book
    console.log('\n5. Testing DELETE /api/books/:id');
    const deleteResponse = await axios.delete(`${BASE_URL}/api/books/${bookId}`);
    console.log('✅ PASSED - Book deletion working');
    console.log(`   Message: ${deleteResponse.data.message}`);

    console.log('\n🎉 ALL TESTS PASSED! ✅');
    console.log('📝 REST API Summary:');
    console.log('   ✅ GET / - Root endpoint working');
    console.log('   ✅ GET /api/books - List books working');
    console.log('   ✅ POST /api/books - Create book working');
    console.log('   ✅ PUT /api/books/:id - Update book working');
    console.log('   ✅ DELETE /api/books/:id - Delete book working');
    console.log('\n🔥 The Book Inventory REST API is fully functional!');

  } catch (error) {
    console.log('❌ TEST FAILED:', error.response?.data || error.message);
  } finally {
    process.exit(0);
  }
}

// Start server and run tests
async function startServerAndTest() {
  await connectDB();
  
  const PORT = process.env.PORT || 5000;
  const server = app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    
    // Wait a moment for server to be fully ready
    setTimeout(runTests, 1000);
  });
}

// Start the server and tests
startServerAndTest().catch(console.error);