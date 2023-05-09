using Common.TransferObject.API.Administrator;
using Microsoft.AspNetCore.Mvc;
using Service.Administrator.Interface;

namespace API.Administrator.Controllers
{
    [ApiController]
    [Route("api/[controller]")]    
    public class DriversController : Controller
    {
        private readonly IDriversRepository _driverReposity;
        public DriversController(IDriversRepository driversRepository)
        {
            _driverReposity = driversRepository;
        }

        [HttpPost("GetAllDrivers")]
        public async Task<IActionResult> GetAllDrivers([FromBody]GetAllDriver drivers)
        {
            var result = await _driverReposity.GetDrivers(drivers);
            return Ok(result);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var result = await _driverReposity.GetDriver(id);
            if (result == null)
                return NotFound();
            return Ok(result);
        }

        [HttpPost("AddDriver")]
        public async Task<IActionResult> AddDriver(AddDriver driver)
        {
            await _driverReposity.InsertDriver(driver);
            return Ok();
        }

        [HttpPost("UpdateDriver")]
        public async Task<IActionResult> UpdateDriver(UpdateDriver driver)
        {
            await _driverReposity.UpdateDriver(driver);
            return Ok();
        }

        [HttpPost("DeleteDriver")]
        public async Task<IActionResult> DeleteDriver(DeleteDriver driverId)
        {
            await _driverReposity.DeleteDriver(driverId);
            return Ok();
        }
    }
}