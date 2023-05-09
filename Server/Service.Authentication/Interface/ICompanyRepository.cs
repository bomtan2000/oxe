using Data.Authentication.EFCore.Models;
using Service.Core;
using System.Threading.Tasks;

namespace Service.Authentication
{
    public interface ICompanyRepository : IGenericRepository<Company>
    {
        Task<Company> GetCompany(int userId);
    }
}
