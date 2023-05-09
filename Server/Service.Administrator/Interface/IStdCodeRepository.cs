using Common.TransferObject.API.Administrator;
using Data.Administrator.EFCore.Models;
using Service.Core;

namespace Service.Administrator.Interface
{
    public interface IStdCodeRepository : IGenericRepository<StdCodes>
    {
        Task<StdCodes> GetStdCode(int id);
        Task DeleteStdCode(DeleteStdCode stdCodeId);
        Task InsertStdCode(StdCodeInfo stdCode);
        Task<IEnumerable<StdCodes>> GetStdCodes(GetAllStdCode stdCode);
        Task UpdateStdCode(UpdateStdCode stdCode);
    }
}