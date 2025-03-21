import React from 'react';
import { AppBar, Toolbar, Typography, Container, Grid, Box } from '@mui/material';
import LoadInvoices from './components/LoadInvoices';
import SearchInvoices from './components/SearchInvoices';
import ManageCreditNotes from './components/ManageCreditNotes';

function App() {
  return (
    <div>
      <AppBar position="static" sx={{ background: 'linear-gradient(45deg, #0288d1, #ff5722)' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
            Sistema de Facturación
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ padding: '30px', backgroundColor: '#fafafa' }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box>
              <LoadInvoices />
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box>
              <SearchInvoices />
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box>
              <ManageCreditNotes invoiceId={1} /> {/* Cambia por un ID dinámico */}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;