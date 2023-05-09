using Common.TransferObject.API.Logging;
using Data.Logging.EFCore.Models;

namespace Service.Logging
{
    public interface ILoggingRepository
    {
        Task<IEnumerable<UserActivityLogs>> GetAll(GetAllActivity getAll);
        Task<UserActivityLogs> AddAsync(UserActivityLogInfo activityLogs);
    }
}