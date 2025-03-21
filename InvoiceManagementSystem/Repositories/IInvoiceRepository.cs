using System.Collections.Generic;
using System.Threading.Tasks;
using InvoiceManagementSystem.Models;

namespace InvoiceManagementSystem.Repositories
{
    public interface IInvoiceRepository
    {
        Task<Invoice?> GetByIdAsync(int id);
        Task<List<Invoice>> GetInvoicesAsync(string invoiceStatus, string paymentStatus, string invoiceNumber);
        Task AddAsync(Invoice invoice);
        Task UpdateAsync(Invoice invoice);
        Task AddCreditNoteAsync(int invoiceId, InvoiceCreditNote creditNote);
    }
}