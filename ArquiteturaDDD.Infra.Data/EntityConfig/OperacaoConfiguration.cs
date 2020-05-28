using ArquiteturaDDD.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArquiteturaDDD.Infra.Data.EntityConfig
{
    public class OperacaoConfiguration : EntityTypeConfiguration<Operacao>
    {
        public OperacaoConfiguration()
        {
            ToTable("Operacao");

            HasKey(e => e.CodigoOperacaoEtapa);
            HasKey(e => e.CodigoDocumento);
            HasKey(e => e.CodigoOperacao);
            HasKey(e => e.CodigoEtapa);
            HasKey(e => e.CodigoProduto);

            Property(e => e.Data).HasColumnName("Data").HasColumnType("datetime");
            Property(e => e.SEDEX_AR).HasColumnName("SEDEX_AR").HasColumnType("varchar").HasMaxLength(30);
            Property(e => e.Colaborador).HasColumnName("Colaborador").HasColumnType("varchar").HasMaxLength(100);
            Property(e => e.Contrato).HasColumnName("Contrato").HasColumnType("int");
            Property(e => e.TipoDePessoa).HasColumnName("TipoDePessoa").HasColumnType("varchar").HasMaxLength(20);
            Property(e => e.NomeDoCliente).HasColumnName("NomeDoCliente").HasColumnType("varchar").HasMaxLength(100);
            Property(e => e.CPF).HasColumnName("CPF").HasColumnType("varchar").HasMaxLength(10);
            Property(e => e.Decisao).HasColumnName("Decisão").HasColumnType("varchar").HasMaxLength(10);
            Property(e => e.SLAPorEtapas).HasColumnName("SLAPorEtapas").HasColumnType("varchar").HasMaxLength(10);
            Property(e => e.TipoDoProcesso).HasColumnName("TipoDoProcesso").HasColumnType("varchar").HasMaxLength(10);
            Property(e => e.NumeroDaOcorrencia).HasColumnName("NúmeroDaOcorrência").HasColumnType("int");
            Property(e => e.DataDeFollow_UP).HasColumnName("DataDeFollow_UP").HasColumnType("datetime");
            Property(e => e.MotivoDaPendencia).HasColumnName("MotivoDaPendência").HasColumnType("varchar").HasMaxLength(100);
            Property(e => e.RetornarParaFila).HasColumnName("RetornarParaFila").HasColumnType("int");
            Property(e => e.TipoDeEnvio).HasColumnName("TipoDeEnvio").HasColumnType("int");
            Property(e => e.AR).HasColumnName("AR").HasColumnType("varchar").HasMaxLength(30);
            Property(e => e.Malote).HasColumnName("Malote").HasColumnType("varchar").HasMaxLength(30);
            Property(e => e.Lacre).HasColumnName("Lacre").HasColumnType("varchar").HasMaxLength(30);
            Property(e => e.ProtocoloDeEnvio).HasColumnName("ProtocoloDeEnvio").HasColumnType("varchar").HasMaxLength(30);
        }
    }
}
