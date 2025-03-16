using ChildVaccineSystem.Repository.Repositories;
using ChildVaccineSystem.RepositoryContract.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChildVaccineSystem.Repository
{
	public static class DependencyInjcection
    {
        public static IServiceCollection AddRepository(this IServiceCollection services, IConfiguration configuration)
        {
			services.ConfigureDatabase(configuration);

			services.AddTransient<IVaccineRepository, VaccineRepository>();
            services.AddTransient(typeof(IRepository<>), typeof(Repository<>));
            services.AddTransient<IEmailRepository, EmailRepository>();
            services.AddTransient<IUserRepository, UserRepository>();
            services.AddTransient<IComboDetailRepository, ComboDetailRepository>();
            services.AddTransient<IComboVaccineRepository, ComboVaccineRepository>();
			services.AddTransient<IVaccinationScheduleRepository, VaccinationScheduleRepository>();
		    services.AddTransient<IStaffScheduleRepository, StaffScheduleRepository>();
			services.AddTransient<IInjectionScheduleRepository, InjectionScheduleRepository>();
			services.AddTransient<IVaccineScheduleDetailRepository, VaccineScheduleDetailRepository>();
            services.AddTransient<IChildrenRepository, ChildrenRepository>();
            services.AddTransient<IBookingRepository, BookingRepository>();
            services.AddTransient<IBookingDetailRepository, BookingDetailRepository>();
            services.AddTransient<IVaccineInventoryRepository, VaccineInventoryRepository>();
            services.AddTransient<IVaccineTransactionHistoryRepository, VaccineTransactionHistoryRepository>();
			services.AddTransient<ITransactionRepository, TransactionRepository>();
            services.AddTransient<IDoctorWorkScheduleRepository, DoctorWorkScheduleRepository>();
			services.AddTransient<IPricingPoliciesRepository, PricingPoliciesRepository>();
            services.AddTransient<IFeedbackRepository, FeedbackRepository>();
			services.AddTransient<IWalletRepository, WalletRepository>();
			services.AddTransient<IRefundRequestRepository, RefundRequestRepository>();
	        services.AddTransient<IVaccineRecordRepository, VaccineRecordRepository>();
	        services.AddTransient<IWalletTransactionRepository, WalletTransactionRepository>();

			//DI Unit Of Work
			services.AddTransient<IUnitOfWork, UnitOfWork>();
            return services;



        }

    } 
}
