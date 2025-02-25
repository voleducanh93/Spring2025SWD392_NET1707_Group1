using ChildVaccineSystem.Common.Helper;
using ChildVaccineSystem.Service.Services;
using ChildVaccineSystem.ServiceContract.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace ChildVaccineSystem.API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [Authorize(AuthenticationSchemes = "Bearer", Roles = "Staff,Manager")]
    public class VaccineInventoryController : ControllerBase
    {
        private readonly IVaccineInventoryService _vaccineInventoryService;
        private readonly APIResponse _response;
        public VaccineInventoryController(IVaccineInventoryService vaccineInventoryService)
        {
            _vaccineInventoryService = vaccineInventoryService;
            _response = new APIResponse();
        }
        /// <summary>
        /// Lấy danh sách tồn kho vaccine
        /// </summary>
        [HttpGet("stock")]
        public async Task<IActionResult> GetVaccineStock()
        {
            _response.Result = await _vaccineInventoryService.GetVaccineStockReportAsync();
            _response.StatusCode = HttpStatusCode.OK;
            _response.IsSuccess = true;
            return Ok(_response);
        }

        /// <summary>
        /// Lấy thông tin tồn kho vaccine theo ID
        /// </summary>
        /// <summary>
        /// Lấy danh sách tồn kho vaccine theo ID
        /// </summary>
        [HttpGet("stock/{vaccineId}")]
        public async Task<IActionResult> GetVaccineInventory(int vaccineId)
        {
            try
            {
                var vaccineInventories = await _vaccineInventoryService.GetVaccineInventoryByIdAsync(vaccineId);
                _response.Result = vaccineInventories;
                _response.StatusCode = HttpStatusCode.OK;
                _response.IsSuccess = true;
            }
            catch (KeyNotFoundException)
            {
                _response.StatusCode = HttpStatusCode.NotFound;
                _response.IsSuccess = false;
                return NotFound(_response);
            }
            catch (Exception)
            {
                _response.StatusCode = HttpStatusCode.InternalServerError;
                _response.IsSuccess = false;
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }

            return Ok(_response);
        }

        /// <summary>
        /// Tìm kiếm vaccine trong kho theo từ khóa
        /// </summary>
        [HttpGet("search")]
        public async Task<IActionResult> SearchVaccineStock([FromQuery] string keyword)
        {
            _response.Result = await _vaccineInventoryService.SearchVaccineStockAsync(keyword);
            _response.StatusCode = HttpStatusCode.OK;
            _response.IsSuccess = true;
            return Ok(_response);
        }

        /// <summary>
        /// Xuất vaccine khỏi kho
        /// </summary>
        [HttpPost("issue/{id}")]
        public async Task<IActionResult> IssueVaccine(int id, [FromBody] int quantity)
        {
            try
            {
                await _vaccineInventoryService.IssueVaccineAsync(id, quantity);
                _response.Result = "Vaccine issued successfully";
                _response.StatusCode = HttpStatusCode.OK;
                _response.IsSuccess = true;
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

        /// <summary>
        /// Hoàn trả vaccine về kho
        /// </summary>
        [HttpPost("return/{id}")]
        public async Task<IActionResult> ReturnVaccine(int id, [FromBody] int quantity)
        {
            try
            {
                await _vaccineInventoryService.ReturnVaccineAsync(id, quantity);
                _response.Result = "Vaccine returned successfully";
                _response.StatusCode = HttpStatusCode.OK;
                _response.IsSuccess = true;
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

        /// <summary>
        /// Lấy danh sách vaccine đã xuất kho
        /// </summary>
        [HttpGet("issued")]
        public async Task<IActionResult> GetIssuedVaccines()
        {
            _response.Result = await _vaccineInventoryService.GetIssuedVaccinesAsync();
            _response.StatusCode = HttpStatusCode.OK;
            _response.IsSuccess = true;
            return Ok(_response);
        }


        /// <summary>
        /// Lấy danh sách vaccine đã hoàn trả về kho
        /// </summary>
        [HttpGet("returned")]
        public async Task<IActionResult> GetReturnedVaccines()
        {
            _response.Result = await _vaccineInventoryService.GetReturnedVaccinesAsync();
            _response.StatusCode = HttpStatusCode.OK;
            _response.IsSuccess = true;
            return Ok(_response);
        }

    }
}
