using ChildVaccineSystem.Data.DTO.StaffSchedule;
using ChildVaccineSystem.Data.DTO.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChildVaccineSystem.Data.DTO.Staff
{
    public class StaffDTO
	{
		public int StaffId { get; set; }
		public string UserId { get; set; }
		public string Specialization { get; set; }
		public DateTime HireDate { get; set; }
		public DateTime? TerminationDate { get; set; }
		public string ContactPhone { get; set; }
		public string Qualifications { get; set; }
		public string Certifications { get; set; }
		public bool IsActive { get; set; }
		public string Notes { get; set; }
		public int? ScheduleId { get; set; }
		public UserDTO User { get; set; }
		public StaffScheduleDTO Schedule { get; set; }
	}
}
