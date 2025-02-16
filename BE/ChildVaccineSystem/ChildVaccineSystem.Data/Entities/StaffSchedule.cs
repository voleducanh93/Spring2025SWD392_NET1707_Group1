using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChildVaccineSystem.Data.Entities
{
	public class StaffSchedule
	{
		[Key]
		public int ScheduleId { get; set; }

		public string WorkDays { get; set; }

		private string _shift;
		public string Shift
		{
			get => _shift;
			set
			{
				_shift = value;
				if (value != null)
				{
					SetShiftTimes(value);
				}
			}
		}

		public TimeOnly StartTime { get; set; }
		public TimeOnly EndTime { get; set; }
		public bool Status { get; set; } = true;
		public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
		public DateTime? UpdatedAt { get; set; }

		public virtual ICollection<Staff> Staff { get; set; }

		private void SetShiftTimes(string shift)
		{
			switch (shift.ToLower())
			{
				case "morning":
					StartTime = new TimeOnly(7, 0);
					EndTime = new TimeOnly(12, 0);
					break;
				case "afternoon":
					StartTime = new TimeOnly(13, 0);
					EndTime = new TimeOnly(17, 0);
					break;
				case "evening":
					StartTime = new TimeOnly(18, 0);
					EndTime = new TimeOnly(22, 0);
					break;
				default:
					throw new ArgumentException("Invalid shift type. Must be Morning, Afternoon, or Evening");
			}
		}
	}
}
