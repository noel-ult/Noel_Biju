import React, { useState, useEffect } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  IconButton,
  Chip,
  TextField,
  InputAdornment,
  Grid,
  Card,
  CardContent,
  Skeleton,
  Fade,
  Tooltip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Inventory as InventoryIcon,
  TrendingUp,
  Warning,
  Book as BookIcon,
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import { bookAPI } from '../api';

const BookList = ({ 
  onEditBook, 
  onDeleteBook, 
  refreshTrigger, 
  darkMode 
}) => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch books
  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await bookAPI.getAllBooks();
      
      if (response.data.success) {
        setBooks(response.data.data);
        setFilteredBooks(response.data.data);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Failed to fetch books';
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  // Filter books based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredBooks(books);
    } else {
      const filtered = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.genre.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBooks(filtered);
    }
  }, [searchTerm, books]);

  // Fetch books on component mount and when refreshTrigger changes
  useEffect(() => {
    fetchBooks();
  }, [refreshTrigger]);

  // Calculate statistics
  const totalBooks = books.length;
  const totalValue = books.reduce((sum, book) => sum + (book.price * book.stock), 0);
  const outOfStockCount = books.filter(book => book.stock === 0).length;
  const lowStockCount = books.filter(book => book.stock > 0 && book.stock <= 5).length;

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStockChip = (stock) => {
    if (stock === 0) {
      return (
        <Chip
          label="Out of Stock"
          color="error"
          size="small"
          icon={<Warning />}
          sx={{ fontWeight: 600 }}
        />
      );
    } else if (stock <= 5) {
      return (
        <Chip
          label={`Low Stock (${stock})`}
          color="warning"
          size="small"
          sx={{ fontWeight: 600 }}
        />
      );
    } else {
      return (
        <Chip
          label={stock}
          color="success"
          size="small"
          sx={{ fontWeight: 600 }}
        />
      );
    }
  };

  if (loading) {
    return (
      <Box sx={{ mt: 3 }}>
        {/* Statistics Cards Skeleton */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {[1, 2, 3, 4].map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item}>
              <Skeleton variant="rectangular" height={120} sx={{ borderRadius: 2 }} />
            </Grid>
          ))}
        </Grid>
        
        {/* Table Skeleton */}
        <Paper sx={{ p: 3 }}>
          <Skeleton variant="text" height={40} width={200} sx={{ mb: 2 }} />
          <Skeleton variant="rectangular" height={60} sx={{ mb: 2 }} />
          {[1, 2, 3, 4, 5].map((item) => (
            <Skeleton key={item} variant="rectangular" height={50} sx={{ mb: 1 }} />
          ))}
        </Paper>
      </Box>
    );
  }

  return (
    <Fade in={true} timeout={800}>
      <Box>
        {/* Statistics Cards */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                background: darkMode 
                  ? 'linear-gradient(135deg, rgba(26, 26, 46, 0.8) 0%, rgba(22, 33, 62, 0.6) 100%)'
                  : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(240, 248, 255, 0.8) 100%)',
                backdropFilter: 'blur(20px)',
                border: `1px solid ${darkMode ? 'rgba(0, 188, 212, 0.2)' : 'rgba(0, 188, 212, 0.3)'}`,
                borderRadius: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: darkMode 
                    ? '0 12px 40px rgba(0, 188, 212, 0.15)'
                    : '0 12px 40px rgba(0, 188, 212, 0.2)',
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <BookIcon color="primary" sx={{ fontSize: 32 }} />
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                      {totalBooks}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Books
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                background: darkMode 
                  ? 'linear-gradient(135deg, rgba(26, 26, 46, 0.8) 0%, rgba(22, 33, 62, 0.6) 100%)'
                  : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(240, 248, 255, 0.8) 100%)',
                backdropFilter: 'blur(20px)',
                border: `1px solid ${darkMode ? 'rgba(123, 97, 255, 0.2)' : 'rgba(123, 97, 255, 0.3)'}`,
                borderRadius: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: darkMode 
                    ? '0 12px 40px rgba(123, 97, 255, 0.15)'
                    : '0 12px 40px rgba(123, 97, 255, 0.2)',
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <TrendingUp color="secondary" sx={{ fontSize: 32 }} />
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: 'secondary.main' }}>
                      {formatPrice(totalValue)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Value
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                background: darkMode 
                  ? 'linear-gradient(135deg, rgba(26, 26, 46, 0.8) 0%, rgba(22, 33, 62, 0.6) 100%)'
                  : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(240, 248, 255, 0.8) 100%)',
                backdropFilter: 'blur(20px)',
                border: `1px solid rgba(255, 152, 0, 0.3)`,
                borderRadius: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 40px rgba(255, 152, 0, 0.2)',
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Warning sx={{ color: '#ff9800', fontSize: 32 }} />
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#ff9800' }}>
                      {lowStockCount}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Low Stock
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                background: darkMode 
                  ? 'linear-gradient(135deg, rgba(26, 26, 46, 0.8) 0%, rgba(22, 33, 62, 0.6) 100%)'
                  : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(240, 248, 255, 0.8) 100%)',
                backdropFilter: 'blur(20px)',
                border: `1px solid rgba(244, 67, 54, 0.3)`,
                borderRadius: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 40px rgba(244, 67, 54, 0.2)',
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <InventoryIcon sx={{ color: '#f44336', fontSize: 32 }} />
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#f44336' }}>
                      {outOfStockCount}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Out of Stock
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Books Table */}
        <Paper
          elevation={3}
          sx={{
            background: darkMode 
              ? 'linear-gradient(135deg, rgba(26, 26, 46, 0.8) 0%, rgba(22, 33, 62, 0.6) 100%)'
              : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(240, 248, 255, 0.8) 100%)',
            backdropFilter: 'blur(20px)',
            border: `1px solid ${darkMode ? 'rgba(123, 97, 255, 0.2)' : 'rgba(0, 188, 212, 0.2)'}`,
            borderRadius: 3,
            overflow: 'hidden',
          }}
        >
          <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
                📚 Book Inventory ({filteredBooks.length})
              </Typography>
              
              <TextField
                placeholder="Search books..."
                value={searchTerm}
                onChange={handleSearchChange}
                variant="outlined"
                size="small"
                sx={{ minWidth: 300 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            {filteredBooks.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <BookIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  {searchTerm ? 'No books found matching your search' : 'No books in inventory'}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {!searchTerm && 'Add your first book using the form above'}
                </Typography>
              </Box>
            ) : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700, fontSize: '1rem' }}>Title</TableCell>
                      <TableCell sx={{ fontWeight: 700, fontSize: '1rem' }}>Author</TableCell>
                      <TableCell sx={{ fontWeight: 700, fontSize: '1rem' }}>Genre</TableCell>
                      <TableCell sx={{ fontWeight: 700, fontSize: '1rem' }}>Price</TableCell>
                      <TableCell sx={{ fontWeight: 700, fontSize: '1rem' }}>Stock</TableCell>
                      <TableCell sx={{ fontWeight: 700, fontSize: '1rem' }}>Year</TableCell>
                      <TableCell sx={{ fontWeight: 700, fontSize: '1rem' }}>Added</TableCell>
                      <TableCell sx={{ fontWeight: 700, fontSize: '1rem' }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredBooks.map((book, index) => (
                      <Fade in={true} timeout={300 + (index * 100)} key={book._id}>
                        <TableRow
                          sx={{
                            '&:hover': {
                              backgroundColor: darkMode 
                                ? 'rgba(123, 97, 255, 0.1)'
                                : 'rgba(0, 188, 212, 0.05)',
                              transform: 'scale(1.01)',
                              transition: 'all 0.2s ease',
                            },
                          }}
                        >
                          <TableCell>
                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                              {book.title}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color="text.secondary">
                              {book.author}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={book.genre} 
                              size="small" 
                              variant="outlined"
                              sx={{ 
                                borderRadius: 2,
                                fontWeight: 500,
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <Typography variant="body1" sx={{ fontWeight: 700, color: 'success.main' }}>
                              {formatPrice(book.price)}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            {getStockChip(book.stock)}
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {book.publishedYear || 'N/A'}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color="text.secondary">
                              {formatDate(book.createdAt)}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                              <Tooltip title="Edit book">
                                <IconButton
                                  color="primary"
                                  onClick={() => onEditBook(book)}
                                  sx={{
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                      transform: 'scale(1.1)',
                                      backgroundColor: 'primary.main',
                                      color: 'white',
                                    },
                                  }}
                                >
                                  <EditIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Delete book">
                                <IconButton
                                  color="error"
                                  onClick={() => onDeleteBook(book)}
                                  sx={{
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                      transform: 'scale(1.1)',
                                      backgroundColor: 'error.main',
                                      color: 'white',
                                    },
                                  }}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </TableCell>
                        </TableRow>
                      </Fade>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>
        </Paper>
      </Box>
    </Fade>
  );
};

export default BookList;