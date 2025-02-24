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
    }
}
