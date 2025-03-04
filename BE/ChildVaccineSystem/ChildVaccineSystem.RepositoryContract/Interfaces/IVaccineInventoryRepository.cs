using ChildVaccineSystem.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChildVaccineSystem.RepositoryContract.Interfaces
{
    public interface IVaccineInventoryRepository : IRepository<VaccineInventory>
    {
        Task<IEnumerable<VaccineInventory>> GetAllAsync();
        Task<IEnumerable<VaccineInventory>> GetByVaccineIdAsync(int vaccineId);
        Task<VaccineInventory> GetVaccineByIdAsync(int vaccineId);
        Task<IEnumerable<VaccineInventory>> SearchVaccineStockAsync(string? keyword);
        Task<IEnumerable<VaccineInventory>> GetIssuedVaccinesAsync();
        Task<IEnumerable<VaccineInventory>> GetReturnedVaccinesAsync();
        Task<List<VaccineInventory>> GetAvailableInventoriesByVaccineIdAsync(int vaccineId);
        Task<IEnumerable<VaccineInventory>> GetLowStockVaccinesAsync(int threshold);
        Task<List<VaccineInventory>> GetExpiringVaccinesAsync(int daysThreshold);
        Task<VaccineInventory?> GetByBatchNumberAsync(string batchNumber);
        Task<VaccineInventory?> GetByIdAsync(int id);
        Task<IEnumerable<VaccineInventory>> GetByVaccineInventoryIdAsync(int vaccineInventoryId);
        Task<IEnumerable<VaccineInventory>> GetExportVaccinesAsync();

    }
}
