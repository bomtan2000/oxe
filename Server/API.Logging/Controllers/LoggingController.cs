using Common.TransferObject.API.Logging;
using Microsoft.AspNetCore.Mvc;
using Service.Logging;

namespace API.Logging.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoggingController : ControllerBase
    {     
        private readonly ILoggingRepository _loggingRepository;      

        public LoggingController(ILoggingRepository loggingRepository)
        {
            _loggingRepository = loggingRepository;
        }

        [HttpPost("GetAllActivity")]
        public async Task<IActionResult> ListAllActivity([FromQuery] GetAllActivity getAll)
        {
            var getAllUser = await _loggingRepository.GetAll(getAll);

            if (getAllUser == null)
            {
                return NotFound();
            } 

            return Ok(getAllUser);
        }

        [HttpPost("AddActivity")]
        public async Task<IActionResult> AddActivity(UserActivityLogInfo activityLogs)
        {
            var addActivity = await _loggingRepository.AddAsync(activityLogs);

            if (addActivity == null)
            {
                return NotFound();
            }

            return Ok();
        }
    }
}