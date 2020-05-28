using ArquiteturaDDD.Application.Interfaces;
using ArquiteturaDDD.Domain.Entities;
using ArquiteturaDDD.Infra.CrossCutting;
using Interfile.GerenciadorAditamento.MVC.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web.Mvc;

namespace Interfile.GerenciadorAditamento.MVC.Controllers
{
    [Authorize]
    public class UsuarioController : BaseController
    {

        private readonly IGrupoAppService _grupoAppService;
        private readonly IUsuarioAppService _usuarioAppService;
        private readonly IGrupoObjetoAppService _grupoObjetoAppService;
        private readonly IObjetoAppService _objetoAppService;


        public UsuarioController(IUsuarioAppService usuarioAppService,
            IGrupoObjetoAppService grupoObjetoAppService,
            IObjetoAppService objetoAppService,
            IGrupoAppService grupoAppService)
            : base(usuarioAppService, grupoObjetoAppService, objetoAppService)
        {
            _usuarioAppService = usuarioAppService;
            _grupoObjetoAppService = grupoObjetoAppService;
            _objetoAppService = objetoAppService;
            _grupoAppService = grupoAppService;
        }

        public ActionResult Index()
        {
            if (!ValidarMenu("/Usuario/Index"))
                return RedirectToAction("Usuario", "Login");

            ViewBag.BaseUrl = BaseUrlAbsoluto;
            return View();
        }


        public ActionResult _ModalAlterarSenha()
        {
            //if (!ValidarMenu("/Produto/Index"))
            // return RedirectToAction("Denied", "Login");

            ViewBag.BaseUrl = BaseUrlAbsoluto;
            return View();
        }

