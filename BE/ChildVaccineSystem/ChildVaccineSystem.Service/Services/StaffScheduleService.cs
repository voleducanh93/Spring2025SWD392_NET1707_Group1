using AutoMapper;
using ChildVaccineSystem.Data.DTO.StaffSchedule;
using ChildVaccineSystem.Data.Entities;
using ChildVaccineSystem.RepositoryContract.Interfaces;
using ChildVaccineSystem.ServiceContract.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChildVaccineSystem.Service.Services
{
	public class StaffScheduleService : IStaffScheduleService
	{
		private readonly IUnitOfWork _unitOfWork;
		private readonly IMapper _mapper;

		public StaffScheduleService(IUnitOfWork unitOfWork, IMapper mapper)
		{
			_unitOfWork = unitOfWork;
			_mapper = mapper;
		}

		public async Task<List<StaffScheduleDTO>> GetAllSchedulesAsync()
		{
			var schedules = await _unitOfWork.StaffSchedules.GetAllAsync(includeProperties: "Staff.User");
			return _mapper.Map<List<StaffScheduleDTO>>(schedules);
		}

		public async Task<StaffScheduleDTO> GetScheduleByIdAsync(int id)
		{
			var schedule = await _unitOfWork.StaffSchedules.GetAsync(
				s => s.ScheduleId == id,
				includeProperties: "Staff.User"
			);
			return _mapper.Map<StaffScheduleDTO>(schedule);
		}

		public async Task<StaffScheduleDTO> CreateScheduleAsync(CreateStaffScheduleDTO dto)
		{
			var schedule = _mapper.Map<StaffSchedule>(dto);
			await _unitOfWork.StaffSchedules.AddAsync(schedule);
			await _unitOfWork.CompleteAsync();
			return _mapper.Map<StaffScheduleDTO>(schedule);
		}

		public async Task<StaffScheduleDTO> UpdateScheduleAsync(int id, UpdateStaffScheduleDTO dto)
		{
			var schedule = await _unitOfWork.StaffSchedules.GetAsync(s => s.ScheduleId == id);
			if (schedule == null)
				throw new KeyNotFoundException("Schedule not found.");

			_mapper.Map(dto, schedule);
			schedule.UpdatedAt = DateTime.UtcNow;

			await _unitOfWork.StaffSchedules.UpdateAsync(schedule);
			await _unitOfWork.CompleteAsync();
			return _mapper.Map<StaffScheduleDTO>(schedule);
		}

		public async Task<bool> DeleteScheduleAsync(int id)
		{
			var schedule = await _unitOfWork.StaffSchedules.GetAsync(s => s.ScheduleId == id);
			if (schedule == null)
				return false;

			schedule.Status = false;
			schedule.UpdatedAt = DateTime.UtcNow;

			await _unitOfWork.StaffSchedules.UpdateAsync(schedule);
			await _unitOfWork.CompleteAsync();

			return true;
		}
	}
}
