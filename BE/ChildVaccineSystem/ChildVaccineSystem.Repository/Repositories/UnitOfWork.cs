using System;
using System.Threading.Tasks;
using ChildVaccineSystem.Data.Entities;
using ChildVaccineSystem.Data.Models;
using ChildVaccineSystem.RepositoryContract.Interfaces;
using Microsoft.EntityFrameworkCore.Storage;

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
		public IInjectionScheduleRepository InjectionSchedules { get; }
		public IVaccineScheduleDetailRepository VaccineScheduleDetails { get; }
        public IChildrenRepository Children { get; }
        public IUserRepository Users { get; }
        public IBookingRepository Bookings { get; private set; }
        public IBookingDetailRepository BookingDetails { get; private set; }
        public IVaccineInventoryRepository VaccineInventories { get; }
        public IVaccineTransactionHistoryRepository VaccineTransactionHistories { get; }
        public IPricingPoliciesRepository PricingPolicies { get; }
		public ITransactionRepository Transactions { get; }
        public IDoctorWorkScheduleRepository DoctorWorkSchedules { get; }
        public IFeedbackRepository Feedbacks { get; }
        public UnitOfWork(ChildVaccineSystemDBContext context, IVaccineRepository vaccineRepository, IComboVaccineRepository comboVaccines, IComboDetailRepository comboDetails, IVaccinationScheduleRepository vaccinationScheduleRepository, IStaffScheduleRepository staffScheduleRepository, IInjectionScheduleRepository injectionScheduleRepository, IVaccineScheduleDetailRepository vaccineScheduleDetailRepository, IChildrenRepository childrenRepository, IUserRepository userRepository, IBookingRepository bookingRepository, IBookingDetailRepository bookingDetailRepository, IVaccineInventoryRepository vaccineInventories, IPricingPoliciesRepository pricingPolicies, IVaccineTransactionHistoryRepository vaccineTransactionHistoryRepository, ITransactionRepository transactionRepository, IDoctorWorkScheduleRepository doctorWorkScheduleRepositories, IFeedbackRepository feedbackRepository)
        {
            _context = context;
            Vaccines = vaccineRepository;
            ComboVaccines = comboVaccines;
            ComboDetails = comboDetails;
            VaccinationSchedules = vaccinationScheduleRepository;
            StaffSchedules = staffScheduleRepository;
            InjectionSchedules = injectionScheduleRepository;
            VaccineScheduleDetails = vaccineScheduleDetailRepository;
            Children = childrenRepository;
            Users = userRepository;
            Bookings = bookingRepository;
            BookingDetails = bookingDetailRepository;
            VaccineInventories = vaccineInventories;
            VaccineTransactionHistories = vaccineTransactionHistoryRepository;
			Transactions = transactionRepository;

			PricingPolicies = pricingPolicies;
            DoctorWorkSchedules = doctorWorkScheduleRepositories;
            Feedbacks = feedbackRepository;
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
