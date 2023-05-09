using Common.TransferObject.API.Administrator;
using Microsoft.AspNetCore.Mvc;
using Service.Administrator.Interface;

namespace API.Administrator.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CountryController : ControllerBase
    {
        private readonly ICountriesRepository _countryRepository;

        public CountryController(ICountriesRepository countryRepository)
        {
            _countryRepository = countryRepository;
        }

        [HttpPost("ListAllCountry")]
        public async Task<IActionResult> ListAllCountry([FromQuery] CountryInfo getAll)
        {
            var getAllCountry = await _countryRepository.GetAllCountry(getAll);

            return Ok(getAllCountry);
        }
    }
}