using AutoMapper;
using Common.TransferObject.API.Administrator;
using Common.TransferObject.API.Logging;
using Data.Administrator.EFCore.Models;

namespace Service.Country.Profiles
{
    public class CountryMapper : Profile
    {
        public CountryMapper()
        {
            CreateMap<CountryInfo, Country>();
        }
    }
}
