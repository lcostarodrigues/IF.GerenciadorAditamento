using System.Collections.Generic;
using ArquiteturaDDD.Application.Interfaces;
using ArquiteturaDDD.Domain.Entities;
using ArquiteturaDDD.Domain.Interfaces.Services;

namespace ArquiteturaDDD.Application
{
    public class GrupoObjetoAppService : AppServiceBase<GrupoObjeto>, IGrupoObjetoAppService
    {
        private readonly IGrupoObjetoService _grupoObjetoService;

        public GrupoObjetoAppService(IGrupoObjetoService grupoObjetoService)
            :base(grupoObjetoService)
        {
            _grupoObjetoService = grupoObjetoService;
        }

        public List<GrupoObjeto> RetornarGrupoObjetoPorPerfil(int perfil)
        {
            return _grupoObjetoService.RetornarGrupoObjetoPorPerfil(perfil);
        }
    }
}
