using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using InvoiceManagementSystem.Models;
using InvoiceManagementSystem.Repositories;
using System.Text.Json;
using System.IO;

namespace InvoiceManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoicesController : ControllerBase
    {
        private readonly IInvoiceRepository _repository;

        public InvoicesController(IInvoiceRepository repository)
        {
            _repository = repository;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetInvoice(int id)
        {
            var invoice = await _repository.GetByIdAsync(id);
            if (invoice == null) return NotFound();
            return Ok(invoice);
        }

        [HttpPost]
        public async Task<IActionResult> CreateInvoice([FromBody] Invoice invoice)
        {
            if (invoice == null || string.IsNullOrEmpty(invoice.InvoiceNumber))
            {
                return BadRequest("La factura es inválida o falta el número de factura.");
            }
            await _repository.AddAsync(invoice);
            return CreatedAtAction(nameof(GetInvoice), new { id = invoice.Id }, invoice);
        }

        [HttpPost("load")]
        public async Task<IActionResult> LoadInvoices()
        {
            try
            {
                var jsonPath = Path.Combine(Directory.GetCurrentDirectory(), "database", "bd_exam.json");
                if (!System.IO.File.Exists(jsonPath))
                {
                    return BadRequest("El archivo JSON no se encuentra en la ruta especificada.");
                }

                var jsonData = await System.IO.File.ReadAllTextAsync(jsonPath);
                var invoices = JsonSerializer.Deserialize<List<Invoice>>(jsonData, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                }) ?? new List<Invoice>();

                if (!invoices.Any())
                {
                    return BadRequest("El archivo JSON no contiene datos de facturas válidos.");
                }

                foreach (var invoice in invoices)
                {
                    var existing = await _repository.GetInvoicesAsync(string.Empty, string.Empty, invoice.InvoiceNumber);
                    if (existing.Any()) continue;

                    decimal sumSubtotals = invoice.InvoiceDetails?.Sum(d => d.Subtotal) ?? 0;
                    if (sumSubtotals != invoice.TotalAmount)
                    {
                        continue; // Opcional: podrías agregar un log para depuración
                    }

                    invoice.InvoiceStatus = "Issued";
                    invoice.PaymentStatus = DateTime.Now > invoice.PaymentDueDate ? "Overdue" : "Pending";

                    await _repository.AddAsync(invoice);
                }

                return Ok("Facturas cargadas exitosamente.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al cargar facturas: {ex.Message}");
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetInvoices(
            [FromQuery] string invoiceStatus,
            [FromQuery] string paymentStatus,
            [FromQuery] string invoiceNumber)
        {
            var invoices = await _repository.GetInvoicesAsync(invoiceStatus, paymentStatus, invoiceNumber);
            return Ok(invoices);
        }

        [HttpPost("{invoiceId}/creditnotes")]
        public async Task<IActionResult> AddCreditNote(int invoiceId, [FromBody] InvoiceCreditNote creditNote)
        {
            if (creditNote == null)
            {
                return BadRequest("La nota de crédito no puede ser nula.");
            }

            try
            {
                await _repository.AddCreditNoteAsync(invoiceId, creditNote);
                return Ok("Nota de crédito agregada exitosamente.");
            }
            catch (Exception ex)
            {
                return BadRequest($"Error al agregar la nota de crédito: {ex.Message}");
            }
        }
    }
}