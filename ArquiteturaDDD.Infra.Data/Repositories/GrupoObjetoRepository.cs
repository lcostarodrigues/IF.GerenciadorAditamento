using ArquiteturaDDD.Domain.Entities;
using ArquiteturaDDD.Domain.Interfaces.Repositories;
using System.Collections.Generic;
using System.Linq;

namespace ArquiteturaDDD.Infra.Data.Repositories
{
    public class GrupoObjetoRepository : RepositoryBase<GrupoObjeto>, IGrupoObjetoRepository
    {
        public List<GrupoObjeto> RetornarGrupoObjetoPorPerfil(int perfil)
        {
            return db.GrupoObjeto.Where(g => g.GrupoID == perfil).ToList();
        }
    }
}
