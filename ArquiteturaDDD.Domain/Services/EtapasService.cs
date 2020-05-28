using ArquiteturaDDD.Domain.Entities;
using ArquiteturaDDD.Domain.Interfaces.Repositories;
using ArquiteturaDDD.Domain.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArquiteturaDDD.Domain.Services
{
    public class EtapasService : ServiceBase<Etapas>, IEtapasService
    {
        private readonly IEtapasRepository _EtapasRepository;

        public EtapasService(IEtapasRepository EtapasRepository)
            : base(EtapasRepository)
        {
            _EtapasRepository = EtapasRepository;
        }
    }
}
