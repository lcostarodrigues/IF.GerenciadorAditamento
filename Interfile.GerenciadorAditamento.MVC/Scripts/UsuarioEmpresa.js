﻿$(document).ready(function () {

    var baseUrl = $("#BaseURL").val();

    $("#salvarId").click(function () {
        if (isSalvo) {
            Alterar();
        } else {
            Salvar();
        }
    });

    $("#limparId").click(function () {
        LimparDados();
    });

    var isSalvo = false;

    var usuarioEmpresa = {
        IdUsuarioEmpresa: 0,
        NomeEmpresa: "",
        NameConnectionStringEmpresa: "",
        ServerEmpresa: "",
        PortEmpresa: "",
        UserIdBancoEmpresa: "",
        PasswordBancoEmpresa: "",
        DatabaseEmpresa: ""
    };

    function Salvar() {
        if (Validar()) {
            usuarioEmpresa.IdUsuarioEmpresa = 0;
            usuarioEmpresa.NomeEmpresa = $("#idNomeEmpresa").val();
            usuarioEmpresa.NameConnectionStringEmpresa = $("#idNameConnectionStringEmpresa").val();
            usuarioEmpresa.ServerEmpresa = $("#idServerEmpresa").val();
            usuarioEmpresa.PortEmpresa = $("#idPortEmpresa").val();
            usuarioEmpresa.UserIdBancoEmpresa = $("#idUserIdBancoEmpresa").val();
            usuarioEmpresa.PasswordBancoEmpresa = $("#idPasswordBancoEmpresa").val();
            usuarioEmpresa.DatabaseEmpresa = $("#idDatabaseEmpresa").val();


            $.ajax({
                url: baseUrl + '/UsuarioEmpresa/Salvar',
                data: JSON.stringify({ 'usuarioEmpresa': usuarioEmpresa }),
                headers: {
                    'RequestVerificationToken': $('#antiForgeryToken').val(),
                    'X-Requested-With': 'XMLHttpRequest'
                },
                type: "POST",
                dataType: 'json',
                contentType: 'application/json',
                cache: false,
                success: function (dados) {
                    if (dados.Erro != undefined) {
                        BMG.ShowAlert("Alerta", dados.Erro);
                    } else {
                        DestroiTable('dtEmpresa');
                        LimparDados();
                        CarregarEmpresas();
                        isSalvo = false;
                        BMG.ShowAlert("Notificação", "Empresa salva com sucesso.");
                    }
                },
                error: function (xhr, textStatus, errorThrown) {
                    TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o empresa.");
                }
            });
        }
    }

    function Alterar() {
        if (Validar()) {
            usuarioEmpresa.NomeEmpresa = $("#idNomeEmpresa").val();
            usuarioEmpresa.NameConnectionStringEmpresa = $("#idNameConnectionStringEmpresa").val();
            usuarioEmpresa.ServerEmpresa = $("#idServerEmpresa").val();
            usuarioEmpresa.PortEmpresa = $("#idPortEmpresa").val();
            usuarioEmpresa.UserIdBancoEmpresa = $("#idUserIdBancoEmpresa").val();
            usuarioEmpresa.PasswordBancoEmpresa = $("#idPasswordBancoEmpresa").val();
            usuarioEmpresa.DatabaseEmpresa = $("#idDatabaseEmpresa").val();


            $.ajax({
                url: baseUrl + '/UsuarioEmpresa/Alterar',
                data: JSON.stringify({ 'usuarioEmpresa': usuarioEmpresa }),
                headers: {
                    'RequestVerificationToken': $('#antiForgeryToken').val(),
                    'X-Requested-With': 'XMLHttpRequest'
                },
                type: "POST",
                dataType: 'json',
                contentType: 'application/json',
                cache: false,
                success: function (dados) {
                    if (dados.Erro != undefined) {
                        BMG.ShowAlert("Alerta", dados.Erro);
                    } else {
                        DestroiTable('dtEmpresa');
                        LimparDados();
                        CarregarEmpresas();
                        isSalvo = false;
                        BMG.ShowAlert("Notificação", "Empresa atualizada com sucesso.");
                    }
                },
                error: function (xhr, textStatus, errorThrown) {
                    TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o empresa.");
                }
            });
        }
    }

    function Excluir() {
        $.ajax({
            url: baseUrl + '/UsuarioEmpresa/Excluir',
            data: JSON.stringify({ 'IdUsuarioEmpresa': usuarioEmpresa.IdUsuarioEmpresa }),
            headers: {
                'RequestVerificationToken': $('#antiForgeryToken').val(),
                'X-Requested-With': 'XMLHttpRequest'
            },
            type: "POST",
            dataType: 'json',
            contentType: 'application/json',
            cache: false,
            success: function (dados) {
                if (dados.Erro != undefined) {
                    BMG.ShowAlert("Alerta", dados.Erro);
                } else {
                    DestroiTable('dtEmpresa');
                    LimparDados();
                    CarregarEmpresas();
                    isSalvo = false;
                    BMG.ShowAlert("Notificação", "Empresa excluída com sucesso.");
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                TratarErro(xhr, textStatus, errorThrown, "Erro ao excluir empresa.");
            }
        });
    }

    function Validar() {
        if ($("#idNomeEmpresa").val() == ""
            || $("#idNameConnectionStringEmpresa").val() == ""
            || $("#idServerEmpresa").val() == ""
            || $("#idPortEmpresa").val() == ""
            || $("#idUserIdBancoEmpresa").val() == ""
            || $("#idPasswordBancoEmpresa").val() == ""
            || $("#idDatabaseEmpresa").val() == ""
        ) {
            BMG.ShowAlert("Aviso", "Preencha os campos corretamente.");
            return false;
        }
        return true;
    }

    function DestroiTable(table) {
        if ($('#' + table).hasClass('dataTable')) {
            var tableGrupo = $('#' + table).DataTable();
            tableGrupo.destroy();
        }
    }

    function CarregarEmpresas() {
        DestroiTable('dtEmpresa');

        $('#dtEmpresa').dataTable({
            "bServerSide": true,
            "bFilter": false,
            "sAjaxSource": baseUrl + "/UsuarioEmpresa/RetornarEmpresas/",
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
                { "sName": "NomeEmpresa" },
                { "sName": "NameConnectionStringEmpresa" },
                { "sName": "ServerEmpresa" },
                { "sName": "PortEmpresa" },
                { "sName": "UserIdBancoEmpresa" },
                { "sName": "PasswordBancoEmpresa" },
                { "sName": "DatabaseEmpresa" },
                {
                    "mData": null,
                    "mRender": function (o) {
                        return '<div style="text-align: center;"><a href="#" class="glyphicon glyphicon-pencil"></a></div> ';
                    },
                    "orderable": false
                },
                {
                    "mData": null,
                    "mRender": function (o) {
                        return '<div style="text-align: center;"><a href="#" class="glyphicon glyphicon-remove"></a></div>';
                    },
                    "orderable": false
                },
            ], "createdRow": function (row, data, index) {

                $($(row).children()[7]).on("click", function (e) {
                    isSalvo = true;
                    if ($(e.toElement).hasClass("glyphicon-pencil")) {
                        RetornarDados(data)
                    }
                })
                $($(row).children()[8]).on("click", function (e) {
                    isSalvo = false;
                    if ($(e.toElement).hasClass("glyphicon-remove")) {
                        BMG.ShowConfirm("Excluir", "Esta ação irá excluir a empresa.", function () {
                            usuarioEmpresa.IdUsuarioEmpresa = parseInt(data[9]);
                            Excluir();
                        })
                    }
                })
            },
            "oLanguage": {
                "sProcessing": "Processando...",
                "sLengthMenu": "Mostrar _MENU_ registros",
                "sZeroRecords": "Não foram encontrados resultados",
                "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
                "sInfoEmpty": "Mostrando de 0 até 0 de 0 registros",
                "sInfoFiltered": "(filtrado de _MAX_ registros no total)",
                "sInfoPostFix": "",
                "sSearch": "Buscar pela empresa: ",
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

    function RetornarDados(obj) {
        usuarioEmpresa.IdUsuarioEmpresa = parseInt(obj[9]);
        $("#idNomeEmpresa").val(obj[0]);
        $("#idNameConnectionStringEmpresa").val(obj[1]);
        $("#idServerEmpresa").val(obj[2]);
        $("#idPortEmpresa").val(obj[3]);
        $("#idUserIdBancoEmpresa").val(obj[4]);
        $("#idPasswordBancoEmpresa").val(obj[5]);
        $("#idDatabaseEmpresa").val(obj[6]);
    }

    function LimparDados() {
        isSalvo = false;

        usuarioEmpresa.IdUsuarioEmpresa = 0;
        $("#idNomeEmpresa").val("");
        $("#idNameConnectionStringEmpresa").val("");
        $("#idServerEmpresa").val("");
        $("#idPortEmpresa").val("");
        $("#idUserIdBancoEmpresa").val("");
        $("#idPasswordBancoEmpresa").val("");
        $("#idDatabaseEmpresa").val("");
    }

    function CarregarDadosIniciais() {
        $.ajax({
            url: baseUrl + '/UsuarioEmpresa/CarregarDadosIniciais',
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
                var comboGrupo = document.getElementById("IdGrupo");
                for (var i = 0; i < dados.listGrupo.length; i++) {
                    var opt = document.createElement("option");
                    opt.value = dados.listGrupo[i].GrupoID;
                    opt.text = dados.listGrupo[i].Descricao;
                    comboGrupo.add(opt, comboGrupo.options[0]);
                }

                //Combo Ativo
                var comboPercentualAditivo = document.getElementById("idFlAtivo");
                for (var i = 0; i < dados.listSimNao.length; i++) {
                    var opt = document.createElement("option");
                    opt.value = dados.listSimNao[i][0];
                    opt.text = dados.listSimNao[i][1];
                    comboPercentualAditivo.add(opt, comboPercentualAditivo.options[0]);
                }

                LimparDados();
            },
            error: function (xhr, textStatus, errorThrown) {
                TratarErro(xhr, textStatus, errorThrown, "Erro ao carregar o usuário.");
            }
        });
    }

    function TratarErro(xhr, textStatus, errorThrown, msg) {
        var erro = "";
        try {
            if (xhr.responseText != undefined && xhr.responseText.split("<title>").length > 1 && xhr.responseText.split("<title>")[1].split("</title>").length > 0)
                erro = xhr.responseText.split("<title>")[1].split("</title>")[0];
            else if (arguments[2] == "timeout")
                erro = "Timeout: A conexão excedeu o tempo limite.";

            BMG.ShowAlert("Erro", erro);
        } catch (ex) {
            BMG.ShowAlert("Erro", msg);
        }
    }

    CarregarEmpresas();
    //CarregarDadosIniciais();
});