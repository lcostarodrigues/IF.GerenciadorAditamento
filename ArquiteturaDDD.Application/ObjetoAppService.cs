using ArquiteturaDDD.Application.Interfaces;
using ArquiteturaDDD.Domain.Entities;
using ArquiteturaDDD.Domain.Interfaces.Services;

namespace ArquiteturaDDD.Application
{
    public class ObjetoAppService : AppServiceBase<Objeto>, IObjetoAppService
    {
        private readonly IObjetoService _objetoService;

        public ObjetoAppService(IObjetoService objetoService)
            :base(objetoService)
        {
            _objetoService = objetoService;
        }
    }
}
