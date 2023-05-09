using Common.TransferObject.API.Administrator;
using Microsoft.AspNetCore.Mvc;
using Service.Administrator.Interface;

namespace API.Administrator.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AnnounceController : Controller
    {
        private readonly IAnnounceRepository _announceRepository;

        public AnnounceController(IAnnounceRepository announceRepository)
        {
            _announceRepository = announceRepository;
        }

        [HttpPost("GetAllAnnounce")]
        public async Task<IActionResult> GetAllAnnounce(GetAllAnnounce announce)
        {
            var result = await _announceRepository.GetAnnounces(announce);
            return Ok(result);
        }

        [HttpPost("AddAnnounce")]
        public async Task<IActionResult> AddAnnounce(AddAnnounce announce)
        {
            await _announceRepository.InsertAnnounce(announce);
            return Ok();
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetAnnounce(int id)
        {            
            var result = await _announceRepository.GetAnnounce(id);
            return Ok(result);
        }

        [HttpPost("UpdateAnnounce")]
        public async Task<IActionResult> UpdateAnnounce(UpdateAnounce announce)
        {
            await _announceRepository.UpdateAnnounce(announce);
            return Ok();
        }

        [HttpPost("DeleteAnnounce")]
        public async Task<IActionResult> DeleteAnnounce(AnnounceId announce)
        {
            await _announceRepository.DeleteAnnounce(announce);
            return Ok();
        }
    }
}