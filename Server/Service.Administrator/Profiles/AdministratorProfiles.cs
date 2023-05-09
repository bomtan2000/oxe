using AutoMapper;
using Common.TransferObject.API.Administrator;
using Data.Administrator.EFCore.Models;

namespace Service.Administrator.Profiles
{
    public class AdministratorProfile : Profile
    {
        public AdministratorProfile()
        {
            CreateMap<AddAnnounce, Announcement>();
            CreateMap<AddClient, Clients>();
            CreateMap<UpdateClient, Clients>();
            CreateMap<DeleteClient, Clients>();
            CreateMap<AddDriver, Drivers>();
            CreateMap<DeleteDriver, Drivers>();
            CreateMap<DeletePlace, Places>();
            CreateMap<AddDriver, Drivers>();
            CreateMap<AddPlaces, Places>();
            CreateMap<CustomsFieldInfo, CustomsFields>();
            CreateMap<StdCodeInfo, StdCodes>();
            CreateMap<GetAllStdCode, StdCodes>();
        }
    }
}
