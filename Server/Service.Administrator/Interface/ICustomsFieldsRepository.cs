using Common.TransferObject.API.Administrator;
using Data.Administrator.EFCore.Models;
using Service.Core;

namespace Service.Administrator.Interface
{
    public interface ICustomsFieldsRepository : IGenericRepository<CustomsFields>
    {
        Task<CustomsFields> GetCustomField(int id);
        Task DeleteCustomField(DeleteCustom custom);
        Task InsertCustomField(CustomsFieldInfo customField);
        Task<IEnumerable<CustomsFields>> GetCustomsFields(GetAllCustomField customField);
        Task UpdateCustomField(UpdateCustom customField);
    }
}