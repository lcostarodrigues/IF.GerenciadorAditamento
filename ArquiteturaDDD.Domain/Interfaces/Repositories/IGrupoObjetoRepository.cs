using ArquiteturaDDD.Domain.Entities;
using System.Collections.Generic;

namespace ArquiteturaDDD.Domain.Interfaces.Repositories
{
    public interface IGrupoObjetoRepository : IRepositoryBase<GrupoObjeto>
    {
        List<GrupoObjeto> RetornarGrupoObjetoPorPerfil(int perfil);
    }
}
