using Common.TransferObject.API.Authentication;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.Authentication
{
    public interface IMenuRepository
    {
        //Task<Menu> InsertMenu(AddMenu menu);
        Task<IEnumerable<MenuRes>> GetMenus(GetAllMenu menu);
    }
}