using Common.TransferObject.API.Logging;
using Common.TransferObject.Base;
using Common.TransferObject.FileUpload;
using MassTransit;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using Service.FileUpload;
using System.Text.Json;

namespace API.FileUpload.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FileUploadController : ControllerBase
    {
        private readonly IPostService _postService;
        private readonly IPublishEndpoint _publishEndpoint;
        private readonly ILogger<FileUploadController> _logger;
        private readonly IWebHostEnvironment _hostingEnvironment;

        public FileUploadController(ILogger<FileUploadController> logger, IPostService postService,
                                    IPublishEndpoint publishEndpoint, IWebHostEnvironment hostingEnvironment)
        {
            _logger = logger;
            _postService = postService;
            _publishEndpoint = publishEndpoint;
            _hostingEnvironment = hostingEnvironment;
        }

        [HttpPost]
        [Route("UploadAvatar")]
        [RequestSizeLimit(5 * 1024 * 1024)]
        public async Task<ActionResult> UploadAvatar([FromForm] AvatarModel avatarModel)
        {
            if (avatarModel == null)
            {
                return BadRequest(new ErrorResponse("S01", "Invalid post request"));
            }

            if (string.IsNullOrEmpty(Request.GetMultipartBoundary()))
            {
                return BadRequest(new ErrorResponse("S02", "Invalid post header"));
            }

            var pathUrl = "";
            if (avatarModel.AvatarFile != null)
            {
                var webRootPath = $"{_hostingEnvironment.ContentRootPath}\\TempFolder";
                if (!Directory.Exists(webRootPath))
                {
                    Directory.CreateDirectory(webRootPath);
                }

                var filePath = Path.Combine(webRootPath, avatarModel.AvatarFile.FileName);
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await avatarModel.AvatarFile.CopyToAsync(fileStream);
                    await fileStream.FlushAsync();
                    fileStream.Close();
                }

                pathUrl = await _postService.UploadAvatar(avatarModel, filePath);
                if (!string.IsNullOrEmpty(pathUrl))
                {
                    _ = Task.Run(async () =>
                    {
                        var avartar = new AvatarInfo()
                        {
                            AvatarPath = pathUrl,
                            LoginId = avatarModel.LoginId,
                            UserId = avatarModel.UserId
                        };

                        await _publishEndpoint.Publish(avartar);

                        var userActivity = new UserActivityLogInfo
                        {
                            UserId = avatarModel.LoginId,
                            FromServer = "File Upload",
                            IPAddress = avatarModel.IPAddress,
                            SystemId = avatarModel.SystemId,
                            Remarks = "Change Avatar",
                            MetaData = JsonSerializer.Serialize(avatarModel)
                        };

                        await _publishEndpoint.Publish(userActivity);
                    });

                    _ = Task.Run(() =>
                    {
                        //var file = new FileInfo(filePath);
                        //if (file.Exists)
                        //{
                        //    file.Delete();
                        //}
                    });
                }
            }

            var baseResonse = new BaseResponse<string>
            {
                Content = pathUrl
            };

            return Ok(baseResonse);
        }
    }
}