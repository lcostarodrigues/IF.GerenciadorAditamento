using ArquiteturaDDD.Domain.Entities;
using System.Data.Entity.ModelConfiguration;

namespace ArquiteturaDDD.Infra.Data.EntityConfig
{
    public class GrupoObjetoConfiguration : EntityTypeConfiguration<GrupoObjeto>
    {
        public GrupoObjetoConfiguration()
        {
            ToTable("GRUPO_OBJETO");
            HasKey(e => new { e.GrupoID, e.ObjetoID });
            Property(e => e.GrupoID).HasColumnName("ID_GRUPO").HasColumnType("int").IsRequired();
            Property(e => e.ObjetoID).HasColumnName("ID_OBJETO").HasColumnType("int").IsRequired();
        }
    }
}
