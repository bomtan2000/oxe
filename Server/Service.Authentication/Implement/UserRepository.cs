using AutoMapper;
using Common.TransferObject.API.Authentication;
using Data.Authentication.EFCore.DB;
using Data.Authentication.EFCore.Models;
using Microsoft.EntityFrameworkCore;
using Service.Core;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Net.Mail;
using System.Net;
using Common.TransferObject.FileUpload;

namespace Service.Authentication
{
    public class UserRepository : GenericRepository<Users>, IUserRepository
    {
        private readonly IMapper _mapper;

        public UserRepository(SSODBContext dbContext, IMapper mapper) : base(dbContext)
        {
            _mapper = mapper;
        }

        public async Task<Users> GetUser(int id)
        {
            return await this.GetById(id);
        }

        public async Task<Users> FindUser(string userName)
        {
            return await this.FindOne(x => x.LoginId.Equals(userName.ToLower()), new List<string> { "UserDetail" });
        }

        public async Task DeleteUser(UserDelete user)
        {
            await this.GetById(user.Id).ContinueWith(async res =>
            {
                if (res.Status == TaskStatus.RanToCompletion && res.Result != null)
                {
                    await this.DeleteAsync(res.Result, user.UpdatedBy);
                }
            });
        }

        public async Task InsertUser(AddUser user)
        {
            var newUser = _mapper.Map<Users>(user);
            await this.AddAsync(newUser);
        }

        public async Task UpdateUser(UpdateUser user)
        {
            await this.GetById(user.Id).ContinueWith(async res =>
            {
                if (res.Status == TaskStatus.RanToCompletion && res.Result != null)
                {
                    var updateUser = res.Result;

                    updateUser.Email = user.Email;
                    updateUser.FirstName = user.FirstName;
                    updateUser.LastName = user.LastName;
                    updateUser.DisplayName = user.DisplayName;
                    updateUser.MobileNo = user.MobileNo;
                    updateUser.UpdateDate = user.UpdateDate;
                    updateUser.UpdatedBy = user.UpdatedBy;

                    await this.UpdateAsync(updateUser);
                }
            });
        }

        public async Task<Users> GetUser(string userName, string passWord)
        {
            var hashPass = CryptorEngine.Encrypt(passWord, true);
            return await FindOne(x => x.LoginId.Equals(userName.ToLower()) && x.Pwd.Equals(hashPass));
        }

        public async Task<IEnumerable<Users>> GetUsers(GetAllUser user)
        {
            var getAll = await this.GetAsync(x => x.IsValid.Equals('1')
                                              && (string.IsNullOrEmpty(user.LoginId) || (!string.IsNullOrEmpty(user.LoginId) && x.LoginId.Contains(user.LoginId)))
                                              && (string.IsNullOrEmpty(user.DisplayName) || (!string.IsNullOrEmpty(user.DisplayName) && x.DisplayName.Equals(user.DisplayName)))
                                              && (string.IsNullOrEmpty(user.PhoneNumber) || (!string.IsNullOrEmpty(user.PhoneNumber) && x.MobileNo.Equals(user.PhoneNumber))));
            return getAll;
        }

        public async Task ChangeUserPassword(UserPassword userPassword)
        {
            await this.FindUser(userPassword.UserName).ContinueWith(async res =>
            {
                if (res.Status == TaskStatus.RanToCompletion && res.Result != null)
                {
                    var updateUser = res.Result;
                    updateUser.Pwd = CryptorEngine.Encrypt(userPassword.Password, true);
                    await this.UpdateAsync(updateUser);
                }
            });
        }

        public async Task<Users> ResetUserPassword(ResetPass resetPass)
        {
            var verifyUser = await this.FindOne(x => x.IsValid.Equals('1')
                                            && (x.LoginId.Equals(resetPass.LoginId.ToLower()))
                                            && (x.Email.Equals(resetPass.Email)));
            if (verifyUser == null)
                return null;

            var getMail = resetPass.Email;
            var getLoginIdUser = resetPass.LoginId;

            await ((SSODBContext)_dbContext).GlobalConfiguration.FirstOrDefaultAsync(x => x.NameSetting.Equals("ResetPassword")).ContinueWith(async res =>
            {
                if (res.Status == TaskStatus.RanToCompletion && res.Result != null)
                {
                    var message = new MailMessage
                    {
                        From = new MailAddress("apidev@mplogistics.vn")
                    };

                    message.To.Add(new MailAddress(getMail));
                    message.Subject = "Reset Password Verify";

                    var guiId = Guid.NewGuid().ToString();
                    var urlLink = $"http:\\192.168.70.132:9106\\page\\new-password\\{guiId}";
                    message.Body = res.Result.ValueSetting.Replace("url_link_reset_password", urlLink);

                    message.BodyEncoding = System.Text.Encoding.UTF8;
                    message.SubjectEncoding = System.Text.Encoding.UTF8;
                    message.Priority = MailPriority.High;
                    message.IsBodyHtml = true; // to make message body as html

                    var smtp = new SmtpClient
                    {
                        Host = "mail.mplogistics.vn", // for gmail host
                        EnableSsl = true,
                        Port = 587,
                        UseDefaultCredentials = false,
                        Credentials = new NetworkCredential()
                        {
                            UserName = "apidev@mplogistics.vn",
                            Password = "api!@33mpl"
                        },

                        DeliveryMethod = SmtpDeliveryMethod.Network,
                        Timeout = 30000
                    };

                    verifyUser.VerifyGuiId = guiId;

                    await this.UpdateAsync(verifyUser).ContinueWith(async res =>
                    {
                        await smtp.SendMailAsync(message);
                    });
                }
            });

            return verifyUser;
        }

        public async Task<Users> ChangeUserPassWithGuiID(ChangePassWithGuiId guId)
        {
            var updateUser = await this.FindOne(x => x.IsValid.Equals('1') && x.VerifyGuiId.Equals(guId.VerifyGuiId));
            if (updateUser != null)
            {
                var hashpass = CryptorEngine.Encrypt(guId.Pwd, true);
                updateUser.Pwd = hashpass;
                updateUser.VerifyGuiId = string.Empty;

                await this.UpdateAsync(updateUser);

                return updateUser;
            }

            return null;
        }

        public async Task<short?> IncreaseLockCount(Users user)
        {
            user.FailedCountLogin += 1;
            await this.UpdateAsync(user);
            return await Task.FromResult(user.FailedCountLogin);
        }

        public async Task ResetLockCount(Users user)
        {
            user.FailedCountLogin = 0;
            await this.UpdateAsync(user);
        }

        public async Task UploadUserAvatar(AvatarInfo avatarModel)
        {
            await this.FindOne(x => x.Id == avatarModel.UserId, new List<string> { "UserDetail" }).ContinueWith(async res =>
            {
                if (res.Status == TaskStatus.RanToCompletion && res.Result != null && res.Result.UserDetail != null)
                {
                    var updateUser = res.Result;
                    updateUser.UserDetail.ProfilePhoto = avatarModel.AvatarPath;
                    updateUser.UserDetail.UpdatedBy = avatarModel.UserId;
                    updateUser.UserDetail.UpdateDate = DateTime.Now.ToUniversalTime();

                    await this.UpdateAsync(updateUser);
                }
            });
        }
    }
}