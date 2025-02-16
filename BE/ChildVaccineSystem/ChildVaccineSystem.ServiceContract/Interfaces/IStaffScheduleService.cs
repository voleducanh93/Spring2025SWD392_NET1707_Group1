using ChildVaccineSystem.Data.DTO.StaffSchedule;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChildVaccineSystem.ServiceContract.Interfaces
{
	public interface IStaffScheduleService
	{
		Task<List<StaffScheduleDTO>> GetAllSchedulesAsync();
		Task<StaffScheduleDTO> GetScheduleByIdAsync(int id);
		Task<StaffScheduleDTO> CreateScheduleAsync(CreateStaffScheduleDTO dto);
		Task<StaffScheduleDTO> UpdateScheduleAsync(int id, UpdateStaffScheduleDTO dto);
		Task<bool> DeleteScheduleAsync(int id);
	}
}
