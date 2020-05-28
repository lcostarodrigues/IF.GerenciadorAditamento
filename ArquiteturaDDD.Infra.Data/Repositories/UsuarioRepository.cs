using ArquiteturaDDD.Domain.Entities;
using ArquiteturaDDD.Domain.Interfaces.Repositories;
using System.Linq;

namespace ArquiteturaDDD.Infra.Data.Repositories
{
    public class UsuarioRepository : RepositoryBase<Usuario>, IUsuarioRepository
    {
        public bool ValidaSeExisteMatricula(string matricula)
        {
            Usuario usuario = db.Usuario.Where(w => w.LoginUsuario == matricula).FirstOrDefault();

            if (usuario == null)
                return false;
            else
                return true;
        }
    }
}
