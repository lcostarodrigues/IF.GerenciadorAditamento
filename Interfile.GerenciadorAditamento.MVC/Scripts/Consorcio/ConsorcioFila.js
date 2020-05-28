$(document).ready(function () {

    $("#txtTotalProventos").maskMoney({
        prefix: "R$",
        decimal: ",",
        thousands: "."
    });


    $("#txtResultado8Proventos").maskMoney({
        prefix: "R$",
        decimal: ",",
        thousands: "."
    });


    $("#txtResultado9Proventos").maskMoney({
        prefix: "R$",
        decimal: ",",
        thousands: "."
    });


    $("#txtResultado11Proventos").maskMoney({
        prefix: "R$",
        decimal: ",",
        thousands: "."
    });


    $("#txtINSSMax").maskMoney({
        prefix: "R$",
        decimal: ",",
        thousands: "."
    });


    $("#txtRendimentosTributaveis").maskMoney({
        prefix: "R$",
        decimal: ",",
        thousands: "."
    });



    $("#txtRendsMensal").maskMoney({
        prefix: "R$",
        decimal: ",",
        thousands: "."
    });


    $('#modalCalculadora').on('shown.bs.modal', function (e) {
        $("#txtINSSMax").focus();
    })
    



    function confirmExit() {

        //$('#btnDesistirAnalise').click();


        //if (localStorage.IdDemanda != 0) {
            //LiberarDemanda();
        //}

        return "Análise em progresso?";


    }
    window.onbeforeunload = confirmExit;

    var timerPausa = new Timer();

    var timerSla = new Timer();

    $("#btnCalcular").click(function () {
        Calcular();
    });


    $("#btnFecharModalPausa").click(function () {
        //RetornaProposta();
        RetornarPausa();
    });

    $("#btnLimparDadosCalculadora").click(function () {
        LimparCalculadora();
    });

    $("#txtTotalProventos").keyup(function () {
        Calcular();

        $("#txtTotalProventos").focus();
    });

    $("#txtRendimentosTributaveis").keyup(function () {
        Calcular();

        $("#txtRendimentosTributaveis").focus();
    });

    $("#btnFinalizarProcesso").click(function () {
        SalvarAnalise();

    });


    $("#btnSalvarPausa").click(function () {
        SalvarPausa();
    });

    $("#btnRetornarPausa").click(function () {
        BMG.ShowConfirm("Retorno da Pausa", "Confirmar retorno da pausa?", function () {
            RetornarPausa();
            $('#modalPausa').modal('toggle');
        });
    });

    $("#btnFinalizarPausar").click(function () {

        SalvarAnalisePausa();
        SalvarPausaTempoOcioso();
        $('#modalPausa').modal({ backdrop: 'static', keyboard: false });
       
    });


    $("#btnCalculadora").click(function () {
        $('#modalCalculadora').modal();
    });

    $(window).on("load resize ", function () {
        var scrollWidth = $('.tbl-content').width() - $('.tbl-content table').width();
        $('.tbl-header').css({ 'padding-right': scrollWidth });
    }).resize();

    var baseUrl = $("#BaseURL").val();


    var viewModelConsorcioProposta = {
        IdConsorcioProposta: 0,
        IdConsorcioTarefas: 0,
        NumeroProcesso: "",
        Grupo: "",
        Cota: 0,
        CpfCnpj: "",
        TipoCliente: "",
        QuantidadeVeiculos: 0,
        Fila: "",
        Observacao: "",
        DataEntrada: "",
        FlAnalise: false,
        DataAnalise: ""
    };

    var pausaOperador = {
        IdPausaOperador: 0,
        Operador: "",
        DsPausa: "",
        DataPausa: "",
        DataRetorno: ""
    }

    function RetornaProposta() {
        $.ajax({
            url: baseUrl + '/ConsorcioFila/RetornaDadosPropostaFila',
            data: JSON.stringify({}),
            headers: {
                'RequestVerificationToken': $('#antiForgeryToken').val(),
                'X-Requested-With': 'XMLHttpRequest'
            },
            type: "POST",
            dataType: 'json',
            contentType: 'application/json',
            cache: false,
            success: function (dados) {
                
                $("#idProcesso").text("");
                $("#idGrupo").text("");
                $("#idCota").text("");
                $("#idCpfCnpj").text("");
                $("#idTipoCliente").text("");
                $("#idQuantidadeClientes").text("");
                $("#idFila").text("");
                $("#idTempoSLA").text("");

                if (dados.Erro != undefined) {
                    //$("#modalFilaVazia").modal({ backdrop: 'static', keyboard: false });
                }
                else {
                    $('#idCronometro').css('background-color', 'black');




                    $("#idProcesso").text(dados.NumeroProcesso);
                    $("#idGrupo").text(dados.Grupo);
                    $("#idCota").text(dados.Cota);
                    $("#idCpfCnpj").text(dados.CpfCnpj);
                    $("#idTipoCliente").text(dados.TipoCliente);
                    $("#idQuantidadeClientes").text(dados.QuantidadeVeiculos);
                    $("#idFila").text(dados.Fila);
                    $("#idTempoSLA").text(dados.SlaTarefa);


                    ContagemSla(dados.ContagemCronometro);

                    localStorage.IdConsorcioProposta = dados.IdConsorcioProposta;
                    localStorage.IdConsorcioTarefas = dados.IdConsorcioTarefas;
                    localStorage.NumeroProcesso = dados.NumeroProcesso;
                    localStorage.Grupo = dados.Grupo;
                    localStorage.Cota = dados.Cota;
                    localStorage.CpfCnpj = dados.CpfCnpj;
                    localStorage.TipoCliente = dados.TipoCliente;
                    localStorage.QuantidadeVeiculos = dados.QuantidadeVeiculos;
                    localStorage.Fila = dados.Fila;
                    localStorage.Observacao = dados.Observacao;
                    localStorage.DataEntrada = dados.DataEntrada;
                    
                    DataTableHistoricoConsorcio();

                    setTimeout(function () {
                        $('#idCronometro').css('background-color', 'red');
                        //}, 5000);
                    }, dados.LimiteSla);
                }

            },
            error: function (xhr, textStatus, errorThrown) {
                //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o usuário.");
            }
        });


    }

    function DataTableHistoricoConsorcio() {

        
        //alert(localStorage.IdConsorcioProposta);

        var idConsorcioProposta = localStorage.IdConsorcioProposta != 'undefined' ? localStorage.IdConsorcioProposta : 0;


        $.ajax({
            url: baseUrl + '/ConsorcioFila/RetornaHistoricoConsorcioProposta',
            data: JSON.stringify({ 'idConsorcioProposta': idConsorcioProposta }),                //JSON.stringify({ 'mes': mes, 'ano': ano }),
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
                        dados[i].Fila,
                        dados[i].Documento,
                        dados[i].DescricaoDivergencia,
                        dados[i].ObservacaoDocumento
                    ]


                    dataSet.push(data);
                }
                $(document).ready(function () {

                    $("#tbHistoricoConsorcioProposta").html("");
                    var table = $('#tbHistoricoConsorcioProposta').DataTable({
                        data: dataSet,
                        columns: [
                            { title: "Fila" },
                            { title: "Documento" },
                            { title: "Descrição de Divergência" },
                            { title: "Observação" }
                        ],
                        "bDestroy": true,
                        "bFilter": false,
                        "lengthChange": false,
                        bSort: false,
                        "bPaginate": false,
                        deferRender: true,
                        scroller: false,
                        "scrollX": false,
                        "bInfo": false,
                        "order": [[1, "asc"]],
                        

                    });

                    
                });
            },
            error: function (xhr, textStatus, errorThrown) {
                //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
            }
        });
    }

    function SalvarAnalise() {
        viewModelConsorcioProposta.IdConsorcioProposta = localStorage.IdConsorcioProposta;
        viewModelConsorcioProposta.IdConsorcioTarefas = localStorage.IdConsorcioTarefas;
        viewModelConsorcioProposta.NumeroProcesso = localStorage.NumeroProcesso;
        viewModelConsorcioProposta.Grupo = localStorage.Grupo;
        viewModelConsorcioProposta.Cota = localStorage.Cota;
        viewModelConsorcioProposta.CpfCnpj = localStorage.CpfCnpj;
        viewModelConsorcioProposta.TipoCliente = localStorage.TipoCliente;
        viewModelConsorcioProposta.QuantidadeVeiculos = localStorage.QuantidadeVeiculos;
        viewModelConsorcioProposta.Fila = localStorage.Fila;
        viewModelConsorcioProposta.Observacao = $("#txtObservacao").val();
        viewModelConsorcioProposta.DataEntrada = localStorage.DataEntrada;
        


        $.ajax({
            url: baseUrl + '/ConsorcioFila/SalvarAnalise',
            data: JSON.stringify({ 'viewModelConsorcioProposta': viewModelConsorcioProposta}),
            headers: {
                'RequestVerificationToken': $('#antiForgeryToken').val(),
                'X-Requested-With': 'XMLHttpRequest'
            },
            type: "POST",
            dataType: 'json',
            contentType: 'application/json',
            cache: false,
            success: function (dados) {


                ReiniciarContagemSla();


                //$("#idProcesso").text("");
                //$("#idGrupo").text("");
                //$("#idCota").text("");
                //$("#idCpfCnpj").text("");
                //$("#idTipoCliente").text("");
                //$("#idQuantidadeClientes").text("");
                //$("#idFila").text("");
                //$("#idTempoSLA").text("");

                $("#txtObservacao").text("");
                $('#idCronometro').text("");
                $('#idCronometro').text("00:00:00");

                RetornaProposta();

                BMG.ShowAlert("Proposta", "Proposta analisada com sucesso.");
           
            },
            error: function (xhr, textStatus, errorThrown) {
                //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o usuário.");
            }
        });


    }

    function SalvarAnalisePausa() {
        viewModelConsorcioProposta.IdConsorcioProposta = localStorage.IdConsorcioProposta;
        viewModelConsorcioProposta.IdConsorcioTarefas = localStorage.IdConsorcioTarefas;
        viewModelConsorcioProposta.NumeroProcesso = localStorage.NumeroProcesso;
        viewModelConsorcioProposta.Grupo = localStorage.Grupo;
        viewModelConsorcioProposta.Cota = localStorage.Cota;
        viewModelConsorcioProposta.CpfCnpj = localStorage.CpfCnpj;
        viewModelConsorcioProposta.TipoCliente = localStorage.TipoCliente;
        viewModelConsorcioProposta.QuantidadeVeiculos = localStorage.QuantidadeVeiculos;
        viewModelConsorcioProposta.Fila = localStorage.Fila;
        viewModelConsorcioProposta.Observacao = $("#txtObservacao").val();
        viewModelConsorcioProposta.DataEntrada = localStorage.DataEntrada;



        $.ajax({
            url: baseUrl + '/ConsorcioFila/SalvarAnalise',
            data: JSON.stringify({ 'viewModelConsorcioProposta': viewModelConsorcioProposta }),
            headers: {
                'RequestVerificationToken': $('#antiForgeryToken').val(),
                'X-Requested-With': 'XMLHttpRequest'
            },
            type: "POST",
            dataType: 'json',
            contentType: 'application/json',
            cache: false,
            success: function (dados) {


                ReiniciarContagemSla();

                $("#idProcesso").text("-");
                $("#idGrupo").text("-");
                $("#idCota").text("-");
                $("#idCpfCnpj").text("-");
                $("#idTipoCliente").text("-");
                $("#idQuantidadeClientes").text("-");
                $("#idFila").text("-");

                $("#idTempoSLA").text("");

                $("#txtObservacao").text("");
                $('#idCronometro').text("");
                $('#idCronometro').text("00:00:00");

                $('#idTempoSLA').text("00:00:00");

                //RetornaProposta();

                BMG.ShowAlert("Proposta", "Proposta analisada com sucesso.");

            },
            error: function (xhr, textStatus, errorThrown) {
                //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o usuário.");
            }
        });


    }

    function ValidarSalvarPausa() {

        if ($("#txtMotivoPausa").val() == "") {
            BMG.ShowAlert("Aviso", "Informe o motivo da pausa.");

            return false;
        }

        return true;
    }

    function SalvarPausa() {

        if (ValidarSalvarPausa()) {
            pausaOperador.IdPausaOperador = 0;
            pausaOperador.DsPausa = $("#txtMotivoPausa").val();


            $.ajax({
                url: baseUrl + '/ConsorcioFila/SalvarPausa',
                data: JSON.stringify({ 'viewModelPausaOperador': pausaOperador }),
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

                        $('#btnSalvarPausa').hide();
                       $('#btnRetornarPausa').show();

                        ContagemPausa();


                        $('#btnFecharModalPausa').hide();

                        //BMG.ShowAlert("Notificação", "Intervalo realizado com sucesso.");

                        

                        //$('#modalPausa').modal('toggle');
                    }
                },
                error: function (xhr, textStatus, errorThrown) {
                    TratarErro(xhr, textStatus, errorThrown, "Erro ao realizar o intervalo.");
                }
            });
        }
    }

    function SalvarPausaTempoOcioso() {

            $.ajax({
                url: baseUrl + '/ConsorcioFila/SalvarPausaTempoOcioso',
                data: JSON.stringify({}),
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
                },
                error: function (xhr, textStatus, errorThrown) {
                    TratarErro(xhr, textStatus, errorThrown, "Erro ao realizar o intervalo.");
                }
            });
        
    }

    function RetornarPausa() {
        $.ajax({
            url: baseUrl + '/ConsorcioFila/RetornarPausa',
            data: JSON.stringify({}),
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

                    $('#btnFecharModalPausa').show();
                    $('#btnRetornarPausa').hide();
                    $('#btnSalvarPausa').show();

                    ReiniciarContagemPausa();

                    $('#divTempoPausa').html("");
                    $('#divTempoPausa').append('<span style="color:black">Intervalo: <span id="idTempoPausa" class="label label-default">00:00:00</span></span>');

                    BMG.ShowAlert("Notificação", "Retorno do intervalo realizado com sucesso.");

                    //$('#modalPausa').modal('toggle');

                    RetornaProposta();

                }
            },
            error: function (xhr, textStatus, errorThrown) {
                TratarErro(xhr, textStatus, errorThrown, "Erro ao retornar do intervalo.");
            }
        });

    }

    function ContagemPausa() {

        timerPausa.start();
        timerPausa.addEventListener('secondsUpdated', function (e) {
            $('#idTempoPausa').html(timerPausa.getTimeValues().toString());
        });
    }

    function ContagemSla(ContagemCronometro) {

        //timerSla.start();

        //alert(ContagemCronometro);

        timerSla.start({ precision: 'seconds', startValues: { seconds: ContagemCronometro } });

        timerSla.addEventListener('secondsUpdated', function (e) {
            $('#idCronometro').html(timerSla.getTimeValues().toString());
        });
    }

    function ReiniciarContagemPausa() {
        timerPausa.reset();

        timerPausa.stop();
    }

    function ReiniciarContagemSla() {
        timerSla.reset();

        timerSla.stop();
    }

    function Calcular() {
        var totalProventos = $("#txtTotalProventos").val().replace(".", "").replace(",", ".").replace("R$", "");

        //alert(totalProventos);

        //alert($("#txtTotalProventos").val());

        var oito = (totalProventos * (8 / 100)).toFixed(2);

        var nove = (totalProventos * (9 / 100)).toFixed(2);

        var onze = (totalProventos * (11 / 100)).toFixed(2);

        //alert(oito);        

        $("#txtResultado8Proventos").val(oito).focus();

        $("#txtResultado9Proventos").val(nove).focus();

        $("#txtResultado11Proventos").val(onze).focus();

        $("#txtResultado11Proventos").val(onze).focus();

        

       

        var rendimentosTributaveis = $("#txtRendimentosTributaveis").val().replace(".", "").replace(",", ".").replace("R$", "");

        var rendaMensal = (rendimentosTributaveis / 12).toFixed(2);;

        $("#txtRendsMensal").val(rendaMensal).focus();

        
    }

    function LimparCalculadora() {
        $("#txtTotalProventos").val("");
        $("#txtResultado8Proventos").val("");
        $("#txtResultado9Proventos").val("");
        $("#txtResultado11Proventos").val("");


        //$("#txtINSSMax").val("");
        $("#txtRendimentosTributaveis").val("");
        $("#txtRendsMensal").val("");


    }

    setInterval(function () {
        if ($("#idProcesso").text() === "") {
            RetornaProposta();  
        }
    }, 5000);

    RetornaProposta();  


    
});