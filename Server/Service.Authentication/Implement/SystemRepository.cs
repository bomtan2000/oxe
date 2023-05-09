using Data.Authentication.EFCore.DB;
using Data.Authentication.EFCore.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Service.Authentication
{
    public class SystemRepository : ISystemRepository
    {        
        private readonly SSODBContext _SSODb;

        public SystemRepository(SSODBContext dbContext)
        {            
            _SSODb = dbContext;
        }

        public async Task<Systems> FindOne(string systemCode)
        {
            return await _SSODb.Set<Systems>().FirstOrDefaultAsync(x => x.SystemCode.Equals(systemCode));
        }
    }
}
