const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Load environment variables
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/books', require('./routes/bookRoutes'));

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Book Inventory System API',
    version: '1.0.0',
    endpoints: {
      'GET /api/books': 'Get all books',
      'POST /api/books': 'Add a new book',
      'PUT /api/books/:id': 'Update a book',
      'DELETE /api/books/:id': 'Delete a book'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Something went wrong!'
  });
});

// Handle 404 routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});