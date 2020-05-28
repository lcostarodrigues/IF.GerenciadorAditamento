$(document).ready(function () {

    var baseUrl = $("#BaseURL").val();

    CarregarUsuarios();

    CarregarDadosIniciais();

    function DestroiTable(table) {
        if ($('#' + table).hasClass('dataTable')) {
            var tableGrupo = $('#' + table).DataTable();
            tableGrupo.destroy();
        }
    }

    function CarregarUsuarios() {
        DestroiTable('dtEtapas');

        $('#dtEtapas').dataTable({
            "bServerSide": true,
            "bFilter": false,
            "sAjaxSource": baseUrl + "/Etapas/RetornarDadosRecepcao/",
            "fnServerData": function (sSource, aoData, fnCallback, oSettings) {
                oSettings.jqXHR = $.ajax({
                    "dataType": 'json',
                    "type": "POST",
                    "url": sSource,
                    "data": aoData,
                    "success": fnCallback,
                    "headers": {
                        'RequestVerificationToken': $('#antiForgeryToken').val(),
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                });
            },
            "bProcessing": true,
            "searching": true,
            "aoColumns": [
                { "sName": "Data" },
                { "sName": "SEDEX" },
                { "sName": "Colaborador" },
                { "sName": "Contrato" },
                { "sName": "Tipo de Operação" },
                { "sName": "Tipo de Documento" },
                { "sName": "Produto" },
                //{
                //    "mData": null,
                //    "mRender": function (o) {
                //        return '<div style="text-align: center;"><a href="#" class="glyphicon glyphicon-pencil"></a></div>';
                //    },
                //    "orderable": false
                //},
                //{
                //    "mData": null,
                //    "mRender": function (o) {
                //        return '<div style="text-align: center;"><a href="#" class="glyphicon glyphicon-remove"></a></div>';
                //    },
                //    "orderable": false
                //},
            ], "createdRow": function (row, data, index) {
                //$($(row).children()[3]).on("click", function (e) {
                //    isSalvo = true;
                //    'if ($(e.toElement).hasClass("glyphicon glyphicon-pencil")) {'
                //    if ($(e.originalEvent.target).hasClass("glyphicon-pencil")) {
                //        RetornarDados(data)
                //    }
                //})
                //$($(row).children()[4]).on("click", function (e) {
                //    isSalvo = false;
                //    'if ($(e.toElement).hasClass("glyphicon-remove")) {'
                //    if ($(e.originalEvent.target).hasClass("glyphicon-remove")) {
                //        BMG.ShowConfirm("Excluir", "Esta ação irá excluir o usuário.", function () {
                //            usuario.IdUsuario = parseInt(data[6]);
                //            Excluir();
                //        })
                //    }
                //})
            },
            "oLanguage": {
                "sProcessing": "Processando...",
                "sLengthMenu": "Mostrar _MENU_ registros",
                "sZeroRecords": "Não foram encontrados resultados",
                "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
                "sInfoEmpty": "Mostrando de 0 até 0 de 0 registros",
                "sInfoFiltered": "(filtrado de _MAX_ registros no total)",
                "sInfoPostFix": "",
                //"sSearch": "Buscar: ",
                "sUrl": "",
                "oPaginate": {
                    "sNext": "Próximo",
                    "sPrevious": "Anterior",
                    "sFirst": "Primeiro",
                    "sLast": "Último"
                }
            }
        });
    }

    function CarregarDadosIniciais() {
        $.ajax({
            url: baseUrl + '/Etapas/RetornarDadosIniciais',
            headers: {
                'RequestVerificationToken': $('#antiForgeryToken').val(),
                'X-Requested-With': 'XMLHttpRequest'
            },
            type: "POST",
            dataType: 'json',
            contentType: 'application/json',
            cache: false,
            success: function (dados) {
                //Combo Grupo
                if ($("#idTipoOperacao").find('option').length <= 0) {
                    var cbOperacao = document.getElementById("idTipoOperacao");
                    for (var i = 0; i < dados.listTipoOperacao.length; i++) {
                        var opt = document.createElement("option");
                        opt.value = dados.listTipoOperacao[i].CodigoOperacao;
                        opt.text = dados.listTipoOperacao[i].Documento;
                        cbOperacao.add(opt, cbOperacao.options[0]);
                    }
                }

                if ($("#idTipoDocumento").find('option').length <= 0) {
                    var cbTipoDocumento = document.getElementById("idTipoDocumento");
                    for (var i = 0; i < dados.listTipoDocumento.length; i++) {
                        var opt = document.createElement("option");
                        opt.value = dados.listTipoDocumento[i].CodigoDocumento;
                        opt.text = dados.listTipoDocumento[i].Documento;
                        cbTipoDocumento.add(opt, cbTipoDocumento.options[0]);
                    }
                }

                if ($("#idProduto").find('option').length <= 0) {
                    var cbProduto = document.getElementById("idProduto");
                    for (var i = 0; i < dados.listProduto.length; i++) {
                        var opt = document.createElement("option");
                        opt.value = dados.listProduto[i].CodigoProduto;
                        opt.text = dados.listProduto[i].Descricao;
                        cbProduto.add(opt, cbProduto.options[0]);
                    }
                }

                //listGrupoObjetoBase = dados.listGrupoObjeto;
                //listObjeto = dados.listObjeto;

                //if ($('#dtPerfilTela').find('tr').length <= 1) {
                //    CarregarPerfilTela();
                //}

                //PreencherPerfilTela();

                //$("#idGrupo").change(function () {
                //    PreencherPerfilTela();
                //});
            },
            error: function (xhr, textStatus, errorThrown) {
                TratarErro(xhr, textStatus, errorThrown, "Erro ao carregar o perfil por tela.");
            }
        });
    }

    function LimparModalNovoProcesso() {
        $('#txtSedex_AR').val('');
        $('#txtColaborador').val('');
        $('#frmNovoProcesso').val('');

        $('#frmNovoProcesso').val('0');
        $('#frmNovoProcesso').val('0');
        $('#frmNovoProcesso').val('0');
    }

    $('#btnNovoProcesso').on('click', function () {
        $('#hddnDataHora').val(new Date().toLocaleString());
        $('#modalNovoProcesso').modal('show');
    });

    $('#dtEtapas tbody').on('dblclick', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            $(this).addClass('selected');
        }
        $('#modalNovoProcesso').modal('show');
    });

    $('#modalNovoProcesso').on("hidden.bs.modal", function () {
        $('#dtEtapas').DataTable().$('tr.selected').removeClass('selected');
        $('#hddnDataHora').val('');
    });

    //$('#btnAlterarSenha').on('click', function())

    function AlterarSenha() {
        $.ajax({
            url: baseUrl + '/Etapas/Atualizar',
            data: JSON.stringify({ 'novaSenha': $("#txtNovaSenha").val() }),
            headers: {
                'RequestVerificationToken': $('#antiForgeryToken').val(),
                'X-Requested-With': 'XMLHttpRequest'
            },
            type: "POST",
            dataType: 'json',
            contentType: 'application/json',
            cache: false,
            success: function (dados) {
                BMG.ShowAlert("Senha", "Senha alterada com sucesso.");

                //$("#txtSenhaAtual").val("");

                $("#modalAlterarSenha").modal('toggle');
                $("#txtNovaSenha").val("");
                $("#txtConfirmarSenha").val("");
            },
            error: function (xhr, textStatus, errorThrown) {
                TratarErro(xhr, textStatus, errorThrown, "Erro ao alterar a senha.");
            }
        });
    }    
});