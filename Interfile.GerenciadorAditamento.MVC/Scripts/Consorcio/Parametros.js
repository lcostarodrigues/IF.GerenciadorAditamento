$(document).ready(function ($) {

    var baseUrl = $("#BaseURL").val();

    $("#rbJustificativaTarefaSla").click(function () {
        CarregarParametrizacao();
        CarregarDataTable();
        
    });

    $("#rbJustificativaFalhaSistemica").click(function () {
        CarregarParametrizacao();
        CarregarDataTable();
    });

    $("#rbJustificativaFalhaSla").click(function () {
        CarregarParametrizacao();
        CarregarDataTable();
    });

    function CarregarParametrizacao() {
    
        var rbJustificativaTarefaSla = $("#rbJustificativaTarefaSla").is(":checked");
        var rbJustificativaFalhaSistemica = $("#rbJustificativaFalhaSistemica").is(":checked");
        var rbJustificativaFalhaSla = $("#rbJustificativaFalhaSla").is(":checked");


        $("#divParametro").html("");

        if (rbJustificativaTarefaSla) {
            
            $("#divParametro").append(

                '<h3>SLA - Tarefas</h3>' +
                '' +
                '        <br />' +
                '        <form id="cadastro" onsubmit="return false;">' +
                '            <div class="row">' +
                '' +
                '                <div class="form-group col-md-3">' +
                '                    <label>Tarefa:</label>' +
                '                    <input id="txtTarefa" class="form-control" readonly />' +
                '                </div>' +
                '' +
                '                <div class="form-group col-md-3">' +
                '                    <label>SLA:</label>' +
                '                    <input type="time" id="txtTarefaSla" class="form-control" />' +
                '                </div>' +
                '            </div>' +
                '' +
                '            <div class="row" id="btns">' +
                '                <button id="btnLimparTarefaSla" class="btn btn-warning ">Limpar</button>' +
                '                <button id="btnSalvarTarefaSla" class="btn btn-warning ">Salvar</button>' +
                '            </div>' +
                '        </form>' +
                '        <div style="">' +
                '            <table id="tbTarefaSla" class="table table-striped table-hover" cellspacing="0">' +
                '                <thead>' +
                '                    <tr>' +
                '                        <th>Tarefa</th>' +
                '                        <th>SLA</th>' +
                '                        <th> </th>' +
                '                        <th> </th>' +
                '                    </tr>' +
                '                </thead>' +
                '            </table>' +
                '        </div>'
            );

            $("#btnSalvarTarefaSla").click(function () {
                SalvarTarefasSla();
            });

            $("#btnLimparTarefaSla").click(function () {
                LimparDadosTarefasSla();
            });
        }
        else if (rbJustificativaFalhaSistemica) {
            $("#divParametro").append(
                '<h3>Justificativas - Falha Sistêmica</h3>' +
                '        <br />' +
                '        <form id="cadastro" onsubmit="return false;">' +
                '            <div class="row">' +
                '                <div class="form-group col-md-3">' +
                '                    <label>Justificativa:</label>' +
                '                    <input id="txtJustificativaFalhaSistemica" class="form-control" />' +
                '                </div>' +
                '            </div>' +
                '' +
                '            <div class="row" id="btns">' +
                '                <button id="btnLimparJustificstivaFalhaSistemica" class="btn btn-warning ">Limpar</button>' +
                '                <button id="btnSalvarJustificstivaFalhaSistemica" class="btn btn-warning ">Salvar</button>' +
                '            </div>' +
                '        </form>' +
                '        <div style="">' +
                '            <table id="tbJustificstivaFalhaSistemica" class="table table-striped table-hover" cellspacing="0">' +
                '                <thead>' +
                '                    <tr>' +
                '                        <th>Tipo Falha</th>' +
                '                        <th>Descrição</th>' +
                '                        <th> </th>' +
                '                        <th> </th>' +
                '                    </tr>' +
                '                </thead>' +
                '' +
                '            </table>' +
                '        </div>'
            );


            $("#btnSalvarJustificstivaFalhaSistemica").click(function () {
                if (isSalvoJustificativaFalhaSistemica) {
                    AlterarJustificativaFalhaSistemica();
                } else {
                    SalvarJustificativaFalhaSistemica();
                }
            });

            $("#btnLimparJustificstivaFalhaSistemica").click(function () {
                LimparDadosJustificativaFalhaSistemica();
            });


        }
        else if (rbJustificativaFalhaSla) {
            $("#divParametro").append(
                '<h3>Justificativas - Falha SLA</h3>' +
                '        <br />' +
                '        <form id="cadastro" onsubmit="return false;">' +
                '            <div class="row">' +
                '                <div class="form-group col-md-3">' +
                '                    <label>Justificativa:</label>' +
                '                    <input id="txtJustificstivaSla" class="form-control" />' +
                '                </div>' +
                '            </div>' +
                '' +
                '            <div class="row" id="btns">' +
                '                <button id="btnLimparJustificstivaFalhaSla" class="btn btn-warning ">Limpar</button>' +
                '                <button id="btnSalvarJustificstivaFalhaSla" class="btn btn-warning ">Salvar</button>' +
                '            </div>' +
                '        </form>' +
                '        <div style="">' +
                '            <table id="tbJustificstivaFalhaSla" class="table table-striped table-hover" cellspacing="0">' +
                '                <thead>' +
                '                    <tr>' +
                '                        <th>Tipo Falha</th>' +
                '                        <th>Descrição</th>' +
                '                        <th> </th>' +
                '                        <th> </th>' +
                '                    </tr>' +
                '                </thead>' +
                '            </table>' +
                '        </div>'
            );


            $("#btnSalvarJustificstivaFalhaSla").click(function () {
                if (isSalvoJustificativaFalhaSla) {
                    AlterarJustificativaFalhaSla();
                } else {
                    SalvarJustificativaFalhaSla();
                }
            });

            $("#btnLimparJustificstivaFalhaSla").click(function () {
                LimparDadosJustificativaFalhaSla();
            });
        }

        
    }





    var isSalvoTarefasSla = false;

    var isSalvoJustificativaFalhaSistemica = false;

    var isSalvoJustificativaFalhaSla = false;

    var viewModelConsorcioTarefas = {
        IdConsorcioTarefas: 0,
        SlaTarefa: ""
    };

    var viewModelConsorcioJustificativaFalhaSistemica = {
        IdConsorcioJustificativa: 0,
        IdConsorcioTipoOcorrencia: 0,
        DsTipoOcorrencia: "",
        DsConsorcioJustificativa: ""
    };


    var viewModelConsorcioJustificativaSla = {
        IdConsorcioJustificativa: 0,
        IdConsorcioTipoOcorrencia: 0,
        DsTipoOcorrencia: "",
        DsConsorcioJustificativa: ""
    };


    function CarregarDataTable() {

        var rbJustificativaTarefaSla = $("#rbJustificativaTarefaSla").is(":checked");
        var rbJustificativaFalhaSistemica = $("#rbJustificativaFalhaSistemica").is(":checked");
        var rbJustificativaFalhaSla = $("#rbJustificativaFalhaSla").is(":checked");

        if (rbJustificativaTarefaSla)
        {

            DataTableTarefasSla();

        }
        else if (rbJustificativaFalhaSistemica)
        {
            DataTableJustificativaFalhaSistemica();
        }

        else if (rbJustificativaFalhaSla)
        {
            DataTableJustificativaFalhaSla();
        }

    }


    function LimparDadosTarefasSla() {
        isSalvoTarefasSla = false;

        viewModelConsorcioTarefas.IdConsorcioTarefas = 0;
        $("#txtTarefa").val("");
        $("#txtTarefaSla").val("");
    }

    function LimparDadosJustificativaFalhaSistemica() {
        isSalvoJustificativaFalhaSistemica = false;

        viewModelConsorcioJustificativaFalhaSistemica.IdConsorcioTarefas = 0;
        $("#txtJustificativaFalhaSistemica").val("");
    }

    function LimparDadosJustificativaFalhaSla() {
        isSalvoJustificativaFalhaSla = false;

        viewModelConsorcioJustificativaSla.IdConsorcioTarefas = 0;
        $("#txtJustificstivaSla").val("");
    }

    function RetornarDadosTarefasSla(obj) {
        viewModelConsorcioTarefas.IdConsorcioTarefas = parseInt(obj[2]);
        $("#txtTarefa").val(obj[0]);
        $("#txtTarefaSla").val(obj[1]);
    }

    function RetornarDadosJustificativaFalhaSistemica(obj) {
        viewModelConsorcioJustificativaFalhaSistemica.IdConsorcioJustificativa = parseInt(obj[3]);
        $("#txtJustificativaFalhaSistemica").val(obj[1]);
    }

    function RetornarDadosJustificativaFalhaSla(obj) {
        viewModelConsorcioJustificativaSla.IdConsorcioJustificativa = parseInt(obj[3]);
        $("#txtJustificstivaSla").val(obj[1]);
    }

    function DataTableTarefasSla() {
        DestroiTable('tbTarefaSla');

        $('#tbTarefaSla').dataTable({
            "bServerSide": true,
            "bFilter": false,
            "sAjaxSource": baseUrl + "/Parametros/RetornaTarefasSla/",
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
            "ordering": false,
            "paging": false,
            "aoColumns": [
                { "sName": "DsConsorcioTarefas" },
                { "sName": "SlaTarefa" },
                {
                    "mData": null,
                    "mRender": function (o) {
                        return '<div style="text-align: center;"><a href="#" class="glyphicon glyphicon-pencil"></a></div> ';
                    },
                    "orderable": false
                },
            ], "createdRow": function (row, data, index) {

                $($(row).children()[2]).on("click", function (e) {
                    isSalvoTarefasSla = true;
                    if ($(e.toElement).hasClass("glyphicon-pencil")) {
                        RetornarDadosTarefasSla(data)
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
                "sSearch": "Buscar pela Tarefa: ",
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

    function DataTableJustificativaFalhaSistemica() {
        DestroiTable('tbJustificstivaFalhaSistemica');

        $('#tbJustificstivaFalhaSistemica').dataTable({
            "bServerSide": true,
            "bFilter": false,
            "sAjaxSource": baseUrl + "/Parametros/RetornaJustificativaFalhaSistemica/",
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
            "ordering": false,
            "aoColumns": [
                { "sName": "DsConsorcioTipoOcorrencia" },
                { "sName": "DsConsorcioJustificativa" },
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

                $($(row).children()[2]).on("click", function (e) {
                    isSalvoJustificativaFalhaSistemica = true;
                    if ($(e.toElement).hasClass("glyphicon-pencil")) {
                        RetornarDadosJustificativaFalhaSistemica(data)
                    }
                })

                $($(row).children()[3]).on("click", function (e) {
                    isSalvoJustificativaFalhaSistemica = false;
                    if ($(e.toElement).hasClass("glyphicon-remove")) {
                        BMG.ShowConfirm("Excluir", "Deseja realmente excluir a justificativa?", function () {
                            viewModelConsorcioJustificativaFalhaSistemica.IdConsorcioJustificativa = parseInt(data[3]);
                            ExcluirJustificativaFalhaSistemica();
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
                "sSearch": "Buscar: ",
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

    function DataTableJustificativaFalhaSla() {
        DestroiTable('tbJustificstivaFalhaSla');

        $('#tbJustificstivaFalhaSla').dataTable({
            "bServerSide": true,
            "bFilter": false,
            "sAjaxSource": baseUrl + "/Parametros/RetornaJustificativaSla/",
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
            "ordering": false,
            "aoColumns": [
                { "sName": "DsConsorcioTipoOcorrencia" },
                { "sName": "DsConsorcioJustificativa" },
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

                $($(row).children()[2]).on("click", function (e) {
                    isSalvoJustificativaFalhaSla = true;
                    if ($(e.toElement).hasClass("glyphicon-pencil")) {
                        RetornarDadosJustificativaFalhaSla(data)
                    }
                })

                $($(row).children()[3]).on("click", function (e) {
                    isSalvoJustificativaFalhaSla = false;
                    if ($(e.toElement).hasClass("glyphicon-remove")) {
                        BMG.ShowConfirm("Excluir", "Deseja realmente excluir a justificativa?", function () {
                            viewModelConsorcioJustificativaSla.IdConsorcioJustificativa = parseInt(data[3]);
                            ExcluirJustificativaFalhaSla();
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
                "sSearch": "Buscar: ",
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

    function ValidarTarefaSla() {
        if ($("#txtTarefaSla").val() == "") {
            BMG.ShowAlert("Aviso", "Preencha o SLA.");
            return false;
        }
        return true;
    }

    function ValidarJustificativaFalhaSistemica() {
        if ($("#txtJustificativaFalhaSistemica").val() == "") {
            BMG.ShowAlert("Aviso", "Preencha a justificativa.");
            return false;
        }
        return true;
    }

    function ValidarJustificativaFalhaSla() {
        if ($("#txtJustificstivaSla").val() == "") {
            BMG.ShowAlert("Aviso", "Preencha a justificativa.");
            return false;
        }
        return true;
    }

    function SalvarTarefasSla() {
        if (ValidarTarefaSla()) {
            viewModelConsorcioTarefas.SlaTarefa = $("#txtTarefaSla").val();

            $.ajax({
                url: baseUrl + '/Parametros/SalvarTarefaSla',
                data: JSON.stringify({ 'viewModelConsorcioTarefas': viewModelConsorcioTarefas }),
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
                        DestroiTable('tbTarefaSla');
                        LimparDadosTarefasSla();
                        DataTableTarefasSla();
                        isSalvoTarefasSla = false;
                        BMG.ShowAlert("Notificação", "Meta da Fila " + $("#txtTarefa").val() +" atualizada com sucesso. ");
                    }
                },
                error: function (xhr, textStatus, errorThrown) {
                    TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o SLA.");
                }
            });
        }
    }

    function SalvarJustificativaFalhaSistemica() {
        if (ValidarJustificativaFalhaSistemica()) {
            viewModelConsorcioJustificativaFalhaSistemica.IdConsorcioJustificativa = 0;
            viewModelConsorcioJustificativaFalhaSistemica.DsConsorcioJustificativa = $("#txtJustificativaFalhaSistemica").val();

            $.ajax({
                url: baseUrl + '/Parametros/SalvarJustificativaFalhaSistemica',
                data: JSON.stringify({ 'viewModelConsorcioJustificativa': viewModelConsorcioJustificativaFalhaSistemica }),
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
                        DestroiTable('tbJustificstivaFalhaSistemica');
                        LimparDadosJustificativaFalhaSistemica();
                        DataTableJustificativaFalhaSistemica();
                        isSalvoJustificativaFalhaSistemica = false;
                        BMG.ShowAlert("Notificação", "Justificativa incluída com sucesso.");
                    }
                },
                error: function (xhr, textStatus, errorThrown) {
                    TratarErro(xhr, textStatus, errorThrown, "Erro ao atualizar a opção.");
                }
            });
        }
    }

    function SalvarJustificativaFalhaSla() {
        if (ValidarJustificativaFalhaSla()) {
            viewModelConsorcioJustificativaSla.IdConsorcioJustificativa = 0;
            viewModelConsorcioJustificativaSla.DsConsorcioJustificativa = $("#txtJustificstivaSla").val();

            $.ajax({
                url: baseUrl + '/Parametros/SalvarJustificativaSla',
                data: JSON.stringify({ 'viewModelConsorcioJustificativa': viewModelConsorcioJustificativaSla }),
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
                        DestroiTable('tbJustificstivaFalhaSla');
                        LimparDadosJustificativaFalhaSla();
                        DataTableJustificativaFalhaSla();
                        isSalvoJustificativaFalhaSla = false;
                        BMG.ShowAlert("Notificação", "Justificativa - SLA incluída com sucesso.");
                    }
                },
                error: function (xhr, textStatus, errorThrown) {
                    TratarErro(xhr, textStatus, errorThrown, "Erro ao atualizar a opção.");
                }
            });
        }
    }

    function ExcluirJustificativaFalhaSistemica() {
        $.ajax({
            url: baseUrl + '/Parametros/ExcluirJustificativaFalhaSistemica',
            data: JSON.stringify({ 'idJustificativa': viewModelConsorcioJustificativaFalhaSistemica.IdConsorcioJustificativa }),
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
                    DestroiTable('tbJustificstivaFalhaSistemica');
                    LimparDadosJustificativaFalhaSistemica();
                    DataTableJustificativaFalhaSistemica();
                    isSalvoJustificativaFalhaSistemica = false;
                    BMG.ShowAlert("Notificação", "Justificativa excluída com sucesso.");
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                TratarErro(xhr, textStatus, errorThrown, "Erro ao excluir a opção.");
            }
        });
    }

    function ExcluirJustificativaFalhaSla() {
        $.ajax({
            url: baseUrl + '/Parametros/ExcluirJustificativaSla',
            data: JSON.stringify({ 'idJustificativa': viewModelConsorcioJustificativaSla.IdConsorcioJustificativa }),
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
                    DestroiTable('tbJustificstivaFalhaSla');
                    LimparDadosJustificativaFalhaSla();
                    DataTableJustificativaFalhaSla();
                    isSalvoJustificativaFalhaSla = false;
                    BMG.ShowAlert("Notificação", "Justificativa excluída com sucesso.");
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                TratarErro(xhr, textStatus, errorThrown, "Erro ao excluir a opção.");
            }
        });
    }

    function AlterarJustificativaFalhaSistemica() {
        if (ValidarJustificativaFalhaSistemica()) {
            viewModelConsorcioJustificativaFalhaSistemica.DsConsorcioJustificativa = $("#txtJustificativaFalhaSistemica").val();

            $.ajax({
                url: baseUrl + '/Parametros/AlterarJustificativaFalhaSistemica',
                data: JSON.stringify({ 'viewModelConsorcioJustificativa': viewModelConsorcioJustificativaFalhaSistemica }),
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
                        DestroiTable('tbJustificstivaFalhaSistemica');
                        LimparDadosJustificativaFalhaSistemica();
                        DataTableJustificativaFalhaSistemica();
                        isSalvoJustificativaFalhaSistemica = false;
                        BMG.ShowAlert("Notificação", "Justificativa alterada com sucesso.");
                    }
                },
                error: function (xhr, textStatus, errorThrown) {
                    TratarErro(xhr, textStatus, errorThrown, "Erro ao atualizar a opção.");
                }
            });
        }
    }

    function AlterarJustificativaFalhaSla() {
        if (ValidarJustificativaFalhaSla()) {
            viewModelConsorcioJustificativaSla.DsConsorcioJustificativa = $("#txtJustificstivaSla").val();

            $.ajax({
                url: baseUrl + '/Parametros/AlterarJustificativaSla',
                data: JSON.stringify({ 'viewModelConsorcioJustificativa': viewModelConsorcioJustificativaSla }),
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
                        DestroiTable('tbJustificstivaFalhaSla');
                        LimparDadosJustificativaFalhaSla();
                        DataTableJustificativaFalhaSla();
                        isSalvoJustificativaFalhaSla = false;
                        BMG.ShowAlert("Notificação", "Justificativa alterada com sucesso.");
                    }
                },
                error: function (xhr, textStatus, errorThrown) {
                    TratarErro(xhr, textStatus, errorThrown, "Erro ao atualizar a opção.");
                }
            });
        }
    }

    function DestroiTable(table) {
        if ($('#' + table).hasClass('dataTable')) {
            var tableGrupo = $('#' + table).DataTable();
            tableGrupo.destroy();
        }
    }
    
    function CarregarDadosIniciais() {
        $.ajax({
            url: baseUrl + '/CadastroUsuario/CarregarDadosIniciais',
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

    //CarregarUsuarios();
    //CarregarDadosIniciais();

    CarregarParametrizacao();
    CarregarDataTable();

});