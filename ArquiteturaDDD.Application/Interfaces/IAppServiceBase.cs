using System;
using System.Collections.Generic;

namespace ArquiteturaDDD.Application.Interfaces
{
    public interface IAppServiceBase<TEntity> where TEntity : class
    {
        TEntity Add(TEntity obj);
        TEntity GetById(int id);
        IEnumerable<TEntity> GetAll();
        IEnumerable<TEntity> GetByFilter(System.Linq.Expressions.Expression<Func<TEntity, bool>> consulta);
        void Update(TEntity obj);
        void Remove(TEntity obj);
    }
}
