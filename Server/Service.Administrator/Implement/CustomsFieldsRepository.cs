using AutoMapper;
using Common.TransferObject.API.Administrator;
using Data.Administrator.EFCore.DB;
using Data.Administrator.EFCore.Models;
using Service.Administrator.Interface;
using Service.Core;

namespace Service.Administrator.Implement
{
    public class CustomsFieldsRepository : GenericRepository<CustomsFields>, ICustomsFieldsRepository
    {
        private readonly IMapper _mapper;

        public CustomsFieldsRepository(SSOMasterContext dbContext, IMapper mapper) : base(dbContext)
        {
            _mapper = mapper;
        }

        public async Task DeleteCustomField(DeleteCustom custom)
        {
            await this.GetById(custom.Id).ContinueWith(async res =>
            {
                if (res.Status == TaskStatus.RanToCompletion && res.Result != null)
                {
                    var updateUser = res.Result;
                    updateUser.IsValid = '0';
                    updateUser.UpdatedBy = custom.UpdateBy;

                    await this.UpdateAsync(updateUser);
                }
            });
        }

        public async Task<CustomsFields> GetCustomField(int id)
        {
            return await this.GetById(id);
        }

        public async Task InsertCustomField(CustomsFieldInfo customField)
        {
            var newCusField = _mapper.Map<CustomsFields>(customField);
            await this.AddAsync(newCusField);
        }

        public async Task<IEnumerable<CustomsFields>> GetCustomsFields(GetAllCustomField customField)
        {
            var getAll = ((SSOMasterContext)_dbContext).CustomsFields.Where(x => x.IsValid.Equals('1')
                                                  && (string.IsNullOrEmpty(customField.DatabaseName) || (!string.IsNullOrEmpty(customField.DatabaseName) && x.DatabaseName.Equals(customField.DatabaseName)))
                                                  && (string.IsNullOrEmpty(customField.TableObject) || (!string.IsNullOrEmpty(customField.TableObject) && x.TableObject.Equals(customField.TableObject)))
                                                  && (string.IsNullOrEmpty(customField.ColumnObject) || (!string.IsNullOrEmpty(customField.ColumnObject) && x.ColumnObject.Contains(customField.ColumnObject))));
            return getAll;
        }

        public async Task UpdateCustomField(UpdateCustom customField)
        {
            await this.GetById(customField.Id).ContinueWith(async res =>
            {
                if (res.Status == TaskStatus.RanToCompletion && res.Result != null)
                {
                    var updateField = res.Result;
                    updateField.DatabaseName = customField.DatabaseName;
                    await this.UpdateAsync(updateField);
                }
            });
        }
    }
}