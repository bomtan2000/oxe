using AutoMapper;
using Common.TransferObject.API.Administrator;
using Data.Administrator.EFCore.DB;
using Data.Administrator.EFCore.Models;
using Service.Administrator.Interface;

namespace Service.Administrator.Implement
{
    public class CountriesRepository : ICountriesRepository
    {
        private readonly IMapper _mapper;
        private readonly SSOMasterContext _db;

        public CountriesRepository(SSOMasterContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        public async Task<IEnumerable<Country>> GetAllCountry(CountryInfo getAllCountries)
        {
            var getAllCountry = ((SSOMasterContext)_db).Country.Where(x => (string.IsNullOrEmpty(getAllCountries.CountryCode) || (!string.IsNullOrEmpty(getAllCountries.CountryCode) && x.CountryCode.Contains(getAllCountries.CountryCode))));
            return getAllCountry;
        }
    }
}