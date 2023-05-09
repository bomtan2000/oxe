using Common.TransferObject.API.Administrator;
using Data.Administrator.EFCore.Models;
using Service.Core;

namespace Service.Administrator.Interface
{
    public interface IClientRepository : IGenericRepository<Clients>
    {
        Task<Clients> GetClient(int id);
        Task DeleteClient(DeleteClient client);
        Task InsertClient(AddClient client);
        Task<IEnumerable<Clients>> GetClients(GetAllClient clients);
        Task UpdateClient(UpdateClient client);
    }
}