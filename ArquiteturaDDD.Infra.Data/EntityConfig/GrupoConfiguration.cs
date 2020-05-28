using ArquiteturaDDD.Domain.Entities;
using System.Data.Entity.ModelConfiguration;

namespace ArquiteturaDDD.Infra.Data.EntityConfig
{
    public class GrupoConfiguration : EntityTypeConfiguration<Grupo>
    {
        public GrupoConfiguration()
        {
            ToTable("GRUPO");
            HasKey(e => e.GrupoID);
            Property(e => e.GrupoID).HasColumnName("ID_GRUPO").HasColumnType("int").IsRequired();
            Property(e => e.Descricao).HasColumnName("DS_GRUPO").HasColumnType("nvarchar").HasMaxLength(20).IsRequired();
        }
    }
}
