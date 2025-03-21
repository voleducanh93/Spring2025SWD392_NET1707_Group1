using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using ChildVaccineSystem.Data.DTO.ComboVaccine;
using ChildVaccineSystem.Data.Entities;
using ChildVaccineSystem.RepositoryContract.Interfaces;
using ChildVaccineSystem.ServiceContract.Interfaces;

namespace ChildVaccineSystem.Service.Services
{
    public class ComboVaccineService : IComboVaccineService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public ComboVaccineService(IUnitOfWork unitOfWork, IComboVaccineRepository comboVaccineRepository, IVaccineRepository vaccineRepository, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ComboVaccineDTO>> GetAllAsync()
        {
            var combos = await _unitOfWork.ComboVaccines.GetAll();
            return _mapper.Map<IEnumerable<ComboVaccineDTO>>(combos);
        }

        public async Task<ComboVaccineDTO> GetByIdAsync(int id)
        {
            var combo = await _unitOfWork.ComboVaccines.GetById(id);
            if (combo == null)
                throw new Exception("ComboVaccine không tìm thấy.");
            return _mapper.Map<ComboVaccineDTO>(combo);
        }

        // ✅ Create với kiểm tra trùng lặp và VaccineId tồn tại
        public async Task<ComboVaccineDTO> CreateAsync(CreateComboVaccineDTO comboDto)
        {
            // Kiểm tra trùng lặp tên combo
            var existingCombo = await _unitOfWork.ComboVaccines.GetAsync(c => c.ComboName == comboDto.ComboName);
            if (existingCombo != null)
                throw new Exception($"Combo với tên '{comboDto.ComboName}' đã tồn tại.");

            var combo = _mapper.Map<ComboVaccine>(comboDto);

            // ✅ Kiểm tra VaccineId có tồn tại không trước khi thêm vào combo
            foreach (var vaccine in comboDto.Vaccines)
            {
                var existingVaccine = await _unitOfWork.Vaccines.GetByIdAsync(vaccine.VaccineId);
                if (existingVaccine == null)
                {
                    throw new Exception($"Vaccine với ID {vaccine.VaccineId} không tồn tại.");
                }
            }

            // ✅ Tạo combo detail
            combo.ComboDetails = comboDto.Vaccines
                .Select(vaccine => new ComboDetail
                {
                    ComboId = combo.ComboId,
                    VaccineId = vaccine.VaccineId,
                    Order = vaccine.Order,
                    IntervalDays = vaccine.IntervalDays
                }).ToList();

            try
            {
                var createdCombo = await _unitOfWork.ComboVaccines.AddAsync(combo);
                await _unitOfWork.CompleteAsync();

                var fullCombo = await _unitOfWork.ComboVaccines.GetById(createdCombo.ComboId);
                return _mapper.Map<ComboVaccineDTO>(fullCombo);
            }
            catch (Exception ex)
            {
                throw new Exception($"Lỗi khi thêm Combo: {ex.Message}");
            }
        }

        // ✅ Update với kiểm tra trùng lặp và VaccineId tồn tại
        public async Task<ComboVaccineDTO> UpdateAsync(int id, UpdateComboVaccineDTO comboDto)
        {
            var existingCombo = await _unitOfWork.ComboVaccines.GetById(id);
            if (existingCombo == null)
                throw new Exception($"Không tìm thấy Combo với ID {id}");

            // ✅ Kiểm tra trùng lặp tên combo (trừ chính nó)
            var duplicateCombo = await _unitOfWork.ComboVaccines.GetAsync(c => c.ComboName == comboDto.ComboName && c.ComboId != id);
            if (duplicateCombo != null)
                throw new Exception($"Combo với tên '{comboDto.ComboName}' đã tồn tại.");

            // ✅ Kiểm tra VaccineId có tồn tại không trước khi thêm vào combo
            foreach (var vaccine in comboDto.Vaccines)
            {
                var existingVaccine = await _unitOfWork.Vaccines.GetByIdAsync(vaccine.VaccineId);
                if (existingVaccine == null)
                {
                    throw new Exception($"Vaccine với ID {vaccine.VaccineId} không tồn tại.");
                }
            }

            // ✅ Xóa các chi tiết cũ trước khi cập nhật
            _unitOfWork.ComboDetails.RemoveRange(existingCombo.ComboDetails);

            existingCombo.ComboDetails = comboDto.Vaccines
                .Select(vaccine => new ComboDetail
                {
                    ComboId = existingCombo.ComboId,
                    VaccineId = vaccine.VaccineId,
                    Order = vaccine.Order,
                    IntervalDays = vaccine.IntervalDays
                }).ToList();

            _mapper.Map(comboDto, existingCombo);

            try
            {
                await _unitOfWork.ComboVaccines.UpdateAsync(existingCombo);
                await _unitOfWork.CompleteAsync();

                var fullCombo = await _unitOfWork.ComboVaccines.GetById(id);
                return _mapper.Map<ComboVaccineDTO>(fullCombo);
            }
            catch (Exception ex)
            {
                throw new Exception($"Lỗi khi cập nhật Combo: {ex.Message}");
            }
        }

        // ✅ Xóa combo với kiểm tra khóa ngoại và lỗi logic
        public async Task<bool> DeleteAsync(int id)
        {
            var combo = await _unitOfWork.ComboVaccines.GetById(id);
            if (combo == null)
                throw new Exception($"Không tìm thấy Combo với ID {id}");

            // ✅ Kiểm tra nếu combo đã được sử dụng trong các lịch đặt
            var bookingDetails = await _unitOfWork.BookingDetails
                .GetAllAsync(bd => bd.ComboVaccineId == id);

            if (bookingDetails.Any())
            {
                throw new Exception($"Không thể xóa Combo vì đã được sử dụng trong các lịch đặt.");
            }

            combo.IsActive = false;

            try
            {
                await _unitOfWork.ComboVaccines.UpdateAsync(combo);
                await _unitOfWork.CompleteAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw new Exception($"Lỗi khi xóa Combo: {ex.Message}");
            }
        }
    }
}
