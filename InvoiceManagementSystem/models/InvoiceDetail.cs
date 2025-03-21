namespace InvoiceManagementSystem.Models
{
    public class InvoiceDetail
    {
        public int Id { get; set; }
        public int InvoiceId { get; set; }
        public string Description { get; set; } = string.Empty; // Inicializado
        public decimal Subtotal { get; set; }
        public Invoice? Invoice { get; set; } // Anulable
    }
}