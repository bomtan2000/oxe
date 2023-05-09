using Common.TransferObject.API.Administrator;
using Data.Administrator.EFCore.Models;
using Service.Core;

namespace Service.Administrator.Interface
{
    public interface IDriversRepository : IGenericRepository<Drivers>
    {
        Task<Drivers> GetDriver(int id);
        Task DeleteDriver(DeleteDriver driverId);
        Task InsertDriver(AddDriver driver);
        Task<IEnumerable<Drivers>> GetDrivers(GetAllDriver drivers);
        Task UpdateDriver(UpdateDriver driver);
    }
}