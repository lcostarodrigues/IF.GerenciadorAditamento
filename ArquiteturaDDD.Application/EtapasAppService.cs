using ArquiteturaDDD.Application.Interfaces;
using ArquiteturaDDD.Domain.Entities;
using ArquiteturaDDD.Domain.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArquiteturaDDD.Application
{
    public class EtapasAppService : AppServiceBase<Etapas>, IEtapasAppService
    {
        private readonly IEtapasService _EtapasService;

        public EtapasAppService(IEtapasService EtapasService)
            : base(EtapasService)
        {
            _EtapasService = EtapasService;
        }
    }
}
