using ChildVaccineSystem.Common.Helper;
using ChildVaccineSystem.Repository;
using ChildVaccineSystem.Service.Services;
using ChildVaccineSystem.ServiceContract.Interfaces;
using ChildVaccineSystem.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ChildVaccineSystem.RepositoryContract.Interfaces;

namespace ChildVaccineSystem.Service
{
    public static class DependencyInjcection
    {
        public static IServiceCollection AddServices(this IServiceCollection services, IConfiguration configuration)
        {
			services.AddRepository(configuration);

			services.AddTransient<IVaccineService, VaccineService>();
            services.AddScoped<IEmailService, EmailService>();
            services.AddScoped<APIResponse>();
            services.AddTransient<IAuthService, AuthService>();
            services.AddTransient<IComboVaccineService, ComboVaccineService>();
			services.AddTransient<IVaccinationScheduleService, VaccinationScheduleService>();
			services.AddScoped<IStaffScheduleService, StaffScheduleService>();
            services.AddTransient<IChildrenService, ChildrenService>();
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<IBookingService, BookingService>();
            services.AddTransient<IVaccineInventoryService, VaccineInventoryService>();
			services.AddTransient<IVnPaymentService, VnPaymentService>();
			services.AddTransient<ITransactionService, TransactionService>();
            services.AddTransient<IFeedbackService, FeedbackService>();
			services.AddTransient<IWalletService, WalletService>();
			services.AddTransient<IRefundService, RefundService>();
			services.AddTransient<IPaymentService, PaymentService>();
       //     services.AddTransient<IVaccineRecordService, VaccineRecordService>();
            services.AddTransient<INotificationService, NotificationService>();
            services.AddTransient<IReminderService, ReminderService>();

			return services;
        }
    }
}
