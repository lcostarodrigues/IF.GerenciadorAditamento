using ArquiteturaDDD.Application.Interfaces;
using ArquiteturaDDD.Infra.CrossCutting;
using System;
using System.Linq;
using System.Web.Mvc;
using System.Web.Security;

namespace Interfile.GerenciadorAditamento.MVC.Controllers
{
    public class LoginController : BaseController
    {
        private readonly IUsuarioAppService _usuarioAppService;
        private readonly IGrupoObjetoAppService _grupoObjetoService;
        private readonly IObjetoAppService _objetoService;

        public LoginController(IUsuarioAppService usuarioAppService,
            IGrupoObjetoAppService grupoObjetoService,
            IObjetoAppService objetoService)
            : base(usuarioAppService, grupoObjetoService, objetoService)
        {
            _usuarioAppService = usuarioAppService;
            _grupoObjetoService = grupoObjetoService;
            _objetoService = objetoService;
        }


        public ActionResult Index()
        {
            ViewBag.BaseUrl = BaseUrlAbsoluto;

            return View();
        }

        public ActionResult Denied()
        {
            ViewBag.BaseUrl = BaseUrlAbsoluto;

            return View();
        }

        [HttpPost]
        public JsonResult Validate(string login, string password)
        {
            try
            {


                var senhaCriptografada = CriptografiaSHAI.Criptografar(password);

                var usuarioLogin = _usuarioAppService.GetByFilter(u => u.LoginUsuario == login);

                var mensagem = "O usuário ou senha informado é inválido.";
                if (!usuarioLogin.Any())

                    return Json(new { mensagem }, JsonRequestBehavior.AllowGet);

                var usuarioLogado = usuarioLogin.FirstOrDefault();

                var usuario = _usuarioAppService.GetByFilter(u => u.LoginUsuario == usuarioLogado.LoginUsuario).FirstOrDefault();
                if (usuario == null)
                    return Json(new { mensagem }, JsonRequestBehavior.AllowGet);

                Response.Cookies.Add(new FormsAuthenticationConfig(usuario.IdUsuario.ToString(), usuario.LoginUsuario).CriarCookie());
                User = usuario;
                ViewBag.NomeUsuario = usuario.LoginUsuario;


                //Configuration config = WebConfigurationManager.OpenWebConfiguration("~");
                //ConnectionStringsSection section = config.GetSection("connectionStrings") as ConnectionStringsSection;
                //if (section != null)
                //{
                //    section.ConnectionStrings["BifarmaPostgreSQLConnection"].ConnectionString = "server = 186.225.117.58; Port = 5432; user id = postgres; password = platinpostgres; database = SIM_BIF";
                //    config.Save();
                //}


                //System.Configuration.Configuration Config1 = WebConfigurationManager.OpenWebConfiguration("~");
                //ConnectionStringsSection conSetting = (ConnectionStringsSection)Config1.GetSection("connectionStrings");
                //ConnectionStringSettings StringSettings = new ConnectionStringSettings("TesteConnection", "server = ibmlider.ddns.com.br; Port = 5432; user id = postgres; password = platinpostgres; database = SIM_ADM", "Npgsql");
                ////conSetting.ConnectionStrings.Remove(StringSettings);
                //conSetting.ConnectionStrings.Add(StringSettings);
                //Config1.Save(ConfigurationSaveMode.Modified);

                //string str = "server=" + server + ";database=" + database + "; User ID=" + userid + "; Password=" + password + "";
                //Configuration myConfiguration = System.Web.Configuration.WebConfigurationManager.OpenWebConfiguration("~");
                //str = System.Web.Configuration.WebConfigurationManager.AppSettings["myKey"];
                //myConfiguration.Save();

                //Configuration myConfiguration = System.Web.Configuration.WebConfigurationManager.OpenWebConfiguration("~");
                //myConfiguration.AppSettings.Settings.Item("myKey").Value = txtmyKey.Text;
                //myConfiguration.Save();



            }
            catch (Exception ex)
            {
                return Json(new { ex }, JsonRequestBehavior.AllowGet);
            }

            var redirectUrl = "";
            switch (User.IdGrupo)
            {
                case 1:
                    redirectUrl = "/Home/Index";
                    break;
                case 3:
                    redirectUrl = "/Home/Index";
                    break;
                case 4:
                    redirectUrl = "/Home/Index";
                    break;
                case 5:
                    redirectUrl = "/Home/Index";
                    break;
                case 6:
                    redirectUrl = "/Home/Index";
                    break;
                case 7:
                    redirectUrl = "/Home/Index";
                    break;
                case 8:
                    redirectUrl = "/Home/Index";
                    break;
                case 9:
                    redirectUrl = "/Home/Index";
                    break;
                case 10:
                    redirectUrl = "/Home/Index";
                    break;
                default:
                    redirectUrl = "/Home/Index";
                    break;
            }
            return Json(new { redirectUrl }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult Logout()
        {
            try
            {
                if (User != null)
                {
                    ViewBag.NomeUsuario = string.Empty;
                    User = null;
                    FormsAuthentication.SignOut();
                }
            }
            catch (Exception ex)
            {
            }
            return RedirectToAction("Index", "Login");
        }
    }
}