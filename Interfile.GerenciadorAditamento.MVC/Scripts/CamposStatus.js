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

    var camposStatus = {
        IdCampoStatus: 0,
        NomeCampo: "",
        FlObrigatorio: false
    };

    function Salvar() {
        if (Validar()) {
            camposStatus.IdCampoStatus = 0;
            camposStatus.NomeCampo = $("#idNomeCampo").val();
            camposStatus.FlObrigatorio = parseInt($("#idFlAtivo").val());

            $.ajax({
                url: baseUrl + '/CamposStatus/Salvar',
                data: JSON.stringify({ 'campoStatus': camposStatus }),
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
                        DestroiTable('dtCamposStatus');
                        LimparDados();
                        CarregarCamposStatus();
                        isSalvo = false;
                        BMG.ShowAlert("Notificação", "Campos Status salvo com sucesso.");
                    }
                },
                error: function (xhr, textStatus, errorThrown) {
                    TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o Campos Status.");
                }
            });
        }
    }

    function Alterar() {
        if (Validar()) {
            camposStatus.NomeCampo = $("#idNomeCampo").val();
            camposStatus.FlObrigatorio = parseInt($("#idFlObrigatorio").val());

            $.ajax({
                url: baseUrl + '/CamposStatus/Alterar',
                data: JSON.stringify({ 'campoStatus': camposStatus }),
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
                        DestroiTable('dtCamposStatus');
                        LimparDados();
                        CarregarCamposStatus();
                        isSalvo = false;
                        BMG.ShowAlert("Notificação", "Campos Status atualizado com sucesso.");
                    }
                },
                error: function (xhr, textStatus, errorThrown) {
                    TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o campos status.");
                }
            });
        }
    }

    function Excluir() {
        $.ajax({
            url: baseUrl + '/CamposStatus/Excluir',
            data: JSON.stringify({ 'idCampoStatus': camposStatus.IdCampoStatus }),
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
                    DestroiTable('dtCamposStatus');
                    LimparDados();
                    CarregarCamposStatus();
                    isSalvo = false;
                    BMG.ShowAlert("Notificação", "Campo Status excluído com sucesso.");
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                TratarErro(xhr, textStatus, errorThrown, "Erro ao excluir o Campo Status.");
            }
        });
    }

    function Validar() {
        if ($("#idNomeCampo").val() == ""
            || $("#idFlObrigatorio").val() == ""
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

    function CarregarCamposStatus() {
        DestroiTable('dtCamposStatus');

        $('#dtCamposStatus').dataTable({
            "bServerSide": true,
            "bFilter": false,
            "sAjaxSource": baseUrl + "/CamposStatus/RetornarCamposStatus/",
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
                { "sName": "NomeCampo" },
                { "sName": "FlObrigatorio" },
                {
                    "mData": null,
                    "mRender": function (o) {
                        return '<div style="text-align: center;"><a href="#" class="glyphicon glyphicon-pencil"></a></div> ';
                    },
                    "orderable": false
                },
                //{
                //    "mData": null,
                //    "mRender": function (o) {
                //        return '<div style="text-align: center;"><a href="#" class="glyphicon glyphicon-remove"></a></div>';
                //    },
                //    "orderable": false
                //},
            ], "createdRow": function (row, data, index) {

                $($(row).children()[2]).on("click", function (e) {
                    isSalvo = true;
                    if ($(e.toElement).hasClass("glyphicon-pencil")) {
                        RetornarDados(data)
                    }
                })
                //$($(row).children()[3]).on("click", function (e) {
                //    isSalvo = false;
                //    if ($(e.toElement).hasClass("glyphicon-remove")) {
                //        BMG.ShowConfirm("Excluir", "Esta ação irá excluir o Campos Status.", function () {
                //            camposStatus.IdCampoStatus = parseInt(data[2]);
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
                "sSearch": "Buscar pelo Campo: ",
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
        camposStatus.IdCampoStatus = parseInt(obj[2]);
        $("#idNomeCampo").val(obj[0]);
        $("#idFlObrigatorio")[0].selectedIndex = obj[1] == "Sim" ? 1 : 0;
    }

    function LimparDados() {
        isSalvo = false;

        camposStatus.IdCampoStatus = 0;
        $("#idNomeCampo").val("");
        $("#idFlObrigatorio")[0].selectedIndex = 0;
    }

    function CarregarDadosIniciais() {
        $.ajax({
            url: baseUrl + '/CamposStatus/CarregarDadosIniciais',
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
                var comboAtivo = document.getElementById("idFlObrigatorio");
                PreencherCombo(comboAtivo, dados.listSimNao)

                LimparDados();
            },
            error: function (xhr, textStatus, errorThrown) {
                TratarErro(xhr, textStatus, errorThrown, "Erro ao carregar os combos.");
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

    CarregarCamposStatus();
    CarregarDadosIniciais();
});