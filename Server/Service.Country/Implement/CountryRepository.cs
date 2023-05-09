using AutoMapper;
using Common.TransferObject.API.Administrator;
using Common.TransferObject.API.Logging;
using Data.Administrator.EFCore.DB;
using Data.Administrator.EFCore.Models;

namespace Service.Countries
{
    public class CountryRepository : ICountryRepository
    {
        private readonly IMapper _mapper;
        private readonly SSOMasterContext _dbSSO;

        public CountryRepository(SSOMasterContext dbSSO, IMapper mapper)
        {
            _dbSSO = dbSSO;
            _mapper = mapper;
        }

        public Task<IEnumerable<Country>> GetAll(CountryInfo getAll)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Country>> GetAllCountry(GetAllActivity getAll)
        {
            var getAllActivity = ((SSOMasterContext)_dbSSO).UserActivityLogs.Where(x => x.UserId.Equals(getAll.UserId)
                                                                                 || x.SystemId.Equals(getAll.SystemId));
            return getAllActivity;
        }
    }
}
