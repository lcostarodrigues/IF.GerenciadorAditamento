using ArquiteturaDDD.Application.Interfaces;
using ArquiteturaDDD.Domain.Entities;
using System;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.Security;

namespace Interfile.GerenciadorAditamento.MVC.Controllers
{
    public class BaseController : Controller
    {

        private readonly IUsuarioAppService _usuarioAppService;
        private readonly IGrupoObjetoAppService _grupoObjetoService;
        private readonly IObjetoAppService _objetoService;

        protected string BaseUrlAbsoluto { get; set; }

        protected string BaseURI { get; set; }
        protected string BasePath { get; set; }

        public Usuario User { get; set; } = null;



        public BaseController(IUsuarioAppService usuarioAppService,
            IGrupoObjetoAppService grupoObjetoService,
            IObjetoAppService objetoService)
        {
            _usuarioAppService = usuarioAppService;
            _grupoObjetoService = grupoObjetoService;
            _objetoService = objetoService;
        }

        protected override void Initialize(RequestContext requestContext)
        {
            base.Initialize(requestContext);

            var servidor = Request.ServerVariables["SERVER_NAME"].ToString();
            var protocolo = string.IsNullOrEmpty(Request.ServerVariables["HTTP_X_ARR_SSL"]) ? "http://" : "https://";
            var porta = Request.Url.Port;
            if (servidor.Equals("localhost"))
            {
                BaseUrlAbsoluto += protocolo + servidor + ":" + porta;
            }
            else
            {
                string _ambiente = System.Configuration.ConfigurationManager.AppSettings["AmbienteUrl"].ToString();
                BaseUrlAbsoluto += protocolo + _ambiente;
            }

            if (requestContext.HttpContext.User.Identity.IsAuthenticated)
            {
                HttpCookie authCookie = Request.Cookies[FormsAuthentication.FormsCookieName];

                FormsAuthenticationTicket ticket = FormsAuthentication.Decrypt(authCookie.Value);

                var userData = ticket.UserData.Split('|');

                User = _usuarioAppService.GetById(Convert.ToInt32(userData[0]));

                if (User != null)
                {
                    ViewBag.NomeUsuario = User.LoginUsuario;
                }
            }
        }

        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            var controller = filterContext.Controller;

            if (!(controller is LoginController))
            {
                if (User == null || User.IdGrupo <= 0)
                    filterContext.Result = RedirectToAction("Index", "Login");
            }
            else
                if ((User != null) && User.IdGrupo <= 0)
                    filterContext.Result = RedirectToAction("Index", "Home");

            base.OnActionExecuting(filterContext);
        }

        public bool ValidarMenu(string rota)
        {
            if (User == null)
                return false;

            if (User.IdGrupo <= 0)
                return false;

            var listGrupoObjeto = _grupoObjetoService.GetByFilter(p => p.GrupoID == User.IdGrupo);
            var listObjeto = _objetoService.GetAll();

            var menus = (from grupoObjeto in listGrupoObjeto
                         join objeto in listObjeto on grupoObjeto.ObjetoID equals objeto.ObjetoID
                         where objeto.Rota != string.Empty
                         select objeto.Rota).ToList();

            if (!menus.Any(p => p.Equals(rota)))
                return false;

            return true;
        }
    }
}