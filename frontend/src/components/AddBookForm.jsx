import React, { useState } from 'react';
import {
  Paper,
  TextField,
  Button,
  Typography,
  Grid,
  Box,
  IconButton,
  Collapse,

} from '@mui/material';
import {
  Add as AddIcon,
  ExpandLess,
  ExpandMore,
  Book as BookIcon,
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import { bookAPI } from '../api';

const AddBookForm = ({ onBookAdded, darkMode }) => {
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    price: '',
    stock: '',
    publishedYear: '',
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.author.trim()) {
      newErrors.author = 'Author is required';
    }
    
    if (!formData.genre.trim()) {
      newErrors.genre = 'Genre is required';
    }
    
    if (!formData.price || isNaN(formData.price) || parseFloat(formData.price) < 0) {
      newErrors.price = 'Please enter a valid price';
    }
    
    if (formData.stock && (isNaN(formData.stock) || parseInt(formData.stock) < 0)) {
      newErrors.stock = 'Stock must be a positive number';
    }
    
    if (formData.publishedYear && (isNaN(formData.publishedYear) || parseInt(formData.publishedYear) < 1000 || parseInt(formData.publishedYear) > new Date().getFullYear())) {
      newErrors.publishedYear = 'Please enter a valid year';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the form errors');
      return;
    }
    
    setLoading(true);
    
    try {
      const bookData = {
        title: formData.title.trim(),
        author: formData.author.trim(),
        genre: formData.genre.trim(),
        price: parseFloat(formData.price),
        stock: formData.stock ? parseInt(formData.stock) : 0,
        publishedYear: formData.publishedYear ? parseInt(formData.publishedYear) : undefined,
      };
      
      const response = await bookAPI.createBook(bookData);
      
      if (response.data.success) {
        toast.success('📚 Book added successfully!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        
        // Reset form
        setFormData({
          title: '',
          author: '',
          genre: '',
          price: '',
          stock: '',
          publishedYear: '',
        });
        
        // Collapse form after successful submission
        setExpanded(false);
        
        // Notify parent component
        if (onBookAdded) {
          onBookAdded(response.data.data);
        }
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Failed to add book';
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      title: '',
      author: '',
      genre: '',
      price: '',
      stock: '',
      publishedYear: '',
    });
    setErrors({});
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        mb: 3,
        background: darkMode 
          ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.95) 100%)'
          : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)',
        backdropFilter: 'blur(10px)',
        borderRadius: 2,
        border: `1px solid ${darkMode ? 'rgba(148, 163, 184, 0.2)' : 'rgba(226, 232, 240, 0.8)'}`,
        boxShadow: darkMode 
          ? '0 4px 16px rgba(0, 0, 0, 0.3)'
          : '0 4px 16px rgba(37, 99, 235, 0.1)',
        transition: 'all 0.2s ease',
        '&:hover': {
          transform: 'translateY(-1px)',
          boxShadow: darkMode 
            ? '0 8px 24px rgba(0, 0, 0, 0.4)'
            : '0 8px 24px rgba(37, 99, 235, 0.15)',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <BookIcon sx={{ color: '#2DD4BF', fontSize: '2rem' }} />
          <Typography 
            variant="h5" 
            component="h2" 
            className="cosmic-text"
            sx={{ 
              fontWeight: 700,
              fontSize: '1.5rem',
            }}
          >
            � Add New Book 🦋
          </Typography>
        </Box>
        <IconButton color="primary">
          {expanded ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </Box>

      <Collapse in={expanded}>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            {/* Title */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Book Title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                error={!!errors.title}
                helperText={errors.title}
                required
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    transition: 'all 0.3s ease',
                  },
                }}
              />
            </Grid>

            {/* Author */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Author"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                error={!!errors.author}
                helperText={errors.author}
                required
                variant="outlined"
              />
            </Grid>

            {/* Genre */}
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Genre"
                name="genre"
                value={formData.genre}
                onChange={handleInputChange}
                error={!!errors.genre}
                helperText={errors.genre}
                required
                variant="outlined"
              />
            </Grid>

            {/* Price */}
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Price ($)"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleInputChange}
                error={!!errors.price}
                helperText={errors.price}
                required
                variant="outlined"
                inputProps={{ min: 0, step: 0.01 }}
              />
            </Grid>

            {/* Stock */}
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Stock Quantity"
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleInputChange}
                error={!!errors.stock}
                helperText={errors.stock}
                variant="outlined"
                inputProps={{ min: 0 }}
              />
            </Grid>

            {/* Published Year */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Published Year"
                name="publishedYear"
                type="number"
                value={formData.publishedYear}
                onChange={handleInputChange}
                error={!!errors.publishedYear}
                helperText={errors.publishedYear}
                variant="outlined"
                inputProps={{ min: 1000, max: new Date().getFullYear() }}
              />
            </Grid>

            {/* Buttons */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
                <Button
                  variant="outlined"
                  onClick={handleReset}
                  disabled={loading}
                  sx={{
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                  }}
                >
                  Reset
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  startIcon={<AddIcon />}
                  className="professional-button"
                  sx={{
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    px: 4,
                    background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
                    boxShadow: '0 2px 8px rgba(37, 99, 235, 0.2)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #1d4ed8 0%, #1e3a8a 100%)',
                      transform: 'translateY(-1px)',
                      boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
                    },
                  }}
                >
                  {loading ? '🌿 Adding...' : '🦋 Add Book'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Collapse>
    </Paper>
  );
};

export default AddBookForm;