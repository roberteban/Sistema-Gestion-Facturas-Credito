import React, { useState } from 'react';
import { Button, CircularProgress, Typography, Paper } from '@mui/material';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const LoadInvoices = () => {
  const [loading, setLoading] = useState(false);

  const handleLoadInvoices = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/invoices/load', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) throw new Error('Error al cargar las facturas');
      toast.success('Facturas cargadas exitosamente', { position: 'top-right', autoClose: 3000 });
    } catch (err) {
      toast.error(err.message, { position: 'top-right', autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Paper elevation={3} sx={{ padding: '20px', backgroundColor: '#fff' }}>
        <Typography variant="h5" gutterBottom color="primary">
          Cargar Facturas
        </Typography>
        <Button
          variant="contained"
          onClick={handleLoadInvoices}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : null}
          sx={{
            background: 'linear-gradient(45deg, #0288d1, #ff5722)',
            padding: '10px 20px',
            color: '#fff',
          }}
        >
          {loading ? 'Cargando...' : 'Cargar Facturas'}
        </Button>
      </Paper>
    </motion.div>
  );
};

export default LoadInvoices;