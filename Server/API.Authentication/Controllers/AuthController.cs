using Common.JwtAuthenticationManager;
using Common.TransferObject.API.Authentication;
using Common.TransferObject.API.Logging;
using Common.TransferObject.Base;
using MassTransit;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Service.Authentication;
using System;
using System.Text.Json;
using System.Threading.Tasks;

namespace API.Authentication.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IJwtFactory _jwtFactory;
        private readonly ITokenFactory _tokenFactory;
        private readonly IUserRepository _userRepository;
        private readonly ISystemRepository _systemRepository;
        private readonly ICompanyRepository _companyRepository;

        private readonly ILogger<AuthController> _logger;

        private readonly IConfiguration _configuration;
        private readonly IPublishEndpoint _publishEndpoint;

        public AuthController(ILogger<AuthController> logger, IConfiguration configuration,
                              IUserRepository userRepository, ICompanyRepository companyRepository,
                              ISystemRepository systemRepository,
                              IJwtFactory jwtFactory, ITokenFactory tokenFactory, IPublishEndpoint publishEndpoint)
        {
            _logger = logger;

            _jwtFactory = jwtFactory;
            _tokenFactory = tokenFactory;
            _userRepository = userRepository;
            _systemRepository = systemRepository;
            _companyRepository = companyRepository;

            _configuration = configuration;
            _publishEndpoint = publishEndpoint;
        }

        [HttpPost]
        public async Task<ActionResult> Login(LoginRequest loginRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            ErrorResponse error = null;
            LoginResponse loginResponse = null;

            var system = await _systemRepository.FindOne(loginRequest.SystemId);
            if (system == null)
            {
                error = new ErrorResponse(string.Format(AuthMessage.SYSTEM_NOT_REGISTER, loginRequest.SystemId), AuthErrorCode.INVALID_SYSTEM);
                goto END_CONDITION;
            }

            if (!system.IsValid.Equals('1'))
            {
                error = new ErrorResponse(AuthMessage.SYSTEM_IS_INACTIVE, AuthErrorCode.INVALID_SYSTEM);
                goto END_CONDITION;
            }

            var user = await _userRepository.FindUser(loginRequest.UserName);
            if (user != null)
            {
                if (user.IsValid == 0)
                {
                    error = new ErrorResponse(AuthErrorCode.INACTIVE_USER, AuthMessage.ACCOUNT_INACTIVE);
                    goto END_CONDITION;
                }

                var accessFailedCount = user.FailedCountLogin;
                var maxFailedAccessAttempts = Convert.ToInt32(_configuration.GetValue<string>("MaxFailedAccessAttemptsBeforeLockout"));
                if (accessFailedCount == maxFailedAccessAttempts)
                {
                    error = new ErrorResponse(AuthMessage.ACCOUNT_LOCKED, AuthErrorCode.ACCOUNT_LOCKED);
                    goto END_CONDITION;
                }
                else
                {
                    var validCredentials = await _userRepository.GetUser(loginRequest.UserName, loginRequest.Password);
                    if (validCredentials == null)
                    {
                        accessFailedCount = await _userRepository.IncreaseLockCount(user);
                        if (accessFailedCount == maxFailedAccessAttempts)
                        {
                            error = new ErrorResponse(AuthMessage.ACCOUNT_LOCKED, AuthErrorCode.ACCOUNT_LOCKED);
                            goto END_CONDITION;
                        }
                        else
                        {
                            var attemptsLeft = maxFailedAccessAttempts - accessFailedCount;
                            error = new ErrorResponse(string.Format(AuthMessage.WARNING_BEFORE_LOCK_OUT, attemptsLeft.ToString()), AuthErrorCode.WARNING_BEFORE_ACCOUNT_LOCKED);
                            goto END_CONDITION;
                        }
                    }
                    else
                    {
                        if (accessFailedCount > 0)
                            await _userRepository.ResetLockCount(user);

                        var SECRET = _configuration.GetValue<string>("AudienceSecret");
                        var TOKEN_LIFE_TIME = _configuration.GetValue<int>("TokenLifeTime");
                        var accessToken = await _jwtFactory.GenerateEncodedToken(loginRequest, SECRET, TOKEN_LIFE_TIME);

                        var refreshToken = _tokenFactory.GeneraterRefreshToken();
                        var company = await _companyRepository.GetCompany(user.Id);
                        loginResponse = new LoginResponse(accessToken, refreshToken, new CurrentUser
                        {
                            UserId = user.Id.ToString(),
                            Email = user.Email,
                            DisplayName = user.DisplayName,
                            ProfilePhoto = user.UserDetail?.ProfilePhoto,
                            Gender = user.UserDetail?.Gender,
                            CompanyName = company?.CompanyName,
                            CompanyShortCode = company?.ShortCode
                        });

                        _ = Task.Run(async () =>
                        {
                            var userActivity = new UserActivityLogInfo
                            {
                                UserId = loginRequest.UserName,
                                FromServer = "Authentication",
                                IPAddress = loginRequest.IPAddress,
                                SystemId = loginRequest.SystemId,
                                Remarks = "User Login",
                                MetaData = JsonSerializer.Serialize(loginRequest)
                            };

                            await _publishEndpoint.Publish(userActivity);
                        });
                    }
                }
            }
            else
            {
                error = new ErrorResponse(AuthErrorCode.INVALID_USER, AuthMessage.INVALID_CREDENTIALS);
            }

            END_CONDITION:
            if (loginResponse != null)
            {
                var baseResponse = new BaseResponse<LoginResponse>
                {
                    Content = loginResponse
                };

                return Ok(baseResponse);
            }
            else
            {
                var baseResponse = new BaseResponse<LoginResponse>(new[] { error });
                return Ok(baseResponse);
            }
        }
    }
}