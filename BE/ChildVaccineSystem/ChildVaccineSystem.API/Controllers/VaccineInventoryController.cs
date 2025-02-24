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
    //[Authorize(AuthenticationSchemes = "Bearer", Roles = "Staff")]
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



    }
}