        [HttpPost]
        public JsonResult CarregarDadosIniciais()
        {
            var listGrupo = _grupoAppService.GetAll();


            var listSimNao = new List<List<String>>();
            var listSim = new List<String>();
            listSim.Add("1");
            listSim.Add("Sim");
            listSimNao.Add(listSim);
            var listNao = new List<String>();
            listNao.Add("0");
            listNao.Add("Não");
            listSimNao.Add(listNao);

            return Json(new { listGrupo, listSimNao }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult RetornarUsuarios(jQueryDataTableParamModel param)
        {
            var listGrupo = _grupoAppService.GetAll();


            IEnumerable<Usuario> list;
            if (string.IsNullOrEmpty(param.sSearch))
                list = _usuarioAppService.GetAll();
            else
                list = _usuarioAppService.GetByFilter(p => p.NomeUsuario.ToUpper().Contains(param.sSearch.ToUpper()));

            IEnumerable<Usuario> filteredCompanies = list;


            Func<Usuario, string> orderingFunctionString;
            Func<Usuario, decimal> orderingFunctionDecimal;

            var sortColumnIndex = Convert.ToInt32(Request["iSortCol_0"]);
            var sortDirection = Request["sSortDir_0"];
            if (sortColumnIndex == 4)
            {
                orderingFunctionDecimal = (c => sortColumnIndex == 4 ? c.IdGrupo : c.IdUsuario);

                if (sortDirection == "asc")
                    filteredCompanies = filteredCompanies.OrderBy(orderingFunctionDecimal);
                else
                    filteredCompanies = filteredCompanies.OrderByDescending(orderingFunctionDecimal);
            }
            else
            {
                orderingFunctionString = (c => sortColumnIndex == 0 ? c.NomeUsuario :
                                                sortColumnIndex == 1 ? c.EmailUsuario :
                                                sortColumnIndex == 2 ? c.EmailUsuario :
                                                sortColumnIndex == 4 ? listGrupo.FirstOrDefault(p => p.GrupoID == c.IdGrupo).Descricao :
                                                sortColumnIndex == 5 ? c.FlAtivo ? "Sim" : "Não" : c.NomeUsuario);

                if (sortDirection == "asc")
                    filteredCompanies = filteredCompanies.OrderBy(orderingFunctionString);
                else
                    filteredCompanies = filteredCompanies.OrderByDescending(orderingFunctionString);
            }

            var displayedCompanies = filteredCompanies;
            var result = from c in displayedCompanies
                         select
                             new[]
                            {
                                 c.NomeUsuario                                                                              //0
                                ,c.LoginUsuario                                                                             //1
                                , listGrupo.FirstOrDefault(p => p.GrupoID == c.IdGrupo).Descricao                           //2
                                ,c.EmailUsuario                                                                             //3
                                , c.SenhaUsuario.ToString()                                                                 //4                                
                                //, listEmpresa.FirstOrDefault(p => p.IdUsuarioEmpresa == c.IdUsuarioEmpresa).NomeEmpresa   
                                ,c.FlAtivo ? "Sim" : "Não"                                                                  //5
                                ,c.IdUsuario.ToString()                                                                     //6
                                ,c.IdGrupo.ToString()                                                                       //7
                                 //,c.IdUsuarioEmpresa.ToString()

                             };

            return Json(new
            {
                sEcho = param.sEcho,
                iTotalRecords = list.Count(),
                iTotalDisplayRecords = filteredCompanies.Count(),
                aaData = result.Skip(param.iDisplayStart).Take(param.iDisplayLength)
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Salvar(Usuario usuario)
        {
            JsonResult retorno = null;

            try
            {
                usuario.SenhaUsuario = CriptografiaSHAI.Criptografar(usuario.SenhaUsuario);

                if (!_usuarioAppService.ValidaSeExisteMatricula(usuario.LoginUsuario))
                {
                    if (new Regex("^[\\w ]+$").IsMatch(usuario.NomeUsuario))
                    {
                        _usuarioAppService.Add(usuario);

                        retorno = Json(true, JsonRequestBehavior.AllowGet);
                    }
                    else
                        retorno = Json(new { Error = "Nome apenas permitido letras!" }, JsonRequestBehavior.AllowGet);
                }
                else
                    retorno = Json(new { Erro = "Número de matricula já foi cadastrada!" }, JsonRequestBehavior.AllowGet);
            }
            catch (ArgumentException argex)
            {
                //Logar(argex);
                var data = new
                {
                    Erro = argex.Message
                };

                retorno = Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                //Logar(ex);
                var data = new
                {
                    Erro = ex.Message
                };

                retorno = Json(data, JsonRequestBehavior.AllowGet);
            }

            return retorno;
        }

        [HttpPost]
        public JsonResult Alterar(Usuario usuario)
        {
            JsonResult retorno = null;

            try
            {
                usuario.SenhaUsuario = CriptografiaSHAI.Criptografar(usuario.SenhaUsuario);

                _usuarioAppService.Update(usuario);

                retorno = Json(true, JsonRequestBehavior.AllowGet);
            }
            catch (ArgumentException argex)
            {
                //Logar(argex);
                var data = new
                {
                    Erro = argex.Message
                };

                retorno = Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                // Logar(ex);
                var data = new
                {
                    Erro = ex.Message
                };

                retorno = Json(data, JsonRequestBehavior.AllowGet);
            }

            return retorno;
        }

        [HttpPost]
        public JsonResult AlterarSenha(string novaSenha)
        {
            JsonResult retorno = null;

            try
            {
                User.SenhaUsuario = CriptografiaSHAI.Criptografar(novaSenha);

                _usuarioAppService.Update(User);

                retorno = Json(true, JsonRequestBehavior.AllowGet);
            }
            catch (ArgumentException argex)
            {
                //Logar(argex);
                var data = new
                {
                    Erro = argex.Message
                };

                retorno = Json(data, JsonRequestBehavior.AllowGet);
            }

            return retorno;
        }

        [HttpPost]
        public JsonResult Excluir(int IdUsuario)
        {
            JsonResult retorno = null;

            try
            {
                var usuario = _usuarioAppService.GetById(IdUsuario);

                if (usuario != null)
                {
                    _usuarioAppService.Remove(usuario);

                    retorno = Json(true, JsonRequestBehavior.AllowGet);
                }
                else
                    retorno = Json(new { Error = "Usuário não foi encontrado!" }, JsonRequestBehavior.AllowGet);
            }
            catch (ArgumentException argex)
            {
                //Logar(argex);
                var data = new
                {
                    Erro = argex.Message
                };

                retorno = Json(data, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                // Logar(ex);
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