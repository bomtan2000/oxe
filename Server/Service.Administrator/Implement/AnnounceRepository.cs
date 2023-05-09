using AutoMapper;
using Common.TransferObject.API.Administrator;
using Data.Administrator.EFCore.DB;
using Data.Administrator.EFCore.Models;
using Service.Administrator.Interface;
using Service.Core;

namespace Service.Administrator.Implement
{
    public class AnnounceRepository : GenericRepository<Announcement>, IAnnounceRepository
    {
        private readonly IMapper _mapper;

        public AnnounceRepository(SSOMasterContext dbContext, IMapper mapper) : base(dbContext)
        {
            _mapper = mapper;
        }

        public async Task DeleteAnnounce(AnnounceId announce)
        {
            await this.GetById(announce.Id).ContinueWith(async res =>
            {
                if (res.Status == TaskStatus.RanToCompletion && res.Result != null)
                {
                    var updateAnnounce = res.Result;
                    updateAnnounce.IsValid = '0';
                    updateAnnounce.UpdatedBy = announce.UpdateBy;

                    await this.UpdateAsync(updateAnnounce);
                }
            });
        }

        public async Task<Announcement> GetAnnounce(int id)
        {
            return await this.GetById(id);
        }

        public async Task InsertAnnounce(AddAnnounce user)
        {
            var newUser = _mapper.Map<Announcement>(user);
            await this.AddAsync(newUser);
        }

        public async Task<IEnumerable<Announcement>> GetAnnounces(GetAllAnnounce announces)
        {
            var getAll = ((SSOMasterContext)_dbContext).Announcement.Where(x => x.IsValid.Equals('1')
                                                  && (string.IsNullOrEmpty(announces.Subject) || (!string.IsNullOrEmpty(announces.Subject) && x.Subject.Equals(announces.Subject)))
                                                  && (string.IsNullOrEmpty(announces.AnnounceType) || (!string.IsNullOrEmpty(announces.AnnounceType) && x.AnnounceType.Contains(announces.AnnounceType))));
            return getAll;
        }

        public async Task UpdateAnnounce(UpdateAnounce announce)
        {
            await this.GetById(announce.Id).ContinueWith(async res =>
            {
                if (res.Status == TaskStatus.RanToCompletion && res.Result != null)
                {
                    var updateAnnounce = res.Result;
                    updateAnnounce.Id = announce.Id;
                    updateAnnounce.ExpiredDate = announce.ExpiredDate;
                    updateAnnounce.AnnounceType = announce.AnnounceType;
                    updateAnnounce.Subject = announce.Subject;
                    updateAnnounce.UpdateDate = announce.UpdateDate;
                    updateAnnounce.AnnounceText= announce.AnnounceText;
                    updateAnnounce.UpdateDate= announce.UpdateDate;
                    updateAnnounce.AnnounceTypeDesc= announce.AnnounceTypeDesc;
                    updateAnnounce.UserGroup= announce.UserGroup;
                    updateAnnounce.UserGroupDesc= announce.UserGroupDesc;
                    updateAnnounce.CompanyId= announce.CompanyId;

                    await this.UpdateAsync(updateAnnounce);
                }
            });
        }
    }
}