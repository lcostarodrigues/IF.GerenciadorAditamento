$(document).ready(function () {

    var baseUrl = $("#BaseURL").val();

    $("#btnPesquisaRelatorio").click(function () {

        if (ValidarConsulta()) {
            CarregarRelatorio();
        }
    });

    $("#btnExportarRelatorio").click(function () {
        if (ValidarConsulta()) {
            ExportarRelatorio();
        }
    });

    $("#txtTipoRelatorio").change(function () {
        var tipoRelatorio = $("#txtTipoRelatorio").val();

        if (tipoRelatorio == "1") {
            $("#divNumeroProcesso").prop("hidden", false);
        }
        else if (tipoRelatorio == "2") {
            $("#divNumeroProcesso").prop("hidden", true);
        }
        else if (tipoRelatorio == "3") {
            $("#divNumeroProcesso").prop("hidden", true);
        }

    });

    function DestroiTable(table) {
        if ($('#' + table).hasClass('dataTable')) {
            var tableGrupo = $('#' + table).DataTable();
            tableGrupo.destroy();
        }
    }

    function ValidarPeriodo() {

        if ($("#txtDataInicial").val() != "" || $("#txtDataFinal").val() != "") {
            if ($("#txtDataInicial").val() == "" || $("#txtDataFinal").val() == "") {
                BMG.ShowAlert("Aviso", "Para pesquisar pelo período preencha a data inicial e a data final.");
                return false;
            }
        }
        return true;
    }

    function ValidarConsulta() {

        if ($("#txtTipoRelatorio").val() == "") {
            BMG.ShowAlert("Aviso", "Selecione o relatório a ser consultado.");
            return false;
        }
        return true;
    }

    function ValidarConsultaProcesso() {

        if ($("#txtDataInicial").val() == "" &&
            $("#txtDataFinal").val() == "" &&
            $("#txtNumeroProcesso").val() == "") {
            BMG.ShowAlert("Aviso", "Informe um campo para consulta.");
            return false;
        }
        return true;
    }

    function ValidarConsultaPeriodo() {

        if ($("#txtDataInicial").val() == "" &&
            $("#txtDataFinal").val() == "") {
            BMG.ShowAlert("Aviso", "Informe um campo para consulta.");
            return false;
        }
        return true;
    }

    function CarregarRelatorio() {
        var tipoRelatorio = $("#txtTipoRelatorio").val();

        if (tipoRelatorio == "1") {

            //$("#txtNumeroProcesso").prop("hidden", false);

            if (ValidarConsultaProcesso()) {
                if (ValidarPeriodo()) {
                    DataTableRelatorioOcorrencias();
                }
            }


        }
        else if (tipoRelatorio == "2") {
            //$("#txtNumeroProcesso").prop("hidden", true);

            if (ValidarConsultaPeriodo()) {
                if (ValidarPeriodo()) {
                    DataTableRelatorioProcessosGerais();
                }
            }
        }
        else if (tipoRelatorio == "3") {
            //$("#txtNumeroProcesso").prop("hidden", true);

            if (ValidarConsultaPeriodo()) {
                if (ValidarPeriodo()) {
                    DataTableRelatorioProdutividade();
                }
            }
        }
    }

    function ExportarRelatorio() {
        var tipoRelatorio = $("#txtTipoRelatorio").val();

        if (tipoRelatorio == "1") {
            //$("#txtNumeroProcesso").prop("hidden", false);
            if (ValidarConsultaProcesso()) {
                if (ValidarPeriodo()) {
                    ExportarRelatorioOcorrencias();
                }
            }
        }
        else if (tipoRelatorio == "2") {
            //$("#txtNumeroProcesso").prop("hidden", true);
            if (ValidarConsultaPeriodo()) {
                if (ValidarPeriodo()) {
                    ExportarRelatorioProcessosGerais();
                }
            }
        }
        else if (tipoRelatorio == "3") {
            //$("#txtNumeroProcesso").prop("hidden", true);
            if (ValidarConsultaPeriodo()) {
                if (ValidarPeriodo()) {
                    ExportarRelatorioProdutividade();
                }
            }
        }
    }


    function DataTableRelatorioOcorrencias() {

        DestroiTable('tbRelatorio');
        $("#tbRelatorio").html("");

        var dataInicial = $("#txtDataInicial").val() != "" ? $("#txtDataInicial").val() : null;

        var dataFinal = $("#txtDataFinal").val() != "" ? $("#txtDataFinal").val() : null;

        var numeroProcesso = $("#txtNumeroProcesso").val() != "" ? $("#txtNumeroProcesso").val() : null;

        $.ajax({
            url: baseUrl + '/ConsorcioRelatorio/RetornaRelatorioOcorrencias',
            data: JSON.stringify({ 'dataInicial': dataInicial, 'dataFinal': dataFinal, 'numeroProcesso': numeroProcesso }),                //JSON.stringify({ 'mes': mes, 'ano': ano }),
            headers: {
                'RequestVerificationToken': $('#antiForgeryToken').val(),
                'X-Requested-With': 'XMLHttpRequest'
            },
            type: "POST",
            dataType: 'json',
            contentType: 'application/json',
            cache: false,
            success: function (dados) {
                var chart;

                var dataSet = [];
                var data = [];
                for (var i = 0; i < dados.length; i++) {

                    data = [
                        dados[i].NumeroProcesso,
                        dados[i].Grupo,
                        dados[i].Cota,
                        dados[i].Requisitante,
                        dados[i].DataEntrada,
                        dados[i].Colaborador,
                        dados[i].UltimaAtividade,
                        dados[i].TempoAnalise,
                        dados[i].TipoOcorrencia,
                        dados[i].Motivo,
                        dados[i].Pendencia,
                        dados[i].Jutificativa,
                        dados[i].Observacao,
                    ]


                    dataSet.push(data);
                }
                $(document).ready(function () {
                    DestroiTable('tbRelatorio');
                    $("#tbRelatorio").html("");
                    var table = $('#tbRelatorio').DataTable({
                        data: dataSet,
                        columns: [
                            { title: "Nº Processo" },
                            { title: "Grupo" },
                            { title: "Cota" },
                            { title: "Requisitante" },
                            { title: "Data Entrada - FDI" },
                            { title: "Colaborador" },
                            { title: "Ultima Atividade" },
                            { title: "Tempo de Análise" },
                            { title: "Tipo de Ocorrência" },
                            { title: "Motivo" },
                            { title: "Pendência" },
                            { title: "Justificativa" },
                            { title: "Observação" },
                        ],
                        "bDestroy": true,
                        deferRender: true,
                        scroller: true,
                        "scrollX": true,
                        bSort: false,
                        "order": [[1, "asc"]],
                        "createdRow": function (row, data, index) {

                        }

                    });



                });
            },
            error: function (xhr, textStatus, errorThrown) {
                //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
            }
        });


    }

    function ExportarRelatorioOcorrencias() {

        var dataInicial = $("#txtDataInicial").val() != "" ? $("#txtDataInicial").val() : null;

        var dataFinal = $("#txtDataFinal").val() != "" ? $("#txtDataFinal").val() : null;

        var numeroProcesso = $("#txtNumeroProcesso").val() != "" ? $("#txtNumeroProcesso").val() : null;

        var tipoRelatorio = $("#txtTipoRelatorio").val() != "" ? $("#txtTipoRelatorio").val() : null;


        $.ajax({
            url: baseUrl + '/ConsorcioRelatorio/RetornaRelatorioOcorrencias',
            data: JSON.stringify({ 'dataInicial': dataInicial, 'dataFinal': dataFinal, 'numeroProcesso': numeroProcesso }),                //JSON.stringify({ 'mes': mes, 'ano': ano }),
            headers: {
                'RequestVerificationToken': $('#antiForgeryToken').val(),
                'X-Requested-With': 'XMLHttpRequest'
            },
            type: "POST",
            dataType: 'json',
            contentType: 'application/json',
            cache: false,
            success: function (dados) {
                var chart;

                var dataSet = [];
                var data = {};
                for (var i = 0; i < dados.length; i++) {

                    data = {
                        "Nº Processo": dados[i].NumeroProcesso,
                        "Grupo": dados[i].Grupo,
                        "Cota": dados[i].Cota,
                        "Requisitante": dados[i].Requisitante,
                        "Data Entrada - FDI": dados[i].DataEntrada,
                        "Colaborador": dados[i].Colaborador,
                        "Ultima Atividade": dados[i].UltimaAtividade,
                        "Tempo de Análise": dados[i].TempoAnalise,
                        "Tipo de Ocorrência": dados[i].TipoOcorrencia,
                        "Motivo": dados[i].Motivo,
                        "Pendência": dados[i].Pendencia,
                        "Justificativa": dados[i].Jutificativa,
                        "Observação": dados[i].Observacao,
                    }


                    dataSet.push(data);
                }
                alasql('SELECT * INTO XLSX("RelatorioOcorrencias.xlsx", {headers: true}) FROM ?', [dataSet]);
            },
            error: function (xhr, textStatus, errorThrown) {
                //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
            }
        });


    }


    function DataTableRelatorioProcessosGerais() {

        DestroiTable('tbRelatorio');
        $("#tbRelatorio").html("");

        var dataInicial = $("#txtDataInicial").val() != "" ? $("#txtDataInicial").val() : null;

        var dataFinal = $("#txtDataFinal").val() != "" ? $("#txtDataFinal").val() : null;

        var tipoRelatorio = $("#txtTipoRelatorio").val() != "" ? $("#txtTipoRelatorio").val() : null;


        $.ajax({
            url: baseUrl + '/ConsorcioRelatorio/RetornaRelatorioProcessosGerais',
            data: JSON.stringify({ 'dataInicial': dataInicial, 'dataFinal': dataFinal }),                //JSON.stringify({ 'mes': mes, 'ano': ano }),
            headers: {
                'RequestVerificationToken': $('#antiForgeryToken').val(),
                'X-Requested-With': 'XMLHttpRequest'
            },
            type: "POST",
            dataType: 'json',
            contentType: 'application/json',
            cache: false,
            success: function (dados) {
                var chart;

                var dataSet = [];
                var data = [];
                for (var i = 0; i < dados.length; i++) {

                    data = [
                        dados[i].NumeroProcesso,
                        dados[i].Grupo,
                        dados[i].Cota,
                        dados[i].Requisitante,
                        dados[i].DataEntrada,
                        dados[i].Colaborador,
                        dados[i].UltimaAtividade,
                        dados[i].TempoAnalise,
                        dados[i].NovaOuRegularizacao,
                        dados[i].Contingencia,
                    ]


                    dataSet.push(data);
                }
                $(document).ready(function () {
                    DestroiTable('tbRelatorio');
                    $("#tbRelatorio").html("");
                    var table = $('#tbRelatorio').DataTable({
                        data: dataSet,
                        columns: [
                            { title: "Nº Processo" },
                            { title: "Grupo" },
                            { title: "Cota" },
                            { title: "Requisitante" },
                            { title: "Data Entrada - FDI" },
                            { title: "Colaborador" },
                            { title: "Ultima Atividade" },
                            { title: "Tempo de Análise" },
                            { title: "Nova ou Regularização" },
                            { title: "Contingência" },
                        ],
                        "bDestroy": true,
                        deferRender: true,
                        scroller: true,
                        "scrollX": true,
                        bSort: false,
                        "order": [[1, "asc"]],
                        "createdRow": function (row, data, index) {

                        }

                    });



                });
            },
            error: function (xhr, textStatus, errorThrown) {
                //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
            }
        });


    }

    function ExportarRelatorioProcessosGerais() {

        var dataInicial = $("#txtDataInicial").val() != "" ? $("#txtDataInicial").val() : null;

        var dataFinal = $("#txtDataFinal").val() != "" ? $("#txtDataFinal").val() : null;

        var tipoRelatorio = $("#txtTipoRelatorio").val() != "" ? $("#txtTipoRelatorio").val() : null;


        $.ajax({
            url: baseUrl + '/ConsorcioRelatorio/RetornaRelatorioProcessosGerais',
            data: JSON.stringify({ 'dataInicial': dataInicial, 'dataFinal': dataFinal }),                //JSON.stringify({ 'mes': mes, 'ano': ano }),
            headers: {
                'RequestVerificationToken': $('#antiForgeryToken').val(),
                'X-Requested-With': 'XMLHttpRequest'
            },
            type: "POST",
            dataType: 'json',
            contentType: 'application/json',
            cache: false,
            success: function (dados) {
                var chart;

                var dataSet = [];
                var data = {};
                for (var i = 0; i < dados.length; i++) {

                    data = {
                        "Nº Processo": dados[i].NumeroProcesso,
                        "Grupo": dados[i].Grupo,
                        "Cota": dados[i].Cota,
                        "Requisitante": dados[i].Requisitante,
                        "Data Entrada - FDI": dados[i].DataEntrada,
                        "Colaborador": dados[i].Colaborador,
                        "Ultima Atividade": dados[i].UltimaAtividade,
                        "Tempo de Análise": dados[i].TempoAnalise,
                        "Nova ou Regularização": dados[i].NovaOuRegularizacao,
                        "Contingência": dados[i].Contingencia,
                    }


                    dataSet.push(data);
                }
                alasql('SELECT * INTO XLSX("RelatorioProcessosGerais.xlsx", {headers: true}) FROM ?', [dataSet]);

            },
            error: function (xhr, textStatus, errorThrown) {
                //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
            }
        });


    }


    function DataTableRelatorioProdutividade() {
        
        DestroiTable('tbRelatorio');
        $("#tbRelatorio").html("");

        var dataInicial = $("#txtDataInicial").val() != "" ? $("#txtDataInicial").val() : null;

        var dataFinal = $("#txtDataFinal").val() != "" ? $("#txtDataFinal").val() : null;

        var tipoRelatorio = $("#txtTipoRelatorio").val() != "" ? $("#txtTipoRelatorio").val() : null;


        $.ajax({
            url: baseUrl + '/ConsorcioRelatorio/RetornaRelatorioProdutividade',
            data: JSON.stringify({ 'dataInicial': dataInicial, 'dataFinal': dataFinal }),                //JSON.stringify({ 'mes': mes, 'ano': ano }),
            headers: {
                'RequestVerificationToken': $('#antiForgeryToken').val(),
                'X-Requested-With': 'XMLHttpRequest'
            },
            type: "POST",
            dataType: 'json',
            contentType: 'application/json',
            cache: false,
            success: function (dados) {
                var chart;

                var dataSet = [];
                var data = [];
                for (var i = 0; i < dados.length; i++) {

                    data = [
                        dados[i].Colaborador,
                        dados[i].Matricula,
                        dados[i].UltimaAtividade,
                        dados[i].TempoAnalise,
                        dados[i].DataInicioAnalise,
                    ]


                    dataSet.push(data);
                }
                $(document).ready(function () {
                    DestroiTable('tbRelatorio');
                    $("#tbRelatorio").html("");
                    var table = $('#tbRelatorio').DataTable({
                        data: dataSet,
                        columns: [
                            { title: "Colaborador" },
                            { title: "Matrícula" },
                            { title: "Atividades" },
                            { title: "Tempo de Análise" },
                            { title: "Data da Análise" },
                        ],
                        "bDestroy": true,
                        deferRender: true,
                        scroller: true,
                        "scrollX": true,
                        bSort: false,
                        "order": [[1, "asc"]],
                        "createdRow": function (row, data, index) {

                        }

                    });



                });
            },
            error: function (xhr, textStatus, errorThrown) {
                //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
            }
        });


    }

    function ExportarRelatorioProdutividade() {

        var dataInicial = $("#txtDataInicial").val() != "" ? $("#txtDataInicial").val() : null;

        var dataFinal = $("#txtDataFinal").val() != "" ? $("#txtDataFinal").val() : null;

        var tipoRelatorio = $("#txtTipoRelatorio").val() != "" ? $("#txtTipoRelatorio").val() : null;


        $.ajax({
            url: baseUrl + '/ConsorcioRelatorio/RetornaRelatorioProdutividade',
            data: JSON.stringify({ 'dataInicial': dataInicial, 'dataFinal': dataFinal }),                //JSON.stringify({ 'mes': mes, 'ano': ano }),
            headers: {
                'RequestVerificationToken': $('#antiForgeryToken').val(),
                'X-Requested-With': 'XMLHttpRequest'
            },
            type: "POST",
            dataType: 'json',
            contentType: 'application/json',
            cache: false,
            success: function (dados) {
                var chart;

                var dataSet = [];
                var data = {};
                for (var i = 0; i < dados.length; i++) {

                    data = {
                        "Colaborador": dados[i].Colaborador,
                        "Matrícula": dados[i].Matricula,
                        "Atividades": dados[i].UltimaAtividade,
                        "Tempo de Análise": dados[i].TempoAnalise,
                        "Data da Análise": dados[i].DataInicioAnalise,
                    }

                    dataSet.push(data);
                }
                alasql('SELECT * INTO XLSX("RelatorioProdutividade.xlsx", {headers: true}) FROM ?', [dataSet]);

            },
            error: function (xhr, textStatus, errorThrown) {
                //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
            }
        });


    }

});