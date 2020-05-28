namespace ArquiteturaDDD.Domain.Entities
{
    public class Objeto
    {
        public int ObjetoID { get; set; }
        public string Descricao { get; set; }
        public string Rota { get; set; }
        public int Ordem { get; set; }
        public bool Menu { get; set; }
        public int ObjetoPaiID { get; set; }
    }
}
