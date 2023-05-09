using API.Logging.Consumer;
using Common.GlobalErrorHandler;
using Data.Logging.EFCore.DB;
using MassTransit;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Service.Logging;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<ForwardedHeadersOptions>(options =>
{
    options.ForwardedHeaders =
        ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
});

// Add services to the container.
builder.Services.AddDbContext<DBLOGSYSContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("DBLOGSYSContext")));
builder.Services.AddScoped<DbContext, DBLOGSYSContext>();

builder.Services.AddTransient<GlobalErrorHandler>();
builder.Services.AddScoped<ILoggingRepository, LoggingRepository>();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

//Configure RabbitMQ
builder.Services.AddMassTransit(x =>
{
    x.AddConsumer<LoggingConsumer>();
    x.AddBus(provider => Bus.Factory.CreateUsingRabbitMq(config =>
    {
        config.Host(new Uri("rabbitmq://192.168.70.132:5672"), h =>
        //config.Host(new Uri("rabbitmq://localhost"), h =>
        {
            h.Username("root");
            h.Password("mpl332tstb");
        });
        config.ReceiveEndpoint("user_activity_log", e =>
        {
            e.ConfigureConsumer<LoggingConsumer>(provider);
        });
    }));
});

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(opt =>
{
    opt.SwaggerDoc("v1", new OpenApiInfo
    {
        Version = "v1",
        Title = "Logging Microservice API"
    });
});

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

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment() || app.Environment.IsProduction())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(c => { c.SwaggerEndpoint("/swagger/v1/swagger.json", "API.Logging"); });
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
