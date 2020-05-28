using ArquiteturaDDD.Domain.Entities;

namespace ArquiteturaDDD.Application.Interfaces
{
    public interface IUsuarioAppService : IAppServiceBase<Usuario>
    {
        bool ValidaSeExisteMatricula(string matricula);
    }
}
