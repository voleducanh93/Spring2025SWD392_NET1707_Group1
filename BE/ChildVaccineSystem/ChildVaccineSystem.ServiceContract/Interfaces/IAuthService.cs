using ChildVaccineSystem.Data.DTO;
using ChildVaccineSystem.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChildVaccineSystem.ServiceContract.Interfaces
{
    public interface IAuthService
    {
        Task<User> RegisterAsync(UserRegisterDTO dto);
        Task<bool> ConfirmEmailAsync(string email, string token);
    }
}
