import { createTheme } from '@mui/material/styles';

// Vibrant color palette
const colors = {
  primary: '#ff6b35', // Vibrant orange
  secondary: '#8b5cf6', // Purple
  accent: '#06d6a0', // Teal green
  tertiary: '#f72585', // Hot pink
  success: '#00f5ff', // Cyan
  warning: '#ffd23f', // Golden yellow
  error: '#ff073a', // Bright red
  
  // Vibrant glass colors
  glass: {
    light: 'rgba(255, 255, 255, 0.15)',
    dark: 'rgba(139, 92, 246, 0.1)',
  },
  
  // Vibrant gradient backgrounds
  gradients: {
    primary: 'linear-gradient(135deg, #ff6b35 0%, #f72585 100%)',
    secondary: 'linear-gradient(135deg, #8b5cf6 0%, #06d6a0 100%)',
    tertiary: 'linear-gradient(135deg, #ffd23f 0%, #ff6b35 100%)',
    rainbow: 'linear-gradient(135deg, #ff6b35 0%, #f72585 25%, #8b5cf6 50%, #06d6a0 75%, #00f5ff 100%)',
    dark: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)',
    light: 'linear-gradient(135deg, #ffeaa7 0%, #fab1a0 50%, #fd79a8 100%)',
  },
};

// Light theme
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: colors.primary,
      light: '#4dd0e1',
      dark: '#0097a7',
    },
    secondary: {
      main: colors.secondary,
      light: '#9c7eff',
      dark: '#5e35b1',
    },
    background: {
      default: '#f8fafc',
      paper: 'rgba(255, 255, 255, 0.8)',
    },
    text: {
      primary: '#1a202c',
      secondary: '#4a5568',
    },
    error: {
      main: colors.error,
    },
    warning: {
      main: colors.warning,
    },
    success: {
      main: colors.success,
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      background: colors.gradients.primary,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 600,
          boxShadow: '0 2px 8px rgba(37, 99, 235, 0.2)',
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
          },
        },
        contained: {
          background: colors.gradients.primary,
          color: 'white',
          '&:hover': {
            background: colors.gradients.secondary,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(20px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: 16,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            '& fieldset': {
              borderColor: 'rgba(37, 99, 235, 0.3)',
              borderWidth: 1,
            },
            '&:hover fieldset': {
              borderColor: colors.primary,
            },
            '&.Mui-focused fieldset': {
              borderColor: colors.primary,
              boxShadow: `0 0 0 3px rgba(37, 99, 235, 0.1)`,
            },
          },
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          overflow: 'hidden',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(37, 99, 235, 0.05)',
            transition: 'all 0.2s ease',
          },
        },
      },
    },
  },
});

// Dark theme
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: colors.primary,
      light: '#4dd0e1',
      dark: '#0097a7',
    },
    secondary: {
      main: colors.secondary,
      light: '#9c7eff',
      dark: '#5e35b1',
    },
    background: {
      default: '#0a0a0a',
      paper: 'rgba(26, 26, 46, 0.8)',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b3b3b3',
    },
    error: {
      main: colors.error,
    },
    warning: {
      main: colors.warning,
    },
    success: {
      main: colors.success,
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      background: colors.gradients.primary,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#ffffff',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#ffffff',
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 500,
      color: '#ffffff',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      color: '#ffffff',
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 600,
          boxShadow: '0 2px 8px rgba(37, 99, 235, 0.2)',
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
          },
        },
        contained: {
          background: colors.gradients.primary,
          color: 'white',
          '&:hover': {
            background: colors.gradients.secondary,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(20px)',
          backgroundColor: 'rgba(30, 41, 59, 0.8)',
          border: '1px solid rgba(148, 163, 184, 0.2)',
          borderRadius: 16,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(30, 41, 59, 0.5)',
            '& fieldset': {
              borderColor: 'rgba(148, 163, 184, 0.3)',
              borderWidth: 1,
            },
            '&:hover fieldset': {
              borderColor: colors.primary,
            },
            '&.Mui-focused fieldset': {
              borderColor: colors.primary,
              boxShadow: `0 0 0 3px rgba(37, 99, 235, 0.1)`,
            },
          },
          '& .MuiInputLabel-root': {
            color: '#ffffff',
          },
          '& .MuiOutlinedInput-input': {
            color: '#ffffff',
          },
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          overflow: 'hidden',
          backgroundColor: 'rgba(30, 41, 59, 0.6)',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(37, 99, 235, 0.1)',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(37, 99, 235, 0.1)',
            transition: 'all 0.2s ease',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          color: '#ffffff',
          borderColor: 'rgba(148, 163, 184, 0.2)',
        },
        head: {
          color: '#ffffff',
          fontWeight: 600,
        },
      },
    },
  },
});

export { colors };