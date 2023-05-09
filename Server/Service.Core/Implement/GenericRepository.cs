using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Service.Core
{
    public class GenericRepository<T> : IGenericRepository<T> where T : BaseEntity
    {
        private readonly DbSet<T> _dbSet;

        protected readonly DbContext _dbContext;

        public GenericRepository(DbContext dbContext)
        {
            _dbContext = dbContext;
            _dbSet = _dbContext.Set<T>();
        }

        public async Task<T> GetById(int id)
        {
            return await _dbSet.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<T>> ListAllAsync()
        {
            return await _dbSet.ToListAsync();
        }

        public async Task<T> AddAsync(T entity)
        {
            entity.IsValid = '1';
            await _dbSet.AddAsync(entity);
            await _dbContext.SaveChangesAsync();

            return entity;
        }

        public async Task UpdateAsync(T entity)
        {
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(T entity, int updateBy)
        {
            entity.IsValid = '0';

            await _dbContext.SaveChangesAsync();
        }

        public async Task PushSync(List<T> rows)
        {
            try
            {
                if (rows != null)
                {
                    foreach (var row in rows)
                    {
                        //T dbRow = await GetById(row.Id);
                        //if (dbRow == null)
                        //{                     
                        //    if (!row.UpdatedDate.HasValue)
                        //        row.UpdatedDate = DateTime.Now;

                        //    await AddAsync(row);
                        //}
                        //else
                        //{
                        //    await UpdateAsync(row);
                        //}
                    }
                }
            }
            catch (Exception ex)
            {
            }
        }

        public async Task<List<T>> GetAsync(Expression<Func<T, bool>> expression)
        {
            return await _dbSet.Where(expression)?.ToListAsync();
        }

        public async Task<T> FindOne(Expression<Func<T, bool>> criteria, List<string> includeMembers = null)
        {
            if (includeMembers != null)
            {
                return await _dbSet.Include(includeMembers[0]).FirstOrDefaultAsync(criteria);
            }
            else
            {
                return await _dbSet.FirstOrDefaultAsync(criteria);
            }
        }

        public async Task ExecWithStoreProcedure(string query, params object[] parameters)
        {
            await _dbContext.Database.ExecuteSqlRawAsync(query, parameters);
        }

        public async Task<List<T>> ExecWithResultStoreProcedure(string query, params object[] parameters)
        {
            return await _dbSet.FromSqlRaw(query, parameters).ToListAsync();
        }

        public IQueryable<T> Query()
        {
            return _dbSet;
        }
    }
}