using ChildVaccineSystem.Data.Enum;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ChildVaccineSystem.Data.Entities
{
    public class VaccinationRecord
    {
        [Key]
        public int VaccinationRecordId { get; set; }

        [ForeignKey("BookingDetail")]
        public int BookingDetailId { get; set; }
        public BookingDetail BookingDetail { get; set; }

        [ForeignKey("User")]
        public string UserId { get; set; }
        public User User { get; set; }

        [ForeignKey("Children")]
        public int ChildId { get; set; }
        public Children Child { get; set; }

        [ForeignKey("Vaccine")]
        public int VaccineId { get; set; }
        public Vaccine Vaccine { get; set; }

        [Required]
        public DateTime VaccinationDate { get; set; }

        [ForeignKey("VaccineInventory")]
        public int VaccineInventoryId { get; set; }
        public VaccineInventory VaccineInventory { get; set; }

        [Required]
        public decimal DoseAmount { get; set; }

        public int Sequence { get; set; }

        public DateTime? NextDoseDate { get; set; }

        public VaccineRecordStatus Status { get; set; } = VaccineRecordStatus.Pending;

        public string Notes { get; set; }

        public string BatchNumber { get; set; }
    }
}
