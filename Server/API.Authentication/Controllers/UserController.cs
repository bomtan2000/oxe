using Common.TransferObject.API.Authentication;
using Common.TransferObject.API.Logging;
using Common.TransferObject.Base;
using MassTransit;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Service.Authentication;
using System.Text.Json;
using System.Threading.Tasks;

namespace API.Authentication.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly IUserRepository _userRepository;
        private readonly IPublishEndpoint _publishEndpoint;

        public UserController(IUserRepository userRepository, IPublishEndpoint publishEndpoint, IConfiguration configuration)
        {
            _configuration = configuration;

            _userRepository = userRepository;
            _publishEndpoint = publishEndpoint;
        }

        [HttpPost("GetAllUsers")]
        public async Task<IActionResult> GetAllUsers(GetAllUser users)
        {
            var result = await _userRepository.GetUsers(users);
            return Ok(result);
        }

        [HttpPost("AddUser")]
        public async Task<IActionResult> AddUser(AddUser users)
        {
            await _userRepository.InsertUser(users);
            return Ok();
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var result = await _userRepository.GetUser(id);
            if (result == null)
                return NotFound();
            return Ok(result);
        }

        [HttpPost("UpdateUser")]
        public async Task<IActionResult> UpdateUser(UpdateUser user)
        {
            await _userRepository.UpdateUser(user);
            return Ok();
        }

        [HttpPost("DeleteUser")]
        public async Task<IActionResult> DeleteUser(UserDelete user)
        {
            await _userRepository.DeleteUser(user);
            return Ok();
        }

        [HttpPost("ChangePass")]
        public async Task<IActionResult> ChangeUserPassword(UserPassword userPassword)
        {
            await _userRepository.ChangeUserPassword(userPassword).ContinueWith(res =>
            {
                if (res.Status == TaskStatus.RanToCompletion)
                {
                    Task.Run(async () =>
                    {
                        var userActivity = new UserActivityLogInfo
                        {
                            UserId = userPassword.UserName,
                            FromServer = "Authentication",
                            IPAddress = userPassword.IpAddress,
                            SystemId = userPassword.SystemId,
                            Remarks = "Change Password",
                            MetaData = JsonSerializer.Serialize(userPassword)
                        };

                        await _publishEndpoint.Publish(userActivity);
                    });
                }
            });

            return Ok();
        }

        [HttpPost("ChangeUserPassWithGuiID")]
        public async Task<IActionResult> ChangeUserPassWithGuiID(ChangePassWithGuiId userInfo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var verifyUser = await _userRepository.ChangeUserPassWithGuiID(userInfo);
            if (verifyUser == null)
            {
                var error = new ErrorResponse(AuthErrorCode.INACTIVE_USER, AuthMessage.INVALID_CREDENTIALS);
                var baseResponse = new BaseResponse<ChangePassWithGuiId>(new[] { error });
                return Ok(baseResponse);
            }
            else
            {
                _ = Task.Run(async () =>
                {
                    var userActivity = new UserActivityLogInfo
                    {
                        UserId = verifyUser.LoginId,
                        FromServer = "Authentication",
                        IPAddress = userInfo.IPAddress,
                        SystemId = userInfo.SystemId,
                        Remarks = "Change Password",
                        MetaData = JsonSerializer.Serialize(userInfo)
                    };

                    await _publishEndpoint.Publish(userActivity);
                });

                return Ok();
            }
        }

        [HttpPost("ResetPassword")]
        public async Task<IActionResult> ResetPassword(ResetPass resetPass)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userRepository.ResetUserPassword(resetPass);
            if (user == null)
            {
                var error = new ErrorResponse(AuthErrorCode.INACTIVE_USER, AuthMessage.INVALID_CREDENTIALS);
                var baseResponse = new BaseResponse<ResetPass>(new[] { error });
                return Ok(baseResponse);
            }
            else
            {
                return Ok();
            }
        }
    }
}