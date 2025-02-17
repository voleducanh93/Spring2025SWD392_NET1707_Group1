using AutoMapper;
using ChildVaccineSystem.Data.DTO.VaccinationSchedule;
using ChildVaccineSystem.Data.Entities;
using ChildVaccineSystem.RepositoryContract.Interfaces;
using ChildVaccineSystem.ServiceContract.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChildVaccineSystem.Service.Services
{
	public class VaccinationScheduleService : IVaccinationScheduleService
	{
		private readonly IUnitOfWork _unitOfWork;
		private readonly IMapper _mapper;

		public VaccinationScheduleService(IUnitOfWork unitOfWork, IMapper mapper)
		{
			_unitOfWork = unitOfWork;
			_mapper = mapper;
		}

		public async Task<List<VaccinationScheduleDTO>> GetAllSchedulesAsync()
		{
			var schedules = await _unitOfWork.VaccinationSchedules.GetAllAsync(includeProperties: "Vaccines"
);
			return _mapper.Map<List<VaccinationScheduleDTO>>(schedules);
		}

		public async Task<VaccinationScheduleDTO> GetScheduleByIdAsync(int id)
		{
			var schedule = await _unitOfWork.VaccinationSchedules.GetAsync(v => v.ScheduleId == id, includeProperties: "Vaccines");

			return _mapper.Map<VaccinationScheduleDTO>(schedule);
		}

		public async Task<VaccinationScheduleDTO> CreateScheduleAsync(CreateVaccinationScheduleDTO scheduleDto)
		{
			if (scheduleDto.AgeRangeEnd <= scheduleDto.AgeRangeStart)
			{
				throw new ArgumentException("Age range end must be greater than age range start");
			}

			var schedule = _mapper.Map<VaccinationSchedule>(scheduleDto);
			var createdSchedule = await _unitOfWork.VaccinationSchedules.AddAsync(schedule);
			await _unitOfWork.CompleteAsync();
			return _mapper.Map<VaccinationScheduleDTO>(createdSchedule);
		}

		public async Task<VaccinationScheduleDTO> UpdateScheduleAsync(int id, UpdateVaccinationScheduleDTO scheduleDto)
		{
			var existingSchedule = await _unitOfWork.VaccinationSchedules.GetAsync(v => v.ScheduleId == id);
			if (existingSchedule == null) return null;

			if (scheduleDto.AgeRangeStart.HasValue && scheduleDto.AgeRangeEnd.HasValue)
			{
				if (scheduleDto.AgeRangeEnd <= scheduleDto.AgeRangeStart)
				{
					throw new ArgumentException("Age range end must be greater than age range start");
				}
			}

			_mapper.Map(scheduleDto, existingSchedule);
			var updatedSchedule = await _unitOfWork.VaccinationSchedules.UpdateAsync(existingSchedule);
			await _unitOfWork.CompleteAsync();
			return _mapper.Map<VaccinationScheduleDTO>(updatedSchedule);
		}

		public async Task<bool> DeleteScheduleAsync(int id)
		{
			var existingSchedule = await _unitOfWork.VaccinationSchedules.GetAsync(
				v => v.ScheduleId == id,
				includeProperties: "Vaccines"
			);

			if (existingSchedule == null) return false;

			foreach (var vaccine in existingSchedule.Vaccines)
			{
				vaccine.ScheduleId = null;
				await _unitOfWork.Vaccines.UpdateAsync(vaccine);
			}

			await _unitOfWork.VaccinationSchedules.DeleteAsync(existingSchedule);
			await _unitOfWork.CompleteAsync();
			return true;
		}
	}
}
