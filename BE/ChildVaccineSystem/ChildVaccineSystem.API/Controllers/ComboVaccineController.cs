using ChildVaccineSystem.Common.Helper;
using ChildVaccineSystem.Data.DTO.ComboVaccine;
using ChildVaccineSystem.ServiceContract.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace ChildVaccineSystem.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ComboVaccineController : ControllerBase
    {
        private readonly IComboVaccineService _comboService;
        private readonly APIResponse _response;

        public ComboVaccineController(IComboVaccineService comboService, APIResponse response)
        {
            _comboService = comboService;
            _response = response;
        }

		// ✅ Get all combos
		[HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _comboService.GetAllAsync();

            if (!result.Any())
            {
                _response.IsSuccess = false;
                _response.StatusCode = HttpStatusCode.NotFound;
                _response.ErrorMessages.Add("Không tìm thấy combo vaccine nào.");
                return NotFound(_response);
            }

            _response.IsSuccess = true;
            _response.StatusCode = HttpStatusCode.OK;
            _response.Result = result;
            return Ok(_response);
        }

        // ✅ Get combo by ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _comboService.GetByIdAsync(id);

            if (result == null)
            {
                _response.IsSuccess = false;
                _response.StatusCode = HttpStatusCode.NotFound;
                _response.ErrorMessages.Add("Không tìm thấy combo vaccine.");
                return NotFound(_response);
            }

            _response.IsSuccess = true;
            _response.StatusCode = HttpStatusCode.OK;
            _response.Result = result;
            return Ok(_response);
        }


		// ✅ Create combo
		[Authorize(AuthenticationSchemes = "Bearer", Roles = "Manager,Admin")]
		[HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateComboVaccineDTO comboDto)
        {
            if (comboDto.Vaccines.Distinct().Count() != comboDto.Vaccines.Count)
            {
                _response.IsSuccess = false;
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.ErrorMessages.Add("Vắc-xin kết hợp không thể chứa các vắc-xin trùng lặp.");
                return BadRequest(_response);
            }

            try
            {
                var result = await _comboService.CreateAsync(comboDto);

                if (result == null)
                {
                    _response.IsSuccess = false;
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    _response.ErrorMessages.Add("Không thể tạo combo vaccine. Vui lòng kiểm tra lại dữ liệu.");
                    return BadRequest(_response);
                }

                _response.IsSuccess = true;
                _response.StatusCode = HttpStatusCode.Created;
                _response.Result = result;

                return CreatedAtAction(nameof(GetById), new { id = result.ComboId }, _response);
            }
            catch (ArgumentException ex) // 👉 Xử lý lỗi dữ liệu không hợp lệ
            {
                _response.IsSuccess = false;
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.ErrorMessages.Add($"Lỗi khi tạo combo vaccine: {ex.Message}");
                return BadRequest(_response);
            }
            catch (Exception ex) // 👉 Xử lý lỗi hệ thống
            {
                _response.IsSuccess = false;
                _response.StatusCode = HttpStatusCode.InternalServerError;
                _response.ErrorMessages.Add($"Lỗi hệ thống: {ex.Message}");
                return StatusCode((int)HttpStatusCode.InternalServerError, _response);
            }
        }

		// ✅ Update combo
		[Authorize(AuthenticationSchemes = "Bearer", Roles = "Manager,Admin")]
		[HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateComboVaccineDTO comboDto)
        {
            if (!ModelState.IsValid)
            {
                _response.IsSuccess = false;
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.ErrorMessages = ModelState.Values
                        .SelectMany(v => v.Errors)
                        .Select(e => e.ErrorMessage)
                        .ToList();
                return BadRequest(_response);
            }

            try
            {
                var updatedCombo = await _comboService.UpdateAsync(id, comboDto);

                if (updatedCombo == null)
                {
                    _response.IsSuccess = false;
                    _response.StatusCode = HttpStatusCode.NotFound;
                    _response.ErrorMessages.Add("Không tìm thấy combo vaccine hoặc dữ liệu không hợp lệ.");
                    return NotFound(_response);
                }

                _response.IsSuccess = true;
                _response.StatusCode = HttpStatusCode.OK;
                _response.Result = updatedCombo;
                return Ok(_response);
            }
            catch (ArgumentException ex) // 👉 Xử lý lỗi dữ liệu không hợp lệ
            {
                _response.IsSuccess = false;
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.ErrorMessages.Add($"Lỗi khi cập nhật combo vaccine: {ex.Message}");
                return BadRequest(_response);
            }
            catch (Exception ex) // 👉 Xử lý lỗi hệ thống
            {
                _response.IsSuccess = false;
                _response.StatusCode = HttpStatusCode.InternalServerError;
                _response.ErrorMessages.Add($"Lỗi hệ thống: {ex.Message}");
                return StatusCode((int)HttpStatusCode.InternalServerError, _response);
            }
        }

		// ✅ Delete combo
		[Authorize(AuthenticationSchemes = "Bearer", Roles = "Manager,Admin")]
		[HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var isDeleted = await _comboService.DeleteAsync(id);

                if (!isDeleted)
                {
                    _response.IsSuccess = false;
                    _response.StatusCode = HttpStatusCode.NotFound;
                    _response.ErrorMessages.Add("Không tìm thấy combo vaccine hoặc đã bị xóa.");
                    return NotFound(_response);
                }

                _response.IsSuccess = true;
                _response.StatusCode = HttpStatusCode.OK;
                _response.Result = "Combo vaccine đã được xóa thành công.";
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.StatusCode = HttpStatusCode.InternalServerError;
                _response.ErrorMessages.Add($"Lỗi hệ thống: {ex.Message}");
                return StatusCode((int)HttpStatusCode.InternalServerError, _response);
            }
        }
    }
}
