using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using InvoiceManagementSystem.Data;
using InvoiceManagementSystem.Models;

namespace InvoiceManagementSystem.Repositories
{
    public class InvoiceRepository : IInvoiceRepository
    {
        private readonly AppDbContext _context;

        public InvoiceRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Invoice?> GetByIdAsync(int id)
        {
            return await _context.Invoices
                .Include(i => i.InvoiceDetails)
                .Include(i => i.InvoicePayment)
                .Include(i => i.InvoiceCreditNotes)
                .Include(i => i.Customer)
                .FirstOrDefaultAsync(i => i.Id == id);
        }

        public async Task<List<Invoice>> GetInvoicesAsync(string invoiceStatus, string paymentStatus, string invoiceNumber)
        {
            var query = _context.Invoices
                .Include(i => i.InvoiceDetails)
                .Include(i => i.InvoicePayment)
                .Include(i => i.InvoiceCreditNotes)
                .Include(i => i.Customer)
                .AsQueryable();

            if (!string.IsNullOrEmpty(invoiceStatus))
                query = query.Where(i => i.InvoiceStatus == invoiceStatus);

            if (!string.IsNullOrEmpty(paymentStatus))
                query = query.Where(i => i.PaymentStatus == paymentStatus);

            if (!string.IsNullOrEmpty(invoiceNumber))
                query = query.Where(i => i.InvoiceNumber == invoiceNumber);

            return await query.ToListAsync();
        }

        public async Task AddAsync(Invoice invoice)
        {
            _context.Invoices.Add(invoice);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Invoice invoice)
        {
            _context.Invoices.Update(invoice);
            await _context.SaveChangesAsync();
        }

        public async Task AddCreditNoteAsync(int invoiceId, InvoiceCreditNote creditNote)
        {
            var invoice = await GetByIdAsync(invoiceId);
            if (invoice == null) throw new Exception("Factura no encontrada.");

            decimal totalCredit = invoice.InvoiceCreditNotes?.Sum(n => n.CreditNoteAmount) ?? 0;
            decimal remainingAmount = invoice.TotalAmount - totalCredit;
            if (creditNote.CreditNoteAmount > remainingAmount)
                throw new Exception("El monto de la nota de crédito excede el saldo pendiente.");

            creditNote.InvoiceId = invoiceId;
            creditNote.CreditNoteDate = DateTime.Now;
            _context.InvoiceCreditNotes.Add(creditNote);
            await _context.SaveChangesAsync();

            UpdateInvoiceStatus(invoice);
            UpdatePaymentStatus(invoice);
            await _context.SaveChangesAsync();
        }

        private void UpdateInvoiceStatus(Invoice invoice)
        {
            decimal totalCredit = invoice.InvoiceCreditNotes?.Sum(n => n.CreditNoteAmount) ?? 0;
            if (totalCredit >= invoice.TotalAmount)
                invoice.InvoiceStatus = "Cancelled";
            else if (totalCredit > 0)
                invoice.InvoiceStatus = "Partial";
            else
                invoice.InvoiceStatus = "Issued";
        }

        private void UpdatePaymentStatus(Invoice invoice)
        {
            if (invoice.InvoicePayment != null && invoice.InvoicePayment.PaymentDate != default)
            {
                invoice.PaymentStatus = "Paid";
            }
            else if (DateTime.Now > invoice.PaymentDueDate)
            {
                invoice.PaymentStatus = "Overdue";
            }
            else
            {
                invoice.PaymentStatus = "Pending";
            }
        }
    }
}