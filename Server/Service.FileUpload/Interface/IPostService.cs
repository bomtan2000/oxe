using Common.TransferObject.FileUpload;

namespace Service.FileUpload
{
    public interface IPostService
    {
        Task<string> UploadAvatar(AvatarModel avatarModel, string filePath);
    }
}