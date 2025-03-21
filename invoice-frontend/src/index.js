import React from 'react';
import ReactDOM from 'react-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0288d1', // Azul vibrante
    },
    secondary: {
      main: '#ff5722', // Naranja cálido
    },
    background: {
      default: '#fafafa', // Gris claro suave
    },
    text: {
      primary: '#424242', // Gris oscuro
    },
  },
  typography: {
    fontFamily: "'Poppins', 'Roboto', sans-serif", // Fuente moderna
    h5: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px', // Bordes más redondeados
          textTransform: 'none', // Sin mayúsculas forzadas
          boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
          '&:hover': {
            boxShadow: '0 6px 12px rgba(0,0,0,0.2)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-5px)', // Efecto hover
            boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
          },
        },
      },
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
    <ToastContainer />
  </ThemeProvider>,
  document.getElementById('root')
);