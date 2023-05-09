using Common.TransferObject.API.Administrator;
using Data.Administrator.EFCore.Models;

namespace Service.Administrator.Interface
{
    public interface ICountriesRepository
    {
        Task<IEnumerable<Country>> GetAllCountry(CountryInfo getAll);
    }
}
