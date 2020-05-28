using ArquiteturaDDD.Application.Interfaces;
using System;
using System.Linq;
using System.Web.Mvc;

namespace Interfile.GerenciadorAditamento.MVC.Controllers
{
    [Authorize]
    public class MenuController : BaseController
    {
        private readonly IUsuarioAppService _usuarioAppService;
        private readonly IGrupoObjetoAppService _grupoObjetoAppService;
        private readonly IObjetoAppService _objetoAppService;

        public MenuController(IUsuarioAppService usuarioAppService,
            IGrupoObjetoAppService grupoObjetoService,
            IObjetoAppService objetoService)
            : base(usuarioAppService, grupoObjetoService, objetoService)
        {
            _usuarioAppService = usuarioAppService;
            _grupoObjetoAppService = grupoObjetoService;
            _objetoAppService = objetoService;
        }

        // GET: Menu
        public ActionResult _Menu()
        {
            ViewBag.Operador = User.LoginUsuario;
            return View();
        }


        [HttpPost]
        public ActionResult RetornaMenuPerfil()
        {
            JsonResult resultado = null;

            try
            {
                int perfil = User.IdGrupo;

                var listPaginasPerfil = _grupoObjetoAppService.RetornarGrupoObjetoPorPerfil(perfil);

                var listPaginas = _objetoAppService.GetAll();

                var menus = (from pagina in listPaginas
                             join paginaPerfil in listPaginasPerfil on pagina.ObjetoID equals paginaPerfil.ObjetoID
                             where pagina.ObjetoPaiID == 0
                             select pagina).ToList();

                var submenus = (from pagina in listPaginas
                                join paginaPerfil in listPaginasPerfil on pagina.ObjetoID equals paginaPerfil.ObjetoID
                                where pagina.ObjetoPaiID != 0
                                select pagina).ToList();

                var retorno = (from pagina in menus
                               select new
                               {
                                   Descricao = pagina.Descricao,
                                   Rota = pagina.Rota,
                                   Ordem = pagina.Ordem,
                                   Submenu = submenus.Where(s => s.ObjetoPaiID == pagina.ObjetoID).OrderBy(o => o.Ordem)

                               }).OrderBy(o => o.Ordem).ToList();

                resultado = Json(retorno, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {


                resultado = Json(new HttpStatusCodeResult(500, "Não foi possível retornar a lista de menu, devido a um erro interno."), JsonRequestBehavior.AllowGet);
            }

            return resultado;
        }
    }
}