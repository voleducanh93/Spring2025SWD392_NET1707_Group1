using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChildVaccineSystem.Data.DTO.StaffSchedule
{
	public class CreateStaffScheduleDTO
	{
		[Required(ErrorMessage = "Work days are required")]
		public string WorkDays { get; set; }

		[Required(ErrorMessage = "Shift is required")]
		[RegularExpression("^(Morning|Afternoon|Evening)$",
			ErrorMessage = "Shift must be Morning, Afternoon, or Evening")]
		public string Shift { get; set; }
	}
}
