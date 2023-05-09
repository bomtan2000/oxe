using Common.GlobalErrorHandler;
using Common.JwtAuthenticationManager;
using Data.Administrator.EFCore.DB;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Service.Administrator.Implement;
using Service.Administrator.Interface;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<ForwardedHeadersOptions>(options =>
{
    options.ForwardedHeaders =
        ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
});

// Add services to the container
builder.Services.AddDbContext<SSOMasterContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("SSOMasterContext")));
builder.Services.AddScoped<DbContext, SSOMasterContext>();

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddSingleton<JwtTokenHandler>();

builder.Services.AddScoped<IAnnounceRepository, AnnounceRepository>();
builder.Services.AddScoped<IDriversRepository, DriverRepository>();
builder.Services.AddScoped<IClientRepository, ClientRepository>();
builder.Services.AddScoped<IPlacesRepository, PlacesRepository>();
builder.Services.AddScoped<IStdCodeRepository, StdCodeRepository>();
builder.Services.AddScoped<ICustomsFieldsRepository, CustomsFieldsRepository>();
builder.Services.AddScoped<ICountriesRepository, CountriesRepository>();

builder.Services.AddTransient<GlobalErrorHandler>();

builder.Services.AddTransient(typeof(IJwtFactory), typeof(JwtFactory));
builder.Services.AddTransient(typeof(IJwtTokenHandler), typeof(JwtTokenHandler));
builder.Services.AddTransient(typeof(ITokenFactory), typeof(TokenFactory));
builder.Services.AddTransient(typeof(IJwtTokenValidator), typeof(JwtTokenValidator));

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(opt =>
{
    opt.SwaggerDoc("v3", new OpenApiInfo
    {
        Version = "v3",
        Title = "Administrator Microservice API"
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
    app.UseSwaggerUI(c => { c.SwaggerEndpoint("/swagger/v3/swagger.json", "API.Administrator"); });
}
else
{
    app.UseHsts();
}

app.UseCors(x => x.AllowAnyOrigin()
                  .AllowAnyMethod()
                  .AllowAnyHeader()
                  .WithMethods("GET", "PUT", "POST", "DELETE", "OPTIONS"));
//app.UseHttpsRedirection();

app.UseRouting();
app.UseAuthorization();

app.UseAuthentication();

app.UseMiddleware<GlobalErrorHandler>();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});

app.Run();