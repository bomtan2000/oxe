using Common.TransferObject.FileUpload;
using MassTransit;
using Service.Authentication;
using System.Threading.Tasks;

namespace API.Authentication.Consumer
{
    public class UserConsumer : IConsumer<AvatarInfo>
    {
        private readonly IUserRepository _userRepository;

        public UserConsumer(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task Consume(ConsumeContext<AvatarInfo> context)
        {
            await _userRepository.UploadUserAvatar(context.Message);
        }
    }
}
