using Common.TransferObject.API.Administrator;
using Microsoft.AspNetCore.Mvc;
using Service.Administrator.Interface;

namespace API.Administrator.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CustomsFieldsController : Controller
    {
        private readonly ICustomsFieldsRepository _customsFieldsRepository;

        public CustomsFieldsController(ICustomsFieldsRepository customsFieldsRepository)
        {
            _customsFieldsRepository = customsFieldsRepository;
        }

        [HttpGet("GetAllField")]
        public async Task<IActionResult> GetAllCusField(GetAllCustomField customerField)
        {
            var result = await _customsFieldsRepository.GetCustomsFields(customerField);
            return Ok(result);
        }

        [HttpPost("AddField")]
        public async Task<IActionResult> AddField(CustomsFieldInfo customerField)
        {
            await _customsFieldsRepository.InsertCustomField(customerField);
            return Ok();
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetField(int id)
        {
            var result = await _customsFieldsRepository.GetCustomField(id);
            if (result == null)
                return NotFound();
            return Ok(result);
        }

        [HttpPost("UpdateField")]
        public async Task<IActionResult> UpdateField(UpdateCustom customerField)
        {
            await _customsFieldsRepository.UpdateCustomField(customerField);
            return Ok();
        }

        [HttpPost("DeleteField")]
        public async Task<IActionResult> DeleteField(DeleteCustom customFieldId)
        {
            await _customsFieldsRepository.DeleteCustomField(customFieldId);
            return Ok();
        }
    }
}