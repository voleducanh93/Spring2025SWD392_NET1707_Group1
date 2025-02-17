using System;
using System.Threading.Tasks;
using ChildVaccineSystem.Data.Models;
using ChildVaccineSystem.RepositoryContract.Interfaces;

namespace ChildVaccineSystem.Repository.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ChildVaccineSystemDBContext _context;

        public IVaccineRepository Vaccines { get; }
        public IComboVaccineRepository ComboVaccines { get; }
        public IComboDetailRepository ComboDetails { get; }
		public IVaccinationScheduleRepository VaccinationSchedules { get; }
		public IStaffScheduleRepository StaffSchedules { get; }

		public UnitOfWork(ChildVaccineSystemDBContext context, IVaccineRepository vaccineRepository, IComboVaccineRepository comboVaccines, IComboDetailRepository comboDetails, IVaccinationScheduleRepository vaccinationScheduleRepository, IStaffScheduleRepository staffScheduleRepository)
        {
            _context = context;
            Vaccines = vaccineRepository;
            ComboVaccines = comboVaccines;
            ComboDetails = comboDetails;
			VaccinationSchedules = vaccinationScheduleRepository;
			StaffSchedules = staffScheduleRepository;
		}

		public async Task<int> CompleteAsync()
        {
            return await _context.SaveChangesAsync();
        }

		public async Task<IDbContextTransaction> BeginTransactionAsync()
		{
			return await _context.Database.BeginTransactionAsync();
		}

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
