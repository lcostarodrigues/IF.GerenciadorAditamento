namespace ArquiteturaDDD.Domain.Entities
{
    public class Usuario
    {
        public int IdUsuario { get; set; }

        public string NomeUsuario { get; set; }

        public string LoginUsuario { get; set; }

        public string EmailUsuario { get; set; }

        public string SenhaUsuario { get; set; }

        public int IdGrupo { get; set; }

        public bool FlAtivo { get; set; }

    }
}
