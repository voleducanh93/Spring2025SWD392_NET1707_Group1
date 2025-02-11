using ChildVaccineSystem.Common.Helper;
using ChildVaccineSystem.Data.Entities;
using ChildVaccineSystem.Data.Models;
using ChildVaccineSystem.Repository;
using ChildVaccineSystem.Service;
using ChildVaccineSystem.Service.Services;
using ChildVaccineSystem.ServiceContract.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<ChildVaccineSystemDBContext>(options =>
   options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add EmailSettings
builder.Services.Configure<EmailSetting>(builder.Configuration.GetSection("EmailSettings"));

//builder.Services.AddIdentity<User, IdentityRole>()
//     <ChildVaccineSystemDBContext>()
//     .AddDefaultTokenProviders();

// Add Repositories and Services to DI Container
builder.Services.AddRepository();
builder.Services.AddServices();

// Add Identity services
builder.Services.AddIdentity<User, IdentityRole>()
    .AddEntityFrameworkStores<ChildVaccineSystemDBContext>()
    .AddDefaultTokenProviders();

// Add UserManager and SignInManager for dependency injection
builder.Services.AddScoped<UserManager<User>>();
builder.Services.AddScoped<SignInManager<User>>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
