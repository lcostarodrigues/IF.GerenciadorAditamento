using ArquiteturaDDD.Domain.Entities;
using System.Collections.Generic;

namespace ArquiteturaDDD.Domain.Interfaces.Services
{
    public interface IGrupoObjetoService : IServiceBase<GrupoObjeto>
    {
        List<GrupoObjeto> RetornarGrupoObjetoPorPerfil(int perfil);
    }
}
