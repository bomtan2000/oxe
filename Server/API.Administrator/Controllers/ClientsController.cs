using Common.TransferObject.API.Administrator;
using Microsoft.AspNetCore.Mvc;
using Service.Administrator.Interface;

namespace API.Administrator.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClientsController : Controller
    {
        private readonly IClientRepository _clientRepository;

        public ClientsController(IClientRepository clientRepository)
        {
            _clientRepository = clientRepository;
        }

        [HttpPost("GetAllClient")]
        public async Task<IActionResult> GetAllClient([FromBody]GetAllClient clients)
        {
            var result = await _clientRepository.GetClients(clients);
            return Ok(result);
        }

        [HttpPost("AddClient")]
        public async Task<IActionResult> AddClient(AddClient users)
        {
            await _clientRepository.InsertClient(users);
            return Ok();
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetClient(int id)
        {
            var result = await _clientRepository.GetClient(id);
            if (result == null)
                return NotFound();
            return Ok(result);
        }

        [HttpPost("UpdateClient")]
        public async Task<IActionResult> UpdateClient(UpdateClient client)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _clientRepository.UpdateClient(client);
            return Ok();
        }

        [HttpPost("DeleteClient")]
        public async Task<IActionResult> DeleteClient(DeleteClient client)
        {
            await _clientRepository.DeleteClient(client);
            return Ok();
        }

        //[HttpPost("changePass")]
        //public async Task<IActionResult> ChangeClientPassword(ClientPassword clientPassword)
        //{
        //    await _clientRepository.ChangeClientPassword(clientPassword);
        //    return Ok();
        //}
    }
}