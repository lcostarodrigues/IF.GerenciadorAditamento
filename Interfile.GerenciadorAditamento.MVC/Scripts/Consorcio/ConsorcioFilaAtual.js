$(document).ready(function () {

    var baseUrl = $("#BaseURL").val();

    var viewModelConsorcioPropostaOcorrencias = {
        IdConsorcioPropostaOcorrencias: 0,
        IdConsorcioProposta: 0,
        IdConsorcioTipoOcorrencia: 0,
        MotivoOcorrencia: "",
        PendenciaOcorrencia: ""
    }

    var processosSelecionados = [];

    var justificativasSelecionadas = [];

    $("#selectFilas").change(function () {
        DataTableFilaAtual();
    });

    $("#btnMoverProcesso").click(function () {
        BMG.ShowConfirm("Mover Fila", "Deseja realmente mover o processo " + localStorage.NumeroProcessoFila + " para Fila  " + $("#txtMoverTarefa option:selected").text() + " ?", function () {
            MoverProcessoFila();
        });
    });

    $("#btnPesquisarProcesso").click(function () {
        DataTableEmpurrarFilaPorProcesso();
    });

    $("#btnPesquisarProcessoHistorico").click(function () {
        DataTableHistoricoPorProcesso();
    });

    $("#btnEncaminharHistorico").click(function () {
        EncaminharHistorico();
        DataTableHistorico();
        $("#modalHistoricoProcesso").modal();
    });

    $("#btnEmpurrarFila").click(function () {
        EmpurrarFila();
        DataTableEmpurrarFila();
        $("#modalEmpurrarFila").modal();
    });

    $("#frmOcorrencia").submit(function () {
        
        $('input[name="chkJustificativa"]:checked').each(function () {
            justificativasSelecionadas.push(this.value);
            //alert(justificativasSelecionadas);
        });
        SalvarOcorrencia();
    });

    $("#btnAdicionarOcorrencia").click(function () {

        $('input[name="chkProcessos"]:checked').each(function () {
            processosSelecionados.push(this.value);
            //alert(justificativasSelecionadas);
        });

        if (processosSelecionados == "")
        {
            BMG.ShowAlert("Aviso","Selecione ao menos um processo para adicionar ocorrência.");
        }

        else
        {
            CarregarDadosProcesso();
            $("#modalOcorrencia").modal({ backdrop: 'static', keyboard: false });

        }

    });

    $("#btnDevolverFila").click(function () {

        $('input[name="chkProcessos"]:checked').each(function () {
            processosSelecionados.push(this.value);
            //alert(justificativasSelecionadas);
        });

        if (processosSelecionados == "") {
            BMG.ShowAlert("Aviso", "Selecione ao menos um processo para soltar fila.");
        }
        else
        {
            BMG.ShowConfirm("Análise", "Deseja realmente soltar o(s) processo(s) na fila?", function () {
                DevolverFila();
            });
        }
        
    });

    $("#txtTipoOcorrencia").change(function () {

        var tipoOcorrencia = $("#txtTipoOcorrencia").val();

        if (tipoOcorrencia == 1) {
            $("#divMotivo").show();
            $("#divObservacao").hide();
            $("#divPendencia").show();
            $("#divJustificativa").hide();
        }
        else if (tipoOcorrencia == 2 || tipoOcorrencia == 3)
        {
            $("#divMotivo").hide();
            $("#divObservacao").show();
            $("#divPendencia").hide();
            $("#divJustificativa").show();
            CarregarDadosJustificativa();
        }

    });

    $("#btnCancelarOcorrencia").click(function () {
        processosSelecionados = [];
        justificativasSelecionadas = [];
        $("#modalOcorrencia").modal('toggle');
    });


    function DestroiTable(table) {
        if ($('#' + table).hasClass('dataTable')) {
            var tableGrupo = $('#' + table).DataTable();
            tableGrupo.destroy();
        }
    }


    function DevolverFila() {
        $.ajax({
            url: baseUrl + '/ConsorcioFilaAtual/DevolverFila',
            data: JSON.stringify({ 'idProcessos': processosSelecionados }),                //JSON.stringify({ 'mes': mes, 'ano': ano }),
            headers: {
                'RequestVerificationToken': $('#antiForgeryToken').val(),
                'X-Requested-With': 'XMLHttpRequest'
            },
            type: "POST",
            dataType: 'json',
            contentType: 'application/json',
            cache: false,
            success: function (dados) {
                DataTableFilaAtual();
                BMG.ShowAlert("Fila Atual", "Processo(s) solto(s) na fila com sucesso.");
            },
            error: function (xhr, textStatus, errorThrown) {
                //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
            }
        });
    }

    function CarregarDadosProcesso() {
        $.ajax({
            url: baseUrl + '/ConsorcioFilaAtual/RetornaDadosProcesso',
            data: JSON.stringify({ 'idProcessos': processosSelecionados}),                //JSON.stringify({ 'mes': mes, 'ano': ano }),
            headers: {
                'RequestVerificationToken': $('#antiForgeryToken').val(),
                'X-Requested-With': 'XMLHttpRequest'
            },
            type: "POST",
            dataType: 'json',
            contentType: 'application/json',
            cache: false,
            success: function (dados) {
                $("#divProcessoOcorrencia").html("");
                for (var i = 0; i < dados.length; i++) {
                    
                    $("#divProcessoOcorrencia").append(

                        '<div class="col-md-4">' +
                        '<label>Processo:</label><label id="lbProcesso"> ' + dados[i].NumeroProcesso +'</label>' +
                        '</div>' +

                        '<div class="col-md-4">' +
                        '<label>Grupo:</label><label id="lbGrupo"> ' + dados[i].Grupo +'</label>' +
                        '</div>' +

                        '<div class="col-md-4">' +
                        '<label>Cota:</label><label id="lbCota"> ' + dados[i].Cota +'</label>' +
                        '</div>'
                    );
                }


                
                //$("#lbProcesso").text(dados.NumeroProcesso);
                //$("#lbGrupo").text(dados.Grupo);
                //$("#lbCota").text(dados.Cota);

            },
            error: function (xhr, textStatus, errorThrown) {
                //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
            }
        });
    }

    function SalvarOcorrencia() {

        viewModelConsorcioPropostaOcorrencias.IdConsorcioProposta = localStorage.IdProposta;
        viewModelConsorcioPropostaOcorrencias.IdConsorcioTipoOcorrencia = $("#txtTipoOcorrencia").val();
        viewModelConsorcioPropostaOcorrencias.MotivoOcorrencia = $("#txtMotivo").val();
        viewModelConsorcioPropostaOcorrencias.PendenciaOcorrencia = $("#txtPendencia").val();


        $.ajax({
            url: baseUrl + '/ConsorcioFilaAtual/SalvarOcorrencia',
            data: JSON.stringify({ 'viewModelConsorcioPropostaOcorrencias': viewModelConsorcioPropostaOcorrencias, 'justificativas': justificativasSelecionadas, 'idProcessos': processosSelecionados}),                 //JSON.stringify({ 'mes': mes, 'ano': ano }),
            headers: {
                'RequestVerificationToken': $('#antiForgeryToken').val(),
                'X-Requested-With': 'XMLHttpRequest'
            },
            type: "POST",
            dataType: 'json',
            contentType: 'application/json',
            cache: false,
            success: function (dados) {



                DataTableFilaAtual();
                processosSelecionados = [];
                justificativasSelecionadas = [];
                $("#modalOcorrencia").modal('toggle');
                BMG.ShowAlert("Ocorrência", "Ocorrência salva com sucesso.");


                
            },
            error: function (xhr, textStatus, errorThrown) {
                //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
            }
        });
    }

    function DataTableFilaAtual() {     

        DestroiTable("tbFilaAtual");

        var selectFilas = $("#selectFilas").val() !== null ? $("#selectFilas").val() : -1;
        
        $.ajax({
            url: baseUrl + '/ConsorcioFilaAtual/RetornaFilaAtual',
            data: JSON.stringify({ 'idConsorcioTarefa': selectFilas }),                //JSON.stringify({ 'mes': mes, 'ano': ano }),
            headers: {
                'RequestVerificationToken': $('#antiForgeryToken').val(),
                'X-Requested-With': 'XMLHttpRequest'
            },
            type: "POST",
            dataType: 'json',
            contentType: 'application/json',
            cache: false,
            success: function (dados) {


                $("#qtdProcessoEmAberto").html("");
                $("#qtdProcessoEmAnalise").html("");

                $("#qtdProcessoEmAberto").text(dados.qtdProcessoEmAberto);
                $("#qtdProcessoEmAnalise").text(dados.qtdProcessoEmAnalise);


                var chart;

                var dataSet = [];
                var data = [];
                for (var i = 0; i < dados.listConsorcioProposta.length; i++) {

                    data = [
                        dados.listConsorcioProposta[i].IdConsorcioProposta,
                        dados.listConsorcioProposta[i].NumeroProcesso,
                        dados.listConsorcioProposta[i].Grupo,
                        dados.listConsorcioProposta[i].Cota,
                        dados.listConsorcioProposta[i].Fila,
                        dados.listConsorcioProposta[i].DataEntrada,
                        dados.listConsorcioProposta[i].SlaMinutos,
                        dados.listConsorcioProposta[i].TempoAtualFila,
                        dados.listConsorcioProposta[i].Operador,
                        dados.listConsorcioProposta[i].DataInicioAnalise,
                        dados.listConsorcioProposta[i].Requisante,
                        1,
                        dados.listConsorcioProposta[i].FlProximoAoSla,
                        dados.listConsorcioProposta[i].FlUltrapassouSla
                    ]


                    dataSet.push(data);
                }
                $(document).ready(function () {

                    $("#tbFilaAtual").html("");
                    var table = $('#tbFilaAtual').DataTable({
                        data: dataSet,
                        "columnDefs": [
                            {
                                "targets": -14,
                                "data": null,
                                "defaultContent": '<input class="check-all-active" name=chkProcessos type=\"checkbox\" >'
                            },
                            {
                                "targets": -3,
                                "data": null,
                                "defaultContent": "<button type='button' class='btn btn-default' id='btnDesconsiderarFila' disabled><span class='glyphicon glyphicon-remove-sign'></span></button>"
                            },
                            {
                                type: 'date-uk',
                                aTargets: [5]
                            },
                            {
                                type: 'date-uk',
                                aTargets: [9]
                            }
                        ],
                        columns: [
                            { title: "Selecionar" },
                            { title: "Processo" },
                            { title: "Grupo" },
                            { title: "Cota" },
                            { title: "Atividade" },
                            { title: "Data SML "},
                            { title: "SLA" },
                            { title: "Fila" },
                            { title: "Colaborador" },
                            { title: "Início Tratamento" },
                            { title: "Canal" },
                            { title: "Desconsiderar da Fila" },
                            { title: "Próximo ao SLA" },
                            { title: "Ultrapassou o SLA" }
                            
                        ],
                        "bDestroy": true,
                        deferRender: true,
                        scroller: true,
                        "scrollX": true,
                        bSort: true,
                        "bPaginate": false,
                        "scrollCollapse": true,
                        "scrollY": "400px",
                        "order": [[5, "asc"]],
                        "createdRow": function (row, data, index) {

                           
                            
                            $($(row).children()[0]).on("click", function (e) {
                                var data = table.row($(this).parents('tr')).data();
                                //localStorage.IdProposta = data[0];

                            })

                            $(row).find(".check-all-active").val(data[0]);



                            $($(row)).on("dblclick", function (e) {

                                localStorage.IdProcessoLinha = data[0];
                                $("#modalEncamimhar").modal();
                            })
                            //alert(data[7]);

                            if (data[4] == "Contingência") {
                                //if (data[7] == "Pré-Análise") {
                                $(row).find("#btnDesconsiderarFila").prop("disabled", false);

                                $($(row).children()[11]).on("click", function (e) {

                                    DesconsiderarFila(data[0]);

                                })
                            } //td: eq(11)

                            //$(row).css("background-color", "#7CAFED"); //#227EEC

                            //var contagemSml = parseInt(data[7]) + 4;
                            //if (contagemSml >= data[6]) {
                            //    //if (data[7] == "Pré-Análise") {
                            //    $(row).css("background-color", "#3333ff"); //#d1e8ff
                            //} //td: eq(11)

                            var proximoAoSla = data[12];

                            var ultrapassouSla = data[13];

                            //alert(ultrapassouSla);

                            if (ultrapassouSla === true) {
                                $(row).css("background-color", "#7CAFED");
                            }
                            else if (proximoAoSla === true) {
                                $(row).css("background-color", "#d3e7ff");
                            }

                            //$(row).css("background-color", "#7CAFED");
                        }

                    });

                    table.column(12).visible(false);
                    table.column(13).visible(false);

                });
            },
            error: function (xhr, textStatus, errorThrown) {
                //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
            }
        });
    }

    function CarregarDadosIniciais() {
        $.ajax({
            url: baseUrl + '/ConsorcioFilaAtual/CarregarDadosIniciais',
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
                $('#txtTipoOcorrencia').html("");

                //$('#txtCadastradoFalha').html("");


                //Combo Tipo Ocorrência
                var comboTipoOcorrencia = document.getElementById("txtTipoOcorrencia");

                for (var i = 0; i < dados.listTipoCocorrencia.length; i++) {
                    var opt = document.createElement("option");
                    opt.value = dados.listTipoCocorrencia[i].IdConsorcioTipoOcorrencia;
                    opt.text = dados.listTipoCocorrencia[i].DsConsorcioTipoOcorrencia;
                    comboTipoOcorrencia.add(opt, comboTipoOcorrencia.options[0]);
                }

                var selectTipoOcorrencia = document.createElement("option");
                selectTipoOcorrencia.value = "";
                selectTipoOcorrencia.text = "Selecione";
                comboTipoOcorrencia.add(selectTipoOcorrencia, comboTipoOcorrencia.options[0]);

                $("#txtTipoOcorrencia")[0].selectedIndex = 0;



                //Combo Tarefas
                var comboTarefas = document.getElementById("txtMoverTarefa");

                for (var i = 0; i < dados.listConsorcioTarefas.length; i++) {
                    var opt = document.createElement("option");
                    opt.value = dados.listConsorcioTarefas[i].IdConsorcioTarefas;
                    opt.text = dados.listConsorcioTarefas[i].DsConsorcioTarefas;
                    comboTarefas.add(opt, comboTarefas.options[0]);
                }

                var selectTarefas = document.createElement("option");
                selectTarefas.value = "";
                selectTarefas.text = "Selecione";
                comboTarefas.add(selectTarefas, comboTarefas.options[0]);

                $("#txtMoverTarefa")[0].selectedIndex = 0;


                //Combo Tarefas Filtro
                var comboFilas = document.getElementById("selectFilas");

                for (var i = 0; i < dados.listConsorcioTarefas.length; i++) {
                    var opt = document.createElement("option");
                    opt.value = dados.listConsorcioTarefas[i].IdConsorcioTarefas;
                    opt.text = dados.listConsorcioTarefas[i].DsConsorcioTarefas;
                    comboFilas.add(opt, comboFilas.options[0]);
                }

                var selectFilas = document.createElement("option");
                selectFilas.value = -1;
                selectFilas.text = "Todas Filas";
                comboFilas.add(selectFilas, comboFilas.options[0]);

                $("#selectFilas")[0].selectedIndex = 0;


            },
            error: function (xhr, textStatus, errorThrown) {
                //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
            }
        });
    }

    function CarregarDadosJustificativa() {
        $.ajax({
            url: baseUrl + '/ConsorcioFilaAtual/CarregarJustificativa',
            data: JSON.stringify({ 'idTipoOcorrencia': $("#txtTipoOcorrencia").val() }),                 //JSON.stringify({ 'mes': mes, 'ano': ano }),
            headers: {
                'RequestVerificationToken': $('#antiForgeryToken').val(),
                'X-Requested-With': 'XMLHttpRequest'
            },
            type: "POST",
            dataType: 'json',
            contentType: 'application/json',
            cache: false,
            success: function (dados) {
                $('#divChkJustificativa').html("");

                for (var i = 0; i < dados.listJustificativa.length; i++) {
                    $('#divChkJustificativa').append(
                        '<div>' +
                        '<input type="checkbox" name="chkJustificativa" value="' + dados.listJustificativa[i].IdConsorcioJustificativa +'"  /> ' + dados.listJustificativa[i].DsConsorcioJustificativa + ' ' +
                        '</div>'
                    );
                }

            },
            error: function (xhr, textStatus, errorThrown) {
                //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
            }
        });
    }

    function DesconsiderarFila(idProposta) {

        $.ajax({
            url: baseUrl + '/ConsorcioFilaAtual/DesconsiderarFila',
            data: JSON.stringify({ 'idProposta': idProposta}),                 //JSON.stringify({ 'mes': mes, 'ano': ano }),
            headers: {
                'RequestVerificationToken': $('#antiForgeryToken').val(),
                'X-Requested-With': 'XMLHttpRequest'
            },
            type: "POST",
            dataType: 'json',
            contentType: 'application/json',
            cache: false,
            success: function (dados) {

                DataTableFilaAtual();

                BMG.ShowAlert("Fila Atual", "Processo desconsiderado da fila com sucesso.");
            },
            error: function (xhr, textStatus, errorThrown) {
                //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
            }
        });
    }

    function EncaminharHistorico() {

        $.ajax({
            url: baseUrl + '/ConsorcioFilaAtual/EncaminharHistorico',
            data: JSON.stringify({ 'idProposta': localStorage.IdProcessoLinha }),                 //JSON.stringify({ 'mes': mes, 'ano': ano }),
            headers: {
                'RequestVerificationToken': $('#antiForgeryToken').val(),
                'X-Requested-With': 'XMLHttpRequest'
            },
            type: "POST",
            dataType: 'json',
            contentType: 'application/json',
            cache: false,
            success: function (dados) {

                DataTableFilaAtual();
                $("#modalEncamimhar").modal('toggle');
                //BMG.ShowAlert("Fila Atual", "Processo enceminhado para histórico com sucesso.");
            },
            error: function (xhr, textStatus, errorThrown) {
                //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
            }
        });
    }

    function EmpurrarFila() {

        $.ajax({
            url: baseUrl + '/ConsorcioFilaAtual/EmpurrarFila',
            data: JSON.stringify({ 'idProposta': localStorage.IdProcessoLinha }),                 //JSON.stringify({ 'mes': mes, 'ano': ano }),
            headers: {
                'RequestVerificationToken': $('#antiForgeryToken').val(),
                'X-Requested-With': 'XMLHttpRequest'
            },
            type: "POST",
            dataType: 'json',
            contentType: 'application/json',
            cache: false,
            success: function (dados) {

                DataTableFilaAtual();
                $("#modalEncamimhar").modal('toggle');
                //BMG.ShowAlert("Fila Atual", "Processo empurrado da fila com sucesso.");
            },
            error: function (xhr, textStatus, errorThrown) {
                //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
            }
        });
    }

    function DataTableEmpurrarFila() {
        $.ajax({
            url: baseUrl + '/ConsorcioFilaAtual/RetornaDadosEmpurrarFila',
            data: JSON.stringify({ 'idProcesso': localStorage.IdProcessoLinha}),                //JSON.stringify({ 'mes': mes, 'ano': ano }),
            headers: {
                'RequestVerificationToken': $('#antiForgeryToken').val(),
                'X-Requested-With': 'XMLHttpRequest'
            },
            type: "POST",
            dataType: 'json',
            contentType: 'application/json',
            cache: false,
            success: function (dados) {

                    localStorage.IdProcessoLinha = dados[0].IdConsorcioProposta;
                    localStorage.NumeroProcessoFila = dados[0].NumeroProcesso;
                
                var chart;

                var dataSet = [];
                var data = [];
                for (var i = 0; i < dados.length; i++) {

                    data = [
                        dados[i].NumeroProcesso,
                        dados[i].Grupo,
                        dados[i].Cota,
                        dados[i].Fila,
                        dados[i].DataEntrada,
                        dados[i].Operador,
                        dados[i].DataInicioAnalise,
                        dados[i].Requisante,
                    ]


                    dataSet.push(data);
                }
                $(document).ready(function () {

                    $("#tbEmpurrarFila").html("");
                    var table = $('#tbEmpurrarFila').DataTable({
                        data: dataSet,
                        columns: [
                            { title: "Processo" },
                            { title: "Grupo" },
                            { title: "Cota" },
                            { title: "Atividade" },
                            { title: "Data SML" },
                            { title: "Colaborador" },
                            { title: "Início Tratamento" },
                            { title: "Requisitante" },
                        ],
                        "bDestroy": true,
                        "bPaginate": false,
                        "bInfo": false,
                        bSort: false,
                        "bFilter": false,
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
            },
            error: function (xhr, textStatus, errorThrown) {
                //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
            }
        });
    }

    function DataTableEmpurrarFilaPorProcesso() {
        $.ajax({
            url: baseUrl + '/ConsorcioFilaAtual/RetornaDadosPorProocesso',
            data: JSON.stringify({ 'numeroProcesso': $("#txtPesquisaNumeroProcesso").val() }),                //JSON.stringify({ 'mes': mes, 'ano': ano }),
            headers: {
                'RequestVerificationToken': $('#antiForgeryToken').val(),
                'X-Requested-With': 'XMLHttpRequest'
            },
            type: "POST",
            dataType: 'json',
            contentType: 'application/json',
            cache: false,
            success: function (dados) {
                localStorage.IdProcessoLinha = dados[0].IdConsorcioProposta;

                localStorage.NumeroProcessoFila = dados[0].NumeroProcesso;

                var chart;

                var dataSet = [];
                var data = [];
                for (var i = 0; i < dados.length; i++) {

                    data = [
                        dados[i].NumeroProcesso,
                        dados[i].Grupo,
                        dados[i].Cota,
                        dados[i].Fila,
                        dados[i].DataEntrada,
                        dados[i].Operador,
                        dados[i].DataInicioAnalise,
                        dados[i].Requisante
                    ]


                    dataSet.push(data);
                }
                $(document).ready(function () {

                    $("#tbEmpurrarFila").html("");
                    var table = $('#tbEmpurrarFila').DataTable({
                        data: dataSet,
                        columns: [
                            { title: "Processo" },
                            { title: "Grupo" },
                            { title: "Cota" },
                            { title: "Atividade" },
                            { title: "Data SML" },
                            { title: "Colaborador" },
                            { title: "Início Tratamento" },
                            { title: "Requisitante" },

                        ],
                        "bDestroy": true,
                        "bPaginate": false,
                        "bInfo": false,
                        bSort: false,
                        "bFilter": false,
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
            },
            error: function (xhr, textStatus, errorThrown) {
                //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
            }
        });
    }

    function MoverProcessoFila() {

        $.ajax({
            url: baseUrl + '/ConsorcioFilaAtual/MoverProcessoFila',
            data: JSON.stringify({ 'idProposta': localStorage.IdProcessoLinha, 'idTarefa': $("#txtMoverTarefa").val() }),                 //JSON.stringify({ 'mes': mes, 'ano': ano }),
            headers: {
                'RequestVerificationToken': $('#antiForgeryToken').val(),
                'X-Requested-With': 'XMLHttpRequest'
            },
            type: "POST",
            dataType: 'json',
            contentType: 'application/json',
            cache: false,
            success: function (dados) {

                DataTableFilaAtual();
                DataTableEmpurrarFila();
                $("#txtMoverTarefa")[0].selectedIndex = 0;
                $("#txtPesquisaNumeroProcesso").val();
                //$("#modalEncamimhar").modal('toggle');
                BMG.ShowAlert("Fila Atual", "Processo empurrado da fila com sucesso.");
            },
            error: function (xhr, textStatus, errorThrown) {
                //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
            }
        });
    }

    function DataTableHistorico() {
        $.ajax({
            url: baseUrl + '/ConsorcioFilaAtual/RetornaDadosHistorico',
            data: JSON.stringify({ 'idProcesso': localStorage.IdProcessoLinha }),                //JSON.stringify({ 'mes': mes, 'ano': ano }),
            headers: {
                'RequestVerificationToken': $('#antiForgeryToken').val(),
                'X-Requested-With': 'XMLHttpRequest'
            },
            type: "POST",
            dataType: 'json',
            contentType: 'application/json',
            cache: false,
            success: function (dados) {
                
                if (dados != "") {
                    localStorage.IdProcessoLinha = dados[0].IdConsorcioProposta;
                    localStorage.NumeroProcessoFila = dados[0].NumeroProcesso;
                }
                var chart;

                var dataSet = [];
                var data = [];
                for (var i = 0; i < dados.length; i++) {

                    data = [
                        dados[i].NumeroProcesso,
                        dados[i].Grupo,
                        dados[i].Cota,
                        dados[i].Fila,
                        dados[i].DataEntrada,
                        dados[i].Operador,
                        dados[i].DataInicioAnalise,
                        dados[i].Requisante
                    ]


                    dataSet.push(data);
                }
                $(document).ready(function () {

                    $("#tbHistoricoProcesso").html("");
                    var table = $('#tbHistoricoProcesso').DataTable({
                        data: dataSet,
                        columns: [
                            { title: "Processo" },
                            { title: "Grupo" },
                            { title: "Cota" },
                            { title: "Atividade" },
                            { title: "Data SML" },
                            { title: "Colaborador" },
                            { title: "Início Tratamento" },
                            { title: "Requisitante" },

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
            },
            error: function (xhr, textStatus, errorThrown) {
                //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
            }
        });
    }

    function DataTableHistoricoPorProcesso() {
        $.ajax({
            url: baseUrl + '/ConsorcioFilaAtual/RetornaDadosHistoricoPorProcesso',
            data: JSON.stringify({ 'numeroProcesso': $("#txtPesquisaNumeroProcessoHistorico").val() }),                //JSON.stringify({ 'mes': mes, 'ano': ano }),
            headers: {
                'RequestVerificationToken': $('#antiForgeryToken').val(),
                'X-Requested-With': 'XMLHttpRequest'
            },
            type: "POST",
            dataType: 'json',
            contentType: 'application/json',
            cache: false,
            success: function (dados) {

                if (dados != "") {
                    localStorage.IdProcessoLinha = dados[0].IdConsorcioProposta;
                    localStorage.NumeroProcessoFila = dados[0].NumeroProcesso;
                }
                var chart;

                var dataSet = [];
                var data = [];
                for (var i = 0; i < dados.length; i++) {

                    data = [
                        dados[i].NumeroProcesso,
                        dados[i].Grupo,
                        dados[i].Cota,
                        dados[i].Fila,
                        dados[i].DataEntrada,
                        dados[i].Operador,
                        dados[i].DataInicioAnalise,
                        dados[i].Requisante
                    ]


                    dataSet.push(data);
                }
                $(document).ready(function () {

                    $("#tbHistoricoProcesso").html("");
                    var table = $('#tbHistoricoProcesso').DataTable({
                        data: dataSet,
                        columns: [
                            { title: "Processo" },
                            { title: "Grupo" },
                            { title: "Cota" },
                            { title: "Atividade" },
                            { title: "Data SML" },
                            { title: "Colaborador" },
                            { title: "Início Tratamento" },
                            { title: "Requisitante" },

                        ],
                        "bDestroy": true,
                        "bFilter": false,
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
            },
            error: function (xhr, textStatus, errorThrown) {
                //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
            }
        });
    }

    CarregarDadosIniciais();
    DataTableFilaAtual();
});