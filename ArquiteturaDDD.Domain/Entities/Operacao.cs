using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArquiteturaDDD.Domain.Entities
{
    public class Operacao
    {
        public int CodigoOperacaoEtapa { get; set; }
        public int? CodigoDocumento { get; set; }
        public int? CodigoOperacao { get; set; }
        public int? CodigoEtapa { get; set; }
        public int? CodigoProduto { get; set; }
        public DateTime Data { get; set; }
        public string SEDEX_AR { get; set; }
        public string Colaborador { get; set; }
        public int? Contrato { get; set; }
        public string TipoDePessoa { get; set; }
        public string NomeDoCliente { get; set; }
        public string CPF { get; set; }
        public string Decisao { get; set; }
        public string SLAPorEtapas { get; set; }
        public string TipoDoProcesso { get; set; }
        public int? NumeroDaOcorrencia { get; set; }
        public DateTime? DataDeFollow_UP { get; set; }
        public string MotivoDaPendencia { get; set; }
        public int? RetornarParaFila { get; set; }
        public int? TipoDeEnvio { get; set; }
        public string AR { get; set; }
        public string Malote { get; set; }
        public string Lacre { get; set; }
        public string ProtocoloDeEnvio { get; set; }
    }
}
