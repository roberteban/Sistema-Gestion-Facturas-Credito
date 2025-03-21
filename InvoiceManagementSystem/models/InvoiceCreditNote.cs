using System;

namespace InvoiceManagementSystem.Models
{
    public class InvoiceCreditNote
    {
        public int Id { get; set; }
        public int InvoiceId { get; set; }
        public decimal CreditNoteAmount { get; set; }
        public DateTime CreditNoteDate { get; set; }
        public Invoice? Invoice { get; set; } // Anulable
    }
}