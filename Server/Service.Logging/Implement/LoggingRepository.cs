using AutoMapper;
using Common.TransferObject.API.Logging;
using Data.Logging.EFCore.DB;
using Data.Logging.EFCore.Models;
using System.Text.Json;

namespace Service.Logging
{
    public class LoggingRepository : ILoggingRepository
    {
        private readonly IMapper _mapper;
        private readonly DBLOGSYSContext _db;

        public LoggingRepository(DBLOGSYSContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        public async Task<UserActivityLogs> AddAsync(UserActivityLogInfo activityLogs)
        {
            var activityLog = _mapper.Map<UserActivityLogs>(activityLogs);
            activityLog.MetaData = JsonSerializer.Serialize(activityLog.MetaData);
            activityLog.CreateDate = DateTime.Now;

            await _db.AddAsync(activityLog);
            await _db.SaveChangesAsync();

            return await Task.FromResult(activityLog);
        }

        public async Task<IEnumerable<UserActivityLogs>> GetAll(GetAllActivity getAll)
        {
            var getAllActivity = ((DBLOGSYSContext)_db).UserActivityLogs.Where(x => x.UserId.Equals(getAll.UserId) 
                                                                                 || x.SystemId.Equals(getAll.SystemId));
            return getAllActivity;
        }
    }
}