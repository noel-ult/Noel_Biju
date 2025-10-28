import { createTheme } from '@mui/material/styles';

// Unique Cosmic Forest color palette
const colors = {
  primary: '#2DD4BF', // Ethereal mint
  secondary: '#F59E0B', // Cosmic amber
  accent: '#059669', // Deep forest green
  tertiary: '#8B5A2B', // Earth copper
  quaternary: '#92400E', // Rich oak brown
  success: '#10B981', // Forest emerald
  warning: '#F97316', // Solar flare
  error: '#EF4444', // Crimson alert
  
  // Unique glass colors
  glass: {
    light: 'rgba(45, 212, 191, 0.12)',
    dark: 'rgba(139, 90, 43, 0.15)',
  },
  
  // Distinctive gradient backgrounds
  gradients: {
    primary: 'linear-gradient(135deg, #2DD4BF 0%, #F59E0B 100%)', // Mint to Amber
    secondary: 'linear-gradient(135deg, #059669 0%, #8B5A2B 100%)', // Forest to Copper
    tertiary: 'linear-gradient(135deg, #92400E 0%, #10B981 100%)', // Oak to Emerald
    cosmic: 'linear-gradient(135deg, #2DD4BF 0%, #059669 25%, #F59E0B 50%, #92400E 75%, #8B5A2B 100%)',
    forest: 'linear-gradient(135deg, #10B981 0%, #2DD4BF 50%, #8B5A2B 100%)',
    sunset: 'linear-gradient(135deg, #F97316 0%, #059669 50%, #F59E0B 100%)',
    dark: 'linear-gradient(135deg, #1F2937 0%, #374151 50%, #111827 100%)',
    light: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 50%, #A7F3D0 100%)',
  },
};

// Light theme
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: colors.primary,
      light: '#ff8a65',
      dark: '#e64a19',
    },
    secondary: {
      main: colors.secondary,
      light: '#a78bfa',
      dark: '#7c3aed',
    },
    background: {
      default: '#fef3c7',
      paper: 'rgba(255, 255, 255, 0.9)',
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
      background: colors.gradients.rainbow,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      background: colors.gradients.primary,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
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
    borderRadius: 20,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          textTransform: 'none',
          fontWeight: 600,
          boxShadow: '0 6px 25px rgba(255, 107, 53, 0.4)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-4px) scale(1.02)',
            boxShadow: '0 12px 40px rgba(255, 107, 53, 0.5)',
          },
        },
        contained: {
          background: colors.gradients.primary,
          color: 'white',
          '&:hover': {
            background: colors.gradients.cosmic,
          },
        },
        outlined: {
          borderWidth: 2,
          borderColor: colors.primary,
          color: colors.primary,
          '&:hover': {
            borderColor: colors.secondary,
            color: colors.secondary,
            background: 'rgba(5, 150, 105, 0.1)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(20px)',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          border: '2px solid rgba(255, 107, 53, 0.2)',
          borderRadius: 20,
          boxShadow: '0 8px 32px rgba(255, 107, 53, 0.2)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 15px 45px rgba(255, 107, 53, 0.3)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 16,
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            '& fieldset': {
              borderColor: 'rgba(255, 107, 53, 0.4)',
              borderWidth: 2,
            },
            '&:hover fieldset': {
              borderColor: colors.primary,
            },
            '&.Mui-focused fieldset': {
              borderColor: colors.secondary,
              boxShadow: `0 0 0 4px rgba(5, 150, 105, 0.2)`,
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: colors.gradients.cosmic,
          boxShadow: '0 4px 20px rgba(45, 212, 191, 0.3)',
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
      light: '#ff8a65',
      dark: '#e64a19',
    },
    secondary: {
      main: colors.secondary,
      light: '#a78bfa',
      dark: '#7c3aed',
    },
    background: {
      default: '#0f0f23',
      paper: 'rgba(26, 26, 46, 0.9)',
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
      background: colors.gradients.rainbow,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      background: colors.gradients.primary,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
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
    borderRadius: 20,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          textTransform: 'none',
          fontWeight: 600,
          boxShadow: '0 6px 25px rgba(5, 150, 105, 0.4)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-4px) scale(1.02)',
            boxShadow: '0 12px 40px rgba(5, 150, 105, 0.5)',
          },
        },
        contained: {
          background: colors.gradients.secondary,
          color: 'white',
          '&:hover': {
            background: colors.gradients.rainbow,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(20px)',
          backgroundColor: 'rgba(26, 26, 46, 0.8)',
          border: '2px solid rgba(5, 150, 105, 0.3)',
          borderRadius: 20,
          boxShadow: '0 8px 32px rgba(5, 150, 105, 0.3)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 16,
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(26, 26, 46, 0.6)',
            '& fieldset': {
              borderColor: 'rgba(5, 150, 105, 0.4)',
              borderWidth: 2,
            },
            '&:hover fieldset': {
              borderColor: colors.secondary,
            },
            '&.Mui-focused fieldset': {
              borderColor: colors.accent,
              boxShadow: `0 0 0 4px rgba(6, 214, 160, 0.2)`,
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
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: colors.gradients.secondary,
          boxShadow: '0 4px 20px rgba(5, 150, 105, 0.4)',
        },
      },
    },
  },
});

export { colors };