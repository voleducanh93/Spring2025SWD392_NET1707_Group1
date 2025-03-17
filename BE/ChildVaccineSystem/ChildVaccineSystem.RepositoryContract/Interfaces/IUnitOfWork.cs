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
		IInjectionScheduleRepository InjectionSchedules { get; }
		IVaccineScheduleDetailRepository VaccineScheduleDetails { get; }
        IChildrenRepository Children { get; }
        IUserRepository Users { get; }
        IBookingRepository Bookings { get; }
        IBookingDetailRepository BookingDetails { get; }
        IVaccineInventoryRepository VaccineInventories { get; }
        IPricingPoliciesRepository PricingPolicies { get; }
        IVaccineTransactionHistoryRepository VaccineTransactionHistories { get; }
		ITransactionRepository Transactions { get; }
        IDoctorWorkScheduleRepository DoctorWorkSchedules { get; }
        IFeedbackRepository Feedbacks { get; }
        IWalletRepository Wallets { get; }
        IRefundRequestRepository RefundRequests { get; }
		IWalletTransactionRepository WalletTransactions { get; }
        IVaccineRecordRepository VaccineRecords { get; }
        INotificationRepository Notifications { get; }
        IVaccinationReminderRepository VaccinationReminders { get; }

		Task<int> CompleteAsync();
		Task<IDbContextTransaction> BeginTransactionAsync();
	}
}
