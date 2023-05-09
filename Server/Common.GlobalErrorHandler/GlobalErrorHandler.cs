using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Net;
using System.Text.Json;

namespace Common.GlobalErrorHandler
{
    public class GlobalErrorHandler : IMiddleware
    {
        private readonly ILogger<GlobalErrorHandler> _logger;

        public GlobalErrorHandler(ILogger<GlobalErrorHandler> logger)
        {
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next(context);
            }

            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);

                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                ProblemDetails problem = new()
                {
                    Status = (int)HttpStatusCode.InternalServerError,
                    Type = "Server Error",
                    Title = "Server Error",
                    Detail = "An Internal Server Error Has Occurred"
                };

                var jsonMsg = JsonSerializer.Serialize(problem);
                await context.Response.WriteAsync(jsonMsg);

                context.Response.ContentType = "application/json";
            }
        }
    }
}