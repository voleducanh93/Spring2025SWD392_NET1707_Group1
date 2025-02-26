using AutoMapper;
using ChildVaccineSystem.Data.DTO.VaccineInventory;
using ChildVaccineSystem.Data.Entities;
using ChildVaccineSystem.Repository.Repositories;
using ChildVaccineSystem.RepositoryContract.Interfaces;
using ChildVaccineSystem.ServiceContract.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChildVaccineSystem.Service.Services
{
    public class VaccineInventoryService : IVaccineInventoryService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IEmailService _emailService;


        public VaccineInventoryService(IUnitOfWork unitOfWork, IMapper mapper, IEmailService emailService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _emailService = emailService;
        }

        // Lấy danh sách tồn kho vaccine
        public async Task<IEnumerable<VaccineInventoryDTO>> GetVaccineStockReportAsync()
        {
            var vaccineStockList = await _unitOfWork.VaccineInventories.GetAllAsync();

            var stockReport = vaccineStockList.Select(vi => new VaccineInventoryDTO
            {
                VaccineId = vi.VaccineId,
                Name = vi.Vaccine.Name ?? "Unknown",
                Manufacturer = vi.Vaccine.Manufacturer ?? "Unknown",
                BatchNumber = vi.BatchNumber,
                ManufacturingDate = vi.ManufacturingDate,
                ExpiryDate = vi.ExpiryDate,
                Supplier = vi.Supplier,
                InitialQuantity = vi.InitialQuantity,
                QuantityInStock = vi.QuantityInStock,
                TotalQuantity = vi.InitialQuantity - vi.QuantityInStock,

            }).ToList();

            return stockReport;
        }

        // Lấy danh sách tồn kho vaccine theo VaccineId
        public async Task<IEnumerable<VaccineInventoryDTO>> GetVaccineInventoryByIdAsync(int vaccineId)
        {
            // Lấy danh sách tồn kho của vaccine theo ID
            var vaccineInventories = await _unitOfWork.VaccineInventories.GetByVaccineIdAsync(vaccineId);

            if (vaccineInventories == null || !vaccineInventories.Any())
            {
                // Ném ngoại lệ nếu không tìm thấy vaccine tồn kho
                throw new KeyNotFoundException($"No inventory information found for vaccine with ID: {vaccineId}");
            }

            // Chuyển đổi danh sách đối tượng thành danh sách DTO
            var vaccineInventoryDTOs = vaccineInventories.Select(vi => new VaccineInventoryDTO
            {
                VaccineId = vi.VaccineId,
                Name = vi.Vaccine?.Name ?? "Unknown",
                Manufacturer = vi.Vaccine?.Manufacturer ?? "Unknown",
                TotalQuantity = vi.InitialQuantity - vi.QuantityInStock,
                InitialQuantity = vi.InitialQuantity,
                QuantityInStock = vi.QuantityInStock,
                BatchNumber = vi.BatchNumber,
                ManufacturingDate = vi.ManufacturingDate,
                ExpiryDate = vi.ExpiryDate,
                Supplier = vi.Supplier
            }).ToList();

            return vaccineInventoryDTOs;
        }
        // Tìm kiếm vaccine trong kho
        public async Task<IEnumerable<VaccineInventoryDTO>> SearchVaccineStockAsync(string? keyword = null)
        {
            var vaccineInventory = await _unitOfWork.VaccineInventories.SearchVaccineStockAsync(keyword);
            return _mapper.Map<IEnumerable<VaccineInventoryDTO>>(vaccineInventory);
        }

        // Xuất vaccine khỏi kho
        public async Task IssueVaccineAsync(int vaccineId, int quantity)
        {
            var vaccineInventories = await _unitOfWork.VaccineInventories.GetAvailableInventoriesByVaccineIdAsync(vaccineId);

            if (vaccineInventories == null || vaccineInventories.Count == 0)
            {
                throw new Exception("No available vaccine stock.");
            }

            int remainingQuantity = quantity;

            foreach (var inventory in vaccineInventories)
            {
                if (remainingQuantity <= 0) break;

                int issuedQuantity = 0;
                if (inventory.QuantityInStock >= remainingQuantity)
                {
                    issuedQuantity = remainingQuantity;
                    inventory.QuantityInStock -= remainingQuantity;
                    remainingQuantity = 0;
                }
                else
                {
                    issuedQuantity = inventory.QuantityInStock;
                    remainingQuantity -= inventory.QuantityInStock;
                    inventory.QuantityInStock = 0;
                }

                // Tạo giao dịch xuất (Export)
                var transaction = new VaccineTransactionHistory
                {
                    VaccineInventoryId = inventory.VaccineInventoryId,
                    TransactionType = "Export",
                    Quantity = issuedQuantity,
                    TransactionDate = DateTime.UtcNow,
                    Description = $"Issued {issuedQuantity} unit(s) from Batch {inventory.BatchNumber}."
                };

                // Lưu giao dịch vào lịch sử (Dùng IVaccineTransactionHistoryRepository)
                await _unitOfWork.VaccineTransactionHistories.AddAsync(transaction);
            }

            if (remainingQuantity > 0)
            {
                throw new Exception("Not enough vaccine in stock.");
            }

            await _unitOfWork.CompleteAsync();
        }

        // Hoàn trả vaccine về kho
        public async Task ReturnVaccineAsync(int vaccineId, int returnQuantity)
        {
            var vaccineInventory = await _unitOfWork.VaccineInventories.GetVaccineByIdAsync(vaccineId);
            if (vaccineInventory == null)
            {
                throw new Exception("Vaccine with the specified ID was not found.");
            }

            // Tính số vaccine đã xuất:
            int stockWithoutReturns = vaccineInventory.QuantityInStock - vaccineInventory.ReturnedQuantity;
            int exported = vaccineInventory.InitialQuantity - stockWithoutReturns;

            // Kiểm tra hợp lệ: tổng số vaccine trả không vượt quá số đã xuất
            if (vaccineInventory.ReturnedQuantity + returnQuantity > exported)
            {
                throw new InvalidOperationException("The exported vaccine quantity is insufficient for the return.");
            }

            // Cập nhật tồn kho và số vaccine đã trả
            vaccineInventory.ReturnedQuantity += returnQuantity;  // Cập nhật số lượng đã hoàn trả
            vaccineInventory.QuantityInStock += returnQuantity;  // Cập nhật số lượng tồn kho sau khi hoàn trả

            // Tạo giao dịch hoàn trả (Return)
            var transaction = new VaccineTransactionHistory
            {
                VaccineInventoryId = vaccineInventory.VaccineInventoryId,
                TransactionType = "Return",
                Quantity = returnQuantity,
                TransactionDate = DateTime.UtcNow,
                Description = $"Returned {returnQuantity} unit(s) to inventory."
            };

            // Lưu giao dịch vào lịch sử (Dùng IVaccineTransactionHistoryRepository)
            await _unitOfWork.VaccineTransactionHistories.AddAsync(transaction);

            // Cập nhật bảng VaccineInventory
            await _unitOfWork.VaccineInventories.UpdateAsync(vaccineInventory);

            // Lưu thay đổi
            await _unitOfWork.CompleteAsync();
        }


        // Lấy danh sách vaccine đã xuất kho (Issued Vaccines)
        public async Task<IEnumerable<VaccineInventoryDTO>> GetIssuedVaccinesAsync()
        {
            var issuedVaccines = await _unitOfWork.VaccineInventories.GetIssuedVaccinesAsync();

            return issuedVaccines.Select(vi => new VaccineInventoryDTO
            {
                VaccineId = vi.VaccineInventoryId,
                Name = vi.Vaccine?.Name ?? "Unknown",
                Manufacturer = vi.Vaccine?.Manufacturer ?? "Unknown",
                BatchNumber = vi.BatchNumber,
                ManufacturingDate = vi.ManufacturingDate,
                ExpiryDate = vi.ExpiryDate,
                InitialQuantity = vi.InitialQuantity,
                QuantityInStock = vi.QuantityInStock,
                TotalQuantity = vi.InitialQuantity - vi.QuantityInStock, // Số lượng vaccine đã xuất (Exported)
                Supplier = vi.Supplier
            }).ToList();
        }

        // Lấy danh sách vaccine đã hoàn trả về kho (Returned Vaccines)
        public async Task<IEnumerable<ReturnedVaccineDTO>> GetReturnedVaccinesAsync()
        {
            var returnedVaccines = await _unitOfWork.VaccineInventories.GetReturnedVaccinesAsync();

            var returnedVaccineDTOs = returnedVaccines.Select(vi =>
            {
                // Tính số tồn nếu chưa cộng các giao dịch trả
                var stockWithoutReturns = vi.QuantityInStock - vi.ReturnedQuantity;
                // Số vaccine đã xuất = InitialQuantity - stockWithoutReturns
                var exported = vi.InitialQuantity - stockWithoutReturns;
                // Số vaccine trả được chấp nhận không vượt quá số đã xuất
                var acceptedReturn = Math.Min(vi.ReturnedQuantity, exported);
                // Số tồn thực tế sau khi cộng các giao dịch trả
                var actualStock = stockWithoutReturns + acceptedReturn;

                return new ReturnedVaccineDTO
                {
                    VaccineId = vi.VaccineInventoryId,
                    Name = vi.Vaccine != null ? vi.Vaccine.Name : "Unknown",
                    Manufacturer = vi.Vaccine != null ? vi.Vaccine.Manufacturer : "Unknown",
                    BatchNumber = vi.BatchNumber,
                    InitialQuantity = vi.InitialQuantity,
                    QuantityInStock = actualStock,
                    ReturnedQuantity = acceptedReturn,
                    ManufacturingDate = vi.ManufacturingDate,
                    ExpiryDate = vi.ExpiryDate,
                    Supplier = vi.Supplier
                };
            }).ToList();

            return returnedVaccineDTOs;
        }

        // Kiểm tra vaccine tồn kho thấp
        public async Task<IEnumerable<VaccineInventoryDTO>> GetLowStockVaccinesAsync(int threshold)
        {
            var vaccines = await _unitOfWork.VaccineInventories.GetLowStockVaccinesAsync(threshold);
            return _mapper.Map<IEnumerable<VaccineInventoryDTO>>(vaccines);
        }

        // Gửi cảnh báo vaccine hết hạn
        public async Task SendExpiryAlertsAsync(int daysThreshold)
        {
            var vaccines = await _unitOfWork.VaccineInventories.GetExpiringVaccinesAsync(daysThreshold);
            if (!vaccines.Any()) return;

            var adminEmail = "hauphanduc3014@gmail.com";
            var expiringVaccineList = vaccines
                .Select(v => $"{v.Vaccine.Name} - Expiration date: {v.ExpiryDate.ToShortDateString()}")
                .ToList();

            await _emailService.SendExpiryAlertsAsync(adminEmail, expiringVaccineList);
        }


    }

}

