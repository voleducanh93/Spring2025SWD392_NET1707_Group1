using ChildVaccineSystem.Data.DTO.VaccineInventory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChildVaccineSystem.ServiceContract.Interfaces
{
    public interface IVaccineInventoryService
    {
        Task<IEnumerable<VaccineInventoryDTO>> GetVaccineStockReportAsync();
        Task<IEnumerable<VaccineInventoryDTO>> GetVaccineInventoryByIdAsync(int vaccineId);
        Task<IEnumerable<VaccineInventoryDTO>> SearchVaccineStockAsync(string keyword);
        Task IssueVaccineAsync(int id, int quantity);
        Task ReturnVaccineAsync(int id, int quantity);
        Task<IEnumerable<VaccineInventoryDTO>> GetIssuedVaccinesAsync();
        Task<IEnumerable<ReturnedVaccineDTO>> GetReturnedVaccinesAsync();
        Task<IEnumerable<VaccineInventoryDTO>> GetLowStockVaccinesAsync(int threshold);
        Task SendExpiryAlertsAsync(int daysThreshold);
        Task<VaccineInventoryDTO> AddVaccineInventoryAsync(CreateVaccineInventoryDTO dto);
        Task<VaccineInventoryDTO> UpdateVaccineInventoryAsync(int id, UpdateVaccineInventoryDTO dto);
    }
}
