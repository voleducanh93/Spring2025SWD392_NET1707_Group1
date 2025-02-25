using AutoMapper;
using ChildVaccineSystem.Data.DTO;
using ChildVaccineSystem.Data.DTO.Auth;
using ChildVaccineSystem.Data.DTO.Booking.BookingDetail;
using ChildVaccineSystem.Data.DTO.Booking;
using ChildVaccineSystem.Data.DTO.Children;
using ChildVaccineSystem.Data.DTO.ComboVaccine;
using ChildVaccineSystem.Data.DTO.InjectionSchedule;
using ChildVaccineSystem.Data.DTO.StaffSchedule;
using ChildVaccineSystem.Data.DTO.VaccinationSchedule;
using ChildVaccineSystem.Data.DTO.Vaccine;
using ChildVaccineSystem.Data.DTO.VaccineScheduleDetail;
using ChildVaccineSystem.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ChildVaccineSystem.Data.DTO.VaccineInventory;

namespace ChildVaccineSystem.Common.Helper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // User Mapping
            CreateMap<User, UserDTO>();

            CreateMap<UserRegisterDTO, User>()
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.UserName))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
                .ForMember(dest => dest.PhoneNumber, opt => opt.MapFrom(src => src.PhoneNumber))
                .ForMember(dest => dest.Address, opt => opt.MapFrom(src => src.Address))
                .ForMember(dest => dest.DateOfBirth, opt => opt.MapFrom(src => src.DateOfBirth))
                .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => src.FullName))
                .ForMember(dest => dest.IsActive, opt => opt.MapFrom(src => true))
                .ForMember(dest => dest.Id, opt => opt.Ignore());

            // Vaccine Mapping
            CreateMap<Vaccine, VaccineDTO>().ReverseMap();

            CreateMap<CreateVaccineDTO, Vaccine>();

            CreateMap<UpdateVaccineDTO, Vaccine>()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));

            // ComboVaccine Mapping
            CreateMap<ComboVaccine, ComboVaccineDTO>()
                .ForMember(dest => dest.Vaccines,
                    opt => opt.MapFrom(src => src.ComboDetails.Select(cd => cd.Vaccine)))
                .ReverseMap();

            CreateMap<CreateComboVaccineDTO, ComboVaccine>()
                .ForMember(dest => dest.ComboDetails,
                    opt => opt.MapFrom(src => src.VaccineIds.Select(id => new ComboDetail { VaccineId = id })))
                .ForMember(dest => dest.CreatedAtUpdatedAt,
                    opt => opt.MapFrom(src => DateTime.UtcNow));

            CreateMap<UpdateComboVaccineDTO, ComboVaccine>()
                .ForMember(dest => dest.ComboDetails,
                    opt => opt.MapFrom(src => src.VaccineIds.Select(id => new ComboDetail { VaccineId = id })))
                .ForMember(dest => dest.CreatedAtUpdatedAt,
                    opt => opt.MapFrom(src => DateTime.UtcNow));

            // VaccinationSchedule Mappings
            CreateMap<VaccinationSchedule, VaccinationScheduleDTO>()
                .ForMember(dest => dest.VaccineScheduleDetails, opt => opt.MapFrom(src => src.VaccineScheduleDetails)).ReverseMap();

            CreateMap<CreateVaccinationScheduleDTO, VaccinationSchedule>()
                .ForMember(dest => dest.Notes, opt => opt.MapFrom(src => src.Notes ?? string.Empty));

            CreateMap<VaccineScheduleDetailDTO, Vaccine>();

            CreateMap<UpdateVaccinationScheduleDTO, VaccinationSchedule>()
                .ForMember(dest => dest.ScheduleId, opt => opt.Ignore());

            // VaccinationScheduleDetail Mappings
            CreateMap<VaccineScheduleDetail, VaccineScheduleDetailDTO>()
                .ForMember(dest => dest.InjectionSchedules, opt => opt.MapFrom(src => src.InjectionSchedules))
                .ForMember(dest => dest.VaccineName,
                      opt => opt.MapFrom(src => src.Vaccine.Name));

            CreateMap<CreateVaccineScheduleDetailDTO, VaccineScheduleDetail>();

            CreateMap<UpdateVaccineScheduleDetailDTO, VaccineScheduleDetail>();


            // StaffSchedule Mappings
            CreateMap<StaffSchedule, StaffScheduleDTO>()
                .ForMember(dest => dest.Staff, opt => opt.MapFrom(src => src.Staff));

            CreateMap<CreateStaffScheduleDTO, StaffSchedule>()
                .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => DateTime.UtcNow))
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => true))
                .ForMember(dest => dest.Staff, opt => opt.Ignore());

            CreateMap<UpdateStaffScheduleDTO, StaffSchedule>()
                .ForMember(dest => dest.UpdatedAt, opt => opt.MapFrom(src => DateTime.UtcNow))
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));

            // InjectionSchedule Mappings
            CreateMap<InjectionSchedule, InjectionScheduleDTO>();

            CreateMap<CreateInjectionScheduleDTO, InjectionSchedule>()
                 .ForMember(dest => dest.Notes, opt => opt.MapFrom(src => src.Notes ?? string.Empty))
                .ForMember(dest => dest.VaccineScheduleDetailId,
                      opt => opt.Ignore());

            CreateMap<UpdateInjectionScheduleDTO, InjectionSchedule>();

            //Children
            CreateMap<Children, ChildrenDTO>().ReverseMap();
            CreateMap<CreateChildrenDTO, Children>();
            CreateMap<UpdateChildrenDTO, Children>();

            //Booking
            CreateMap<CreateBookingDTO, Booking>()
                .ForMember(dest => dest.BookingDetails, opt => opt.Ignore())
                .ForMember(dest => dest.TotalPrice, opt => opt.Ignore())
                .ForMember(dest => dest.Status, opt => opt.Ignore());

            CreateMap<CreateBookingDetailDTO, BookingDetail>()
                .ForMember(dest => dest.Price, opt => opt.Ignore());

            CreateMap<Booking, BookingDTO>()
                .ForMember(dest => dest.ChildName,
                    opt => opt.MapFrom(src => src.Children.FullName))
                .ForMember(dest => dest.BookingDetails,
                    opt => opt.MapFrom(src => src.BookingDetails));

            CreateMap<BookingDetail, BookingDetailDTO>();

            CreateMap<VaccineInventory, VaccineInventoryDTO>()
                .ForMember(dest => dest.VaccineId, opt => opt.MapFrom(src => src.Vaccine.VaccineId))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Vaccine.Name))
                .ForMember(dest => dest.Manufacturer, opt => opt.MapFrom(src => src.Vaccine.Manufacturer))
                .ForMember(dest => dest.BatchNumber, opt => opt.MapFrom(src => src.BatchNumber))
                .ForMember(dest => dest.ManufacturingDate, opt => opt.MapFrom(src => src.ManufacturingDate))
                .ForMember(dest => dest.ExpiryDate, opt => opt.MapFrom(src => src.ExpiryDate))
                .ForMember(dest => dest.Supplier, opt => opt.MapFrom(src => src.Supplier))
                .ForMember(dest => dest.InitialQuantity, opt => opt.MapFrom(src => src.InitialQuantity)) 
                .ForMember(dest => dest.TotalQuantity, opt => opt.MapFrom(src => src.InitialQuantity - src.QuantityInStock));

            CreateMap<VaccineInventory, ReturnedVaccineDTO>()
                .ForMember(dest => dest.VaccineId, opt => opt.MapFrom(src => src.VaccineId))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Vaccine != null ? src.Vaccine.Name : "Unknown"))
                .ForMember(dest => dest.Manufacturer, opt => opt.MapFrom(src => src.Vaccine != null ? src.Vaccine.Manufacturer : "Unknown"))
                .ForMember(dest => dest.BatchNumber, opt => opt.MapFrom(src => src.BatchNumber))
                .ForMember(dest => dest.InitialQuantity, opt => opt.MapFrom(src => src.InitialQuantity))
                .ForMember(dest => dest.QuantityInStock, opt => opt.MapFrom(src => src.QuantityInStock))
                .ForMember(dest => dest.ReturnedQuantity, opt => opt.MapFrom(src => src.QuantityInStock - src.InitialQuantity))
                .ForMember(dest => dest.ManufacturingDate, opt => opt.MapFrom(src => src.ManufacturingDate))
                .ForMember(dest => dest.ExpiryDate, opt => opt.MapFrom(src => src.ExpiryDate))
                .ForMember(dest => dest.Supplier, opt => opt.MapFrom(src => src.Supplier));

        }
    }
}
