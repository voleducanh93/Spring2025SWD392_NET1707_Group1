using ChildVaccineSystem.Data.DTO.Staff;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChildVaccineSystem.Data.DTO.StaffSchedule
{
	public class StaffScheduleDTO
	{
		public int ScheduleId { get; set; }
		public string WorkDays { get; set; }
		public string Shift { get; set; }
		public TimeOnly StartTime { get; set; }
		public TimeOnly EndTime { get; set; }
		public bool Status { get; set; }
		public DateTime CreatedAt { get; set; }
		public DateTime? UpdatedAt { get; set; }
		public List<StaffDTO> Staff { get; set; }

	}
}
