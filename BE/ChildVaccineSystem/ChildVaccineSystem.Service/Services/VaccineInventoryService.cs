using AutoMapper;
using ChildVaccineSystem.Data.DTO.VaccineInventory;
using ChildVaccineSystem.Repository.Repositories;
using ChildVaccineSystem.RepositoryContract.Interfaces;
using ChildVaccineSystem.ServiceContract.Interfaces;
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

        }

    }

