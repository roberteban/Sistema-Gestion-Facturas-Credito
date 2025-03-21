using System;

namespace InvoiceManagementSystem.Models
{
    public class InvoicePayment
    {
        public int Id { get; set; }
        public int InvoiceId { get; set; }
        public decimal PaymentAmount { get; set; }
        public DateTime PaymentDate { get; set; }
        public Invoice? Invoice { get; set; } // Anulable
    }
}