using AutoMapper;
using ChildVaccineSystem.Data.DTO.VaccineRecord;
using ChildVaccineSystem.Data.Entities;
using ChildVaccineSystem.Data.Enum;
using ChildVaccineSystem.RepositoryContract.Interfaces;
using ChildVaccineSystem.ServiceContract.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChildVaccineSystem.Service.Services
{
    public class VaccineRecordService : IVaccineRecordService
    {
        private readonly IVaccineRecordRepository _vaccineRecordRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public VaccineRecordService(IVaccineRecordRepository vaccineRecordRepository, IUnitOfWork unitOfWork, IMapper mapper)
        {
            _vaccineRecordRepository = vaccineRecordRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<VaccineRecordDTO> CreateVaccinationRecordAsync(int bookingId, string doctorId)
        {
            if (bookingId <= 0)
                throw new ArgumentException("Mã đặt lịch không hợp lệ.");

            var booking = await _unitOfWork.Bookings.GetAsync(
                b => b.BookingId == bookingId,
                includeProperties: "BookingDetails.Vaccine,Children"
            );

            // ✅ Kiểm tra nếu VaccineRecord đã được tạo trước đó
            var existingRecords = await _unitOfWork.VaccineRecords.GetAllAsync(vr => vr.BookingDetail.BookingId == bookingId);
            if (existingRecords.Any())
                throw new Exception("Hồ sơ tiêm chủng cho lịch này đã được tạo.");

            if (booking == null)
                throw new Exception("Không tìm thấy lịch tiêm.");

            if (booking.Status != BookingStatus.InProgress)
                throw new Exception("Chỉ có thể tạo hồ sơ tiêm chủng khi lịch tiêm đang được tiến hành.");

            if (booking.BookingDetails == null || !booking.BookingDetails.Any())
                throw new Exception("Không có chi tiết lịch tiêm hợp lệ.");

            if (booking.Children == null)
                throw new Exception("Không tìm thấy thông tin trẻ em.");

            

            var vaccineRecords = new List<VaccineRecordDetailDTO>();

            foreach (var detail in booking.BookingDetails)
            {
                if (detail.VaccineId.HasValue) // Xử lý vắc-xin đơn lẻ
                {
                    await ProcessVaccineRecord(detail, booking, vaccineRecords);
                }
                else if (detail.ComboVaccineId.HasValue) // Xử lý Combo Vaccine
                {
                    var comboVaccineDetails = await _unitOfWork.ComboDetails
                        .GetAllAsync(cv => cv.ComboId == detail.ComboVaccineId);

                    if (!comboVaccineDetails.Any())
                        throw new Exception($"Không tìm thấy danh sách vaccine cho combo ID: {detail.ComboVaccineId}");

                    foreach (var comboVaccineDetail in comboVaccineDetails)
                    {
                        var vaccine = await _unitOfWork.Vaccines.GetByIdAsync(comboVaccineDetail.VaccineId);
                        if (vaccine == null)
                            throw new Exception($"Không tìm thấy Vaccine với ID: {comboVaccineDetail.VaccineId}");

                        var vaccineInventory = comboVaccineDetail.VaccineInventoryId.HasValue
                            ? await _unitOfWork.VaccineInventories.GetByIdAsync(comboVaccineDetail.VaccineInventoryId.Value)
                            : await _unitOfWork.VaccineInventories.GetAsync(vi => vi.VaccineId == comboVaccineDetail.VaccineId);

                        if (vaccineInventory == null || vaccineInventory.QuantityInStock <= 0)
                            throw new Exception($"Vaccine Inventory không có sẵn cho VaccineId: {comboVaccineDetail.VaccineId}");

                        var sequence = await GetCurrentVaccineSequenceAsync(booking.Children.ChildId, comboVaccineDetail.VaccineId);

                        var nextDoseDate = await CalculateNextDoseDateAsync(comboVaccineDetail.VaccineId, sequence);

                        var vaccinationRecord = new VaccinationRecord
                        {
                            BookingDetailId = detail.BookingDetailId,
                            UserId = booking.UserId,
                            ChildId = booking.Children.ChildId,
                            VaccineId = comboVaccineDetail.VaccineId,
                            VaccineInventoryId = vaccineInventory.VaccineInventoryId,
                            VaccinationDate = DateTime.Now,
                            DoseAmount = vaccine.DoseAmount,
                            Sequence = sequence,
                            Status = VaccineRecordStatus.Completed,
                            Notes = "Tiêm chủng hoàn tất",
                            BatchNumber = vaccineInventory.BatchNumber,
                            NextDoseDate = nextDoseDate
                        };

                        await _vaccineRecordRepository.AddAsync(vaccinationRecord);

                        vaccineRecords.Add(new VaccineRecordDetailDTO
                        {
                            VaccineName = vaccine.Name,
                            DoseAmount = vaccine.DoseAmount,
                            Price = vaccine.Price,
                            NextDoseDate = nextDoseDate,
                            BatchNumber = vaccinationRecord.BatchNumber,
                            StatusEnum = VaccineRecordStatus.Completed,
                            Notes = "Đã tiêm chủng"
                        });
                    }
                }
            }

            // ✅ Cập nhật trạng thái booking thành COMPLETED
            booking.Status = BookingStatus.Completed;
            _unitOfWork.Bookings.UpdateAsync(booking);

            await _unitOfWork.CompleteAsync();

            return new VaccineRecordDTO
            {
                BookingId = bookingId,
                FullName = booking.Children.FullName,
                DateOfBirth = booking.Children.DateOfBirth,
                Height = booking.Children.Height,
                Weight = booking.Children.Weight,
                VaccineRecords = vaccineRecords,
                Message = "Vaccine record confirmed successfully"
            };
        }


        public async Task ProcessVaccineRecord(BookingDetail detail, Booking booking, List<VaccineRecordDetailDTO> vaccineRecords)
        {
            var vaccineInventory = await _unitOfWork.VaccineInventories
                .GetAsync(vi => vi.VaccineInventoryId == detail.VaccineInventoryId);

            if (vaccineInventory == null)
                throw new Exception("Không tìm thấy VaccineInventory.");

            // Lấy số thứ tự mũi tiêm (sequence)
            var sequence = await GetCurrentVaccineSequenceAsync(booking.Children.ChildId, detail.VaccineId.Value);

            // Lấy ngày tiêm tiếp theo
            var nextDoseDate = await CalculateNextDoseDateAsync(detail.VaccineId.Value, sequence);

            var vaccinationRecord = new VaccinationRecord
            {
                BookingDetailId = detail.BookingDetailId,
                UserId = booking.UserId,
                ChildId = booking.Children.ChildId,
                VaccineId = detail.VaccineId.Value,
                VaccineInventoryId = vaccineInventory.VaccineInventoryId,
                VaccinationDate = DateTime.Now,
                DoseAmount = detail.Vaccine.DoseAmount,
                Sequence = sequence,
                Status = VaccineRecordStatus.Completed,
                Notes = "Tiêm chủng hoàn tất",
                BatchNumber = vaccineInventory.BatchNumber,
                NextDoseDate = nextDoseDate
            };

            await _vaccineRecordRepository.AddAsync(vaccinationRecord);

            vaccineRecords.Add(new VaccineRecordDetailDTO
            {
                VaccineName = detail.Vaccine.Name,
                DoseAmount = detail.Vaccine.DoseAmount,
                Price = detail.Vaccine.Price,
                NextDoseDate = nextDoseDate,
                BatchNumber = vaccinationRecord.BatchNumber,
                StatusEnum = VaccineRecordStatus.Completed,
                Notes = "Đã tiêm chủng"
            });
        }

        public async Task<DateTime?> CalculateNextDoseDateAsync(int vaccineId, int sequence)
        {
            var injectionSchedule = await _unitOfWork.InjectionSchedules
                .GetAllAsync(schedule => schedule.VaccineScheduleDetail.VaccineId == vaccineId);

            // Kiểm tra nếu không có lịch tiêm nào
            if (injectionSchedule == null || !injectionSchedule.Any())
                return null;

            // Tìm mũi tiêm tiếp theo (doseNumber = sequence + 1)
            var nextInjection = injectionSchedule.FirstOrDefault(schedule => schedule.DoseNumber == sequence + 1);

            return nextInjection != null ? DateTime.Now.AddMonths(nextInjection.InjectionMonth) : null;
        }

        public async Task<int> GetCurrentVaccineSequenceAsync(int childId, int vaccineId)
        {
            var previousRecords = await _vaccineRecordRepository.GetAllAsync(
                vr => vr.ChildId == childId && vr.VaccineId == vaccineId
            );

            return previousRecords.Count() + 1; // Mũi tiêm tiếp theo
        }
    }
}
