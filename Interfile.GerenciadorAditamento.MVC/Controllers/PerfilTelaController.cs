using ArquiteturaDDD.Application.Interfaces;
using ArquiteturaDDD.Domain.Entities;
using System;
using System.Web.Mvc;

namespace Interfile.GerenciadorAditamento.MVC.Controllers
{
    [Authorize]
    public class PerfilTelaController : BaseController
    {
        private readonly IUsuarioAppService _usuarioAppService;
        private readonly IGrupoAppService _grupoAppService;
        private readonly IGrupoObjetoAppService _grupoObjetoAppService;
        private readonly IObjetoAppService _objetoAppService;

        public PerfilTelaController(IUsuarioAppService usuarioAppService, IGrupoAppService grupoAppService,
                                            IGrupoObjetoAppService grupoObjetoAppService, IObjetoAppService objetoAppService)
            : base(usuarioAppService, grupoObjetoAppService, objetoAppService)
        {
            _usuarioAppService = usuarioAppService;
            _grupoAppService = grupoAppService;
            _grupoObjetoAppService = grupoObjetoAppService;
            _objetoAppService = objetoAppService;
        }

        public ActionResult Index()
        {
            if (!ValidarMenu("/PerfilTela/Index"))
                return RedirectToAction("Denied", "Login");

            ViewBag.BaseUrl = BaseUrlAbsoluto;

            return View();
        }

        [HttpPost]
        //[Filters.ValidateAntiForgeryToken]
        public JsonResult CarregarDadosIniciais()
        {
            var listGrupo = _grupoAppService.GetAll();
            var listGrupoObjeto = _grupoObjetoAppService.GetAll();
            var listObjeto = _objetoAppService.GetAll();

            return Json(new { listGrupo, listGrupoObjeto, listObjeto }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        //[Filters.ValidateAntiForgeryToken]
        public JsonResult Salvar(GrupoObjeto[] listGrupoObjeto)
        {
            JsonResult retorno = null;

            try
            {
                int grupoId = listGrupoObjeto[0].GrupoID;
                var deletarItens = _grupoObjetoAppService.GetByFilter(p => p.GrupoID == grupoId);
                foreach (var item in deletarItens)
                {
                    _grupoObjetoAppService.Remove(item);
                }

                foreach (var grupoObjeto in listGrupoObjeto)
                {
                    _grupoObjetoAppService.Add(grupoObjeto);
                }

                retorno = Json(true, JsonRequestBehavior.AllowGet);
            }
            catch (ArgumentException argex)
            {

                var data = new
                {
                    Erro = argex.Message
                };

                retorno = Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                var data = new
                {
                    Erro = ex.Message
                };

                retorno = Json(data, JsonRequestBehavior.AllowGet);
            }

            return retorno;
        }
    }
}