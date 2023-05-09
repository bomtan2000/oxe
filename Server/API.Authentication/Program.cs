using API.Authentication.Consumer;
using Common.GlobalErrorHandler;
using Common.JwtAuthenticationManager;
using Data.Authentication.EFCore.DB;
using MassTransit;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Service.Authentication;
using System;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<ForwardedHeadersOptions>(options =>
{
    options.ForwardedHeaders =
        ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
});

// Add services to the container
builder.Services.AddDbContext<SSODBContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("SSOContext")));
builder.Services.AddScoped<DbContext, SSODBContext>();

builder.Services.AddScoped<IMenuRepository, MenuRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<ISystemRepository, SystemRepository>();
builder.Services.AddScoped<ICompanyRepository, CompanyRepository>();

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddSingleton<JwtTokenHandler>();
builder.Services.AddTransient<GlobalErrorHandler>();

builder.Services.AddTransient(typeof(IJwtFactory), typeof(JwtFactory));
builder.Services.AddTransient(typeof(IJwtTokenHandler), typeof(JwtTokenHandler));
builder.Services.AddTransient(typeof(ITokenFactory), typeof(TokenFactory));
builder.Services.AddTransient(typeof(IJwtTokenValidator), typeof(JwtTokenValidator));

builder.Services.AddMassTransit(x =>
{
    x.AddConsumer<UserConsumer>();
    x.AddBus(provider => Bus.Factory.CreateUsingRabbitMq(config =>
    {
        config.Host(new Uri("rabbitmq://192.168.70.132:5672"), h =>
        //config.Host(new Uri("rabbitmq://localhost"), h =>
        {
            h.Username("root");
            h.Password("mpl332tstb");
        });
        config.ReceiveEndpoint("user_update_avatar", e =>
        {
            e.ConfigureConsumer<UserConsumer>(provider);
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
        Title = "Authentication Microservice API"
    });
    //opt.AddSecurityDefinition("JWT Bearer", new OpenApiSecurityScheme
    //{
    //    Description = "JWT Bearer Authentication Scheme",
    //    In = ParameterLocation.Header,
    //    Scheme = "Bearer",
    //    Type = SecuritySchemeType.Http,
    //});
    //opt.AddSecurityRequirement(new OpenApiSecurityRequirement
    //{
    //    {
    //        new OpenApiSecurityScheme
    //        {
    //            Reference = new OpenApiReference
    //            {
    //                Id = "JWT Bearer",
    //                Type = ReferenceType.SecurityScheme
    //            }
    //        }, new List<string>()
    //    }
    //});
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
if (app.Environment.IsDevelopment() || app.Environment.IsProduction())
{
    app.UseDeveloperExceptionPage();
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