import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  Box,
  IconButton,
  Typography,
  Slide,
  Backdrop,
} from '@mui/material';
import {
  Close as CloseIcon,
  Save as SaveIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import { bookAPI } from '../api';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EditBookModal = ({ 
  open, 
  onClose, 
  book, 
  onBookUpdated, 
  darkMode 
}) => {
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

  // Initialize form data when book changes
  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title || '',
        author: book.author || '',
        genre: book.genre || '',
        price: book.price?.toString() || '',
        stock: book.stock?.toString() || '',
        publishedYear: book.publishedYear?.toString() || '',
      });
      setErrors({});
    }
  }, [book]);

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
      
      const response = await bookAPI.updateBook(book._id, bookData);
      
      if (response.data.success) {
        toast.success('📚 Book updated successfully!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        
        // Notify parent component
        if (onBookUpdated) {
          onBookUpdated(response.data.data);
        }
        
        // Close modal
        onClose();
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Failed to update book';
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          background: darkMode 
            ? 'linear-gradient(135deg, rgba(26, 26, 46, 0.95) 0%, rgba(22, 33, 62, 0.9) 100%)'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 248, 255, 0.9) 100%)',
          backdropFilter: 'blur(30px)',
          border: `1px solid ${darkMode ? 'rgba(123, 97, 255, 0.3)' : 'rgba(0, 188, 212, 0.3)'}`,
          borderRadius: 3,
          boxShadow: darkMode 
            ? '0 20px 60px rgba(123, 97, 255, 0.2)'
            : '0 20px 60px rgba(0, 188, 212, 0.2)',
        },
      }}
      BackdropComponent={Backdrop}
      BackdropProps={{
        sx: {
          backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(10px)',
        },
      }}
    >
      <DialogTitle
        sx={{
          background: darkMode 
            ? 'linear-gradient(135deg, #7b61ff 0%, #00bcd4 100%)'
            : 'linear-gradient(135deg, #00bcd4 0%, #7b61ff 100%)',
          color: 'white',
          borderRadius: '12px 12px 0 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <EditIcon />
          <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
            Edit Book Details
          </Typography>
        </Box>
        <IconButton
          onClick={handleClose}
          disabled={loading}
          sx={{
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 3 }}>
        <Box component="form" onSubmit={handleSubmit}>
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
                disabled={loading}
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
                disabled={loading}
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
                disabled={loading}
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
                disabled={loading}
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
                disabled={loading}
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
                disabled={loading}
                inputProps={{ min: 1000, max: new Date().getFullYear() }}
              />
            </Grid>

            {/* Current values display */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  background: darkMode 
                    ? 'rgba(123, 97, 255, 0.1)'
                    : 'rgba(0, 188, 212, 0.1)',
                  border: `1px solid ${darkMode ? 'rgba(123, 97, 255, 0.2)' : 'rgba(0, 188, 212, 0.2)'}`,
                }}
              >
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Current Values:
                </Typography>
                <Typography variant="body2">
                  <strong>Price:</strong> ${book?.price || 'N/A'}
                </Typography>
                <Typography variant="body2">
                  <strong>Stock:</strong> {book?.stock || 0}
                </Typography>
                <Typography variant="body2">
                  <strong>Year:</strong> {book?.publishedYear || 'N/A'}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          p: 3,
          background: darkMode 
            ? 'rgba(26, 26, 46, 0.3)'
            : 'rgba(248, 250, 252, 0.8)',
        }}
      >
        <Button
          onClick={handleClose}
          disabled={loading}
          variant="outlined"
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
            px: 3,
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={loading}
          variant="contained"
          startIcon={<SaveIcon />}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
            px: 4,
            background: darkMode 
              ? 'linear-gradient(135deg, #7b61ff 0%, #00bcd4 100%)'
              : 'linear-gradient(135deg, #00bcd4 0%, #7b61ff 100%)',
            '&:hover': {
              background: darkMode 
                ? 'linear-gradient(135deg, #00bcd4 0%, #ff6b6b 100%)'
                : 'linear-gradient(135deg, #7b61ff 0%, #ff6b6b 100%)',
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 30px rgba(123, 97, 255, 0.4)',
            },
          }}
        >
          {loading ? 'Updating...' : 'Update Book'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditBookModal;