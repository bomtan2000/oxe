using AutoMapper;
using Common.TransferObject.API.Administrator;
using Data.Administrator.EFCore.DB;
using Data.Administrator.EFCore.Models;
using Service.Administrator.Interface;
using Service.Core;

namespace Service.Administrator.Implement
{
        public class PlacesRepository : GenericRepository<Places>, IPlacesRepository
        {
            private readonly IMapper _mapper;

            public PlacesRepository(SSOMasterContext dbContext, IMapper mapper) : base(dbContext)
            {
                _mapper = mapper;
            }

        public async Task DeletePlace(DeletePlace place)
        {
            await this.GetById(place.Id).ContinueWith(async res =>
            {
                if (res.Status == TaskStatus.RanToCompletion && res.Result != null)
                {
                    var updateUser = res.Result;
                    updateUser.IsValid = '0';
                    updateUser.UpdatedBy = place.UpdateBy;

                    await this.UpdateAsync(updateUser);
                }
            });
        }

        public async Task<Places> GetPlace(int id)
            {
                return await this.GetById(id);
            }

            public async Task InsertPlace(AddPlaces places)
            {
                var newPlace = _mapper.Map<Places>(places);
                await this.AddAsync(newPlace);
            }

            public async Task<IEnumerable<Places>> GetPlaces(GetAllPlaces places)
            {
                var getAll = ((SSOMasterContext)_dbContext).Places.Where(x => x.IsValid.Equals('1')
                                                      && (string.IsNullOrEmpty(places.ContactPerson) || (!string.IsNullOrEmpty(places.ContactPerson) && x.ContactPerson.Contains(places.ContactPerson)))
                                                      && (string.IsNullOrEmpty(places.MobileNo) || (!string.IsNullOrEmpty(places.MobileNo) && x.MobileNo.Equals(places.MobileNo))));
                return getAll;
            }

            public async Task UpdatePlace(UpdatePlace places)
            {
                await this.GetById(places.Id).ContinueWith(async res =>
                {
                    if (res.Status == TaskStatus.RanToCompletion && res.Result != null)
                    {
                        var updatePlace = res.Result;
                        updatePlace.PlaceDesc = places.ContactPerson;
                        updatePlace.Postalcode = places.Postalcode;
                        updatePlace.Address = places.Address;
                        updatePlace.ContactPerson = places.ContactPerson;
                        updatePlace.PlaceDesc = places.PlaceDesc;
                        updatePlace.MobileNo = places.MobileNo;
                        updatePlace.CompanyId = places.CompanyId;
                        updatePlace.Remark = places.Remark;
                        updatePlace.Country = places.Country;
                        updatePlace.ClientsId = places.ClientsId;
                        await this.UpdateAsync(updatePlace);
                    }
                });
            }
        }
}