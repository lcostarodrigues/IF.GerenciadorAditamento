using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;

namespace Interfile.GerenciadorAditamento.MVC
{
    public class FormsAuthenticationConfig
    {
        private readonly string _nomeUsuario;
        private readonly string _userId;

        public FormsAuthenticationConfig(string userId, string nomeUsuario)
        {
            _userId = userId;
            _nomeUsuario = nomeUsuario;
        }

        public HttpCookie CriarCookie()
        {
            string userData = string.Join("|", _userId, _nomeUsuario);

            FormsAuthenticationTicket ticket = new FormsAuthenticationTicket
                (
                    1,
                    "ADITAMENTOAUTH",
                    DateTime.Now,
                    DateTime.Now.AddHours(30),
                    false,
                    userData,
                    FormsAuthentication.FormsCookiePath
                );

            string encriptedTicket = FormsAuthentication.Encrypt(ticket);

            HttpCookie cookie = new HttpCookie(FormsAuthentication.FormsCookieName, encriptedTicket);
            cookie.HttpOnly = true;
            cookie.Expires = DateTime.Now.AddHours(60);

            return cookie;
        }
    }
}