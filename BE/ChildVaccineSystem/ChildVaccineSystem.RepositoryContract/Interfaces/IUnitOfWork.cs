using ChildVaccineSystem.Data.Entities;
using Microsoft.EntityFrameworkCore.Storage;
using System;
using System.Threading.Tasks;

namespace ChildVaccineSystem.RepositoryContract.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IVaccineRepository Vaccines { get; }
        IComboVaccineRepository ComboVaccines { get; }
        IComboDetailRepository ComboDetails { get; }
		IVaccinationScheduleRepository VaccinationSchedules { get; }
		IStaffScheduleRepository StaffSchedules { get; }
		IInjectionScheduleRepository InjectionSchedules { get; }
		IVaccineScheduleDetailRepository VaccineScheduleDetails { get; }
        IChildrenRepository Children { get; }
        IUserRepository Users { get; }
        IBookingRepository Bookings { get; }
        IBookingDetailRepository BookingDetails { get; }
        IVaccineInventoryRepository VaccineInventories { get; }
        IVaccineTransactionHistoryRepository VaccineTransactionHistories { get; }

        Task<int> CompleteAsync();
		Task<IDbContextTransaction> BeginTransactionAsync();
	}
}
