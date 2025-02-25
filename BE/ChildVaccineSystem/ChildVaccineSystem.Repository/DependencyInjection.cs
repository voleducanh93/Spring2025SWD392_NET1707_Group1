using ChildVaccineSystem.Repository.Repositories;
using ChildVaccineSystem.RepositoryContract.Interfaces;
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
        public static IServiceCollection AddRepository(this IServiceCollection services)
        {
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

            //DI Unit Of Work
            services.AddTransient<IUnitOfWork, UnitOfWork>();
            return services;



        }

    } 
}
