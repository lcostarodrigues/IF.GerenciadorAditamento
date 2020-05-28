$(document).ready(function () {

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

    var grupo = {
        GrupoID: 0,
        Descricao: ""
    };

    function Salvar() {
        if (Validar()) {
            grupo.GrupoID = 0;
            grupo.Descricao = $("#idNome").val();

            $.ajax({
                url: baseUrl + '/Perfil/Salvar',
                data: JSON.stringify({ 'grupo': grupo }),
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
                        DestroiTable('dtPerfil');
                        LimparDados();
                        CarregarPerfil();
                        isSalvo = false;
                        BMG.ShowAlert("Notificação", "Perfil salvo com sucesso.");
                    }
                },
                error: function (xhr, textStatus, errorThrown) {
                    TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o perfil.");
                }
            });
        }
    }

    function Alterar() {
        if (Validar()) {
            grupo.Descricao = $("#idNome").val();

            $.ajax({
                url: baseUrl + '/Perfil/Alterar',
                data: JSON.stringify({ 'grupo': grupo }),
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
                        DestroiTable('dtPerfil');
                        LimparDados();
                        CarregarPerfil();
                        isSalvo = false;
                        BMG.ShowAlert("Notificação", "Perfil atualizado com sucesso.");
                    }
                },
                error: function (xhr, textStatus, errorThrown) {
                    TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o perfil.");
                }
            });
        }
    }

    function Excluir() {
        $.ajax({
            url: baseUrl + '/Perfil/Excluir',
            data: JSON.stringify({ 'grupoID': grupo.GrupoID }),
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
                    DestroiTable('dtPerfil');
                    LimparDados();
                    CarregarPerfil();
                    isSalvo = false;
                    BMG.ShowAlert("Notificação", "Perfil excluído com sucesso.");
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                TratarErro(xhr, textStatus, errorThrown, "Erro ao excluir o perfil.");
            }
        });
    }

    function Validar() {
        if ($("#idNome").val() == "") {
            BMG.ShowAlert("Aviso", "Preencha o campo corretamente.");
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

    function CarregarPerfil() {
        DestroiTable('dtPerfil');

        $('#dtPerfil').dataTable({
            "bServerSide": true,
            "bFilter": false,
            "sAjaxSource": baseUrl + "/Perfil/RetornarPerfil/",
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
                { "sName": "Descricao" },
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

                $($(row).children()[1]).on("click", function (e) {
                    isSalvo = true;
                    if ($(e.toElement).hasClass("glyphicon-pencil")) {
                        RetornarDados(data)
                    }
                })
                $($(row).children()[2]).on("click", function (e) {
                    isSalvo = false;
                    if ($(e.toElement).hasClass("glyphicon-remove")) {
                        BMG.ShowConfirm("Excluir", "Esta ação irá excluir o perfil.", function () {
                            grupo.GrupoID = parseInt(data[1]);
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
                "sSearch": "Buscar pelo perfil: ",
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
        grupo.GrupoID = parseInt(obj[1]);
        $("#idNome").val(obj[0]);
    }

    function LimparDados() {
        isSalvo = false;

        grupo.GrupoID = 0;
        $("#idNome").val("");
    }

    function CarregarDadosIniciais() {
        $.ajax({
            url: baseUrl + '/Perfil/CarregarDadosIniciais',
            headers: {
                'RequestVerificationToken': $('#antiForgeryToken').val(),
                'X-Requested-With': 'XMLHttpRequest'
            },
            type: "POST",
            dataType: 'json',
            contentType: 'application/json',
            cache: false,
            success: function (dados) {
                //Combo Ativo
                //var comboAtivo = document.getElementById("idFlPermissaoApp");
                //PreencherCombo(comboAtivo, dados.listSimNao)

                LimparDados();
            },
            error: function (xhr, textStatus, errorThrown) {
                TratarErro(xhr, textStatus, errorThrown, "Erro ao carregar os dados iniciais.");
            }
        });
    }

    function PreencherCombo(combo, lista) {
        for (var i = 0; i < lista.length; i++) {
            var opt = document.createElement("option");
            opt.value = lista[i][0];
            opt.text = lista[i][1];
            combo.add(opt, combo.options[0]);
        }
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

    CarregarPerfil();
    CarregarDadosIniciais();
});