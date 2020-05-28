using ArquiteturaDDD.Application.Interfaces;
using System.Web.Mvc;

namespace Interfile.GerenciadorAditamento.MVC.Controllers
{
    public class HomeController : BaseController
    {
        private readonly IUsuarioAppService _usuarioAppService;
        private readonly IGrupoAppService _grupoAppService;
        private readonly IGrupoObjetoAppService _grupoObjetoAppService;
        private readonly IObjetoAppService _objetoAppService;

        public HomeController(IUsuarioAppService usuarioAppService, IGrupoAppService grupoAppService,
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
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}