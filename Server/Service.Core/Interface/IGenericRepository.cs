using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Service.Core
{
    public interface IGenericRepository<T> where T : class
    {
        IQueryable<T> Query();
        Task<T> GetById(int id);
        Task<List<T>> ListAllAsync();
        Task<T> AddAsync(T entity);
        Task UpdateAsync(T entity);
        Task DeleteAsync(T entity, int updateBy);
        Task PushSync(List<T> rows);
        Task<T> FindOne(Expression<Func<T, bool>> criteria, List<string> includeMembers = null);
        Task<List<T>> GetAsync(Expression<Func<T, bool>> expression);
        Task ExecWithStoreProcedure(string query, params object[] parameters);
        Task<List<T>> ExecWithResultStoreProcedure(string query, params object[] parameters);
    }
}