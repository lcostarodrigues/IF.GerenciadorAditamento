using ArquiteturaDDD.Domain.Entities;
using System.Data.Entity.ModelConfiguration;

namespace ArquiteturaDDD.Infra.Data.EntityConfig
{
    public class UsuarioConfiguration : EntityTypeConfiguration<Usuario>
    {
        public UsuarioConfiguration()
        {
            ToTable("USUARIO");

            HasKey(u => u.IdUsuario);

            Property(u => u.IdUsuario).HasColumnName("ID_USUARIO").HasColumnType("INT").IsRequired();
            Property(u => u.NomeUsuario).HasColumnName("NOME_USUARIO").HasColumnType("NVARCHAR").HasMaxLength(200);
            Property(u => u.LoginUsuario).HasColumnName("LOGIN_USUARIO").HasColumnType("NVARCHAR").HasMaxLength(200);
            Property(u => u.EmailUsuario).HasColumnName("EMAIL_USUARIO").HasColumnType("NVARCHAR").HasMaxLength(100);
            Property(u => u.SenhaUsuario).HasColumnName("SENHA_USUARIO").HasColumnType("NVARCHAR").HasMaxLength(100);
            Property(u => u.IdGrupo).HasColumnName("ID_GRUPO").HasColumnType("INT");
            Property(u => u.FlAtivo).HasColumnName("FL_ATIVO").HasColumnType("BIT");
        }
    }
}
