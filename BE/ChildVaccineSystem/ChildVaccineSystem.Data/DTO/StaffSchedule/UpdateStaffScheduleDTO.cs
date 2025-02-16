using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChildVaccineSystem.Data.DTO.StaffSchedule
{
	public class UpdateStaffScheduleDTO
	{
		public string? WorkDays { get; set; }

		[RegularExpression("^(Morning|Afternoon|Evening)$",
			ErrorMessage = "Shift must be Morning, Afternoon, or Evening")]
		public string? Shift { get; set; }

	}
}
