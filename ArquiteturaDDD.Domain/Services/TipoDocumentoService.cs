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
    public class TipoDocumentoService : ServiceBase<TipoDocumento>, ITipoDocumentoService
    {
        private readonly ITipoDocumentoRepository _TipoDocumentoRepository;

        public TipoDocumentoService(ITipoDocumentoRepository TipoDocumentoRepository)
            : base(TipoDocumentoRepository)
        {
            _TipoDocumentoRepository = TipoDocumentoRepository;
        }
    }
}
