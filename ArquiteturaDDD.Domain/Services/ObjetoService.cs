using ArquiteturaDDD.Domain.Entities;
using ArquiteturaDDD.Domain.Interfaces.Repositories;
using ArquiteturaDDD.Domain.Interfaces.Services;

namespace ArquiteturaDDD.Domain.Services
{
    public class ObjetoService : ServiceBase<Objeto>, IObjetoService
    {
        private readonly IObjetoRepository _objetoRepository;

        public ObjetoService(IObjetoRepository objetoRepository)
            :base(objetoRepository)
        {
            _objetoRepository = objetoRepository;
        }
    }
}
