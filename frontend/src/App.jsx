import React, { useState } from 'react';
import {
  ThemeProvider,
  CssBaseline,
  Container,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Switch,
  FormControlLabel,
  Box,
  Fab,
  Tooltip,
  Fade,
} from '@mui/material';
import {
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  MenuBook as MenuBookIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import components
import AddBookForm from './components/AddBookForm';
import BookList from './components/BookList';
import EditBookModal from './components/EditBookModal';
import DeleteConfirmDialog from './components/DeleteConfirmDialog';

// Import themes
import { lightTheme, darkTheme } from './theme';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const theme = darkMode ? darkTheme : lightTheme;

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
  };

  const handleBookAdded = (newBook) => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handleEditBook = (book) => {
    setSelectedBook(book);
    setEditModalOpen(true);
  };

  const handleBookUpdated = (updatedBook) => {
    setRefreshTrigger(prev => prev + 1);
    setEditModalOpen(false);
    setSelectedBook(null);
  };

  const handleDeleteBook = (book) => {
    setSelectedBook(book);
    setDeleteDialogOpen(true);
  };

  const handleBookDeleted = (bookId) => {
    setRefreshTrigger(prev => prev + 1);
    setDeleteDialogOpen(false);
    setSelectedBook(null);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setSelectedBook(null);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setSelectedBook(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      {/* Background */}
      <Box
        sx={{
          minHeight: '100vh',
          background: darkMode 
            ? 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)'
            : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: darkMode
              ? `radial-gradient(circle at 20% 80%, rgba(123, 97, 255, 0.1) 0%, transparent 50%),
                 radial-gradient(circle at 80% 20%, rgba(0, 188, 212, 0.1) 0%, transparent 50%),
                 radial-gradient(circle at 40% 40%, rgba(255, 107, 107, 0.05) 0%, transparent 50%)`
              : `radial-gradient(circle at 20% 80%, rgba(0, 188, 212, 0.05) 0%, transparent 50%),
                 radial-gradient(circle at 80% 20%, rgba(123, 97, 255, 0.05) 0%, transparent 50%)`,
            pointerEvents: 'none',
            zIndex: -1,
          },
        }}
      >
        {/* App Bar */}
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            background: darkMode 
              ? 'rgba(26, 26, 46, 0.8)'
              : 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(20px)',
            borderBottom: `1px solid ${darkMode ? 'rgba(123, 97, 255, 0.2)' : 'rgba(0, 188, 212, 0.2)'}`,
          }}
        >
          <Toolbar>
            <MenuBookIcon sx={{ mr: 2, color: 'primary.main' }} />
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ 
                flexGrow: 1, 
                fontWeight: 700,
                background: 'linear-gradient(135deg, #00bcd4 0%, #7b61ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Book Inventory Management System
            </Typography>
            
            <FormControlLabel
              control={
                <Switch
                  checked={darkMode}
                  onChange={handleThemeToggle}
                  icon={<LightModeIcon />}
                  checkedIcon={<DarkModeIcon />}
                  sx={{
                    '& .MuiSwitch-thumb': {
                      background: darkMode 
                        ? 'linear-gradient(135deg, #7b61ff 0%, #00bcd4 100%)'
                        : 'linear-gradient(135deg, #00bcd4 0%, #7b61ff 100%)',
                    },
                  }}
                />
              }
              label={darkMode ? 'Dark Mode' : 'Light Mode'}
              sx={{ 
                color: darkMode ? 'white' : 'inherit',
                '& .MuiFormControlLabel-label': {
                  fontWeight: 500,
                },
              }}
            />
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Container maxWidth="xl" sx={{ py: 4 }}>
          <Fade in={true} timeout={1000}>
            <Box>
              {/* Header */}
              <Box sx={{ textAlign: 'center', mb: 6 }}>
                <Typography 
                  variant="h2" 
                  component="h1" 
                  sx={{ 
                    fontWeight: 700,
                    mb: 2,
                    background: 'linear-gradient(135deg, #00bcd4 0%, #7b61ff 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  📚 Digital Library Hub
                </Typography>
                <Typography 
                  variant="h5" 
                  color="text.secondary" 
                  sx={{ 
                    fontWeight: 400,
                    maxWidth: 600,
                    mx: 'auto',
                    lineHeight: 1.6,
                  }}
                >
                  Manage your book collection with style and efficiency
                </Typography>
              </Box>

              {/* Add Book Form */}
              <AddBookForm 
                onBookAdded={handleBookAdded}
                darkMode={darkMode}
              />

              {/* Book List */}
              <BookList 
                onEditBook={handleEditBook}
                onDeleteBook={handleDeleteBook}
                refreshTrigger={refreshTrigger}
                darkMode={darkMode}
              />
            </Box>
          </Fade>
        </Container>

        {/* Floating Action Button */}
        <Tooltip title="Quick Add Book" placement="left">
          <Fab
            color="primary"
            sx={{
              position: 'fixed',
              bottom: 32,
              right: 32,
              background: 'linear-gradient(135deg, #00bcd4 0%, #7b61ff 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #7b61ff 0%, #ff6b6b 100%)',
                transform: 'scale(1.1)',
              },
              transition: 'all 0.3s ease',
              boxShadow: darkMode 
                ? '0 8px 32px rgba(123, 97, 255, 0.3)'
                : '0 8px 32px rgba(0, 188, 212, 0.3)',
            }}
            onClick={() => {
              const addForm = document.querySelector('[role="button"]');
              if (addForm) {
                addForm.click();
                addForm.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <AddIcon />
          </Fab>
        </Tooltip>

        {/* Edit Book Modal */}
        <EditBookModal
          open={editModalOpen}
          onClose={handleCloseEditModal}
          book={selectedBook}
          onBookUpdated={handleBookUpdated}
          darkMode={darkMode}
        />

        {/* Delete Confirmation Dialog */}
        <DeleteConfirmDialog
          open={deleteDialogOpen}
          onClose={handleCloseDeleteDialog}
          book={selectedBook}
          onBookDeleted={handleBookDeleted}
          darkMode={darkMode}
        />

        {/* Toast Notifications */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={darkMode ? 'dark' : 'light'}
          toastStyle={{
            background: darkMode 
              ? 'rgba(26, 26, 46, 0.95)'
              : 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            border: `1px solid ${darkMode ? 'rgba(123, 97, 255, 0.2)' : 'rgba(0, 188, 212, 0.2)'}`,
            borderRadius: '12px',
            color: darkMode ? '#ffffff' : '#1a202c',
          }}
        />
      </Box>
    </ThemeProvider>
  );
}

export default App;