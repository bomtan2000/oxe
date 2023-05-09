using Common.TransferObject.API.Administrator;
using Microsoft.AspNetCore.Mvc;
using Service.Administrator.Interface;

namespace API.Administrator.Controllers
{
    [ApiController]
    [Route("api/[controller]")]    
    public class StdCodeController : Controller
    {
        private readonly IStdCodeRepository _stdCodeRepository;
        public StdCodeController(IStdCodeRepository stdCodeRepository)
        {
            _stdCodeRepository = stdCodeRepository;
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetStdCode(int id)
        {
            var result = await _stdCodeRepository.GetStdCode(id);
            if (result == null)
                return NotFound();
            return Ok(result);
        }

        [HttpPost("GetAllStdCodes")]
        public async Task<IActionResult> GetAllStdCodes([FromBody]GetAllStdCode stdcodes)
        {
            var result = await _stdCodeRepository.GetStdCodes(stdcodes);
            return Ok(result);
        }

        [HttpPost("AddStdCode")]
        public async Task<IActionResult> AddStdCode(StdCodeInfo stdCode)
        {
            await _stdCodeRepository.InsertStdCode(stdCode);
            return Ok();
        }

        [HttpPost("UpdateStdCode")]
        public async Task<IActionResult> UpdateStdCode(UpdateStdCode stdCode)
        {
            await _stdCodeRepository.UpdateStdCode(stdCode);
            return Ok();
        }

        [HttpPost("DeleteStdCode")]
        public async Task<IActionResult> DeleteStdCode(DeleteStdCode stdCodeId)
        {
            await _stdCodeRepository.DeleteStdCode(stdCodeId);
            return Ok();
        }
    }
}