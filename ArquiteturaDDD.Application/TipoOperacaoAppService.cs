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
    public class TipoOperacaoAppService : AppServiceBase<TipoOperacao>, ITipoOperacaoAppService
    {
        private readonly ITipoOperacaoService _TipoOperacaoService;

        public TipoOperacaoAppService(ITipoOperacaoService TipoOperacaoService)
            : base(TipoOperacaoService)
        {
            _TipoOperacaoService = TipoOperacaoService;
        }
    }
}
