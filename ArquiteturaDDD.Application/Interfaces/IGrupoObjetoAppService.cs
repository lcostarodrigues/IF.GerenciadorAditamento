using ArquiteturaDDD.Domain.Entities;
using System.Collections.Generic;

namespace ArquiteturaDDD.Application.Interfaces
{
    public interface IGrupoObjetoAppService : IAppServiceBase<GrupoObjeto>
    {
        List<GrupoObjeto> RetornarGrupoObjetoPorPerfil(int perfil);
    }
}
