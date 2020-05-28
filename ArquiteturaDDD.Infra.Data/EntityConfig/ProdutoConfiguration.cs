using ArquiteturaDDD.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArquiteturaDDD.Infra.Data.EntityConfig
{
    public class ProdutoConfiguration : EntityTypeConfiguration<Produto>
    {
        public ProdutoConfiguration()
        {
            ToTable("Produto");

            HasKey(e => e.CodigoProduto);

            Property(e => e.Descricao).HasColumnName("Descricao").HasColumnType("varchar").HasMaxLength(30);
        }
    }
}
