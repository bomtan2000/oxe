using Common.TransferObject.API.Administrator;

namespace Service.Countries
{
    public interface ICountryRepository
    {
        Task<IEnumerable<Country>> GetAll(CountryInfo getAll);
    }
}
