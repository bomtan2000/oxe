using Common.GlobalErrorHandler;
using MassTransit;
using Microsoft.OpenApi.Models;
using Service.FileUpload;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddMassTransit(x =>
{
    x.AddBus(provider => Bus.Factory.CreateUsingRabbitMq(config =>
    {
        config.Host(new Uri("rabbitmq://192.168.70.132:5672"), h =>
        //config.Host(new Uri("rabbitmq://localhost"), h =>
        {
            h.Username("root");
            h.Password("mpl332tstb");
        });
    }));
});


// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddTransient<GlobalErrorHandler>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Version = "v1",
        Title = "File Upload Microservice API",
    });
});

builder.Services.AddTransient<IPostService, PostService>();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
            policy =>
            {
                policy.AllowAnyOrigin()
                      .AllowAnyHeader()
                      .AllowAnyMethod()
                      .WithMethods("GET", "PUT", "POST", "DELETE", "OPTIONS");
            });
});

var app = builder.Build();
if (app.Environment.IsDevelopment() || app.Environment.IsProduction())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(x => x.AllowAnyOrigin()
                  .AllowAnyMethod()
                  .AllowAnyHeader()
                  .WithMethods("GET", "PUT", "POST", "DELETE", "OPTIONS"));

app.UseRouting();
app.UseAuthorization();
app.UseAuthentication();

app.UseMiddleware<GlobalErrorHandler>();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});

app.Run();
