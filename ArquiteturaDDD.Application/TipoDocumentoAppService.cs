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
    public class TipoDocumentoAppService : AppServiceBase<TipoDocumento>, ITipoDocumentoAppService
    {
        private readonly ITipoDocumentoService _TipoDocumentoService;

        public TipoDocumentoAppService(ITipoDocumentoService TipoDocumentoService)
            : base(TipoDocumentoService)
        {
            _TipoDocumentoService = TipoDocumentoService;
        }
    }
}
