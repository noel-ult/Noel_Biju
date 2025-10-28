import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
  Slide,
  Backdrop,
  Alert,
  Chip,
} from '@mui/material';
import {
  Close as CloseIcon,
  Delete as DeleteIcon,
  Warning as WarningIcon,
  Book as BookIcon,
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import { bookAPI } from '../api';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteConfirmDialog = ({ 
  open, 
  onClose, 
  book, 
  onBookDeleted, 
  darkMode 
}) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!book) return;
    
    setLoading(true);
    
    try {
      const response = await bookAPI.deleteBook(book._id);
      
      if (response.data.success) {
        toast.success('🗑️ Book deleted successfully!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        
        // Notify parent component
        if (onBookDeleted) {
          onBookDeleted(book._id);
        }
        
        // Close dialog
        onClose();
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Failed to delete book';
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

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  if (!book) return null;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          background: darkMode 
            ? 'linear-gradient(135deg, rgba(26, 26, 46, 0.95) 0%, rgba(22, 33, 62, 0.9) 100%)'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 243, 243, 0.9) 100%)',
          backdropFilter: 'blur(30px)',
          border: `1px solid ${darkMode ? 'rgba(244, 67, 54, 0.3)' : 'rgba(244, 67, 54, 0.2)'}`,
          borderRadius: 3,
          boxShadow: darkMode 
            ? '0 20px 60px rgba(244, 67, 54, 0.2)'
            : '0 20px 60px rgba(244, 67, 54, 0.15)',
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
          background: 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)',
          color: 'white',
          borderRadius: '12px 12px 0 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <WarningIcon />
          <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
            Confirm Deletion
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
        {/* Warning Alert */}
        <Alert 
          severity="warning" 
          sx={{ 
            mb: 3,
            borderRadius: 2,
            background: darkMode 
              ? 'rgba(255, 152, 0, 0.1)'
              : 'rgba(255, 152, 0, 0.05)',
            border: '1px solid rgba(255, 152, 0, 0.2)',
          }}
        >
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            This action cannot be undone!
          </Typography>
          <Typography variant="body2">
            The book will be permanently removed from your inventory.
          </Typography>
        </Alert>

        {/* Book Details Card */}
        <Box
          sx={{
            p: 3,
            borderRadius: 2,
            background: darkMode 
              ? 'rgba(26, 26, 46, 0.3)'
              : 'rgba(248, 250, 252, 0.8)',
            border: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
            mb: 3,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <BookIcon color="primary" sx={{ fontSize: 32 }} />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                {book.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                by {book.author}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
            <Chip 
              label={book.genre} 
              size="small" 
              variant="outlined"
              sx={{ borderRadius: 2 }}
            />
            <Chip 
              label={formatPrice(book.price)} 
              size="small" 
              color="success"
              sx={{ borderRadius: 2, fontWeight: 600 }}
            />
            <Chip 
              label={`Stock: ${book.stock}`} 
              size="small" 
              color={book.stock === 0 ? 'error' : book.stock <= 5 ? 'warning' : 'primary'}
              sx={{ borderRadius: 2, fontWeight: 600 }}
            />
          </Box>

          {book.publishedYear && (
            <Typography variant="body2" color="text.secondary">
              Published: {book.publishedYear}
            </Typography>
          )}
        </Box>

        <Typography variant="body1" sx={{ textAlign: 'center', fontWeight: 500 }}>
          Are you sure you want to delete <strong>"{book.title}"</strong>?
        </Typography>
      </DialogContent>

      <DialogActions
        sx={{
          p: 3,
          background: darkMode 
            ? 'rgba(26, 26, 46, 0.3)'
            : 'rgba(248, 250, 252, 0.8)',
          gap: 2,
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
            flex: 1,
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleDelete}
          disabled={loading}
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
            px: 4,
            flex: 1,
            background: 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #d32f2f 0%, #b71c1c 100%)',
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 30px rgba(244, 67, 54, 0.4)',
            },
            '&:disabled': {
              background: 'rgba(244, 67, 54, 0.3)',
              color: 'rgba(255, 255, 255, 0.5)',
            },
          }}
        >
          {loading ? 'Deleting...' : 'Delete Book'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmDialog;