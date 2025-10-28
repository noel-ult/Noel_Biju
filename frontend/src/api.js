import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`Response received:`, response.data);
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Book API endpoints
export const bookAPI = {
  // Get all books
  getAllBooks: () => api.get('/books'),
  
  // Create a new book
  createBook: (bookData) => api.post('/books', bookData),
  
  // Update a book
  updateBook: (id, bookData) => api.put(`/books/${id}`, bookData),
  
  // Delete a book
  deleteBook: (id) => api.delete(`/books/${id}`),
};

export default api;