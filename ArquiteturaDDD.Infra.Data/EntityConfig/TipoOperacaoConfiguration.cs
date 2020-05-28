using ArquiteturaDDD.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArquiteturaDDD.Infra.Data.EntityConfig
{
    public class TipoOperacaoConfiguration : EntityTypeConfiguration<TipoOperacao>
    {
        public TipoOperacaoConfiguration()
        {
            ToTable("TipoOperacao");

            HasKey(e => e.CodigoOperacao);

            Property(e => e.Documento).HasColumnName("Documento").HasColumnType("varchar").HasMaxLength(20);
        }
    }
}
