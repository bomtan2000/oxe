using Common.TransferObject.API.Logging;
using MassTransit;
using Service.Logging;

namespace API.Logging.Consumer
{
    public class LoggingConsumer : IConsumer<UserActivityLogInfo>
    {
        private readonly ILoggingRepository _loggingRepository;

        public LoggingConsumer(ILoggingRepository loggingRepository)
        {
            _loggingRepository = loggingRepository;
        }

        public async Task Consume(ConsumeContext<UserActivityLogInfo> context)
        {
            await _loggingRepository.AddAsync(context.Message);
        }
    }
}
