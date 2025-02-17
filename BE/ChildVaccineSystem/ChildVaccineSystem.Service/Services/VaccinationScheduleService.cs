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

			if (scheduleDto.VaccineIds.Count != scheduleDto.RecommendedDose)
			{
				throw new ArgumentException($"Number of selected vaccines ({scheduleDto.VaccineIds.Count}) must match the recommended dose ({scheduleDto.RecommendedDose})");
			}

			var existingVaccines = await _unitOfWork.Vaccines.GetAllAsync();
			var existingVaccineIds = existingVaccines.Select(v => v.VaccineId).ToList();
			var invalidVaccineIds = scheduleDto.VaccineIds.Except(existingVaccineIds).ToList();

			if (invalidVaccineIds.Any())
			{
				throw new ArgumentException($"Invalid vaccine IDs: {string.Join(", ", invalidVaccineIds)}");
			}

			using var transaction = await _unitOfWork.BeginTransactionAsync();
			try
			{
				var schedule = _mapper.Map<VaccinationSchedule>(scheduleDto);
				var createdSchedule = await _unitOfWork.VaccinationSchedules.AddAsync(schedule);
				await _unitOfWork.CompleteAsync();

				// Update vaccines with the new schedule ID
				foreach (var vaccineId in scheduleDto.VaccineIds)
				{
					var vaccine = await _unitOfWork.Vaccines.GetAsync(v => v.VaccineId == vaccineId);
					if (vaccine != null)
					{
						// Check if vaccine is already assigned to another schedule
						if (vaccine.ScheduleId.HasValue && vaccine.ScheduleId != createdSchedule.ScheduleId)
						{
							throw new InvalidOperationException($"Vaccine {vaccine.Name} is already assigned to another schedule");
						}

						vaccine.ScheduleId = createdSchedule.ScheduleId;
						await _unitOfWork.Vaccines.UpdateAsync(vaccine);
					}
				}

				await _unitOfWork.CompleteAsync();
				await transaction.CommitAsync();

				// Fetch the complete schedule with vaccines for the response
				var completeSchedule = await _unitOfWork.VaccinationSchedules.GetAsync(
					v => v.ScheduleId == createdSchedule.ScheduleId,
					includeProperties: "Vaccines"
				);

				return _mapper.Map<VaccinationScheduleDTO>(completeSchedule);
			}
			catch (Exception)
			{
				await transaction.RollbackAsync();
				throw;
			}
		}

		public async Task<VaccinationScheduleDTO> UpdateScheduleAsync(int id, UpdateVaccinationScheduleDTO scheduleDto)
		{
			var existingSchedule = await _unitOfWork.VaccinationSchedules.GetAsync(v => v.ScheduleId == id, includeProperties: "Vaccines");
			if (existingSchedule == null)
			{
				throw new ArgumentException($"Schedule with ID {id} not found");
			}


			if (scheduleDto.AgeRangeEnd <= scheduleDto.AgeRangeStart)
			{
				throw new ArgumentException("Age range end must be greater than age range start");
			}

			if (scheduleDto.VaccineIds.Count != scheduleDto.RecommendedDose)
			{
				throw new ArgumentException($"Number of selected vaccines ({scheduleDto.VaccineIds.Count}) must match the recommended dose ({scheduleDto.RecommendedDose})");
			}

			using var transaction = await _unitOfWork.BeginTransactionAsync();
			try
			{
				var existingVaccines = await _unitOfWork.Vaccines.GetAllAsync();
				var existingVaccineIds = existingVaccines.Select(v => v.VaccineId).ToList();
				var invalidVaccineIds = scheduleDto.VaccineIds.Except(existingVaccineIds).ToList();

				if (invalidVaccineIds.Any())
				{
					throw new ArgumentException($"Invalid vaccine IDs: {string.Join(", ", invalidVaccineIds)}");
				}


				var conflictingVaccines = existingVaccines
				   .Where(v => scheduleDto.VaccineIds.Contains(v.VaccineId)
							  && v.ScheduleId.HasValue
							  && v.ScheduleId.Value != id)
				   .ToList();


				if (conflictingVaccines.Any())
				{
					var conflicts = conflictingVaccines
						.Select(v => $"Vaccine '{v.Name}' is already assigned to schedule ID {v.ScheduleId}")
						.ToList();
					throw new InvalidOperationException($"Schedule conflicts found: {string.Join(", ", conflicts)}");
				}

				_mapper.Map(scheduleDto, existingSchedule);

				foreach (var vaccine in existingSchedule.Vaccines)
				{
					vaccine.ScheduleId = null;
					await _unitOfWork.Vaccines.UpdateAsync(vaccine);
				}

				foreach (var vaccineId in scheduleDto.VaccineIds)
				{
					var vaccine = await _unitOfWork.Vaccines.GetAsync(v => v.VaccineId == vaccineId);
					if (vaccine != null)
					{
						vaccine.ScheduleId = id;
						await _unitOfWork.Vaccines.UpdateAsync(vaccine);
					}
				}

				var updatedSchedule = await _unitOfWork.VaccinationSchedules.UpdateAsync(existingSchedule);
				await _unitOfWork.CompleteAsync();
				await transaction.CommitAsync();

				var completeSchedule = await _unitOfWork.VaccinationSchedules.GetAsync(
					v => v.ScheduleId == id,
					includeProperties: "Vaccines"
				);

				return _mapper.Map<VaccinationScheduleDTO>(completeSchedule);
			}
			catch (Exception)
			{
				await transaction.RollbackAsync();
				throw;
			}
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
