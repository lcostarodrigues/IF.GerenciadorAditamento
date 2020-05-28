using ArquiteturaDDD.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArquiteturaDDD.Infra.Data.EntityConfig
{
    public class TipoDocumentoConfiguration : EntityTypeConfiguration<TipoDocumento>
    {
        public TipoDocumentoConfiguration()
        {
            ToTable("TipoDocumento");

            HasKey(e => e.CodigoDocumento);

            Property(e => e.Documento).HasColumnName("Documento").HasColumnType("varchar").HasMaxLength(20);
        }
    }
}
