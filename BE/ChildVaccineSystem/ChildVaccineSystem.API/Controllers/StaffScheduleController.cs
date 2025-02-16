using ChildVaccineSystem.Common.Helper;
using ChildVaccineSystem.Data.DTO.StaffSchedule;
using ChildVaccineSystem.ServiceContract.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace ChildVaccineSystem.API.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	//[Authorize] // Uncomment if you want to require authorization
	public class StaffScheduleController : ControllerBase
	{
		private readonly IStaffScheduleService _scheduleService;
		private readonly APIResponse _response;

		public StaffScheduleController(IStaffScheduleService scheduleService, APIResponse response)
		{
			_scheduleService = scheduleService;
			_response = response;
		}

		/// <summary>
		/// Get all staff schedules
		/// </summary>
		[HttpGet]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		public async Task<ActionResult<APIResponse>> GetAll()
		{
			try
			{
				var result = await _scheduleService.GetAllSchedulesAsync();
				if (!result.Any())
				{
					_response.IsSuccess = false;
					_response.StatusCode = HttpStatusCode.BadRequest;
					return NotFound(_response);
				}
				_response.Result = result;
				_response.StatusCode = HttpStatusCode.OK;
				return Ok(_response);
			}
			catch (Exception ex)
			{
				_response.IsSuccess = false;
				_response.ErrorMessages.Add(ex.Message);
				_response.StatusCode = HttpStatusCode.BadRequest;
				return BadRequest(_response);
			}
		}

		/// <summary>
		/// Get staff schedule by ID
		/// </summary>
		[HttpGet("{id:int}")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		public async Task<ActionResult<APIResponse>> GetById(int id)
		{
			try
			{
				var result = await _scheduleService.GetScheduleByIdAsync(id);
				if (result == null)
				{
					_response.IsSuccess = false;
					_response.StatusCode = HttpStatusCode.NotFound;
					_response.ErrorMessages.Add("Schedule not found");
					return NotFound(_response);
				}
				_response.Result = result;
				_response.StatusCode = HttpStatusCode.OK;
				return Ok(_response);
			}
			catch (Exception ex)
			{
				_response.IsSuccess = false;
				_response.ErrorMessages.Add(ex.Message);
				_response.StatusCode = HttpStatusCode.BadRequest;
				return BadRequest(_response);
			}
		}

		/// <summary>
		/// Create a new staff schedule
		/// </summary>
		[HttpPost]
		[ProducesResponseType(StatusCodes.Status201Created)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		public async Task<ActionResult<APIResponse>> Create([FromBody] CreateStaffScheduleDTO createScheduleDto)
		{
			try
			{
				var result = await _scheduleService.CreateScheduleAsync(createScheduleDto);
				_response.Result = result;
				_response.StatusCode = HttpStatusCode.Created;
				return CreatedAtAction(nameof(GetById), new { id = result.ScheduleId }, _response);
			}
			catch (Exception ex)
			{
				_response.IsSuccess = false;
				_response.ErrorMessages.Add(ex.Message);
				_response.StatusCode = HttpStatusCode.BadRequest;
				return BadRequest(_response);
			}
		}

		/// <summary>
		/// Update a staff schedule
		/// </summary>
		[HttpPut("{id:int}")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		public async Task<ActionResult<APIResponse>> Update(int id, [FromBody] UpdateStaffScheduleDTO updateScheduleDto)
		{
			try
			{
				var result = await _scheduleService.UpdateScheduleAsync(id, updateScheduleDto);
				_response.Result = result;
				_response.StatusCode = HttpStatusCode.OK;
				return Ok(_response);
			}
			catch (KeyNotFoundException)
			{
				_response.IsSuccess = false;
				_response.StatusCode = HttpStatusCode.NotFound;
				_response.ErrorMessages.Add("Schedule not found");
				return NotFound(_response);
			}
			catch (Exception ex)
			{
				_response.IsSuccess = false;
				_response.ErrorMessages.Add(ex.Message);
				_response.StatusCode = HttpStatusCode.BadRequest;
				return BadRequest(_response);
			}
		}

		/// <summary>
		/// Delete a staff schedule
		/// </summary>
		[HttpDelete("{id:int}")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		public async Task<ActionResult<APIResponse>> Delete(int id)
		{
			try
			{
				var result = await _scheduleService.DeleteScheduleAsync(id);
				if (!result)
				{
					_response.IsSuccess = false;
					_response.StatusCode = HttpStatusCode.NotFound;
					_response.ErrorMessages.Add("Schedule not found");
					return NotFound(_response);
				}
				_response.StatusCode = HttpStatusCode.OK;
				_response.Result = true;
				return Ok(_response);
			}
			catch (Exception ex)
			{
				_response.IsSuccess = false;
				_response.ErrorMessages.Add(ex.Message);
				_response.StatusCode = HttpStatusCode.BadRequest;
				return BadRequest(_response);
			}
		}
	}
}
