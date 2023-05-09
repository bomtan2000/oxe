using Common.TransferObject.API.Administrator;
using Data.Administrator.EFCore.Models;
using Service.Core;

namespace Service.Administrator.Interface
{
    public interface IAnnounceRepository : IGenericRepository<Announcement>
    {
        Task<Announcement> GetAnnounce(int id);
        Task DeleteAnnounce(AnnounceId announce);
        Task InsertAnnounce(AddAnnounce announce);
        Task<IEnumerable<Announcement>> GetAnnounces(GetAllAnnounce announces); 
        Task UpdateAnnounce(UpdateAnounce announce);
    }
}