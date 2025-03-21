namespace InvoiceManagementSystem.Models
{
    public class Customer
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty; // Inicializado
        public string Email { get; set; } = string.Empty; // Inicializado
    }
}