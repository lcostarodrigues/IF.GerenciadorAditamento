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
    public class TipoOperacaoService : ServiceBase<TipoOperacao>, ITipoOperacaoService
    {
        private readonly ITipoOperacaoRepository _TipoOperacaoRepository;

        public TipoOperacaoService(ITipoOperacaoRepository TipoOperacaoRepository)
            : base(TipoOperacaoRepository)
        {
            _TipoOperacaoRepository = TipoOperacaoRepository;
        }
    }
}
