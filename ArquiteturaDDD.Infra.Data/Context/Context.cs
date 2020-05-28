using ArquiteturaDDD.Domain.Entities;
using System;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;

namespace ArquiteturaDDD.Infra.Data.Context
{
    public class Context : DbContext
    {
        public Context() : base("AditamentoConnection")
        {
            this.Configuration.LazyLoadingEnabled = false;
        }

        public DbSet<Grupo> Grupo { get; set; }
        public DbSet<GrupoObjeto> GrupoObjeto { get; set; }
        public DbSet<Objeto> Objeto { get; set; }
        public DbSet<Usuario> Usuario { get; set; }

        public DbSet<TipoDocumento> TipoDocumento { get; set; }
        public DbSet<TipoOperacao> TipoOperacao { get; set; }
        public DbSet<Etapas> Etapas { get; set; }
        public DbSet<Produto> Produto { get; set; }
        public DbSet<Operacao> Operacao { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            modelBuilder.Conventions.Remove<OneToManyCascadeDeleteConvention>();
            modelBuilder.Conventions.Remove<ManyToManyCascadeDeleteConvention>();

            modelBuilder.Configurations.Add(new EntityConfig.GrupoConfiguration());
            modelBuilder.Configurations.Add(new EntityConfig.GrupoObjetoConfiguration());
            modelBuilder.Configurations.Add(new EntityConfig.ObjetoConfiguration());
            modelBuilder.Configurations.Add(new EntityConfig.UsuarioConfiguration());

            modelBuilder.Configurations.Add(new EntityConfig.OperacaoConfiguration());
            modelBuilder.Configurations.Add(new EntityConfig.TipoOperacaoConfiguration());
            modelBuilder.Configurations.Add(new EntityConfig.TipoDocumentoConfiguration());
            modelBuilder.Configurations.Add(new EntityConfig.ProdutoConfiguration());
            modelBuilder.Configurations.Add(new EntityConfig.EtapasConfiguration());


            //modelBuilder.Entity<CalculoSimulacao>().HasKey<decimal>(k => k.Valor);
            //modelBuilder.Entity<Cliente>().Ignore(d => d.EhCliente);
            //modelBuilder.Entity<Cliente>().Ignore(d => d.EstaExposto);
            //modelBuilder.Entity<Cliente>().Ignore(d => d.EstaImpedido);
            //modelBuilder.Entity<ClienteDadosBancarios>().Ignore(d => d.NumeroBanco);
            //modelBuilder.Entity<Simulacao>().Ignore(d => d.DataInclusao);
        }

        public override int SaveChanges()
        {
            foreach (var entry in ChangeTracker.Entries().Where(entry => entry.Entity.GetType().GetProperty("DataCadastro") != null))
            {
                if (entry.State == EntityState.Added)
                {
                    entry.Property("DataCadastro").CurrentValue = DateTime.Now;
                }

                if (entry.State == EntityState.Modified)
                {
                    entry.Property("DataCadastro").IsModified = false;
                }
            }

            return base.SaveChanges();
        }
    }
}
