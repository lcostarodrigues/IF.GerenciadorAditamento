using ArquiteturaDDD.Application.Interfaces;
using ArquiteturaDDD.Domain.Entities;
using ArquiteturaDDD.Domain.Interfaces.Services;

namespace ArquiteturaDDD.Application
{
    public class GrupoAppService : AppServiceBase<Grupo>, IGrupoAppService
    {
        private readonly IGrupoService _grupoService;

        public GrupoAppService(IGrupoService grupoService)
            :base(grupoService)
        {
            _grupoService = grupoService;
        }
    }

}
