using Common.TransferObject.API.Administrator;
using Microsoft.AspNetCore.Mvc;
using Service.Administrator.Interface;

namespace API.Administrator.Controllers
{
    [ApiController]
    [Route("api/[controller]")]    
    public class PlacesController : Controller
    {
        private readonly IPlacesRepository _placesReposity;
        public PlacesController(IPlacesRepository placessRepository)
        {
            _placesReposity = placessRepository;
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetPlace(int id)
        {
            var result = await _placesReposity.GetPlace(id);
            if (result == null)
                return NotFound();
            return Ok(result);
        }

        [HttpPost("GetAllPlace")]
        public async Task<IActionResult> GetAllPlaces([FromBody]GetAllPlaces places)
        {
            var result = await _placesReposity.GetPlaces(places);
            return Ok(result);
        }

        [HttpPost("AddPlace")]
        public async Task<IActionResult> AddPlace(AddPlaces place)
        {
            await _placesReposity.InsertPlace(place);
            return Ok();
        }

        [HttpPost("UpdatePlace")]
        public async Task<IActionResult> UpdatePlace(UpdatePlace place)
        {
            await _placesReposity.UpdatePlace(place);
            return Ok();
        }

        [HttpPost("DeletePlace")]
        public async Task<IActionResult> DeletePlace(DeletePlace placesId)
        {
            await _placesReposity.DeletePlace(placesId);
            return Ok();
        }
    }
}