using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChildVaccineSystem.Data.Entities
{
	public class Staff
	{
		[Key]
		public int StaffId { get; set; }

		[ForeignKey("User")]
		public string UserId { get; set; }
		public User User { get; set; }

		public string? Specialization { get; set; }

		[Required]
		public DateTime HireDate { get; set; }

		public DateTime? TerminationDate { get; set; }

		[Required]
		public string ContactPhone { get; set; }

		public string? Qualifications { get; set; }

		public string? Certifications { get; set; }

		[Required]
		public bool IsActive { get; set; } = true;

		public string? Notes { get; set; }

		public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

		public DateTime? UpdatedAt { get; set; }

		[ForeignKey("StaffSchedule")]
		public int? StaffScheduleId { get; set; }
		public virtual StaffSchedule StaffSchedule { get; set; }
	}
}
