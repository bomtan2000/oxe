using Common.TransferObject.API.Administrator;
using Data.Administrator.EFCore.Models;
using Service.Core;

namespace Service.Administrator.Interface
{
    public interface IPlacesRepository : IGenericRepository<Places>
    {
            Task<Places> GetPlace(int id);
            Task DeletePlace(DeletePlace placesId);
            Task InsertPlace(AddPlaces places);
            Task<IEnumerable<Places>> GetPlaces(GetAllPlaces places);
            Task UpdatePlace(UpdatePlace places);
        }
}