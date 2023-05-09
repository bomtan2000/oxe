using Data.Authentication.EFCore.DB;
using Data.Authentication.EFCore.Models;
using Service.Core;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Service.Authentication
{
    public class CompanyRepository : GenericRepository<Company>, ICompanyRepository
    {
        public CompanyRepository(SSODBContext dbContext) : base(dbContext)
        {
        }

        public async Task<Company> GetCompany(int userId)
        {
            var _SSODb = (SSODBContext)_dbContext;

            var query = await (from c in _SSODb.Company
                               join u2c in _SSODb.User2Company on c.Id equals u2c.CompanyId
                               where u2c.UserId == userId
                               select c).FirstOrDefaultAsync();
            return await Task.FromResult(query);
        }
    }
}
