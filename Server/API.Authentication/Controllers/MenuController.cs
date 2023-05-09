using Common.TransferObject.API.Authentication;
using Microsoft.AspNetCore.Mvc;
using Service.Authentication;
using System.Threading.Tasks;

namespace API.Authentication.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MenuController : ControllerBase
    {
        private readonly IMenuRepository _menuRepository;

        public MenuController(IMenuRepository menuRepository)
        {
            _menuRepository = menuRepository;
        }

        [HttpPost("GetAllMenu")]
        public async Task<IActionResult> GetAllUsers([FromQuery] GetAllMenu menus)
        {
            var result = await _menuRepository.GetMenus(menus);
            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        //[HttpPost("AddMenu")]
        //public async Task<IActionResult> AddMenu(AddMenu menu)
        //{
        //    var addMenu = await _menuRepository.InsertMenu(menu);
        //    if(addMenu == null)
        //    {
        //        return NotFound();
        //    }

        //    return Ok();
        //}
    }
}