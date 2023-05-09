using Common.TransferObject.API.Authentication;
using Common.TransferObject.FileUpload;
using Data.Authentication.EFCore.Models;
using Service.Core;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.Authentication
{
    public interface IUserRepository : IGenericRepository<Users> 
    {
        Task<Users> FindUser(string userName);
        Task<Users> GetUser(string userName, string passWord);
        Task<Users> GetUser(int userId);
        Task DeleteUser(UserDelete user);
        Task InsertUser(AddUser user);
        Task<IEnumerable<Users>> GetUsers(GetAllUser users);
        Task UpdateUser(UpdateUser user);
        Task ChangeUserPassword(UserPassword userPassword);
        Task<Users> ChangeUserPassWithGuiID(ChangePassWithGuiId guId);
        Task<Users> ResetUserPassword(ResetPass resetPass);
        Task<short?> IncreaseLockCount(Users user);
        Task ResetLockCount(Users user);
        Task UploadUserAvatar(AvatarInfo avatarModel);
    }
} 