using ArquiteturaDDD.Application.Interfaces;
using ArquiteturaDDD.Domain.Entities;
using Interfile.GerenciadorAditamento.MVC.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Interfile.GerenciadorAditamento.MVC.Controllers
{
    public class EtapasController : BaseController
    {
        private readonly IUsuarioAppService _usuarioAppService;
        private readonly IGrupoObjetoAppService _grupoObjetoService;
        private readonly IObjetoAppService _objetoService;

        private readonly IOperacaoAppService _operacaoServiceAppService;
        private readonly ITipoDocumentoAppService _tipoDocumentoServiceAppService;
        private readonly ITipoOperacaoAppService _tipoOperacaoServiceAppService;
        private readonly IEtapasAppService _etapaServiceAppService;
        private readonly IProdutoAppService _produtoserviceAppService;

        public EtapasController(IUsuarioAppService usuarioAppService,
            IGrupoObjetoAppService grupoObjetoService,
            IObjetoAppService objetoService,
            IOperacaoAppService operacaoServiceAppService,
            ITipoDocumentoAppService tipoDocumentoServiceAppService,
            ITipoOperacaoAppService tipoOperacaoServiceAppService,
            IEtapasAppService etapaServiceAppService,
            IProdutoAppService produtoserviceAppService)
            : base(usuarioAppService, grupoObjetoService, objetoService)
        {
            _usuarioAppService = usuarioAppService;
            _grupoObjetoService = grupoObjetoService;
            _objetoService = objetoService;
            _operacaoServiceAppService = operacaoServiceAppService;

            _tipoDocumentoServiceAppService = tipoDocumentoServiceAppService;
            _tipoOperacaoServiceAppService = tipoOperacaoServiceAppService;
            _etapaServiceAppService = etapaServiceAppService;
            _produtoserviceAppService = produtoserviceAppService;
        }

        // GET: Etapas
        public ActionResult Index()
        {
            if (!ValidarMenu("/Usuario/Index"))
                return RedirectToAction("Usuario", "Login");

            ViewBag.BaseUrl = BaseUrlAbsoluto;
            return View();
        }

        [HttpPost]
        public JsonResult RetornarDadosRecepcao(jQueryDataTableParamModel param)
        {
            var listTipoDocumento = _tipoDocumentoServiceAppService.GetAll();
            var listTipoOperacao = _tipoOperacaoServiceAppService.GetAll();
            var listProduto = _produtoserviceAppService.GetAll();

            IEnumerable<Operacao> list;
            //if (string.IsNullOrEmpty(param.sSearch))
            list = _operacaoServiceAppService.GetAll();
            //else
            // list = _operacaoServiceAppService.GetByFilter(p => p.NomeUsuario.ToUpper().Contains(param.sSearch.ToUpper()));

            int tamanho = list.Count();
            Func<Operacao, string> orderingFunctionString;
            Func<Operacao, decimal> orderingFunctionDecimal;

            var sortColumnIndex = Convert.ToInt32(Request["iSortCol_0"]);
            var sortDirection = Request["sSortDir_0"];
            if (sortColumnIndex == 4)
            {
                orderingFunctionDecimal = (c => sortColumnIndex == 4 ? c.CodigoEtapa ?? 0 : c.CodigoOperacaoEtapa);

                if (sortDirection == "asc")
                    list = list.OrderBy(orderingFunctionDecimal);
                else
                    list = list.OrderByDescending(orderingFunctionDecimal);
            }
            else
            {
                orderingFunctionString = (c => sortColumnIndex == 0 ? c.Data.ToString("dd/mm/yyyy") :
                                                sortColumnIndex == 1 ? c.SEDEX_AR :
                                                sortColumnIndex == 2 ? c.Colaborador :
                                                sortColumnIndex == 3 ? c.Contrato.ToString() :
                                                sortColumnIndex == 4 ? listTipoOperacao.FirstOrDefault(f => f.CodigoOperacao == c.CodigoOperacao).Documento :
                                                sortColumnIndex == 5 ? listTipoDocumento.FirstOrDefault(f => f.CodigoDocumento == c.CodigoDocumento).Documento :
                                                sortColumnIndex == 6 ? listProduto.FirstOrDefault(f => f.CodigoProduto == c.CodigoProduto).Descricao :
                                                c.Data.ToString("dd/mm/yyyy"));

                if (sortDirection == "asc")
                    list = list.OrderBy(orderingFunctionString);
                else
                    list = list.OrderByDescending(orderingFunctionString);
            }

            var displayedCompanies = list;
            var result = from c in displayedCompanies
                         select
                             new[]
                            {
                                  c.Data.ToString("dd/MM/yyyy HH:mm:ss")                                                      //0
                                , c.SEDEX_AR.ToString()                                                                       //1
                                , c.Colaborador.ToString()                                                                    //2
                                , c.Contrato.ToString()                                                                       //3                                
                                , listTipoOperacao.FirstOrDefault(p => p.CodigoOperacao == c.CodigoOperacao).Documento        //4
                                , listTipoDocumento.FirstOrDefault(p => p.CodigoDocumento == c.CodigoDocumento).Documento     //5
                                , listProduto.FirstOrDefault(f => f.CodigoProduto == c.CodigoProduto).Descricao               //6
                                , c.CodigoOperacaoEtapa.ToString()                                                            //7
                             };

            return Json(new
            {
                sEcho = param.sEcho,
                iTotalRecords = list.Count(),
                iTotalDisplayRecords = tamanho,
                aaData = result.Skip(param.iDisplayStart).Take(param.iDisplayLength)
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult RetornarDadosIniciais()
        {
            var listTipoDocumento = _tipoDocumentoServiceAppService.GetAll();
            var listTipoOperacao = _tipoOperacaoServiceAppService.GetAll();
            var listProduto = _produtoserviceAppService.GetAll();

            return Json(new { listTipoDocumento, listTipoOperacao, listProduto }, JsonRequestBehavior.AllowGet);
        }


        //[HttpPost]
        //public JsonResult Atualizar()
        //{
        //    string retorno = "";

        //    try
        //    {

        //    }
        //    catch (Exception ex)
        //    {

        //    }

        //    return Json(retorno);
        //}
    }
}