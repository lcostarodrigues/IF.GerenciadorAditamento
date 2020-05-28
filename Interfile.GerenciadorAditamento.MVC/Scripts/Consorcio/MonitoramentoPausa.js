

$(document).ready(function () {
    var baseUrl = $("#BaseURL").val();


    $("#btnRelatorioMonitoramento").click(function () {
        RelatorioMonitoramentoPausa();
    });

    $("#btnPesquisarMonitoramento").click(function () {
        if (ValidarConsulta()) {
            if (ValidarPeriodo()) {

                if ($("#txtMatricula").val() != "") {
                    VerificarMatricula();
                }
                DataTableMonitoramentoPausa();
            }
        }
    });

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

        if ($("#txtDataInicial").val() == "" &&
            $("#txtDataFinal").val() == "" &&
            $("#txtMatricula").val() == "" &&
            $("#txtTipoPausa").val() == "") {
                BMG.ShowAlert("Aviso", "Selecione um campo para consulta.");
                return false;
        }
        return true;
    }
    
    function DataTableMonitoramentoPausa() {
        
                var dataInicial = $("#txtDataInicial").val() != "" ? $("#txtDataInicial").val() : null;

                var dataFinal = $("#txtDataFinal").val() != "" ? $("#txtDataFinal").val() : null;

                var matricula = $("#txtMatricula").val() != "" ? $("#txtMatricula").val() : null;

                var tipoPausa = $("#txtTipoPausa").val() != "" ? $("#txtTipoPausa").val() : null;


                $.ajax({
                    url: baseUrl + '/MonitoramentoPausas/RetornaMonitoramentoPausa',
                    data: JSON.stringify({ 'dataInicial': dataInicial, 'dataFinal': dataFinal, 'matricula': matricula, 'tipoPausa': tipoPausa }),                //JSON.stringify({ 'mes': mes, 'ano': ano }),
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
                                dados[i].Operador,
                                dados[i].NomeOperador,
                                dados[i].DsPausa,
                                dados[i].DataPausaString,
                                dados[i].DataRetornoString,
                                dados[i].TempoPausa
                            ]


                            dataSet.push(data);
                        }
                        $(document).ready(function () {

                            $("#tbMonitoramentoPausa").html("");
                            var table = $('#tbMonitoramentoPausa').DataTable({
                                data: dataSet,
                                columns: [
                                    { title: "Matrícula" },
                                    { title: "Colaborador" },
                                    { title: "Tipo de Pausa" },
                                    { title: "Início" },
                                    { title: "Término" },
                                    { title: "Tempo de Pausa" },
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

    function RelatorioMonitoramentoPausa() {


            var dataInicial = $("#txtDataInicial").val() != "" ? $("#txtDataInicial").val() : null;

            var dataFinal = $("#txtDataFinal").val() != "" ? $("#txtDataFinal").val() : null;

            var matricula = $("#txtMatricula").val() != "" ? $("#txtMatricula").val() : null;

            var tipoPausa = $("#txtTipoPausa").val() != "" ? $("#txtTipoPausa").val() : null;


            $.ajax({
                url: baseUrl + '/MonitoramentoPausas/RetornaMonitoramentoPausa',
                data: JSON.stringify({ 'dataInicial': dataInicial, 'dataFinal': dataFinal, 'matricula': matricula, 'tipoPausa': tipoPausa }),                //JSON.stringify({ 'mes': mes, 'ano': ano }),
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
                            "Matrícula": dados[i].Operador,
                            "Colaborador": dados[i].NomeOperador,
                            "Tipo de Pausa": dados[i].DsPausa,
                            "Início": dados[i].DataPausaString,
                            "Término": dados[i].DataRetornoString,
                            "Tempo de Pausa": dados[i].TempoPausa
                        }


                        dataSet.push(data);
                    }
                    alasql('SELECT * INTO XLSX("RelatorioMonitoramentoPausa.xlsx", {headers: true}) FROM ?', [dataSet]);
                },
                error: function (xhr, textStatus, errorThrown) {
                    //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
                }
            });
        
    }

    function VerificarMatricula() {

        var matricula = $("#txtMatricula").val() != "" ? $("#txtMatricula").val() : null;
        

        $.ajax({
            url: baseUrl + '/MonitoramentoPausas/VerificarMatricula',
            data: JSON.stringify({'matricula': matricula}),                //JSON.stringify({ 'mes': mes, 'ano': ano }),
            headers: {
                'RequestVerificationToken': $('#antiForgeryToken').val(),
                'X-Requested-With': 'XMLHttpRequest'
            },
            type: "POST",
            dataType: 'json',
            contentType: 'application/json',
            cache: false,
            success: function (dados) {

                if (dados == false) {
                    BMG.ShowAlert("Aviso", "Matrícula informada não encontrada. Verifique.");
                }

            },
            error: function (xhr, textStatus, errorThrown) {
                //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
            }
        });

    }


    function DataTableMonitoramentoPausaAtual() {

        $.ajax({
            url: baseUrl + '/MonitoramentoPausas/RetornaMonitoramentoPausaAtual',
            data: JSON.stringify({}),                //JSON.stringify({ 'mes': mes, 'ano': ano }),
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
                        dados[i].Operador,
                        dados[i].NomeOperador,
                        dados[i].DsPausa,
                        dados[i].DataPausaString,
                        dados[i].DataRetornoString,
                        dados[i].TempoPausa
                    ]


                    dataSet.push(data);
                }
                $(document).ready(function () {

                    $("#tbMonitoramentoPausa").html("");
                    var table = $('#tbMonitoramentoPausa').DataTable({
                        data: dataSet,
                        columns: [
                            { title: "Matrícula" },
                            { title: "Colaborador" },
                            { title: "Tipo de Pausa" },
                            { title: "Início" },
                            { title: "Término" },
                            { title: "Tempo de Pausa" },
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

    DataTableMonitoramentoPausaAtual();
    //DataTableMonitoramentoPausa();
});

