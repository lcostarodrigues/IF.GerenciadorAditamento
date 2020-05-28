using ArquiteturaDDD.Application;
using ArquiteturaDDD.Application.Interfaces;
using ArquiteturaDDD.Domain.Interfaces.Repositories;
using ArquiteturaDDD.Domain.Interfaces.Services;
using ArquiteturaDDD.Domain.Services;
using ArquiteturaDDD.Infra.Data.Repositories;
using SimpleInjector;
using System;

namespace ArquiteturaDDD.Infra.IOC.ContainerIOC
{
    public class SimpleInjectorContainer
    {
        public static Container _container;

        static SimpleInjectorContainer()
        {
            RegisterServices();
        }

        public static Container RegisterServices()
        {
            _container = new Container();

            _container.Register(typeof(IAppServiceBase<>), typeof(AppServiceBase<>));
            _container.Register<IGrupoAppService, GrupoAppService>();
            _container.Register<IGrupoObjetoAppService, GrupoObjetoAppService>();
            _container.Register<IObjetoAppService, ObjetoAppService>();
            _container.Register<IUsuarioAppService, UsuarioAppService>();
            _container.Register<IOperacaoAppService, OperacaoAppService>();
            _container.Register<IEtapasAppService, EtapasAppService>();
            _container.Register<ITipoDocumentoAppService, TipoDocumentoAppService>();
            _container.Register<ITipoOperacaoAppService, TipoOperacaoAppService>();
            _container.Register<IProdutoAppService, ProdutoAppService>();

            _container.Register(typeof(IServiceBase<>), typeof(ServiceBase<>));
            _container.Register<IGrupoService, GrupoService>();
            _container.Register<IGrupoObjetoService, GrupoObjetoService>();
            _container.Register<IObjetoService, ObjetoService>();
            _container.Register<IUsuarioService, UsuarioService>();
            _container.Register<IOperacaoService, OperacaoService>();
            _container.Register<IEtapasService, EtapasService>();
            _container.Register<ITipoDocumentoService, TipoDocumentoService>();
            _container.Register<ITipoOperacaoService, TipoOperacaoService>();
            _container.Register<IProdutoService, ProdutoService>();

            _container.Register(typeof(IRepositoryBase<>), typeof(RepositoryBase<>));
            _container.Register<IGrupoRepository, GrupoRepository>();
            _container.Register<IGrupoObjetoRepository, GrupoObjetoRepository>();
            _container.Register<IObjetoRepository, ObjetoRepository>();
            _container.Register<IOperacaoRepository, OperacaoRepository>();
            _container.Register<IUsuarioRepository, UsuarioRepository>();
            _container.Register<IEtapasRepository, EtapasRepository>();
            _container.Register<ITipoDocumentoRepository, TipoDocumentoRepository>();
            _container.Register<ITipoOperacaoRepository, TipoOperacaoRepository>();
            _container.Register<IProdutoRepository, ProdutoRepository>();

            return _container;
        }
    }
}
