import React, { useState } from 'react';
import { TextField, Button, Typography, Paper } from '@mui/material';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const ManageCreditNotes = ({ invoiceId }) => {
  const [amount, setAmount] = useState('');

  const handleAddCreditNote = async () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      toast.error('Por favor, ingrese un monto válido');
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/api/invoices/${invoiceId}/creditnotes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ creditNoteAmount: parseFloat(amount) }),
      });
      if (!response.ok) throw new Error('Error al agregar la nota de crédito');
      toast.success('Nota de crédito agregada exitosamente');
      setAmount('');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Paper elevation={3} sx={{ padding: '20px', backgroundColor: '#fff' }}>
        <Typography variant="h6" gutterBottom color="primary">
          Agregar Nota de Crédito
        </Typography>
        <TextField
          label="Monto"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          fullWidth
          variant="outlined"
          sx={{ marginBottom: '15px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}
        />
        <Button
          variant="contained"
          onClick={handleAddCreditNote}
          sx={{ background: 'linear-gradient(45deg, #0288d1, #ff5722)', color: '#fff' }}
        >
          Agregar
        </Button>
      </Paper>
    </motion.div>
  );
};

export default ManageCreditNotes;