using System.Collections.Generic;
using ArquiteturaDDD.Domain.Entities;
using ArquiteturaDDD.Domain.Interfaces.Repositories;
using ArquiteturaDDD.Domain.Interfaces.Services;

namespace ArquiteturaDDD.Domain.Services
{
    public class GrupoObjetoService : ServiceBase<GrupoObjeto>, IGrupoObjetoService
    {
        private readonly IGrupoObjetoRepository _grupoObjetoRepository;
        
        public GrupoObjetoService(IGrupoObjetoRepository grupoObjetoRepository)
            :base(grupoObjetoRepository)
        {
            _grupoObjetoRepository = grupoObjetoRepository;
        }

        public List<GrupoObjeto> RetornarGrupoObjetoPorPerfil(int perfil)
        {
           return _grupoObjetoRepository.RetornarGrupoObjetoPorPerfil(perfil);
        }
    }
}
