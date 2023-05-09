using AutoMapper;
using Common.TransferObject.API.Administrator;
using Data.Administrator.EFCore.DB;
using Data.Administrator.EFCore.Models;
using Service.Administrator.Interface;
using Service.Core;

namespace Service.Administrator.Implement
{
    public class StdCodeRepository : GenericRepository<StdCodes>, IStdCodeRepository
    {
        private readonly IMapper _mapper;

        public StdCodeRepository(SSOMasterContext dbContext, IMapper mapper) : base(dbContext)
        {
            _mapper = mapper;
        }

        public async Task DeleteStdCode(DeleteStdCode stdCode)
        {
            await this.GetById(stdCode.Id).ContinueWith(async res =>
            {
                if (res.Status == TaskStatus.RanToCompletion && res.Result != null)
                {
                    var updateUser = res.Result;
                    updateUser.IsValid = '0';
                    updateUser.UpdatedBy = stdCode.UpdateBy;

                    await this.UpdateAsync(updateUser);
                }
            });
        }

        public async Task<StdCodes> GetStdCode(int id)
        {
            return await this.GetById(id);
        }

        public async Task InsertStdCode(StdCodeInfo stdCode)
        {
            var newStdCode = _mapper.Map<StdCodes>(stdCode);
            await this.AddAsync(newStdCode);
        }

        public async Task<IEnumerable<StdCodes>> GetStdCodes(GetAllStdCode stdCode)
        {
            var getAll = ((SSOMasterContext)_dbContext).StdCodes.Where(x => x.IsValid.Equals('1')
                                                  && (string.IsNullOrEmpty(stdCode.CodeId) || (!string.IsNullOrEmpty(stdCode.CodeId) && x.CodeId.Equals(stdCode.CodeId)))
                                                  && (string.IsNullOrEmpty(stdCode.CodeGroup) || (!string.IsNullOrEmpty(stdCode.CodeGroup) && x.CodeGroup.Equals(stdCode.CodeGroup)))
                                                  && (string.IsNullOrEmpty(stdCode.CodeDesc) || (!string.IsNullOrEmpty(stdCode.CodeDesc) && x.CodeDesc.Contains(stdCode.CodeDesc))));
            return getAll;
        }

        public async Task UpdateStdCode(UpdateStdCode stdCode)
        {
            await this.GetById(stdCode.Id).ContinueWith(async res =>
            {
                if (res.Status == TaskStatus.RanToCompletion && res.Result != null)
                {
                    var updateStdCode = res.Result;
                    updateStdCode.CodeGroup = stdCode.CodeGroup;
                    updateStdCode.CodeId = stdCode.CodeId;
                    updateStdCode.CodeDesc = stdCode.CodeDesc;
                    updateStdCode.CompanyId = stdCode.CompanyId;
                    updateStdCode.Remark = stdCode.Remark;
                    updateStdCode.UpdatedByName = stdCode.UpdatedByName;
                    updateStdCode.SeqNo= stdCode.SeqNo;
                    updateStdCode.UpdatedBy= stdCode.UpdatedBy;
                    await this.UpdateAsync(updateStdCode);
                }
            });
        }
    }
}