using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace InvoiceManagementSystem.Models
{
    public class Invoice
    {
        [Key]
        public int Id { get; set; }
        public string InvoiceNumber { get; set; } = string.Empty; // Inicializado
        public DateTime InvoiceDate { get; set; }
        public decimal TotalAmount { get; set; }
        public int DaysToDue { get; set; }
        public DateTime PaymentDueDate { get; set; }
        public string InvoiceStatus { get; set; } = "Issued"; // Ya iniciado
        public string PaymentStatus { get; set; } = "Pending"; // Ya iniciado

        // Relaciones
        public int CustomerId { get; set; }
        public Customer? Customer { get; set; } // Anulable
        public List<InvoiceDetail> InvoiceDetails { get; set; } = new List<InvoiceDetail>(); // Inicializado
        public InvoicePayment? InvoicePayment { get; set; } // Anulable
        public List<InvoiceCreditNote> InvoiceCreditNotes { get; set; } = new List<InvoiceCreditNote>(); // Inicializado
    }
}