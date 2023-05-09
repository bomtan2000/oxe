using AutoMapper;
using Common.TransferObject.API.Authentication;
using Data.Authentication.EFCore.DB;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Service.Authentication
{
    public class MenuRepository : IMenuRepository
    {
        private readonly IMapper _mapper;
        private readonly SSODBContext _SSODb;

        public MenuRepository(SSODBContext dbContext, IMapper mapper)
        {
            _mapper = mapper;
            _SSODb = dbContext;
        }

        public async Task<IEnumerable<MenuRes>> GetMenus(GetAllMenu menu)
        {
            var query = await (from u2g in _SSODb.User2Group
                               join gs in _SSODb.Groups on u2g.GroupId equals gs.Id
                               join gp in _SSODb.GroupPermission on u2g.GroupId equals gp.GroupId
                               join mn in _SSODb.Menu on gp.PageCode equals mn.PageCode
                               where u2g.UserId == menu.UserId && gp.SystemCode.Equals(menu.SystemCode)
                               select new MenuRes
                               {
                                   MenuCode = mn.MenuCode,
                                   MenuName = mn.MenuName,
                                   PageCode = mn.PageCode,
                                   IsGroup = mn.IsGroup,
                                   ParentMenu = mn.ParentMenu,
                                   New = gp.New,
                                   Search = gp.Search,
                                   Store = gp.Store,
                                   Export = gp.Export,
                                   Preview = gp.Preview,
                                   Del = gp.Del,
                                   Plan = gp.Plan,
                                   Run = gp.Run
                               }).ToListAsync();

            var lstParentMenu = query.Select(x => x.ParentMenu).Distinct().ToList();
            var queryGroup = await (from mn in _SSODb.Menu
                                    where mn.IsGroup.Equals('1') && lstParentMenu.Contains(mn.MenuCode)
                                    select new MenuRes
                                    {
                                        MenuCode = mn.MenuCode,
                                        MenuName = mn.MenuName,
                                        PageCode = mn.PageCode,
                                        IsGroup = mn.IsGroup,
                                        ParentMenu = mn.ParentMenu,
                                        New = null,
                                        Search = null,
                                        Store = null,
                                        Export = null,
                                        Preview = null,
                                        Del = null,
                                        Plan = null,
                                        Run = null
                                    }).ToListAsync();

            query.AddRange(queryGroup);

            return query;
        }

        //public async Task<Menu> InsertMenu(AddMenu NewMenu)
        //{
        //    var MenuAdd = _mapper.Map<Menu>(NewMenu);

        //    await _SSODb.AddAsync(MenuAdd);
        //    await _SSODb.SaveChangesAsync();

        //    return await Task.FromResult(MenuAdd);
        //}
    }
}