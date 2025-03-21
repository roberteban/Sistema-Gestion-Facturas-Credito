import React, { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Paper,
  TableContainer,
} from '@mui/material';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const SearchInvoices = () => {
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [invoiceStatus, setInvoiceStatus] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [invoices, setInvoices] = useState([]);

  const handleSearch = async () => {
    try {
      const query = new URLSearchParams({ invoiceNumber, invoiceStatus, paymentStatus }).toString();
      const response = await fetch(`http://localhost:5000/api/invoices?${query}`);
      if (!response.ok) throw new Error('Error al buscar facturas');
      const data = await response.json();
      setInvoices(data);
      if (data.length === 0) toast.info('No se encontraron facturas');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Paper elevation={3} sx={{ padding: '20px', backgroundColor: '#fff' }}>
        <Typography variant="h5" gutterBottom color="primary">
          Buscar Facturas
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Número de Factura"
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
              fullWidth
              variant="outlined"
              sx={{ backgroundColor: '#f5f5f5', borderRadius: '8px' }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Estado de Factura"
              value={invoiceStatus}
              onChange={(e) => setInvoiceStatus(e.target.value)}
              fullWidth
              variant="outlined"
              sx={{ backgroundColor: '#f5f5f5', borderRadius: '8px' }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Estado de Pago"
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value)}
              fullWidth
              variant="outlined"
              sx={{ backgroundColor: '#f5f5f5', borderRadius: '8px' }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={handleSearch}
              sx={{ background: 'linear-gradient(45deg, #0288d1, #ff5722)', color: '#fff' }}
            >
              Buscar
            </Button>
          </Grid>
        </Grid>
        {invoices.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#0288d1' }}>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Número</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Fecha</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Monto Total</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Estado</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Estado de Pago</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f5f5f5' } }}>
                      <TableCell>{invoice.invoiceNumber}</TableCell>
                      <TableCell>{new Date(invoice.invoiceDate).toLocaleDateString()}</TableCell>
                      <TableCell>{invoice.totalAmount}</TableCell>
                      <TableCell>{invoice.invoiceStatus}</TableCell>
                      <TableCell>{invoice.paymentStatus}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </motion.div>
        )}
      </Paper>
    </motion.div>
  );
};

export default SearchInvoices;