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
    public class OperacaoAppService : AppServiceBase<Operacao>, IOperacaoAppService
    {
        private readonly IOperacaoService _OperacaoService;

        public OperacaoAppService(IOperacaoService OperacaoService)
            : base(OperacaoService)
        {
            _OperacaoService = OperacaoService;
        }
    }
}
