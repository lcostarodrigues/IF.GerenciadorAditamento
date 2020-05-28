$(document).ready(function () {

    var baseUrl = $("#BaseURL").val();

    $("#btnFiltrarHistorico").click(function () {

        if ($("#idNumeroProcesso").val() == "") {
            BMG.ShowAlert("Alerta", "O campo Nº do Processo não foi preenchido. Verifique.");
        }
        else {
            DataTableHistoricoPorProcesso($("#idNumeroProcesso").val());
        }
    });
    
    function DataTableHistoricoPorProcesso(numeroProcesso) {
        $.ajax({
            url: baseUrl + '/ConsorcioHistoricoFila/RetornaDadosHistoricoPorProcesso',
            data: JSON.stringify({ 'numeroProcesso': numeroProcesso }),                //JSON.stringify({ 'mes': mes, 'ano': ano }),
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
                }
                else {

                    //localStorage.IdProcessoLinha = dados[0].IdConsorcioProposta;
                    //localStorage.NumeroProcessoFila = dados[0].NumeroProcesso;

                    var chart;

                    var dataSet = [];
                    var data = [];
                    for (var i = 0; i < dados.length; i++) {

                        data = [
                            dados[i].NumeroProcesso,
                            dados[i].Grupo,
                            dados[i].Cota,
                            dados[i].Requisante,
                            dados[i].DataEntrada,
                            dados[i].Fila,
                            dados[i].Operador,
                            dados[i].DataInicioAnalise,
                            dados[i].TempoTotalAnalise
                        ]


                        dataSet.push(data);
                    }
                    $(document).ready(function () {

                        $("#tbHistoricoFila").html("");
                        var table = $('#tbHistoricoFila').DataTable({
                            data: dataSet,
                            columns: [
                                { title: "Nº Processo" },
                                { title: "Grupo" },
                                { title: "Cota" },
                                { title: "Requisitante" },
                                { title: "Data de Entrada - Consórcio" },
                                { title: "Atividade" },
                                { title: "Colaborador" },
                                { title: "Início Tratamento" },
                                { title: "Tempo Análise" },

                            ],
                            "bDestroy": true,
                            "bFilter": false,
                            bSort: false,
                            //"lengthChange": false,
                            //bSort: false,
                            deferRender: true,
                            scroller: true,
                            "scrollX": true,
                            "order": [[1, "asc"]],
                            "createdRow": function (row, data, index) {

                            }

                        });


                    });

                }
            },
            error: function (xhr, textStatus, errorThrown) {
                //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
            }
        });
    }

    DataTableHistoricoPorProcesso("-1");
});