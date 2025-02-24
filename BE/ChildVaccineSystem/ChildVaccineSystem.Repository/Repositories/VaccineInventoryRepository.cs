using ChildVaccineSystem.Data.Entities;
using ChildVaccineSystem.Data.Models;
using ChildVaccineSystem.RepositoryContract.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChildVaccineSystem.Repository.Repositories
{
    public class VaccineInventoryRepository : Repository<VaccineInventory>, IVaccineInventoryRepository
    {
        private readonly ChildVaccineSystemDBContext _context;

        public VaccineInventoryRepository(ChildVaccineSystemDBContext context) : base(context)
        {
            _context = context;
        }

        // Lấy tất cả vaccine tồn kho
        public async Task<IEnumerable<VaccineInventory>> GetAllAsync()
        {
            return await _context.VaccineInventories.Include(vi => vi.Vaccine).ToListAsync();
        }

        // Lấy vaccine tồn kho theo ID vaccine
        public async Task<IEnumerable<VaccineInventory>> GetByVaccineIdAsync(int vaccineId)
        {
            return await _context.VaccineInventories
                                 .Where(vi => vi.VaccineId == vaccineId)
                                 .Include(vi => vi.Vaccine)  // Đảm bảo lấy Vaccine
                                 .ToListAsync();
        }


    }
}
