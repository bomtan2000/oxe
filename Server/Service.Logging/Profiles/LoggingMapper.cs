using AutoMapper;
using Common.TransferObject.API.Logging;
using Data.Logging.EFCore.Models;

namespace Service.Logging.Profiles
{
    public class LoggingMapper : Profile
    {
        public LoggingMapper() 
        {
            CreateMap<UserActivityLogInfo, UserActivityLogs>();
            CreateMap<GetAllActivity, UserActivityLogs>();
        }  
    }
}