using ChildVaccineSystem.Common.Helper;
using ChildVaccineSystem.ServiceContract.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Security.Claims;

namespace ChildVaccineSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [Authorize(AuthenticationSchemes = "Bearer", Roles = "Doctor")]
    public class VaccineRecordController : ControllerBase
    {
        private readonly IVaccineRecordService _vaccineRecordService;
        private readonly APIResponse _response;

        public VaccineRecordController(IVaccineRecordService vaccineRecordService, APIResponse response)
        {
            _vaccineRecordService = vaccineRecordService;
            _response = response;
        }

        /// <summary>
        /// Bác sĩ tạo hồ sơ tiêm chủng cho lịch hẹn.
        /// </summary>
        [HttpPost("{bookingId}/create")]
        public async Task<ActionResult<APIResponse>> CreateVaccineRecord(int bookingId)
        {
            try
            {
                var doctorId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                var record = await _vaccineRecordService.CreateVaccinationRecordAsync(bookingId, doctorId);

                _response.StatusCode = HttpStatusCode.OK;
                _response.IsSuccess = true;
                _response.Result = record;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add(ex.Message);
                return BadRequest(_response);
            }
        }
    }
}
