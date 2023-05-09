using Data.Authentication.EFCore.Models;
using System.Threading.Tasks;

namespace Service.Authentication
{
    public interface ISystemRepository
    {
        Task<Systems> FindOne(string systemCode);
    }
}
