using ArquiteturaDDD.Domain.Entities;
using System.Data.Entity.ModelConfiguration;

namespace ArquiteturaDDD.Infra.Data.EntityConfig
{
    public class ObjetoConfiguration : EntityTypeConfiguration<Objeto>
    {
        public ObjetoConfiguration()
        {
            ToTable("OBJETO");
            HasKey(e => e.ObjetoID);
            Property(e => e.ObjetoID).HasColumnName("ID_OBJETO").HasColumnType("int").IsRequired();
            Property(e => e.Descricao).HasColumnName("DS_OBJETO").HasColumnType("nvarchar").HasMaxLength(100).IsRequired();
            Property(e => e.Rota).HasColumnName("DS_ROTA").HasColumnType("nvarchar").HasMaxLength(500).IsRequired();
            Property(e => e.Ordem).HasColumnName("NR_ORDEM").HasColumnType("int").IsRequired();
            Property(e => e.Menu).HasColumnName("FL_MENU").HasColumnType("bit");
            Property(e => e.ObjetoPaiID).HasColumnName("ID_OBJETO_PAI").HasColumnType("int").IsRequired();
        }
    }
}
