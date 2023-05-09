using AutoMapper;
using Common.TransferObject.API.Authentication;
using Data.Authentication.EFCore.Models;

namespace Service.Authentication.Profiles
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<AddUser, Users>();
            CreateMap<UpdateUser, Users>();
            CreateMap<UserDelete, Users>();
            CreateMap<LoginRequest, Users>()
                .ForMember(dest =>
                    dest.Pwd,
                    opt => opt.MapFrom(src => src.Password));
            CreateMap<LoginRequest, Users>()
                .ForMember(dest =>
                    dest.LoginId,
                    opt => opt.MapFrom(src => src.UserName));

            CreateMap<UserPassword, Users>();
            CreateMap<UserPassword, Users>()
                .ForMember(dest =>
                    dest.Pwd,
                    opt => opt.MapFrom(src => src.Password));

            CreateMap<ResetPass, Users>();
            CreateMap<ChangePassWithGuiId, Users>();

            CreateMap<AddMenu, Users>();
            CreateMap<GetAllMenu, Users>();
        }
    }
}