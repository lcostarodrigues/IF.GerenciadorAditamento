var baseUrl = $("#BaseURL").val();
var mesAtual = $("#MesAtual").val();
var anoAtual = $("#AnoAtual").val();


var anoAnterior = $("#AnoAtual").val() - 1;

var myChart;
var myChart2;
var myChart3;
var myChart4;
var myChart5;
var myChart6;
var myChart7;
var myChart8;
var myChart9;
var myChart10;
var myChart11;
var myChart12;
var myChart13;
var myChart14;
var myChart15;
var myChart16;
var myChart17;
var myChart18;
var myChart19;
var myChart20;
var myChart21;
var myChart22;

var myChart23;
var myChart24;
var myChart25;
var myChart26;

var myChart27;


function CarregarDadosIniciais() {
    $.ajax({
        url: baseUrl + '/Dashboard/CarregarDadosIniciais',
        headers: {
            'RequestVerificationToken': $('#antiForgeryToken').val(),
            'X-Requested-With': 'XMLHttpRequest'
        },
        type: "POST",
        dataType: 'json',
        contentType: 'application/json',
        cache: false,
        success: function (dados) {

            //Combo Ano
            var comboAno = document.getElementById("ano");
            for (var i = 0; i < dados.listAno.length; i++) {
                var opt = document.createElement("option");
                opt.value = dados.listAno[i].NumeroAno;
                opt.text = dados.listAno[i].NumeroAno;
                comboAno.add(opt, comboAno.options[0]);
                $('#ano option[value="' + anoAtual + '"]').attr('selected', 'selected');
            }

            //Combo Mes
            var comboMes = document.getElementById("mes");
            for (var i = 0; i < dados.listMes.length; i++) {
                var opt = document.createElement("option");
                opt.value = dados.listMes[i].NumeroMes;
                opt.text = dados.listMes[i].NomeMes;
                comboMes.add(opt, comboMes.options[0]);
                $('#mes option[value="' + mesAtual + '"]').attr('selected', 'selected');
            }



        },
        error: function (xhr, textStatus, errorThrown) {
            TratarErro(xhr, textStatus, errorThrown, "Erro ao carregar o usuário.");
        }
    });
}

function TotalClassificacoesDiario() {

    var mes = $('select[id=mes]').val() == null ? mesAtual : $('select[id=mes]').val();

    var ano = $('select[id=ano]').val() == null ? anoAtual : $('select[id=ano]').val();

    var loja = $('select[id=ddlLojas]').val();


    $.ajax({
        url: baseUrl + '/Dashboard/RetornarClsVenAllDiasTotal',
        data: JSON.stringify({ 'mes': mes, 'ano': ano, 'loja': -1 }),
        headers: {
            'RequestVerificationToken': $('#antiForgeryToken').val(),
            'X-Requested-With': 'XMLHttpRequest'
        },
        type: "POST",
        dataType: 'json',
        contentType: 'application/json',
        cache: false,
        success: function (dados) {




            var chartDataDia = [];
            for (var i = 0; i < dados.length; i++) {
                var dataDia = dados[i].Dia;
                chartDataDia.push(dataDia);
            }


            var chartDataClassificacao1 = [];
            for (var i = 0; i < dados.length; i++) {
                var dataClassificacao1 = dados[i].Classificação1;
                chartDataClassificacao1.push(dataClassificacao1);
            }


            var chartDataMeta = [];
            for (var i = 0; i < dados.length; i++) {
                var dataMeta = dados[i].Meta;
                chartDataMeta.push(dataMeta);
            }

            var chartDataPercentual = [];
            for (var i = 0; i < dados.length; i++) {
                var dataPercentual = dados[i].Percentual;
                chartDataPercentual.push(dataPercentual);
            }

            if (myChart2) {
                myChart2.destroy();
            }

            $("#totalClassificacoesDiaria-legenda").empty();
            $("#totalClassificacoesDiaria-legenda").append("<i class='fa fa-line-chart' style='color: #2FFF00'></i>Média Dia – Mês Atual     <i class='fa fa-line-chart' style='color: #3e95cd'></i>Média Dia – Mês Anterior     <i class='fa fa-bar-chart' style='color: #722F37'></i>Faturamento Dia ");

            myChart2 = new Chart(document.getElementById("totalClassificacoesDiaria-chart"), {
                type: 'bar',
                data: {
                    labels: chartDataDia,
                    datasets: [
                        {
                            label: "Média Dia – Mês Atual",
                            type: "line",
                            borderColor: "#2FFF00",
                            data: chartDataPercentual,
                            fill: false
                        },
                        {
                            label: "Média Dia – Mês Anterior",
                            type: "line",
                            borderColor: "#3e95cd",
                            data: chartDataMeta,
                            fill: false
                        }, {
                            label: "Faturamento Dia",
                            type: "bar",
                            backgroundColor: "#722F37",
                            data: chartDataClassificacao1
                        }

                    ]
                },
                options: {
                    title: {
                        display: true
                    },
                    legend: { display: false }
                }
            });

        },
        error: function (xhr, textStatus, errorThrown) {
            //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
        }
    });
}

function TotalClassificacoesMensal() {
    var mes = $('select[id=mes]').val() == null ? mesAtual : $('select[id=mes]').val();

    var ano = $('select[id=ano]').val() == null ? anoAtual : $('select[id=ano]').val();

    var loja = $('select[id=ddlLojas]').val();

    $.ajax({
        url: baseUrl + '/Dashboard/RetornarClsVenAllMesesTotal',
        data: JSON.stringify({ 'ano': ano, 'loja': -1 }),
        headers: {
            'RequestVerificationToken': $('#antiForgeryToken').val(),
            'X-Requested-With': 'XMLHttpRequest'
        },
        type: "POST",
        dataType: 'json',
        contentType: 'application/json',
        cache: false,
        success: function (dados) {

            if (myChart) {
                myChart.destroy();
            }

            $("#totalClassificacoesMensal-legenda").empty();
            $("#totalClassificacoesMensal-legenda").append("<i class='fa fa-line-chart' style='color: #3e95cd'></i>Faturamento - " + anoAnterior + "   <i class='fa fa-bar-chart' style='color: #722F37'></i>Faturamento - " + ano+"  ");

            myChart = new Chart(document.getElementById("totalClassificacoesMensal-chart"), {
                type: 'bar',
                data: {
                    labels: ["Jan", "Fev", "Mar", "Abr", "Maio", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
                    datasets: [
                        {
                            label: "Faturamento - " + anoAnterior + " ",
                            type: "line",
                            borderColor: "#3e95cd",
                            data: [dados[0].MediaJaneiroAnterior,
                            dados[0].MediaFevereiroAnterior,
                            dados[0].MediaMarçoAnterior,
                            dados[0].MediaAbrilAnterior,
                            dados[0].MediaMaioAnterior,
                            dados[0].MediaJunhoAnterior,
                            dados[0].MediaJulhoAnterior,
                            dados[0].MediaAgostoAnterior,
                            dados[0].MediaSetembroAnterior,
                            dados[0].MediaOutubroAnterior,
                            dados[0].MediaNovembroAnterior,
                            dados[0].MediaDezembroAnterior],
                            fill: false
                        }, {
                            label: "Faturamento - " + ano + "",
                            type: "bar",
                            backgroundColor: "#722F37",
                            data: [dados[0].MediaJaneiro,
                            dados[0].MediaFevereiro,
                            dados[0].MediaMarço,
                            dados[0].MediaAbril,
                            dados[0].MediaMaio,
                            dados[0].MediaJunho,
                            dados[0].MediaJulho,
                            dados[0].MediaAgosto,
                            dados[0].MediaSetembro,
                            dados[0].MediaOutubro,
                            dados[0].MediaNovembro,
                            dados[0].MediaDezembro
                            ]
                        }
                    ]
                },
                options: {
                    title: {
                        display: true
                    },
                    legend: { display: false }
                }
            });

        },
        error: function (xhr, textStatus, errorThrown) {
            //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
        }
    });
}

function Classificacao1Mensal() {
    var mes = $('select[id=mes]').val() == null ? mesAtual : $('select[id=mes]').val();

    var ano = $('select[id=ano]').val() == null ? anoAtual : $('select[id=ano]').val();

    var loja = $('select[id=ddlLojas]').val();

    $.ajax({
        url: baseUrl + '/Dashboard/RetornarClsVenAllMeses',
        data: JSON.stringify({ 'ano': ano, 'cls': 1, 'loja': -1 }),
        headers: {
            'RequestVerificationToken': $('#antiForgeryToken').val(),
            'X-Requested-With': 'XMLHttpRequest'
        },
        type: "POST",
        dataType: 'json',
        contentType: 'application/json',
        cache: false,
        success: function (dados) {

            $('#spanClassificacao1Mensal').replaceWith('Classificação Mensal ' + dados[0].NomeClassificação1 + '');
            $('#spanClassificacao2Mensal').replaceWith('Classificação Mensal ' + dados[0].NomeClassificação2 + '');
            $('#spanClassificacao3Mensal').replaceWith('Classificação Mensal ' + dados[0].NomeClassificação3 + '');
            $('#spanClassificacao4Mensal').replaceWith('Classificação Mensal ' + dados[0].NomeClassificação4 + '');
            $('#spanClassificacao5Mensal').replaceWith('Classificação Mensal ' + dados[0].NomeClassificação5 + '');
            $('#spanClassificacao6Mensal').replaceWith('Classificação Mensal ' + dados[0].NomeClassificação6 + '');
            $('#spanClassificacao7Mensal').replaceWith('Classificação Mensal ' + dados[0].NomeClassificação7 + '');
            $('#spanClassificacao8Mensal').replaceWith('Classificação Mensal ' + dados[0].NomeClassificação8 + '');

            $('#spanClassificacao1').replaceWith('Classificação Diário ' + dados[0].NomeClassificação1 + '');
            $('#spanClassificacao2').replaceWith('Classificação Diário ' + dados[0].NomeClassificação2 + '');
            $('#spanClassificacao3').replaceWith('Classificação Diário ' + dados[0].NomeClassificação3 + '');
            $('#spanClassificacao4').replaceWith('Classificação Diário ' + dados[0].NomeClassificação4 + '');
            $('#spanClassificacao5').replaceWith('Classificação Diário ' + dados[0].NomeClassificação5 + '');
            $('#spanClassificacao6').replaceWith('Classificação Diário ' + dados[0].NomeClassificação6 + '');
            $('#spanClassificacao7').replaceWith('Classificação Diário ' + dados[0].NomeClassificação7 + '');
            $('#spanClassificacao8').replaceWith('Classificação Diário ' + dados[0].NomeClassificação8 + '');

            if (myChart7) {
                myChart7.destroy();
            }

            $("#Classificacao1-legenda").empty();
            $("#Classificacao1-legenda").append("<i class='fa fa-line-chart' style='color: #3e95cd'></i>Faturamento - " + anoAnterior + "   <i class='fa fa-bar-chart' style='color: #722F37'></i>Faturamento - " + ano + "  ");

            myChart7 = new Chart(document.getElementById("Classificacao1-chart"), {
                type: 'bar',
                data: {
                    labels: ["Jan", "Fev", "Mar", "Abr", "Maio", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
                    datasets: [
                        {
                            label: "Faturamento - " + anoAnterior + "",
                            type: "line",
                            borderColor: "#3e95cd",
                            data: [dados[0].MediaJaneiroAnterior,
                            dados[0].MediaFevereiroAnterior,
                            dados[0].MediaMarçoAnterior,
                            dados[0].MediaAbrilAnterior,
                            dados[0].MediaMaioAnterior,
                            dados[0].MediaJunhoAnterior,
                            dados[0].MediaJulhoAnterior,
                            dados[0].MediaAgostoAnterior,
                            dados[0].MediaSetembroAnterior,
                            dados[0].MediaOutubroAnterior,
                            dados[0].MediaNovembroAnterior,
                            dados[0].MediaDezembroAnterior],
                            fill: false
                        }, {
                            label: "Faturamento - " + ano + "",
                            type: "bar",
                            backgroundColor: "#722F37",
                            data: [dados[0].MediaJaneiro,
                            dados[0].MediaFevereiro,
                            dados[0].MediaMarço,
                            dados[0].MediaAbril,
                            dados[0].MediaMaio,
                            dados[0].MediaJunho,
                            dados[0].MediaJulho,
                            dados[0].MediaAgosto,
                            dados[0].MediaSetembro,
                            dados[0].MediaOutubro,
                            dados[0].MediaNovembro,
                            dados[0].MediaDezembro
                            ]
                        }
                    ]
                },
                options: {
                    title: {
                        display: true
                    },
                    legend: { display: false }
                }
            });

        },
        error: function (xhr, textStatus, errorThrown) {
            //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
        }
    });
}

function Classificacao2Mensal() {
    var mes = $('select[id=mes]').val() == null ? mesAtual : $('select[id=mes]').val();

    var ano = $('select[id=ano]').val() == null ? anoAtual : $('select[id=ano]').val();

    var loja = $('select[id=ddlLojas]').val();

    $.ajax({
        url: baseUrl + '/Dashboard/RetornarClsVenAllMeses',
        data: JSON.stringify({ 'ano': ano, 'cls': 2, 'loja': -1 }),
        headers: {
            'RequestVerificationToken': $('#antiForgeryToken').val(),
            'X-Requested-With': 'XMLHttpRequest'
        },
        type: "POST",
        dataType: 'json',
        contentType: 'application/json',
        cache: false,
        success: function (dados) {

            if (myChart8) {
                myChart8.destroy();
            }

            $("#Classificacao2-legenda").empty();
            $("#Classificacao2-legenda").append("<i class='fa fa-line-chart' style='color: #3e95cd'></i>Faturamento - " + anoAnterior + "   <i class='fa fa-bar-chart' style='color: #722F37'></i>Faturamento - " + ano + "  ");

            myChart8 = new Chart(document.getElementById("Classificacao2-chart"), {
                type: 'bar',
                data: {
                    labels: ["Jan", "Fev", "Mar", "Abr", "Maio", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
                    datasets: [
                        {
                            label: "Faturamento - " + anoAnterior + "",
                            type: "line",
                            borderColor: "#3e95cd",
                            data: [dados[0].MediaJaneiroAnterior,
                            dados[0].MediaFevereiroAnterior,
                            dados[0].MediaMarçoAnterior,
                            dados[0].MediaAbrilAnterior,
                            dados[0].MediaMaioAnterior,
                            dados[0].MediaJunhoAnterior,
                            dados[0].MediaJulhoAnterior,
                            dados[0].MediaAgostoAnterior,
                            dados[0].MediaSetembroAnterior,
                            dados[0].MediaOutubroAnterior,
                            dados[0].MediaNovembroAnterior,
                            dados[0].MediaDezembroAnterior],
                            fill: false
                        }, {
                            label: "Faturamento - " + ano + "",
                            type: "bar",
                            backgroundColor: "#722F37",
                            data: [dados[0].MediaJaneiro,
                            dados[0].MediaFevereiro,
                            dados[0].MediaMarço,
                            dados[0].MediaAbril,
                            dados[0].MediaMaio,
                            dados[0].MediaJunho,
                            dados[0].MediaJulho,
                            dados[0].MediaAgosto,
                            dados[0].MediaSetembro,
                            dados[0].MediaOutubro,
                            dados[0].MediaNovembro,
                            dados[0].MediaDezembro
                            ]
                        }
                    ]
                },
                options: {
                    title: {
                        display: true
                    },
                    legend: { display: false }
                }
            });

        },
        error: function (xhr, textStatus, errorThrown) {
            //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
        }
    });
}

function Classificacao3Mensal() {
    var mes = $('select[id=mes]').val() == null ? mesAtual : $('select[id=mes]').val();

    var ano = $('select[id=ano]').val() == null ? anoAtual : $('select[id=ano]').val();

    var loja = $('select[id=ddlLojas]').val();

    $.ajax({
        url: baseUrl + '/Dashboard/RetornarClsVenAllMeses',
        data: JSON.stringify({ 'ano': ano, 'cls': 3, 'loja': -1 }),
        headers: {
            'RequestVerificationToken': $('#antiForgeryToken').val(),
            'X-Requested-With': 'XMLHttpRequest'
        },
        type: "POST",
        dataType: 'json',
        contentType: 'application/json',
        cache: false,
        success: function (dados) {

            if (myChart9) {
                myChart9.destroy();
            }

            $("#Classificacao3-legenda").empty();
            $("#Classificacao3-legenda").append("<i class='fa fa-line-chart' style='color: #3e95cd'></i>Faturamento - " + anoAnterior + "   <i class='fa fa-bar-chart' style='color: #722F37'></i>Faturamento - " + ano + "  ");

            myChart9 = new Chart(document.getElementById("Classificacao3-chart"), {
                type: 'bar',
                data: {
                    labels: ["Jan", "Fev", "Mar", "Abr", "Maio", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
                    datasets: [
                        {
                            label: "Faturamento - " + anoAnterior + "",
                            type: "line",
                            borderColor: "#3e95cd",
                            data: [dados[0].MediaJaneiroAnterior,
                            dados[0].MediaFevereiroAnterior,
                            dados[0].MediaMarçoAnterior,
                            dados[0].MediaAbrilAnterior,
                            dados[0].MediaMaioAnterior,
                            dados[0].MediaJunhoAnterior,
                            dados[0].MediaJulhoAnterior,
                            dados[0].MediaAgostoAnterior,
                            dados[0].MediaSetembroAnterior,
                            dados[0].MediaOutubroAnterior,
                            dados[0].MediaNovembroAnterior,
                            dados[0].MediaDezembroAnterior],
                            fill: false
                        }, {
                            label: "Faturamento - " + ano + "",
                            type: "bar",
                            backgroundColor: "#722F37",
                            data: [dados[0].MediaJaneiro,
                            dados[0].MediaFevereiro,
                            dados[0].MediaMarço,
                            dados[0].MediaAbril,
                            dados[0].MediaMaio,
                            dados[0].MediaJunho,
                            dados[0].MediaJulho,
                            dados[0].MediaAgosto,
                            dados[0].MediaSetembro,
                            dados[0].MediaOutubro,
                            dados[0].MediaNovembro,
                            dados[0].MediaDezembro
                            ]
                        }
                    ]
                },
                options: {
                    title: {
                        display: true
                    },
                    legend: { display: false }
                }
            });

        },
        error: function (xhr, textStatus, errorThrown) {
            //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
        }
    });
}

function Classificacao4Mensal() {
    var mes = $('select[id=mes]').val() == null ? mesAtual : $('select[id=mes]').val();

    var ano = $('select[id=ano]').val() == null ? anoAtual : $('select[id=ano]').val();

    var loja = $('select[id=ddlLojas]').val();

    $.ajax({
        url: baseUrl + '/Dashboard/RetornarClsVenAllMeses',
        data: JSON.stringify({ 'ano': ano, 'cls': 4, 'loja': -1 }),
        headers: {
            'RequestVerificationToken': $('#antiForgeryToken').val(),
            'X-Requested-With': 'XMLHttpRequest'
        },
        type: "POST",
        dataType: 'json',
        contentType: 'application/json',
        cache: false,
        success: function (dados) {

            if (myChart10) {
                myChart10.destroy();
            }

            $("#Classificacao4-legenda").empty();
            $("#Classificacao4-legenda").append("<i class='fa fa-line-chart' style='color: #3e95cd'></i>Faturamento - " + anoAnterior + "   <i class='fa fa-bar-chart' style='color: #722F37'></i>Faturamento - " + ano + "  ");

            myChart10 = new Chart(document.getElementById("Classificacao4-chart"), {
                type: 'bar',
                data: {
                    labels: ["Jan", "Fev", "Mar", "Abr", "Maio", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
                    datasets: [
                        {
                            label: "Faturamento - " + anoAnterior + "",
                            type: "line",
                            borderColor: "#3e95cd",
                            data: [dados[0].MediaJaneiroAnterior,
                            dados[0].MediaFevereiroAnterior,
                            dados[0].MediaMarçoAnterior,
                            dados[0].MediaAbrilAnterior,
                            dados[0].MediaMaioAnterior,
                            dados[0].MediaJunhoAnterior,
                            dados[0].MediaJulhoAnterior,
                            dados[0].MediaAgostoAnterior,
                            dados[0].MediaSetembroAnterior,
                            dados[0].MediaOutubroAnterior,
                            dados[0].MediaNovembroAnterior,
                            dados[0].MediaDezembroAnterior],
                            fill: false
                        }, {
                            label: "Faturamento - " + ano + "",
                            type: "bar",
                            backgroundColor: "#722F37",
                            data: [dados[0].MediaJaneiro,
                            dados[0].MediaFevereiro,
                            dados[0].MediaMarço,
                            dados[0].MediaAbril,
                            dados[0].MediaMaio,
                            dados[0].MediaJunho,
                            dados[0].MediaJulho,
                            dados[0].MediaAgosto,
                            dados[0].MediaSetembro,
                            dados[0].MediaOutubro,
                            dados[0].MediaNovembro,
                            dados[0].MediaDezembro
                            ]
                        }
                    ]
                },
                options: {
                    title: {
                        display: true
                    },
                    legend: { display: false }
                }
            });

        },
        error: function (xhr, textStatus, errorThrown) {
            //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
        }
    });
}

function Classificacao5Mensal() {
    var mes = $('select[id=mes]').val() == null ? mesAtual : $('select[id=mes]').val();

    var ano = $('select[id=ano]').val() == null ? anoAtual : $('select[id=ano]').val();

    var loja = $('select[id=ddlLojas]').val();

    $.ajax({
        url: baseUrl + '/Dashboard/RetornarClsVenAllMeses',
        data: JSON.stringify({ 'ano': ano, 'cls': 5, 'loja': -1 }),
        headers: {
            'RequestVerificationToken': $('#antiForgeryToken').val(),
            'X-Requested-With': 'XMLHttpRequest'
        },
        type: "POST",
        dataType: 'json',
        contentType: 'application/json',
        cache: false,
        success: function (dados) {

            if (myChart11) {
                myChart11.destroy();
            }

            $("#Classificacao5-legenda").empty();
            $("#Classificacao5-legenda").append("<i class='fa fa-line-chart' style='color: #3e95cd'></i>Faturamento - " + anoAnterior + "   <i class='fa fa-bar-chart' style='color: #722F37'></i>Faturamento - " + ano + "  ");

            myChart11 = new Chart(document.getElementById("Classificacao5-chart"), {
                type: 'bar',
                data: {
                    labels: ["Jan", "Fev", "Mar", "Abr", "Maio", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
                    datasets: [
                        {
                            label: "Faturamento - " + anoAnterior + "",
                            type: "line",
                            borderColor: "#3e95cd",
                            data: [dados[0].MediaJaneiroAnterior,
                            dados[0].MediaFevereiroAnterior,
                            dados[0].MediaMarçoAnterior,
                            dados[0].MediaAbrilAnterior,
                            dados[0].MediaMaioAnterior,
                            dados[0].MediaJunhoAnterior,
                            dados[0].MediaJulhoAnterior,
                            dados[0].MediaAgostoAnterior,
                            dados[0].MediaSetembroAnterior,
                            dados[0].MediaOutubroAnterior,
                            dados[0].MediaNovembroAnterior,
                            dados[0].MediaDezembroAnterior],
                            fill: false
                        }, {
                            label: "Faturamento - " + ano + "",
                            type: "bar",
                            backgroundColor: "#722F37",
                            data: [dados[0].MediaJaneiro,
                            dados[0].MediaFevereiro,
                            dados[0].MediaMarço,
                            dados[0].MediaAbril,
                            dados[0].MediaMaio,
                            dados[0].MediaJunho,
                            dados[0].MediaJulho,
                            dados[0].MediaAgosto,
                            dados[0].MediaSetembro,
                            dados[0].MediaOutubro,
                            dados[0].MediaNovembro,
                            dados[0].MediaDezembro
                            ]
                        }
                    ]
                },
                options: {
                    title: {
                        display: true
                    },
                    legend: { display: false }
                }
            });

        },
        error: function (xhr, textStatus, errorThrown) {
            //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
        }
    });
}

function Classificacao6Mensal() {
    var mes = $('select[id=mes]').val() == null ? mesAtual : $('select[id=mes]').val();

    var ano = $('select[id=ano]').val() == null ? anoAtual : $('select[id=ano]').val();

    var loja = $('select[id=ddlLojas]').val();

    $.ajax({
        url: baseUrl + '/Dashboard/RetornarClsVenAllMeses',
        data: JSON.stringify({ 'ano': ano, 'cls': 6, 'loja': -1 }),
        headers: {
            'RequestVerificationToken': $('#antiForgeryToken').val(),
            'X-Requested-With': 'XMLHttpRequest'
        },
        type: "POST",
        dataType: 'json',
        contentType: 'application/json',
        cache: false,
        success: function (dados) {
            if (myChart12) {
                myChart12.destroy();
            }

            $("#Classificacao6-legenda").empty();
            $("#Classificacao6-legenda").append("<i class='fa fa-line-chart' style='color: #3e95cd'></i>Faturamento - " + anoAnterior + "   <i class='fa fa-bar-chart' style='color: #722F37'></i>Faturamento - " + ano + "  ");

            myChart12 = new Chart(document.getElementById("Classificacao6-chart"), {
                type: 'bar',
                data: {
                    labels: ["Jan", "Fev", "Mar", "Abr", "Maio", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
                    datasets: [
                        {
                            label: "Faturamento - " + anoAnterior + "",
                            type: "line",
                            borderColor: "#3e95cd",
                            data: [dados[0].MediaJaneiroAnterior,
                            dados[0].MediaFevereiroAnterior,
                            dados[0].MediaMarçoAnterior,
                            dados[0].MediaAbrilAnterior,
                            dados[0].MediaMaioAnterior,
                            dados[0].MediaJunhoAnterior,
                            dados[0].MediaJulhoAnterior,
                            dados[0].MediaAgostoAnterior,
                            dados[0].MediaSetembroAnterior,
                            dados[0].MediaOutubroAnterior,
                            dados[0].MediaNovembroAnterior,
                            dados[0].MediaDezembroAnterior],
                            fill: false
                        }, {
                            label: "Faturamento - " + ano + "",
                            type: "bar",
                            backgroundColor: "#722F37",
                            data: [dados[0].MediaJaneiro,
                            dados[0].MediaFevereiro,
                            dados[0].MediaMarço,
                            dados[0].MediaAbril,
                            dados[0].MediaMaio,
                            dados[0].MediaJunho,
                            dados[0].MediaJulho,
                            dados[0].MediaAgosto,
                            dados[0].MediaSetembro,
                            dados[0].MediaOutubro,
                            dados[0].MediaNovembro,
                            dados[0].MediaDezembro
                            ]
                        }
                    ]
                },
                options: {
                    title: {
                        display: true
                    },
                    legend: { display: false }
                }
            });

        },
        error: function (xhr, textStatus, errorThrown) {
            //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
        }
    });
}

function Classificacao7Mensal() {
    var mes = $('select[id=mes]').val() == null ? mesAtual : $('select[id=mes]').val();

    var ano = $('select[id=ano]').val() == null ? anoAtual : $('select[id=ano]').val();

    var loja = $('select[id=ddlLojas]').val();

    $.ajax({
        url: baseUrl + '/Dashboard/RetornarClsVenAllMeses',
        data: JSON.stringify({ 'ano': ano, 'cls': 7, 'loja': -1 }),
        headers: {
            'RequestVerificationToken': $('#antiForgeryToken').val(),
            'X-Requested-With': 'XMLHttpRequest'
        },
        type: "POST",
        dataType: 'json',
        contentType: 'application/json',
        cache: false,
        success: function (dados) {

            if (myChart13) {
                myChart13.destroy();
            }


            $("#Classificacao7-legenda").empty();
            $("#Classificacao7-legenda").append("<i class='fa fa-line-chart' style='color: #3e95cd'></i>Faturamento - " + anoAnterior + "   <i class='fa fa-bar-chart' style='color: #722F37'></i>Faturamento - " + ano + "  ");

            myChart13 = new Chart(document.getElementById("Classificacao7-chart"), {
                type: 'bar',
                data: {
                    labels: ["Jan", "Fev", "Mar", "Abr", "Maio", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
                    datasets: [
                        {
                            label: "Faturamento - " + anoAnterior + "",
                            type: "line",
                            borderColor: "#3e95cd",
                            data: [dados[0].MediaJaneiroAnterior,
                            dados[0].MediaFevereiroAnterior,
                            dados[0].MediaMarçoAnterior,
                            dados[0].MediaAbrilAnterior,
                            dados[0].MediaMaioAnterior,
                            dados[0].MediaJunhoAnterior,
                            dados[0].MediaJulhoAnterior,
                            dados[0].MediaAgostoAnterior,
                            dados[0].MediaSetembroAnterior,
                            dados[0].MediaOutubroAnterior,
                            dados[0].MediaNovembroAnterior,
                            dados[0].MediaDezembroAnterior],
                            fill: false
                        }, {
                            label: "Faturamento - " + ano + "",
                            type: "bar",
                            backgroundColor: "#722F37",
                            data: [dados[0].MediaJaneiro,
                            dados[0].MediaFevereiro,
                            dados[0].MediaMarço,
                            dados[0].MediaAbril,
                            dados[0].MediaMaio,
                            dados[0].MediaJunho,
                            dados[0].MediaJulho,
                            dados[0].MediaAgosto,
                            dados[0].MediaSetembro,
                            dados[0].MediaOutubro,
                            dados[0].MediaNovembro,
                            dados[0].MediaDezembro
                            ]
                        }
                    ]
                },
                options: {
                    title: {
                        display: true
                    },
                    legend: { display: false }
                }
            });

        },
        error: function (xhr, textStatus, errorThrown) {
            //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
        }
    });
}

function Classificacao8Mensal() {
    var mes = $('select[id=mes]').val() == null ? mesAtual : $('select[id=mes]').val();

    var ano = $('select[id=ano]').val() == null ? anoAtual : $('select[id=ano]').val();

    var loja = $('select[id=ddlLojas]').val();

    $.ajax({
        url: baseUrl + '/Dashboard/RetornarClsVenAllMeses',
        data: JSON.stringify({ 'ano': ano, 'cls': 8, 'loja': -1 }),
        headers: {
            'RequestVerificationToken': $('#antiForgeryToken').val(),
            'X-Requested-With': 'XMLHttpRequest'
        },
        type: "POST",
        dataType: 'json',
        contentType: 'application/json',
        cache: false,
        success: function (dados) {

            if (myChart14) {
                myChart14.destroy();
            }

            $("#Classificacao8-legenda").empty();
            $("#Classificacao8-legenda").append("<i class='fa fa-line-chart' style='color: #3e95cd'></i>Faturamento - " + anoAnterior + "   <i class='fa fa-bar-chart' style='color: #722F37'></i>Faturamento - " + ano + "  ");

            myChart14 = new Chart(document.getElementById("Classificacao8-chart"), {
                type: 'bar',
                data: {
                    labels: ["Jan", "Fev", "Mar", "Abr", "Maio", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
                    datasets: [
                        {
                            label: "Faturamento - " + anoAnterior + "",
                            type: "line",
                            borderColor: "#3e95cd",
                            data: [dados[0].MediaJaneiroAnterior,
                            dados[0].MediaFevereiroAnterior,
                            dados[0].MediaMarçoAnterior,
                            dados[0].MediaAbrilAnterior,
                            dados[0].MediaMaioAnterior,
                            dados[0].MediaJunhoAnterior,
                            dados[0].MediaJulhoAnterior,
                            dados[0].MediaAgostoAnterior,
                            dados[0].MediaSetembroAnterior,
                            dados[0].MediaOutubroAnterior,
                            dados[0].MediaNovembroAnterior,
                            dados[0].MediaDezembroAnterior],
                            fill: false
                        }, {
                            label: "Faturamento - " + ano + "",
                            type: "bar",
                            backgroundColor: "#722F37",
                            data: [dados[0].MediaJaneiro,
                            dados[0].MediaFevereiro,
                            dados[0].MediaMarço,
                            dados[0].MediaAbril,
                            dados[0].MediaMaio,
                            dados[0].MediaJunho,
                            dados[0].MediaJulho,
                            dados[0].MediaAgosto,
                            dados[0].MediaSetembro,
                            dados[0].MediaOutubro,
                            dados[0].MediaNovembro,
                            dados[0].MediaDezembro
                            ]
                        }
                    ]
                },
                options: {
                    title: {
                        display: true
                    },
                    legend: { display: false }
                }
            });

        },
        error: function (xhr, textStatus, errorThrown) {
            //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
        }
    });
}

function Classificacao1Diario() {
    var mes = $('select[id=mes]').val() == null ? mesAtual : $('select[id=mes]').val();

    var ano = $('select[id=ano]').val() == null ? anoAtual : $('select[id=ano]').val();

    var loja = $('select[id=ddlLojas]').val();


    $.ajax({
        url: baseUrl + '/Dashboard/RetornarClsVenAllDias',
        data: JSON.stringify({ 'mes': mes, 'ano': ano, 'cls': 1, 'loja': -1 }),
        headers: {
            'RequestVerificationToken': $('#antiForgeryToken').val(),
            'X-Requested-With': 'XMLHttpRequest'
        },
        type: "POST",
        dataType: 'json',
        contentType: 'application/json',
        cache: false,
        success: function (dados) {




            var chartDataDia = [];
            for (var i = 0; i < dados.length; i++) {
                var dataDia = dados[i].Dia;
                chartDataDia.push(dataDia);
            }


            var chartDataClassificacao1 = [];
            for (var i = 0; i < dados.length; i++) {
                var dataClassificacao1 = dados[i].Classificação1;
                chartDataClassificacao1.push(dataClassificacao1);
            }

            var chartDataMeta = [];
            for (var i = 0; i < dados.length; i++) {
                var dataMeta = dados[i].Meta;
                chartDataMeta.push(dataMeta);
            }

            var chartDataPercentual = [];
            for (var i = 0; i < dados.length; i++) {
                var dataPercentual = dados[i].Percentual;
                chartDataPercentual.push(dataPercentual);
            }

            if (myChart15) {
                myChart15.destroy();
            }

            $("#Classificacao1Diario-legenda").empty();
            $("#Classificacao1Diario-legenda").append("<i class='fa fa-line-chart' style='color: #2FFF00'></i>Média Dia – Mês Atual     <i class='fa fa-line-chart' style='color: #3e95cd'></i>Média Dia – Mês Anterior     <i class='fa fa-bar-chart' style='color: #722F37'></i>Faturamento Dia ");

            myChart15 = new Chart(document.getElementById("Classificacao1Diario-chart"), {
                type: 'bar',
                data: {
                    labels: chartDataDia,
                    datasets: [
                        {
                            label: "Média Dia – Mês Atual",
                            type: "line",
                            borderColor: "#2FFF00",
                            data: chartDataPercentual,
                            fill: false
                        },
                        {
                            label: "Média Dia – Mês Anterior",
                            type: "line",
                            borderColor: "#3e95cd",
                            data: chartDataMeta,
                            fill: false
                        }, {
                            label: "Faturamento Dia",
                            type: "bar",
                            backgroundColor: "#722F37",
                            data: chartDataClassificacao1
                        }
                    ]
                },
                options: {
                    title: {
                        display: true
                    },
                    legend: { display: false }
                }
            });

        },
        error: function (xhr, textStatus, errorThrown) {
            //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
        }
    });
}

function Classificacao2Diario() {
    var mes = $('select[id=mes]').val() == null ? mesAtual : $('select[id=mes]').val();

    var ano = $('select[id=ano]').val() == null ? anoAtual : $('select[id=ano]').val();

    var loja = $('select[id=ddlLojas]').val();


    $.ajax({
        url: baseUrl + '/Dashboard/RetornarClsVenAllDias',
        data: JSON.stringify({ 'mes': mes, 'ano': ano, 'cls': 2, 'loja': -1 }),
        headers: {
            'RequestVerificationToken': $('#antiForgeryToken').val(),
            'X-Requested-With': 'XMLHttpRequest'
        },
        type: "POST",
        dataType: 'json',
        contentType: 'application/json',
        cache: false,
        success: function (dados) {



            var chartDataDia = [];
            for (var i = 0; i < dados.length; i++) {
                var dataDia = dados[i].Dia;
                chartDataDia.push(dataDia);
            }


            var chartDataClassificacao1 = [];
            for (var i = 0; i < dados.length; i++) {
                var dataClassificacao1 = dados[i].Classificação1;
                chartDataClassificacao1.push(dataClassificacao1);
            }

            var chartDataMeta = [];
            for (var i = 0; i < dados.length; i++) {
                var dataMeta = dados[i].Meta;
                chartDataMeta.push(dataMeta);
            }

            var chartDataPercentual = [];
            for (var i = 0; i < dados.length; i++) {
                var dataPercentual = dados[i].Percentual;
                chartDataPercentual.push(dataPercentual);
            }

            if (myChart16) {
                myChart16.destroy();
            }
            
            $("#Classificacao2Diario-legenda").empty();
            $("#Classificacao2Diario-legenda").append("<i class='fa fa-line-chart' style='color: #2FFF00'></i>Média Dia – Mês Atual     <i class='fa fa-line-chart' style='color: #3e95cd'></i>Média Dia – Mês Anterior     <i class='fa fa-bar-chart' style='color: #722F37'></i>Faturamento Dia ");

            myChart16 = new Chart(document.getElementById("Classificacao2Diario-chart"), {
                type: 'bar',
                data: {
                    labels: chartDataDia,
                    datasets: [
                        {
                            label: "Média Dia – Mês Atual",
                            type: "line",
                            borderColor: "#2FFF00",
                            data: chartDataPercentual,
                            fill: false
                        },
                        {
                            label: "Média Dia – Mês Anterior",
                            type: "line",
                            borderColor: "#3e95cd",
                            data: chartDataMeta,
                            fill: false
                        }, {
                            label: "Faturamento Dia",
                            type: "bar",
                            backgroundColor: "#722F37",
                            data: chartDataClassificacao1
                        }
                    ]
                },
                options: {
                    title: {
                        display: true
                    },
                    legend: { display: false }
                }
            });

        },
        error: function (xhr, textStatus, errorThrown) {
            //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
        }
    });
}

function Classificacao3Diario() {
    var mes = $('select[id=mes]').val() == null ? mesAtual : $('select[id=mes]').val();

    var ano = $('select[id=ano]').val() == null ? anoAtual : $('select[id=ano]').val();

    var loja = $('select[id=ddlLojas]').val();


    $.ajax({
        url: baseUrl + '/Dashboard/RetornarClsVenAllDias',
        data: JSON.stringify({ 'mes': mes, 'ano': ano, 'cls': 3, 'loja': -1 }),
        headers: {
            'RequestVerificationToken': $('#antiForgeryToken').val(),
            'X-Requested-With': 'XMLHttpRequest'
        },
        type: "POST",
        dataType: 'json',
        contentType: 'application/json',
        cache: false,
        success: function (dados) {



            var chartDataDia = [];
            for (var i = 0; i < dados.length; i++) {
                var dataDia = dados[i].Dia;
                chartDataDia.push(dataDia);
            }


            var chartDataClassificacao1 = [];
            for (var i = 0; i < dados.length; i++) {
                var dataClassificacao1 = dados[i].Classificação1;
                chartDataClassificacao1.push(dataClassificacao1);
            }

            var chartDataMeta = [];
            for (var i = 0; i < dados.length; i++) {
                var dataMeta = dados[i].Meta;
                chartDataMeta.push(dataMeta);
            }

            var chartDataPercentual = [];
            for (var i = 0; i < dados.length; i++) {
                var dataPercentual = dados[i].Percentual;
                chartDataPercentual.push(dataPercentual);
            }

            if (myChart17) {
                myChart17.destroy();
            }

            $("#Classificacao3Diario-legenda").empty();
            $("#Classificacao3Diario-legenda").append("<i class='fa fa-line-chart' style='color: #2FFF00'></i>Média Dia – Mês Atual     <i class='fa fa-line-chart' style='color: #3e95cd'></i>Média Dia – Mês Anterior     <i class='fa fa-bar-chart' style='color: #722F37'></i>Faturamento Dia ");

            myChart17 = new Chart(document.getElementById("Classificacao3Diario-chart"), {
                type: 'bar',
                data: {
                    labels: chartDataDia,
                    datasets: [
                        {
                            label: "Média Dia – Mês Atual",
                            type: "line",
                            borderColor: "#2FFF00",
                            data: chartDataPercentual,
                            fill: false
                        },
                        {
                            label: "Média Dia – Mês Anterior",
                            type: "line",
                            borderColor: "#3e95cd",
                            data: chartDataMeta,
                            fill: false
                        }, {
                            label: "Faturamento Dia",
                            type: "bar",
                            backgroundColor: "#722F37",
                            data: chartDataClassificacao1
                        }
                    ]
                },
                options: {
                    title: {
                        display: true
                    },
                    legend: { display: false }
                }
            });

        },
        error: function (xhr, textStatus, errorThrown) {
            //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
        }
    });
}

function Classificacao4Diario() {
    var mes = $('select[id=mes]').val() == null ? mesAtual : $('select[id=mes]').val();

    var ano = $('select[id=ano]').val() == null ? anoAtual : $('select[id=ano]').val();

    var loja = $('select[id=ddlLojas]').val();


    $.ajax({
        url: baseUrl + '/Dashboard/RetornarClsVenAllDias',
        data: JSON.stringify({ 'mes': mes, 'ano': ano, 'cls': 4, 'loja': -1 }),
        headers: {
            'RequestVerificationToken': $('#antiForgeryToken').val(),
            'X-Requested-With': 'XMLHttpRequest'
        },
        type: "POST",
        dataType: 'json',
        contentType: 'application/json',
        cache: false,
        success: function (dados) {



            var chartDataDia = [];
            for (var i = 0; i < dados.length; i++) {
                var dataDia = dados[i].Dia;
                chartDataDia.push(dataDia);
            }


            var chartDataClassificacao1 = [];
            for (var i = 0; i < dados.length; i++) {
                var dataClassificacao1 = dados[i].Classificação1;
                chartDataClassificacao1.push(dataClassificacao1);
            }


            var chartDataMeta = [];
            for (var i = 0; i < dados.length; i++) {
                var dataMeta = dados[i].Meta;
                chartDataMeta.push(dataMeta);
            }

            var chartDataPercentual = [];
            for (var i = 0; i < dados.length; i++) {
                var dataPercentual = dados[i].Percentual;
                chartDataPercentual.push(dataPercentual);
            }


            if (myChart18) {
                myChart18.destroy();
            }

            $("#Classificacao4Diario-legenda").empty();
            $("#Classificacao4Diario-legenda").append("<i class='fa fa-line-chart' style='color: #2FFF00'></i>Média Dia – Mês Atual     <i class='fa fa-line-chart' style='color: #3e95cd'></i>Média Dia – Mês Anterior     <i class='fa fa-bar-chart' style='color: #722F37'></i>Faturamento Dia ");

            myChart18 = new Chart(document.getElementById("Classificacao4Diario-chart"), {
                type: 'bar',
                data: {
                    labels: chartDataDia,
                    datasets: [
                        {
                            label: "Média Dia – Mês Atual",
                            type: "line",
                            borderColor: "#2FFF00",
                            data: chartDataPercentual,
                            fill: false
                        },
                        {
                            label: "Média Dia – Mês Anterior",
                            type: "line",
                            borderColor: "#3e95cd",
                            data: chartDataMeta,
                            fill: false
                        }, {
                            label: "Faturamento Dia",
                            type: "bar",
                            backgroundColor: "#722F37",
                            data: chartDataClassificacao1
                        }
                    ]
                },
                options: {
                    title: {
                        display: true
                    },
                    legend: { display: false }
                }
            });

        },
        error: function (xhr, textStatus, errorThrown) {
            //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
        }
    });
}

function Classificacao5Diario() {
    var mes = $('select[id=mes]').val() == null ? mesAtual : $('select[id=mes]').val();

    var ano = $('select[id=ano]').val() == null ? anoAtual : $('select[id=ano]').val();

    var loja = $('select[id=ddlLojas]').val();


    $.ajax({
        url: baseUrl + '/Dashboard/RetornarClsVenAllDias',
        data: JSON.stringify({ 'mes': mes, 'ano': ano, 'cls': 5, 'loja': -1 }),
        headers: {
            'RequestVerificationToken': $('#antiForgeryToken').val(),
            'X-Requested-With': 'XMLHttpRequest'
        },
        type: "POST",
        dataType: 'json',
        contentType: 'application/json',
        cache: false,
        success: function (dados) {



            var chartDataDia = [];
            for (var i = 0; i < dados.length; i++) {
                var dataDia = dados[i].Dia;
                chartDataDia.push(dataDia);
            }


            var chartDataClassificacao1 = [];
            for (var i = 0; i < dados.length; i++) {
                var dataClassificacao1 = dados[i].Classificação1;
                chartDataClassificacao1.push(dataClassificacao1);
            }


            var chartDataMeta = [];
            for (var i = 0; i < dados.length; i++) {
                var dataMeta = dados[i].Meta;
                chartDataMeta.push(dataMeta);
            }

            var chartDataPercentual = [];
            for (var i = 0; i < dados.length; i++) {
                var dataPercentual = dados[i].Percentual;
                chartDataPercentual.push(dataPercentual);
            }


            if (myChart19) {
                myChart19.destroy();
            }

            $("#Classificacao5Diario-legenda").empty();
            $("#Classificacao5Diario-legenda").append("<i class='fa fa-line-chart' style='color: #2FFF00'></i>Média Dia – Mês Atual     <i class='fa fa-line-chart' style='color: #3e95cd'></i>Média Dia – Mês Anterior     <i class='fa fa-bar-chart' style='color: #722F37'></i>Faturamento Dia ");


            myChart19 = new Chart(document.getElementById("Classificacao5Diario-chart"), {
                type: 'bar',
                data: {
                    labels: chartDataDia,
                    datasets: [
                        {
                            label: "Média Dia – Mês Atual",
                            type: "line",
                            borderColor: "#2FFF00",
                            data: chartDataPercentual,
                            fill: false
                        },
                        {
                            label: "Média Dia – Mês Anterior",
                            type: "line",
                            borderColor: "#3e95cd",
                            data: chartDataMeta,
                            fill: false
                        }, {
                            label: "Faturamento Dia",
                            type: "bar",
                            backgroundColor: "#722F37",
                            data: chartDataClassificacao1
                        }
                    ]
                },
                options: {
                    title: {
                        display: true
                    },
                    legend: { display: false }
                }
            });

        },
        error: function (xhr, textStatus, errorThrown) {
            //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
        }
    });
}

function Classificacao6Diario() {
    var mes = $('select[id=mes]').val() == null ? mesAtual : $('select[id=mes]').val();

    var ano = $('select[id=ano]').val() == null ? anoAtual : $('select[id=ano]').val();

    var loja = $('select[id=ddlLojas]').val();


    $.ajax({
        url: baseUrl + '/Dashboard/RetornarClsVenAllDias',
        data: JSON.stringify({ 'mes': mes, 'ano': ano, 'cls': 6, 'loja': -1 }),
        headers: {
            'RequestVerificationToken': $('#antiForgeryToken').val(),
            'X-Requested-With': 'XMLHttpRequest'
        },
        type: "POST",
        dataType: 'json',
        contentType: 'application/json',
        cache: false,
        success: function (dados) {


            var chartDataDia = [];
            for (var i = 0; i < dados.length; i++) {
                var dataDia = dados[i].Dia;
                chartDataDia.push(dataDia);
            }


            var chartDataClassificacao1 = [];
            for (var i = 0; i < dados.length; i++) {
                var dataClassificacao1 = dados[i].Classificação1;
                chartDataClassificacao1.push(dataClassificacao1);
            }



            var chartDataMeta = [];
            for (var i = 0; i < dados.length; i++) {
                var dataMeta = dados[i].Meta;
                chartDataMeta.push(dataMeta);
            }

            var chartDataPercentual = [];
            for (var i = 0; i < dados.length; i++) {
                var dataPercentual = dados[i].Percentual;
                chartDataPercentual.push(dataPercentual);
            }


            if (myChart20) {
                myChart20.destroy();
            }

            $("#Classificacao6Diario-legenda").empty();
            $("#Classificacao6Diario-legenda").append("<i class='fa fa-line-chart' style='color: #2FFF00'></i>Média Dia – Mês Atual     <i class='fa fa-line-chart' style='color: #3e95cd'></i>Média Dia – Mês Anterior     <i class='fa fa-bar-chart' style='color: #722F37'></i>Faturamento Dia ");

            myChart20 = new Chart(document.getElementById("Classificacao6Diario-chart"), {
                type: 'bar',
                data: {
                    labels: chartDataDia,
                    datasets: [
                        {
                            label: "Média Dia – Mês Atual",
                            type: "line",
                            borderColor: "#2FFF00",
                            data: chartDataPercentual,
                            fill: false
                        },
                        {
                            label: "Média Dia – Mês Anterior",
                            type: "line",
                            borderColor: "#3e95cd",
                            data: chartDataMeta,
                            fill: false
                        }, {
                            label: "Faturamento Dia",
                            type: "bar",
                            backgroundColor: "#722F37",
                            data: chartDataClassificacao1
                        }
                    ]
                },
                options: {
                    title: {
                        display: true
                    },
                    legend: { display: false }
                }
            });

        },
        error: function (xhr, textStatus, errorThrown) {
            //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
        }
    });
}

function Classificacao7Diario() {
    var mes = $('select[id=mes]').val() == null ? mesAtual : $('select[id=mes]').val();

    var ano = $('select[id=ano]').val() == null ? anoAtual : $('select[id=ano]').val();

    var loja = $('select[id=ddlLojas]').val();


    $.ajax({
        url: baseUrl + '/Dashboard/RetornarClsVenAllDias',
        data: JSON.stringify({ 'mes': mes, 'ano': ano, 'cls': 7, 'loja': -1 }),
        headers: {
            'RequestVerificationToken': $('#antiForgeryToken').val(),
            'X-Requested-With': 'XMLHttpRequest'
        },
        type: "POST",
        dataType: 'json',
        contentType: 'application/json',
        cache: false,
        success: function (dados) {


            var chartDataDia = [];
            for (var i = 0; i < dados.length; i++) {
                var dataDia = dados[i].Dia;
                chartDataDia.push(dataDia);
            }


            var chartDataClassificacao1 = [];
            for (var i = 0; i < dados.length; i++) {
                var dataClassificacao1 = dados[i].Classificação1;
                chartDataClassificacao1.push(dataClassificacao1);
            }


            var chartDataMeta = [];
            for (var i = 0; i < dados.length; i++) {
                var dataMeta = dados[i].Meta;
                chartDataMeta.push(dataMeta);
            }

            var chartDataPercentual = [];
            for (var i = 0; i < dados.length; i++) {
                var dataPercentual = dados[i].Percentual;
                chartDataPercentual.push(dataPercentual);
            }

            if (myChart21) {
                myChart21.destroy();
            }

            $("#Classificacao7Diario-legenda").empty();
            $("#Classificacao7Diario-legenda").append("<i class='fa fa-line-chart' style='color: #2FFF00'></i>Média Dia – Mês Atual     <i class='fa fa-line-chart' style='color: #3e95cd'></i>Média Dia – Mês Anterior     <i class='fa fa-bar-chart' style='color: #722F37'></i>Faturamento Dia ");

            myChart21 = new Chart(document.getElementById("Classificacao7Diario-chart"), {
                type: 'bar',
                data: {
                    labels: chartDataDia,
                    datasets: [
                        {
                            label: "Média Dia – Mês Atual",
                            type: "line",
                            borderColor: "#2FFF00",
                            data: chartDataPercentual,
                            fill: false
                        },
                        {
                            label: "Média Dia – Mês Anterior",
                            type: "line",
                            borderColor: "#3e95cd",
                            data: chartDataMeta,
                            fill: false
                        }, {
                            label: "Faturamento Dia",
                            type: "bar",
                            backgroundColor: "#722F37",
                            data: chartDataClassificacao1
                        }
                    ]
                },
                options: {
                    title: {
                        display: true
                    },
                    legend: { display: false }
                }
            });

        },
        error: function (xhr, textStatus, errorThrown) {
            //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
        }
    });
}

function Classificacao8Diario() {
    var mes = $('select[id=mes]').val() == null ? mesAtual : $('select[id=mes]').val();

    var ano = $('select[id=ano]').val() == null ? anoAtual : $('select[id=ano]').val();

    var loja = $('select[id=ddlLojas]').val();


    $.ajax({
        url: baseUrl + '/Dashboard/RetornarClsVenAllDias',
        data: JSON.stringify({ 'mes': mes, 'ano': ano, 'cls': 8, 'loja': -1 }),
        headers: {
            'RequestVerificationToken': $('#antiForgeryToken').val(),
            'X-Requested-With': 'XMLHttpRequest'
        },
        type: "POST",
        dataType: 'json',
        contentType: 'application/json',
        cache: false,
        success: function (dados) {


            var chartDataDia = [];
            for (var i = 0; i < dados.length; i++) {
                var dataDia = dados[i].Dia;
                chartDataDia.push(dataDia);
            }


            var chartDataClassificacao1 = [];
            for (var i = 0; i < dados.length; i++) {
                var dataClassificacao1 = dados[i].Classificação1;
                chartDataClassificacao1.push(dataClassificacao1);
            }

            var chartDataMeta = [];
            for (var i = 0; i < dados.length; i++) {
                var dataMeta = dados[i].Meta;
                chartDataMeta.push(dataMeta);
            }

            var chartDataPercentual = [];
            for (var i = 0; i < dados.length; i++) {
                var dataPercentual = dados[i].Percentual;
                chartDataPercentual.push(dataPercentual);
            }

            if (myChart22) {
                myChart22.destroy();
            }

            $("#Classificacao8Diario-legenda").empty();
            $("#Classificacao8Diario-legenda").append("<i class='fa fa-line-chart' style='color: #2FFF00'></i>Média Dia – Mês Atual     <i class='fa fa-line-chart' style='color: #3e95cd'></i>Média Dia – Mês Anterior     <i class='fa fa-bar-chart' style='color: #722F37'></i>Faturamento Dia ");

            myChart22 = new Chart(document.getElementById("Classificacao8Diario-chart"), {
                type: 'bar',
                data: {
                    labels: chartDataDia,
                    datasets: [
                        {
                            label: "Média Dia – Mês Atual",
                            type: "line",
                            borderColor: "#2FFF00",
                            data: chartDataPercentual,
                            fill: false
                        },
                        {
                            label: "Média Dia – Mês Anterior",
                            type: "line",
                            borderColor: "#3e95cd",
                            data: chartDataMeta,
                            fill: false
                        }, {
                            label: "Faturamento Dia",
                            type: "bar",
                            backgroundColor: "#722F37",
                            data: chartDataClassificacao1
                        }
                    ]
                },
                options: {
                    title: {
                        display: true
                    },
                    legend: { display: false }
                }
            });

        },
        error: function (xhr, textStatus, errorThrown) {
            //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
        }
    });
}

function CarregarDadosLojas() {
    $.ajax({
        url: baseUrl + '/Dashboard/CarregarDadosIniciais',
        headers: {
            'RequestVerificationToken': $('#antiForgeryToken').val(),
            'X-Requested-With': 'XMLHttpRequest'
        },
        type: "POST",
        dataType: 'json',
        contentType: 'application/json',
        cache: false,
        success: function (dados) {

            //Combo Loja
            var comboLoja = document.getElementById("loja");
            for (var i = 0; i < dados.listLoja.length; i++) {
                var opt = document.createElement("option");
                opt.value = dados.listLoja[i].Uad;
                opt.text = dados.listLoja[i].Des;
                comboLoja.add(opt, comboLoja.options[0]);
                //$('#mes option[value="' + mesAtual + '"]').attr('selected', 'selected');
            }


        },
        error: function (xhr, textStatus, errorThrown) {
            TratarErro(xhr, textStatus, errorThrown, "Erro ao carregar o usuário.");
        }
    });
}

function CarregarDadosBalconistas() {
    var loja = $("#loja").val() == undefined ? -1 : $("#loja").val();

    $.ajax({
        url: baseUrl + '/Dashboard/RetornarBalconistas',
        data: JSON.stringify({ 'uad': loja }),
        headers: {
            'RequestVerificationToken': $('#antiForgeryToken').val(),
            'X-Requested-With': 'XMLHttpRequest'
        },
        type: "POST",
        dataType: 'json',
        contentType: 'application/json',
        cache: false,
        success: function (dados) {

            //Combo Balconistas
            var comboBalconista = document.getElementById("balconista");
            for (var i = 0; i < dados.listBalconista.length; i++) {
                var opt = document.createElement("option");
                opt.value = dados.listBalconista[i].Cod;
                opt.text = dados.listBalconista[i].Nom;
                comboBalconista.add(opt, comboBalconista.options[0]);
                //$('#mes option[value="' + mesAtual + '"]').attr('selected', 'selected');
            }


        },
        error: function (xhr, textStatus, errorThrown) {
            TratarErro(xhr, textStatus, errorThrown, "Erro ao carregar os balconistas.");
        }
    });
}

function DataTableGridFaturamentoBruto() {

    var mes = $('select[id=mes]').val() == null ? mesAtual : $('select[id=mes]').val();

    var ano = $('select[id=ano]').val() == null ? anoAtual : $('select[id=ano]').val();


    $.ajax({
        url: baseUrl + '/DashboardVendas/RetornarGridVenUadTotal',
        data: JSON.stringify({ 'mes': mes, 'ano': ano }),
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

                data = [dados[i].Data,
                dados[i].TotalLojas,
                dados[i].Lucro,
                dados[i].Bruto,
                dados[i].Liquida,
                dados[i].Desconto,
                dados[i].PercentualMargem,
                dados[i].QtMediaClientes,
                dados[i].ClientesAtendidos,
                dados[i].Custo,
                dados[i].Devolucao]


                dataSet.push(data);
            }
            $(document).ready(function () {
                $('#example').DataTable({
                    data: dataSet,
                    columns: [
                        { title: "Data" },
                        { title: "Total de Lojas" },
                        { title: "Lucro" },
                        { title: "Venda Bruta" },
                        { title: "Valor de Liquído" },
                        { title: "Valor de Desconto" },
                        { title: "Percentual de Margem" },
                        { title: "Quantidade Média de Clientes" },
                        { title: "Clientes Atendidos" },
                        { title: "Custo" },
                        { title: "Valor de Devolução" }


                    ],
                    "bDestroy": true,
                    deferRender: true,
                    scroller: true,
                    "scrollX": true
                });
            });
        },
        error: function (xhr, textStatus, errorThrown) {
            //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
        }
    });
}

function DataTableGridFaturamentoLiquido() {



    var mes = $('select[id=mes]').val() == null ? mesAtual : $('select[id=mes]').val();

    var ano = $('select[id=ano]').val() == null ? anoAtual : $('select[id=ano]').val();


    $.ajax({
        url: baseUrl + '/DashboardVendas/RetornarGridVenUad',
        data: JSON.stringify({ 'mes': mes, 'ano': ano }),
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

                data = [dados[i].Data,
                dados[i].Loja,
                dados[i].Bruto,
                dados[i].Desconto,
                dados[i].Devolucao,
                dados[i].Liquida,
                dados[i].Lucro,
                dados[i].PercentualMargem,
                dados[i].TicketMedio,
                dados[i].QtMediaClientes,
                dados[i].ClientesAtendidos]


                dataSet.push(data);
            }
            $(document).ready(function () {
                $('#dtVendas').DataTable({
                    data: dataSet,
                    columns: [
                        { title: "Data" },
                        { title: "Loja" },
                        { title: "Valor Bruto" },
                        { title: "Valor do Desconto" },
                        { title: "Valor de Devolução" },
                        { title: "Valor Líquido" },
                        { title: "Lucro" },
                        { title: "Percentual Margem" },
                        { title: "Ticket Médio" },
                        { title: "Média de Clientes" },
                        { title: "Quantidade Clientes Atendidos" }


                    ],
                    "bDestroy": true,
                    deferRender: true,
                    scroller: true,
                    "scrollX": true
                });
            });
        },
        error: function (xhr, textStatus, errorThrown) {
            //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
        }
    });
}

function StackedBarBalconistaAnual() {

    var ano = $('select[id=ano]').val() == null ? anoAtual : $('select[id=ano]').val();

    var loja = $('select[id=loja]').val();

    var balconista = $('select[id=balconista]').val();

    $.ajax({
        url: baseUrl + '/Dashboard/RetornarViewBalconistasAnual',
        data: JSON.stringify({ 'idloja': loja, 'ano': ano, 'idBalconista': balconista }),
        headers: {
            'RequestVerificationToken': $('#antiForgeryToken').val(),
            'X-Requested-With': 'XMLHttpRequest'
        },
        type: "POST",
        dataType: 'json',
        contentType: 'application/json',
        cache: false,
        success: function (dados) {

            if (myChart23) {
                myChart23.destroy();
            }


            var ctx = document.getElementById("balconistaAnual-chart");
            myChart23 = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ["Janeiro", "Fevereiro", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
                    datasets: [
                        {
                            label: dados[0].NomeClassificação1,
                            data: [dados[0].MediaJaneiroClassificacao1, dados[0].MediaFevereiroClassificacao1, dados[0].MediaMarçoClassificacao1, dados[0].MediaAbrilClassificacao1, dados[0].MediaMaioClassificacao1, dados[0].MediaJunhoClassificacao1, dados[0].MediaJulhoClassificacao1, dados[0].MediaAgostoClassificacao1, dados[0].MediaSetembroClassificacao1, dados[0].MediaOutubroClassificacao1, dados[0].MediaNovembroClassificacao1, dados[0].MediaDezembroClassificacao1],
                            backgroundColor: '#b3b3b3',
                            borderWidth: 2
                        },
                        {
                            label: dados[0].NomeClassificação2,
                            data: [dados[0].MediaJaneiroClassificacao2, dados[0].MediaFevereiroClassificacao2, dados[0].MediaMarçoClassificacao2, dados[0].MediaAbrilClassificacao2, dados[0].MediaMaioClassificacao2, dados[0].MediaJunhoClassificacao2, dados[0].MediaJulhoClassificacao2, dados[0].MediaAgostoClassificacao2, dados[0].MediaSetembroClassificacao2, dados[0].MediaOutubroClassificacao2, dados[0].MediaNovembroClassificacao2, dados[0].MediaDezembroClassificacao2],
                            backgroundColor: '#ff6666',
                            borderWidth: 2
                        },
                        {
                            label: dados[0].NomeClassificação3,
                            data: [dados[0].MediaJaneiroClassificacao3, dados[0].MediaFevereiroClassificacao3, dados[0].MediaMarçoClassificacao3, dados[0].MediaAbrilClassificacao3, dados[0].MediaMaioClassificacao3, dados[0].MediaJunhoClassificacao3, dados[0].MediaJulhoClassificacao3, dados[0].MediaAgostoClassificacao3, dados[0].MediaSetembroClassificacao3, dados[0].MediaOutubroClassificacao3, dados[0].MediaNovembroClassificacao3, dados[0].MediaDezembroClassificacao3],
                            backgroundColor: '#00ff00',
                            borderWidth: 2
                        },
                        {
                            label: dados[0].NomeClassificação4,
                            data: [dados[0].MediaJaneiroClassificacao4, dados[0].MediaFevereiroClassificacao4, dados[0].MediaMarçoClassificacao4, dados[0].MediaAbrilClassificacao4, dados[0].MediaMaioClassificacao4, dados[0].MediaJunhoClassificacao4, dados[0].MediaJulhoClassificacao4, dados[0].MediaAgostoClassificacao4, dados[0].MediaSetembroClassificacao4, dados[0].MediaOutubroClassificacao4, dados[0].MediaNovembroClassificacao4, dados[0].MediaDezembroClassificacao4],
                            backgroundColor: '#ff9933',
                            borderWidth: 2
                        },
                        {
                            label: dados[0].NomeClassificação5,
                            data: [dados[0].MediaJaneiroClassificacao5, dados[0].MediaFevereiroClassificacao5, dados[0].MediaMarçoClassificacao5, dados[0].MediaAbrilClassificacao5, dados[0].MediaMaioClassificacao5, dados[0].MediaJunhoClassificacao5, dados[0].MediaJulhoClassificacao5, dados[0].MediaAgostoClassificacao5, dados[0].MediaSetembroClassificacao5, dados[0].MediaOutubroClassificacao5, dados[0].MediaNovembroClassificacao5, dados[0].MediaDezembroClassificacao5],
                            backgroundColor: '#66ffcc',
                            borderWidth: 2
                        },
                        {
                            label: dados[0].NomeClassificação6,
                            data: [dados[0].MediaJaneiroClassificacao6, dados[0].MediaFevereiroClassificacao6, dados[0].MediaMarçoClassificacao6, dados[0].MediaAbrilClassificacao6, dados[0].MediaMaioClassificacao6, dados[0].MediaJunhoClassificacao6, dados[0].MediaJulhoClassificacao6, dados[0].MediaAgostoClassificacao6, dados[0].MediaSetembroClassificacao6, dados[0].MediaOutubroClassificacao6, dados[0].MediaNovembroClassificacao6, dados[0].MediaDezembroClassificacao6],
                            backgroundColor: '#ff0066',
                            borderWidth: 2
                        },
                        {
                            label: dados[0].NomeClassificação7,
                            data: [dados[0].MediaJaneiroClassificacao7, dados[0].MediaFevereiroClassificacao7, dados[0].MediaMarçoClassificacao7, dados[0].MediaAbrilClassificacao7, dados[0].MediaMaioClassificacao7, dados[0].MediaJunhoClassificacao7, dados[0].MediaJulhoClassificacao7, dados[0].MediaAgostoClassificacao7, dados[0].MediaSetembroClassificacao7, dados[0].MediaOutubroClassificacao7, dados[0].MediaNovembroClassificacao7, dados[0].MediaDezembroClassificacao7],
                            backgroundColor: '#33cc33',
                            borderWidth: 2
                        },
                        {
                            label: dados[0].NomeClassificação8,
                            data: [dados[0].MediaJaneiroClassificacao8, dados[0].MediaFevereiroClassificacao8, dados[0].MediaMarçoClassificacao8, dados[0].MediaAbrilClassificacao8, dados[0].MediaMaioClassificacao8, dados[0].MediaJunhoClassificacao8, dados[0].MediaJulhoClassificacao8, dados[0].MediaAgostoClassificacao8, dados[0].MediaSetembroClassificacao8, dados[0].MediaOutubroClassificacao8, dados[0].MediaNovembroClassificacao8, dados[0].MediaDezembroClassificacao8],
                            backgroundColor: '#ffff00',
                            borderWidth: 2
                        }


                    ]
                },
                options: {
                    scales: {
                        yAxes: [{
                            stacked: true,
                            ticks: {
                                beginAtZero: true
                            }
                        }],
                        xAxes: [{
                            stacked: true,
                            ticks: {
                                beginAtZero: true
                            }
                        }]

                    }
                }
            });
        },
        error: function (xhr, textStatus, errorThrown) {
            //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
        }
    });
}

function StackedBarBalconistaMesAtual() {

    var loja = $('select[id=loja]').val() == null ? 164 : $('select[id=loja]').val();


    $.ajax({
        url: baseUrl + '/Dashboard/RetornarViewBalconistasMensal',
        data: JSON.stringify({ 'idloja': loja, 'mesGrafico': -1 }),
        headers: {
            'RequestVerificationToken': $('#antiForgeryToken').val(),
            'X-Requested-With': 'XMLHttpRequest'
        },
        type: "POST",
        dataType: 'json',
        contentType: 'application/json',
        cache: false,
        success: function (dados) {


            var chartNomesBalconistas = [];
            for (var i = 0; i < dados.listViewBalconista.length; i++) {
                var nomes = dados.listViewBalconista[i].NomeBalconista;
                chartNomesBalconistas.push(nomes);
            }


            var chartBalconistaClassificacao1 = [];
            for (var i = 0; i < dados.listBalconistaClassificacao1.length; i++) {
                var valores = dados.listBalconistaClassificacao1[i].Valor;
                chartBalconistaClassificacao1.push(valores);
            }


            var chartBalconistaClassificacao2 = [];
            for (var i = 0; i < dados.listBalconistaClassificacao2.length; i++) {
                var valores = dados.listBalconistaClassificacao2[i].Valor;
                chartBalconistaClassificacao2.push(valores);
            }


            var chartBalconistaClassificacao3 = [];
            for (var i = 0; i < dados.listBalconistaClassificacao3.length; i++) {
                var valores = dados.listBalconistaClassificacao3[i].Valor;
                chartBalconistaClassificacao3.push(valores);
            }


            var chartBalconistaClassificacao4 = [];
            for (var i = 0; i < dados.listBalconistaClassificacao4.length; i++) {
                var valores = dados.listBalconistaClassificacao4[i].Valor;
                chartBalconistaClassificacao4.push(valores);
            }

            var chartBalconistaClassificacao5 = [];
            for (var i = 0; i < dados.listBalconistaClassificacao5.length; i++) {
                var valores = dados.listBalconistaClassificacao5[i].Valor;
                chartBalconistaClassificacao5.push(valores);
            }

            var chartBalconistaClassificacao6 = [];
            for (var i = 0; i < dados.listBalconistaClassificacao6.length; i++) {
                var valores = dados.listBalconistaClassificacao6[i].Valor;
                chartBalconistaClassificacao6.push(valores);
            }

            var chartBalconistaClassificacao7 = [];
            for (var i = 0; i < dados.listBalconistaClassificacao7.length; i++) {
                var valores = dados.listBalconistaClassificacao7[i].Valor;
                chartBalconistaClassificacao7.push(valores);
            }

            var chartBalconistaClassificacao8 = [];
            for (var i = 0; i < dados.listBalconistaClassificacao8.length; i++) {
                var valores = dados.listBalconistaClassificacao8[i].Valor;
                chartBalconistaClassificacao8.push(valores);
            }


            if (myChart24) {
                myChart24.destroy();
            }


            var ctx = document.getElementById("balconistaMesAtual-chart");
            myChart24 = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: chartNomesBalconistas,
                    datasets: [
                        //{
                        //    label: '%EV',
                        //    type: "bubble",
                        //    data: chartBalconistaClassificacao1,
                        //    backgroundColor: '#0000cc'


                        //},
                        {
                            label: dados.nomeClassificacoes.NomeClassificação1,
                            data: chartBalconistaClassificacao1,
                            backgroundColor: '#b3b3b3',
                            borderWidth: 2
                        },
                        {
                            label: dados.nomeClassificacoes.NomeClassificação2,
                            data: chartBalconistaClassificacao2,
                            backgroundColor: '#ff6666',
                            borderWidth: 2
                        },
                        {
                            label: dados.nomeClassificacoes.NomeClassificação3,
                            data: chartBalconistaClassificacao3,
                            backgroundColor: '#00ff00',
                            borderWidth: 2
                        },
                        {
                            label: dados.nomeClassificacoes.NomeClassificação4,
                            data: chartBalconistaClassificacao4,
                            backgroundColor: '#ff9933',
                            borderWidth: 2
                        },
                        {
                            label: dados.nomeClassificacoes.NomeClassificação5,
                            data: chartBalconistaClassificacao5,
                            backgroundColor: '#66ffcc',
                            borderWidth: 2
                        },
                        {
                            label: dados.nomeClassificacoes.NomeClassificação6,
                            data: chartBalconistaClassificacao6,
                            backgroundColor: '#ff0066',
                            borderWidth: 2
                        },
                        {
                            label: dados.nomeClassificacoes.NomeClassificação7,
                            data: chartBalconistaClassificacao7,
                            backgroundColor: '#33cc33',
                            borderWidth: 2
                        },
                        {
                            label: dados.nomeClassificacoes.NomeClassificação8,
                            data: chartBalconistaClassificacao8,
                            backgroundColor: '#ffff00',
                            borderWidth: 2
                        }


                    ]
                },
                options: {
                    scales: {
                        yAxes: [{
                            stacked: true,
                            ticks: {
                                beginAtZero: true
                            }
                        }],
                        xAxes: [{
                            stacked: true,
                            ticks: {
                                beginAtZero: true
                            }
                        }]

                    }
                }
            });
        },
        error: function (xhr, textStatus, errorThrown) {
            //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
        }
    });
}

function StackedBarBalconistaMesPassado() {

    var loja = $('select[id=loja]').val() == null ? 164 : $('select[id=loja]').val();


    $.ajax({
        url: baseUrl + '/Dashboard/RetornarViewBalconistasMensal',
        data: JSON.stringify({ 'idloja': loja, 'mesGrafico': 1 }),
        headers: {
            'RequestVerificationToken': $('#antiForgeryToken').val(),
            'X-Requested-With': 'XMLHttpRequest'
        },
        type: "POST",
        dataType: 'json',
        contentType: 'application/json',
        cache: false,
        success: function (dados) {



            var chartNomesBalconistas = [];
            for (var i = 0; i < dados.listViewBalconista.length; i++) {
                var nomes = dados.listViewBalconista[i].NomeBalconista;
                chartNomesBalconistas.push(nomes);
            }


            var chartBalconistaClassificacao1 = [];
            for (var i = 0; i < dados.listBalconistaClassificacao1.length; i++) {
                var valores = dados.listBalconistaClassificacao1[i].Valor;
                chartBalconistaClassificacao1.push(valores);
            }


            var chartBalconistaClassificacao2 = [];
            for (var i = 0; i < dados.listBalconistaClassificacao2.length; i++) {
                var valores = dados.listBalconistaClassificacao2[i].Valor;
                chartBalconistaClassificacao2.push(valores);
            }


            var chartBalconistaClassificacao3 = [];
            for (var i = 0; i < dados.listBalconistaClassificacao3.length; i++) {
                var valores = dados.listBalconistaClassificacao3[i].Valor;
                chartBalconistaClassificacao3.push(valores);
            }


            var chartBalconistaClassificacao4 = [];
            for (var i = 0; i < dados.listBalconistaClassificacao4.length; i++) {
                var valores = dados.listBalconistaClassificacao4[i].Valor;
                chartBalconistaClassificacao4.push(valores);
            }

            var chartBalconistaClassificacao5 = [];
            for (var i = 0; i < dados.listBalconistaClassificacao5.length; i++) {
                var valores = dados.listBalconistaClassificacao5[i].Valor;
                chartBalconistaClassificacao5.push(valores);
            }

            var chartBalconistaClassificacao6 = [];
            for (var i = 0; i < dados.listBalconistaClassificacao6.length; i++) {
                var valores = dados.listBalconistaClassificacao6[i].Valor;
                chartBalconistaClassificacao6.push(valores);
            }

            var chartBalconistaClassificacao7 = [];
            for (var i = 0; i < dados.listBalconistaClassificacao7.length; i++) {
                var valores = dados.listBalconistaClassificacao7[i].Valor;
                chartBalconistaClassificacao7.push(valores);
            }

            var chartBalconistaClassificacao8 = [];
            for (var i = 0; i < dados.listBalconistaClassificacao8.length; i++) {
                var valores = dados.listBalconistaClassificacao8[i].Valor;
                chartBalconistaClassificacao8.push(valores);
            }


            if (myChart25) {
                myChart25.destroy();
            }


            var ctx = document.getElementById("balconistaMesPassado-chart");
            myChart25 = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: chartNomesBalconistas,
                    datasets: [
                        //{
                        //    label: '%EV',
                        //    type: "bubble",
                        //    data: chartBalconistaClassificacao1,
                        //    backgroundColor: '#0000cc'


                        //},
                        {
                            label: dados.nomeClassificacoes.NomeClassificação1,
                            data: chartBalconistaClassificacao1,
                            backgroundColor: '#b3b3b3',
                            borderWidth: 2
                        },
                        {
                            label: dados.nomeClassificacoes.NomeClassificação2,
                            data: chartBalconistaClassificacao2,
                            backgroundColor: '#ff6666',
                            borderWidth: 2
                        },
                        {
                            label: dados.nomeClassificacoes.NomeClassificação3,
                            data: chartBalconistaClassificacao3,
                            backgroundColor: '#00ff00',
                            borderWidth: 2
                        },
                        {
                            label: dados.nomeClassificacoes.NomeClassificação4,
                            data: chartBalconistaClassificacao4,
                            backgroundColor: '#ff9933',
                            borderWidth: 2
                        },
                        {
                            label: dados.nomeClassificacoes.NomeClassificação5,
                            data: chartBalconistaClassificacao5,
                            backgroundColor: '#66ffcc',
                            borderWidth: 2
                        },
                        {
                            label: dados.nomeClassificacoes.NomeClassificação6,
                            data: chartBalconistaClassificacao6,
                            backgroundColor: '#ff0066',
                            borderWidth: 2
                        },
                        {
                            label: dados.nomeClassificacoes.NomeClassificação7,
                            data: chartBalconistaClassificacao7,
                            backgroundColor: '#33cc33',
                            borderWidth: 2
                        },
                        {
                            label: dados.nomeClassificacoes.NomeClassificação8,
                            data: chartBalconistaClassificacao8,
                            backgroundColor: '#ffff00',
                            borderWidth: 2
                        }


                    ]
                },
                options: {
                    scales: {
                        yAxes: [{
                            stacked: true,
                            ticks: {
                                beginAtZero: true
                            }
                        }],
                        xAxes: [{
                            stacked: true,
                            ticks: {
                                beginAtZero: true
                            }
                        }]

                    }
                }
            });
        },
        error: function (xhr, textStatus, errorThrown) {
            //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
        }
    });
}

function StackedBarBalconistaMesRetrasado() {

    var loja = $('select[id=loja]').val() == null ? 164 : $('select[id=loja]').val();

    $.ajax({
        url: baseUrl + '/Dashboard/RetornarViewBalconistasMensal',
        data: JSON.stringify({ 'idloja': loja, 'mesGrafico': 2 }),
        headers: {
            'RequestVerificationToken': $('#antiForgeryToken').val(),
            'X-Requested-With': 'XMLHttpRequest'
        },
        type: "POST",
        dataType: 'json',
        contentType: 'application/json',
        cache: false,
        success: function (dados) {



            var chartNomesBalconistas = [];
            for (var i = 0; i < dados.listViewBalconista.length; i++) {
                var nomes = dados.listViewBalconista[i].NomeBalconista;
                chartNomesBalconistas.push(nomes);
            }


            var chartBalconistaClassificacao1 = [];
            for (var i = 0; i < dados.listBalconistaClassificacao1.length; i++) {
                var valores = dados.listBalconistaClassificacao1[i].Valor;
                chartBalconistaClassificacao1.push(valores);
            }


            var chartBalconistaClassificacao2 = [];
            for (var i = 0; i < dados.listBalconistaClassificacao2.length; i++) {
                var valores = dados.listBalconistaClassificacao2[i].Valor;
                chartBalconistaClassificacao2.push(valores);
            }


            var chartBalconistaClassificacao3 = [];
            for (var i = 0; i < dados.listBalconistaClassificacao3.length; i++) {
                var valores = dados.listBalconistaClassificacao3[i].Valor;
                chartBalconistaClassificacao3.push(valores);
            }


            var chartBalconistaClassificacao4 = [];
            for (var i = 0; i < dados.listBalconistaClassificacao4.length; i++) {
                var valores = dados.listBalconistaClassificacao4[i].Valor;
                chartBalconistaClassificacao4.push(valores);
            }

            var chartBalconistaClassificacao5 = [];
            for (var i = 0; i < dados.listBalconistaClassificacao5.length; i++) {
                var valores = dados.listBalconistaClassificacao5[i].Valor;
                chartBalconistaClassificacao5.push(valores);
            }

            var chartBalconistaClassificacao6 = [];
            for (var i = 0; i < dados.listBalconistaClassificacao6.length; i++) {
                var valores = dados.listBalconistaClassificacao6[i].Valor;
                chartBalconistaClassificacao6.push(valores);
            }

            var chartBalconistaClassificacao7 = [];
            for (var i = 0; i < dados.listBalconistaClassificacao7.length; i++) {
                var valores = dados.listBalconistaClassificacao7[i].Valor;
                chartBalconistaClassificacao7.push(valores);
            }

            var chartBalconistaClassificacao8 = [];
            for (var i = 0; i < dados.listBalconistaClassificacao8.length; i++) {
                var valores = dados.listBalconistaClassificacao8[i].Valor;
                chartBalconistaClassificacao8.push(valores);
            }

            if (myChart26) {
                myChart26.destroy();
            }

            var ctx = document.getElementById("balconistaMesRetrasado-chart");
            myChart26 = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: chartNomesBalconistas,
                    datasets: [
                        //{
                        //    label: '%EV',
                        //    type: "bubble",
                        //    data: chartBalconistaClassificacao1,
                        //    backgroundColor: '#0000cc'


                        //},
                        {
                            label: dados.nomeClassificacoes.NomeClassificação1,
                            data: chartBalconistaClassificacao1,
                            backgroundColor: '#b3b3b3',
                            borderWidth: 2
                        },
                        {
                            label: dados.nomeClassificacoes.NomeClassificação2,
                            data: chartBalconistaClassificacao2,
                            backgroundColor: '#ff6666',
                            borderWidth: 2
                        },
                        {
                            label: dados.nomeClassificacoes.NomeClassificação3,
                            data: chartBalconistaClassificacao3,
                            backgroundColor: '#00ff00',
                            borderWidth: 2
                        },
                        {
                            label: dados.nomeClassificacoes.NomeClassificação4,
                            data: chartBalconistaClassificacao4,
                            backgroundColor: '#ff9933',
                            borderWidth: 2
                        },
                        {
                            label: dados.nomeClassificacoes.NomeClassificação5,
                            data: chartBalconistaClassificacao5,
                            backgroundColor: '#66ffcc',
                            borderWidth: 2
                        },
                        {
                            label: dados.nomeClassificacoes.NomeClassificação6,
                            data: chartBalconistaClassificacao6,
                            backgroundColor: '#ff0066',
                            borderWidth: 2
                        },
                        {
                            label: dados.nomeClassificacoes.NomeClassificação7,
                            data: chartBalconistaClassificacao7,
                            backgroundColor: '#33cc33',
                            borderWidth: 2
                        },
                        {
                            label: dados.nomeClassificacoes.NomeClassificação8,
                            data: chartBalconistaClassificacao8,
                            backgroundColor: '#ffff00',
                            borderWidth: 2
                        }


                    ]
                },
                options: {
                    scales: {
                        yAxes: [{
                            stacked: true,
                            ticks: {
                                beginAtZero: true
                            }
                        }],
                        xAxes: [{
                            stacked: true,
                            ticks: {
                                beginAtZero: true
                            }
                        }]

                    }
                }
            });
        },
        error: function (xhr, textStatus, errorThrown) {
            //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
        }
    });
}

function TodasClassificacoes() {
    var mes = $('select[id=mes]').val() == null ? mesAtual : $('select[id=mes]').val();

    var ano = $('select[id=ano]').val() == null ? anoAtual : $('select[id=ano]').val();

    var loja = $('select[id=ddlLojas]').val();

    $.ajax({
        url: baseUrl + '/Dashboard/RetornarClsVenAllGrafico',
        data: JSON.stringify({ 'mes': mes, 'ano': ano, 'loja': -1 }),
        headers: {
            'RequestVerificationToken': $('#antiForgeryToken').val(),
            'X-Requested-With': 'XMLHttpRequest'
        },
        type: "POST",
        dataType: 'json',
        contentType: 'application/json',
        cache: false,
        success: function (dados) {

            $('#spanClassificacao1').replaceWith('Classificação ' + dados[0].NomeClassificação1 + '');
            $('#spanClassificacao2').replaceWith('Classificação ' + dados[0].NomeClassificação2 + '');
            $('#spanClassificacao3').replaceWith('Classificação ' + dados[0].NomeClassificação3 + '');
            $('#spanClassificacao4').replaceWith('Classificação ' + dados[0].NomeClassificação4 + '');
            $('#spanClassificacao5').replaceWith('Classificação ' + dados[0].NomeClassificação5 + '');
            $('#spanClassificacao6').replaceWith('Classificação ' + dados[0].NomeClassificação6 + '');
            $('#spanClassificacao7').replaceWith('Classificação ' + dados[0].NomeClassificação7 + '');
            $('#spanClassificacao8').replaceWith('Classificação ' + dados[0].NomeClassificação8 + '');


            if (myChart3) {
                myChart3.destroy();
            }

            myChart3 = new Chart(document.getElementById("todasClassificacoes-chart"), {
                type: 'bar',
                data: {
                    labels: [dados[0].NomeClassificação1,
                    dados[0].NomeClassificação2,
                    dados[0].NomeClassificação3,
                    dados[0].NomeClassificação4,
                    dados[0].NomeClassificação5,
                    dados[0].NomeClassificação6,
                    dados[0].NomeClassificação7,
                    dados[0].NomeClassificação8],
                    datasets: [
                        {
                            label: "Faturamento - " + anoAnterior + "",
                            type: "line",
                            borderColor: "#3e95cd",
                            data: [dados[0].Classificação1Anterior,
                            dados[0].Classificação2Anterior,
                            dados[0].Classificação3Anterior,
                            dados[0].Classificação4Anterior,
                            dados[0].Classificação5Anterior,
                            dados[0].Classificação6Anterior,
                            dados[0].Classificação7Anterior,
                            dados[0].Classificação8Anterior],
                            fill: false
                        }, {
                            label: "Faturamento - " + ano + "",
                            type: "bar",
                            backgroundColor: "#722F37",
                            data: [dados[0].Classificação1,
                            dados[0].Classificação2,
                            dados[0].Classificação3,
                            dados[0].Classificação4,
                            dados[0].Classificação5,
                            dados[0].Classificação6,
                            dados[0].Classificação7,
                            dados[0].Classificação8]
                        }
                    ]
                },
                options: {
                    title: {
                        display: true
                    },
                    legend: { display: true }
                }
            });

        },
        error: function (xhr, textStatus, errorThrown) {
            //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
        }
    });
}

function TickeMedioMes() {
    var mes = $('select[id=mes]').val() == null ? mesAtual : $('select[id=mes]').val();

    var ano = $('select[id=ano]').val() == null ? anoAtual : $('select[id=ano]').val();

    var loja = $('select[id=ddlLojas]').val();

    $.ajax({
        url: baseUrl + '/Dashboard/RetornarTicketMedioMeses',
        data: JSON.stringify({ 'ano': ano, 'loja': -1 }),
        headers: {
            'RequestVerificationToken': $('#antiForgeryToken').val(),
            'X-Requested-With': 'XMLHttpRequest'
        },
        type: "POST",
        dataType: 'json',
        contentType: 'application/json',
        cache: false,
        success: function (dados) {

            if (myChart4) {
                myChart4.destroy();
            }

            $("#ticketMedioMes-legenda").empty();
            $("#ticketMedioMes-legenda").append("<i class='fa fa-line-chart' style='color: #3e95cd'></i>Faturamento - " + anoAnterior + "   <i class='fa fa-bar-chart' style='color: #722F37'></i>Faturamento - " + ano + "  ");

            myChart4 = new Chart(document.getElementById("ticketMedioMes"), {
                type: 'bar',
                data: {
                    labels: ["Jan", "Fev", "Mar", "Abr", "Maio", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
                    datasets: [
                        {
                            label: "Faturamento - " + anoAnterior + "",
                            type: "line",
                            borderColor: "#3e95cd",
                            data: [dados[0].MediaJaneiroAnterior,
                            dados[0].MediaFevereiroAnterior,
                            dados[0].MediaMarçoAnterior,
                            dados[0].MediaAbrilAnterior,
                            dados[0].MediaMaioAnterior,
                            dados[0].MediaJunhoAnterior,
                            dados[0].MediaJulhoAnterior,
                            dados[0].MediaAgostoAnterior,
                            dados[0].MediaSetembroAnterior,
                            dados[0].MediaOutubroAnterior,
                            dados[0].MediaNovembroAnterior,
                            dados[0].MediaDezembroAnterior],
                            fill: false
                        }, {
                            label: "Faturamento - " + ano + "",
                            type: "bar",
                            backgroundColor: "#722F37",
                            data: [dados[0].MediaJaneiro,
                            dados[0].MediaFevereiro,
                            dados[0].MediaMarço,
                            dados[0].MediaAbril,
                            dados[0].MediaMaio,
                            dados[0].MediaJunho,
                            dados[0].MediaJulho,
                            dados[0].MediaAgosto,
                            dados[0].MediaSetembro,
                            dados[0].MediaOutubro,
                            dados[0].MediaNovembro,
                            dados[0].MediaDezembro
                            ]
                        }
                    ]
                },
                options: {
                    title: {
                        display: true
                    },
                    legend: { display: false }
                }
            });

        },
        error: function (xhr, textStatus, errorThrown) {
            //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
        }
    });
}

function TotalClientesMes() {
    var mes = $('select[id=mes]').val() == null ? mesAtual : $('select[id=mes]').val();

    var ano = $('select[id=ano]').val() == null ? anoAtual : $('select[id=ano]').val();

    var loja = $('select[id=ddlLojas]').val();

    $.ajax({
        url: baseUrl + '/Dashboard/RetornarTicketMedioClientesMeses',
        data: JSON.stringify({ 'ano': ano, 'loja': -1 }),
        headers: {
            'RequestVerificationToken': $('#antiForgeryToken').val(),
            'X-Requested-With': 'XMLHttpRequest'
        },
        type: "POST",
        dataType: 'json',
        contentType: 'application/json',
        cache: false,
        success: function (dados) {

            if (myChart5) {
                myChart5.destroy();
            }

            $("#totalClientesMes-legenda").empty();
            $("#totalClientesMes-legenda").append("<i class='fa fa-line-chart' style='color: #3e95cd'></i>Faturamento - " + anoAnterior + "   <i class='fa fa-bar-chart' style='color: #722F37'></i>Faturamento - " + ano + "  ");

            myChart5 = new Chart(document.getElementById("totalClientesMes"), {
                type: 'bar',
                data: {
                    labels: ["Jan", "Fev", "Mar", "Abr", "Maio", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
                    datasets: [
                        {
                            label: "Faturamento - " + anoAnterior + "",
                            type: "line",
                            borderColor: "#3e95cd",
                            data: [dados[0].MediaJaneiroAnterior,
                            dados[0].MediaFevereiroAnterior,
                            dados[0].MediaMarçoAnterior,
                            dados[0].MediaAbrilAnterior,
                            dados[0].MediaMaioAnterior,
                            dados[0].MediaJunhoAnterior,
                            dados[0].MediaJulhoAnterior,
                            dados[0].MediaAgostoAnterior,
                            dados[0].MediaSetembroAnterior,
                            dados[0].MediaOutubroAnterior,
                            dados[0].MediaNovembroAnterior,
                            dados[0].MediaDezembroAnterior],
                            fill: false
                        }, {
                            label: "Faturamento - " + ano + "",
                            type: "bar",
                            backgroundColor: "#722F37",
                            data: [dados[0].MediaJaneiro,
                            dados[0].MediaFevereiro,
                            dados[0].MediaMarço,
                            dados[0].MediaAbril,
                            dados[0].MediaMaio,
                            dados[0].MediaJunho,
                            dados[0].MediaJulho,
                            dados[0].MediaAgosto,
                            dados[0].MediaSetembro,
                            dados[0].MediaOutubro,
                            dados[0].MediaNovembro,
                            dados[0].MediaDezembro
                            ]
                        }
                    ]
                },
                options: {
                    title: {
                        display: true
                    },
                    legend: { display: false }
                }
            });

        },
        error: function (xhr, textStatus, errorThrown) {
            //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
        }
    });
}

function TotaltensVendidosMes() {
    var mes = $('select[id=mes]').val() == null ? mesAtual : $('select[id=mes]').val();

    var ano = $('select[id=ano]').val() == null ? anoAtual : $('select[id=ano]').val();

    var loja = $('select[id=ddlLojas]').val();

    $.ajax({
        url: baseUrl + '/Dashboard/RetornarTicketMedioItensMeses',
        data: JSON.stringify({ 'ano': ano, 'loja': -1 }),
        headers: {
            'RequestVerificationToken': $('#antiForgeryToken').val(),
            'X-Requested-With': 'XMLHttpRequest'
        },
        type: "POST",
        dataType: 'json',
        contentType: 'application/json',
        cache: false,
        success: function (dados) {
            if (myChart6) {
                myChart6.destroy();
            }

            $("#totalItensVendidosMes-legenda").empty();
            $("#totalItensVendidosMes-legenda").append("<i class='fa fa-line-chart' style='color: #3e95cd'></i>Faturamento - " + anoAnterior + "   <i class='fa fa-bar-chart' style='color: #722F37'></i>Faturamento - " + ano + "  ");

            myChart6 = new Chart(document.getElementById("totalItensVendidosMes"), {
                type: 'bar',
                data: {
                    labels: ["Jan", "Fev", "Mar", "Abr", "Maio", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
                    datasets: [
                        {
                            label: "Faturamento - " + anoAnterior + "",
                            type: "line",
                            borderColor: "#3e95cd",
                            data: [dados[0].MediaJaneiroAnterior,
                            dados[0].MediaFevereiroAnterior,
                            dados[0].MediaMarçoAnterior,
                            dados[0].MediaAbrilAnterior,
                            dados[0].MediaMaioAnterior,
                            dados[0].MediaJunhoAnterior,
                            dados[0].MediaJulhoAnterior,
                            dados[0].MediaAgostoAnterior,
                            dados[0].MediaSetembroAnterior,
                            dados[0].MediaOutubroAnterior,
                            dados[0].MediaNovembroAnterior,
                            dados[0].MediaDezembroAnterior],
                            fill: false
                        }, {
                            label: "Faturamento - " + ano + "",
                            type: "bar",
                            backgroundColor: "#722F37",
                            data: [dados[0].MediaJaneiro,
                            dados[0].MediaFevereiro,
                            dados[0].MediaMarço,
                            dados[0].MediaAbril,
                            dados[0].MediaMaio,
                            dados[0].MediaJunho,
                            dados[0].MediaJulho,
                            dados[0].MediaAgosto,
                            dados[0].MediaSetembro,
                            dados[0].MediaOutubro,
                            dados[0].MediaNovembro,
                            dados[0].MediaDezembro
                            ]
                        }
                    ]
                },
                options: {
                    title: {
                        display: true
                    },
                    legend: { display: false }
                }
            });

        },
        error: function (xhr, textStatus, errorThrown) {
            //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
        }
    });
}

function getJSONData() {
    return [
        {
            "Category": "Accessories",
            "Color": "red",
            "Business Type": "Specialty Bike Shop",
            "Region": "Center",
            "Price": 174,
            "Quantity": 225,
            "Discount": 23,
            "Date": "1/12/2011"
        },
        {
            "Category": "Accessories",
            "Color": "yellow",
            "Business Type": "Specialty Bike Shop",
            "Region": "East",
            "Price": 502,
            "Quantity": 90,
            "Discount": 17,
            "Date": "1/13/2011"
        },
        {
            "Category": "Accessories",
            "Color": "white",
            "Business Type": "Specialty Bike Shop",
            "Region": "North",
            "Price": 242,
            "Quantity": 855,
            "Discount": 37,
            "Date": "1/14/2011"
        },
        {
            "Category": "Accessories",
            "Color": "yellow",
            "Business Type": "Specialty Bike Shop",
            "Region": "South",
            "Price": 102,
            "Quantity": 897,
            "Discount": 42,
            "Date": "1/15/2011"
        },
        {
            "Category": "Accessories",
            "Color": "red",
            "Business Type": "Specialty Bike Shop",
            "Region": "East",
            "Price": 126,
            "Quantity": 115,
            "Discount": 44,
            "Date": "1/16/2011"
        },
        {
            "Category": "Accessories",
            "Color": "yellow",
            "Business Type": "Specialty Bike Shop",
            "Region": "Center",
            "Price": 1246,
            "Quantity": 88,
            "Discount": 47,
            "Date": "1/17/2011"
        },
        {
            "Category": "Accessories",
            "Color": "green",
            "Business Type": "Value Added Reseller",
            "Region": "Center",
            "Price": 680,
            "Quantity": 66,
            "Discount": 80,
            "Date": "1/18/2011"
        },
        {
            "Category": "Accessories",
            "Color": "yellow",
            "Business Type": "Value Added Reseller",
            "Region": "East",
            "Price": 1241,
            "Quantity": 939,
            "Discount": 66,
            "Date": "1/19/2011"
        },
        {
            "Category": "Accessories",
            "Color": "yellow",
            "Business Type": "Value Added Reseller",
            "Region": "East",
            "Price": 1241,
            "Quantity": 939,
            "Discount": 66,
            "Date": "1/20/2011"
        },
        {
            "Category": "Accessories",
            "Color": "yellow",
            "Business Type": "Value Added Reseller",
            "Region": "East",
            "Price": 150,
            "Quantity": 67,
            "Discount": 30,
            "Date": "1/21/2011"
        },
        {
            "Category": "Accessories",
            "Color": "red",
            "Business Type": "Value Added Reseller",
            "Region": "East",
            "Price": 244,
            "Quantity": 963,
            "Discount": 22,
            "Date": "1/22/2011"
        },
        {
            "Category": "Accessories",
            "Color": "yellow",
            "Business Type": "Value Added Reseller",
            "Region": "East",
            "Price": 501,
            "Quantity": 556,
            "Discount": 9,
            "Date": "1/23/2011"
        },
        {
            "Category": "Accessories",
            "Color": "red",
            "Business Type": "Value Added Reseller",
            "Region": "Center",
            "Price": 4960,
            "Quantity": 898,
            "Discount": 41,
            "Date": "1/24/2011"
        },
        {
            "Category": "Accessories",
            "Color": "yellow",
            "Business Type": "Warehouse",
            "Region": "Center",
            "Price": 9,
            "Quantity": 578,
            "Discount": 8,
            "Date": "1/25/2011"
        },
        {
            "Category": "Accessories",
            "Color": "red",
            "Business Type": "Warehouse",
            "Region": "South",
            "Price": 3655,
            "Quantity": 64,
            "Discount": 70,
            "Date": "1/26/2011"
        },
        {
            "Category": "Accessories",
            "Color": "green",
            "Business Type": "Warehouse",
            "Region": "South",
            "Price": 1654,
            "Quantity": 556,
            "Discount": 95,
            "Date": "1/27/2011"
        },
        {
            "Category": "Accessories",
            "Color": "yellow",
            "Business Type": "Warehouse",
            "Region": "South",
            "Price": 1190,
            "Quantity": 292,
            "Discount": 36,
            "Date": "1/28/2011"
        },
        {
            "Category": "Accessories",
            "Color": "red",
            "Business Type": "Warehouse",
            "Region": "South",
            "Price": 1222,
            "Quantity": 730,
            "Discount": 38,
            "Date": "1/29/2011"
        },
        {
            "Category": "Accessories",
            "Color": "white",
            "Business Type": "Warehouse",
            "Region": "Center",
            "Price": 7941,
            "Quantity": 73,
            "Discount": 53,
            "Date": "1/30/2011"
        },
        {
            "Category": "Bikes",
            "Color": "white",
            "Business Type": "Specialty Bike Shop",
            "Region": "Center",
            "Price": 6829,
            "Quantity": 19,
            "Discount": 56,
            "Date": "1/31/2011"
        },
        {
            "Category": "Bikes",
            "Color": "red",
            "Business Type": "Specialty Bike Shop",
            "Region": "Center",
            "Price": 1664,
            "Quantity": 19,
            "Discount": 75,
            "Date": "2/1/2011"
        },
        {
            "Category": "Bikes",
            "Color": "red",
            "Business Type": "Specialty Bike Shop",
            "Region": "Center",
            "Price": 2995,
            "Quantity": 98,
            "Discount": 88,
            "Date": "2/2/2011"
        },
        {
            "Category": "Bikes",
            "Color": "green",
            "Business Type": "Specialty Bike Shop",
            "Region": "Center",
            "Price": 1487,
            "Quantity": 96,
            "Discount": 100,
            "Date": "2/3/2011"
        },
        {
            "Category": "Bikes",
            "Color": "green",
            "Business Type": "Specialty Bike Shop",
            "Region": "Center",
            "Price": 9245,
            "Quantity": 51,
            "Discount": 29,
            "Date": "2/4/2011"
        },
        {
            "Category": "Bikes",
            "Color": "green",
            "Business Type": "Specialty Bike Shop",
            "Region": "Center",
            "Price": 9008,
            "Quantity": 76,
            "Discount": 66,
            "Date": "2/5/2011"
        },
        {
            "Category": "Bikes",
            "Color": "green",
            "Business Type": "Value Added Reseller",
            "Region": "Center",
            "Price": 9376,
            "Quantity": 92,
            "Discount": 7,
            "Date": "2/6/2011"
        },
        {
            "Category": "Bikes",
            "Color": "red",
            "Business Type": "Value Added Reseller",
            "Region": "Center",
            "Price": 1531,
            "Quantity": 56,
            "Discount": 31,
            "Date": "2/7/2011"
        },
        {
            "Category": "Bikes",
            "Color": "yellow",
            "Business Type": "Value Added Reseller",
            "Region": "North",
            "Price": 5421,
            "Quantity": 83,
            "Discount": 22,
            "Date": "2/8/2011"
        },
        {
            "Category": "Bikes",
            "Color": "red",
            "Business Type": "Value Added Reseller",
            "Region": "South",
            "Price": 6975,
            "Quantity": 73,
            "Discount": 41,
            "Date": "2/9/2011"
        },
        {
            "Category": "Bikes",
            "Color": "blue",
            "Business Type": "Value Added Reseller",
            "Region": "South",
            "Price": 4320,
            "Quantity": 59,
            "Discount": 100,
            "Date": "3/7/2012"
        },
        {
            "Category": "Bikes",
            "Color": "red",
            "Business Type": "Value Added Reseller",
            "Region": "Center",
            "Price": 3200,
            "Quantity": 27,
            "Discount": 41,
            "Date": "3/8/2012"
        },
        {
            "Category": "Bikes",
            "Color": "blue",
            "Business Type": "Warehouse",
            "Region": "Center",
            "Price": 6688,
            "Quantity": 22,
            "Discount": 41,
            "Date": "3/9/2012"
        },
        {
            "Category": "Bikes",
            "Color": "blue",
            "Business Type": "Warehouse",
            "Region": "East",
            "Price": 699,
            "Quantity": 22,
            "Discount": 42,
            "Date": "3/10/2012"
        },
        {
            "Category": "Bikes",
            "Color": "purple",
            "Business Type": "Warehouse",
            "Region": "North",
            "Price": 5403,
            "Quantity": 75,
            "Discount": 70,
            "Date": "3/11/2012"
        },
        {
            "Category": "Bikes",
            "Color": "red",
            "Business Type": "Warehouse",
            "Region": "South",
            "Price": 6377,
            "Quantity": 28,
            "Discount": 49,
            "Date": "3/12/2012"
        },
        {
            "Category": "Bikes",
            "Color": "blue",
            "Business Type": "Warehouse",
            "Region": "East",
            "Price": 2471,
            "Quantity": 93,
            "Discount": 14,
            "Date": "3/13/2012"
        },
        {
            "Category": "Bikes",
            "Color": "blue",
            "Business Type": "Warehouse",
            "Region": "West",
            "Price": 6650,
            "Quantity": 40,
            "Discount": 4,
            "Date": "3/14/2012"
        },
        {
            "Category": "Clothing",
            "Color": "yellow",
            "Business Type": "Specialty Bike Shop",
            "Region": "West",
            "Price": 865,
            "Quantity": 4513,
            "Discount": 70,
            "Date": "3/7/2012"
        },
        {
            "Category": "Clothing",
            "Color": "blue",
            "Business Type": "Specialty Bike Shop",
            "Region": "East",
            "Price": 511,
            "Quantity": 4615,
            "Discount": 20,
            "Date": "3/8/2012"
        },
        {
            "Category": "Clothing",
            "Color": "blue",
            "Business Type": "Specialty Bike Shop",
            "Region": "North",
            "Price": 981,
            "Quantity": 1854,
            "Discount": 36,
            "Date": "3/9/2012"
        },
        {
            "Category": "Clothing",
            "Color": "blue",
            "Business Type": "Specialty Bike Shop",
            "Region": "South",
            "Price": 57,
            "Quantity": 1187,
            "Discount": 10,
            "Date": "3/10/2012"
        },
        {
            "Category": "Clothing",
            "Color": "white",
            "Business Type": "Specialty Bike Shop",
            "Region": "East",
            "Price": 675,
            "Quantity": 1527,
            "Discount": 38,
            "Date": "3/11/2012"
        },
        {
            "Category": "Clothing",
            "Color": "purple",
            "Business Type": "Specialty Bike Shop",
            "Region": "West",
            "Price": 40,
            "Quantity": 4342,
            "Discount": 72,
            "Date": "3/12/2012"
        },
        {
            "Category": "Clothing",
            "Color": "red",
            "Business Type": "Value Added Reseller",
            "Region": "West",
            "Price": 400,
            "Quantity": 8975,
            "Discount": 63,
            "Date": "3/13/2012"
        },
        {
            "Category": "Clothing",
            "Color": "purple",
            "Business Type": "Value Added Reseller",
            "Region": "East",
            "Price": 971,
            "Quantity": 3522,
            "Discount": 90,
            "Date": "3/14/2012"
        },
        {
            "Category": "Clothing",
            "Color": "green",
            "Business Type": "Value Added Reseller",
            "Region": "North",
            "Price": 357,
            "Quantity": 3939,
            "Discount": 93,
            "Date": "3/15/2012"
        },
        {
            "Category": "Clothing",
            "Color": "red",
            "Business Type": "Value Added Reseller",
            "Region": "South",
            "Price": 820,
            "Quantity": 3560,
            "Discount": 40,
            "Date": "3/16/2012"
        },
        {
            "Category": "Clothing",
            "Color": "white",
            "Business Type": "Value Added Reseller",
            "Region": "East",
            "Price": 520,
            "Quantity": 3892,
            "Discount": 32,
            "Date": "3/17/2012"
        },
        {
            "Category": "Clothing",
            "Color": "white",
            "Business Type": "Value Added Reseller",
            "Region": "West",
            "Price": 448,
            "Quantity": 3906,
            "Discount": 24,
            "Date": "3/18/2012"
        },
        {
            "Category": "Clothing",
            "Color": "red",
            "Business Type": "Warehouse",
            "Region": "West",
            "Price": 513,
            "Quantity": 9790,
            "Discount": 40,
            "Date": "3/19/2012"
        },
        {
            "Category": "Clothing",
            "Color": "blue",
            "Business Type": "Warehouse",
            "Region": "East",
            "Price": 977,
            "Quantity": 6107,
            "Discount": 8,
            "Date": "3/20/2012"
        },
        {
            "Category": "Clothing",
            "Color": "green",
            "Business Type": "Warehouse",
            "Region": "North",
            "Price": 118,
            "Quantity": 4718,
            "Discount": 84,
            "Date": "3/21/2012"
        },
        {
            "Category": "Clothing",
            "Color": "blue",
            "Business Type": "Warehouse",
            "Region": "South",
            "Price": 161,
            "Quantity": 7988,
            "Discount": 29,
            "Date": "3/22/2012"
        },
        {
            "Category": "Clothing",
            "Color": "green",
            "Business Type": "Warehouse",
            "Region": "East",
            "Price": 239,
            "Quantity": 840,
            "Discount": 89,
            "Date": "3/23/2012"
        },
        {
            "Category": "Clothing",
            "Color": "green",
            "Business Type": "Warehouse",
            "Region": "West",
            "Price": 327,
            "Quantity": 6574,
            "Discount": 79,
            "Date": "3/24/2012"
        },
        {
            "Category": "Clothing",
            "Color": "red",
            "Business Type": "Specialty Bike Shop",
            "Region": "West",
            "Price": 284,
            "Quantity": 2471,
            "Discount": 42,
            "Date": "3/7/2012"
        },
        {
            "Category": "Clothing",
            "Color": "green",
            "Business Type": "Specialty Bike Shop",
            "Region": "East",
            "Price": 827,
            "Quantity": 4772,
            "Discount": 26,
            "Date": "3/8/2012"
        },
        {
            "Category": "Clothing",
            "Color": "red",
            "Business Type": "Specialty Bike Shop",
            "Region": "North",
            "Price": 967,
            "Quantity": 1646,
            "Discount": 42,
            "Date": "3/9/2012"
        },
        {
            "Category": "Clothing",
            "Color": "blue",
            "Business Type": "Specialty Bike Shop",
            "Region": "South",
            "Price": 569,
            "Quantity": 6568,
            "Discount": 58,
            "Date": "3/10/2012"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Specialty Bike Shop",
            "Region": "East",
            "Price": 156,
            "Quantity": 7585,
            "Discount": 35,
            "Date": "3/11/2012"
        },
        {
            "Category": "Components",
            "Color": "red",
            "Business Type": "Specialty Bike Shop",
            "Region": "West",
            "Price": 845,
            "Quantity": 4208,
            "Discount": 42,
            "Date": "3/12/2012"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Value Added Reseller",
            "Region": "West",
            "Price": 838,
            "Quantity": 6460,
            "Discount": 41,
            "Date": "3/13/2012"
        },
        {
            "Category": "Components",
            "Color": "red",
            "Business Type": "Value Added Reseller",
            "Region": "East",
            "Price": 51,
            "Quantity": 410,
            "Discount": 97,
            "Date": "3/14/2012"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Value Added Reseller",
            "Region": "North",
            "Price": 95,
            "Quantity": 2307,
            "Discount": 64,
            "Date": "3/15/2012"
        },
        {
            "Category": "Components",
            "Color": "red",
            "Business Type": "Value Added Reseller",
            "Region": "South",
            "Price": 885,
            "Quantity": 6843,
            "Discount": 10,
            "Date": "3/16/2012"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Value Added Reseller",
            "Region": "East",
            "Price": 239,
            "Quantity": 7541,
            "Discount": 36,
            "Date": "3/17/2012"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Value Added Reseller",
            "Region": "Center",
            "Price": 145,
            "Quantity": 7978,
            "Discount": 78,
            "Date": "3/18/2012"
        },
        {
            "Category": "Components",
            "Color": "green",
            "Business Type": "Warehouse",
            "Region": "Center",
            "Price": 605,
            "Quantity": 458,
            "Discount": 72,
            "Date": "3/19/2012"
        },
        {
            "Category": "Components",
            "Color": "white",
            "Business Type": "Warehouse",
            "Region": "Center",
            "Price": 778,
            "Quantity": 8918,
            "Discount": 89,
            "Date": "3/20/2012"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Value Added Reseller",
            "Region": "West",
            "Price": 434,
            "Quantity": 1297,
            "Discount": 60,
            "Date": "3/21/2012"
        },
        {
            "Category": "Components",
            "Color": "red",
            "Business Type": "Value Added Reseller",
            "Region": "Center",
            "Price": 732,
            "Quantity": 8420,
            "Discount": 62,
            "Date": "3/22/2012"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Value Added Reseller",
            "Region": "Center",
            "Price": 780,
            "Quantity": 5535,
            "Discount": 29,
            "Date": "3/23/2012"
        },
        {
            "Category": "Components",
            "Color": "red",
            "Business Type": "Value Added Reseller",
            "Region": "Center",
            "Price": 85,
            "Quantity": 2063,
            "Discount": 98,
            "Date": "3/24/2012"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Value Added Reseller",
            "Region": "Center",
            "Price": 672,
            "Quantity": 316,
            "Discount": 62,
            "Date": "3/25/2012"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Value Added Reseller",
            "Region": "West",
            "Price": 389,
            "Quantity": 4900,
            "Discount": 46,
            "Date": "3/26/2012"
        },
        {
            "Category": "Components",
            "Color": "green",
            "Business Type": "Warehouse",
            "Region": "West",
            "Price": 81,
            "Quantity": 3674,
            "Discount": 34,
            "Date": "3/27/2012"
        },
        {
            "Category": "Components",
            "Color": "white",
            "Business Type": "Warehouse",
            "Region": "Center",
            "Price": 959,
            "Quantity": 4819,
            "Discount": 14,
            "Date": "3/28/2012"
        },
        {
            "Category": "Components",
            "Color": "green",
            "Business Type": "Warehouse",
            "Region": "West",
            "Price": 666,
            "Quantity": 780,
            "Discount": 88,
            "Date": "3/29/2012"
        },
        {
            "Category": "Components",
            "Color": "white",
            "Business Type": "Warehouse",
            "Region": "Center",
            "Price": 326,
            "Quantity": 7308,
            "Discount": 29,
            "Date": "3/30/2012"
        },
        {
            "Category": "Components",
            "Color": "white",
            "Business Type": "Warehouse",
            "Region": "Center",
            "Price": 550,
            "Quantity": 3635,
            "Discount": 99,
            "Date": "3/31/2012"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Warehouse",
            "Region": "North",
            "Price": 192,
            "Quantity": 2895,
            "Discount": 77,
            "Date": "4/1/2012"
        },
        {
            "Category": "Components",
            "Color": "white",
            "Business Type": "Warehouse",
            "Region": "Center",
            "Price": 564,
            "Quantity": 4306,
            "Discount": 53,
            "Date": "4/2/2012"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Warehouse",
            "Region": "West",
            "Price": 751,
            "Quantity": 4835,
            "Discount": 34,
            "Date": "4/3/2012"
        },
        {
            "Category": "Components",
            "Color": "red",
            "Business Type": "Specialty Bike Shop",
            "Region": "West",
            "Price": 750,
            "Quantity": 178,
            "Discount": 62,
            "Date": "4/4/2012"
        },
        {
            "Category": "Components",
            "Color": "green",
            "Business Type": "Specialty Bike Shop",
            "Region": "East",
            "Price": 106,
            "Quantity": 4571,
            "Discount": 12,
            "Date": "4/5/2012"
        },
        {
            "Category": "Components",
            "Color": "red",
            "Business Type": "Specialty Bike Shop",
            "Region": "East",
            "Price": 436,
            "Quantity": 7733,
            "Discount": 94,
            "Date": "4/6/2012"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Specialty Bike Shop",
            "Region": "East",
            "Price": 314,
            "Quantity": 1033,
            "Discount": 14,
            "Date": "4/7/2012"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Specialty Bike Shop",
            "Region": "East",
            "Price": 370,
            "Quantity": 5788,
            "Discount": 76,
            "Date": "4/8/2012"
        },
        {
            "Category": "Components",
            "Color": "red",
            "Business Type": "Specialty Bike Shop",
            "Region": "West",
            "Price": 984,
            "Quantity": 6047,
            "Discount": 35,
            "Date": "4/9/2012"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Value Added Reseller",
            "Region": "West",
            "Price": 531,
            "Quantity": 7845,
            "Discount": 83,
            "Date": "4/10/2012"
        },
        {
            "Category": "Components",
            "Color": "red",
            "Business Type": "Value Added Reseller",
            "Region": "East",
            "Price": 907,
            "Quantity": 3829,
            "Discount": 15,
            "Date": "4/11/2012"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Value Added Reseller",
            "Region": "North",
            "Price": 233,
            "Quantity": 5546,
            "Discount": 80,
            "Date": "4/12/2012"
        },
        {
            "Category": "Components",
            "Color": "red",
            "Business Type": "Value Added Reseller",
            "Region": "East",
            "Price": 548,
            "Quantity": 2777,
            "Discount": 74,
            "Date": "4/13/2012"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Value Added Reseller",
            "Region": "East",
            "Price": 723,
            "Quantity": 9333,
            "Discount": 10,
            "Date": "4/14/2012"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Value Added Reseller",
            "Region": "West",
            "Price": 55,
            "Quantity": 9755,
            "Discount": 21,
            "Date": "4/15/2012"
        },
        {
            "Category": "Components",
            "Color": "green",
            "Business Type": "Warehouse",
            "Region": "West",
            "Price": 523,
            "Quantity": 3115,
            "Discount": 73,
            "Date": "4/16/2012"
        },
        {
            "Category": "Components",
            "Color": "white",
            "Business Type": "Warehouse",
            "Region": "East",
            "Price": 978,
            "Quantity": 1561,
            "Discount": 43,
            "Date": "4/17/2012"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Value Added Reseller",
            "Region": "West",
            "Price": 522,
            "Quantity": 7101,
            "Discount": 52,
            "Date": "4/18/2012"
        },
        {
            "Category": "Components",
            "Color": "red",
            "Business Type": "Value Added Reseller",
            "Region": "East",
            "Price": 681,
            "Quantity": 6964,
            "Discount": 47,
            "Date": "4/19/2012"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Value Added Reseller",
            "Region": "North",
            "Price": 166,
            "Quantity": 1589,
            "Discount": 8,
            "Date": "4/20/2012"
        },
        {
            "Category": "Components",
            "Color": "red",
            "Business Type": "Value Added Reseller",
            "Region": "East",
            "Price": 342,
            "Quantity": 7198,
            "Discount": 14,
            "Date": "4/21/2012"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Value Added Reseller",
            "Region": "East",
            "Price": 654,
            "Quantity": 8039,
            "Discount": 10,
            "Date": "4/22/2012"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Value Added Reseller",
            "Region": "West",
            "Price": 259,
            "Quantity": 8551,
            "Discount": 18,
            "Date": "4/23/2012"
        },
        {
            "Category": "Components",
            "Color": "green",
            "Business Type": "Warehouse",
            "Region": "West",
            "Price": 756,
            "Quantity": 3897,
            "Discount": 40,
            "Date": "4/24/2012"
        },
        {
            "Category": "Components",
            "Color": "white",
            "Business Type": "Warehouse",
            "Region": "East",
            "Price": 751,
            "Quantity": 2158,
            "Discount": 16,
            "Date": "4/25/2012"
        },
        {
            "Category": "Components",
            "Color": "green",
            "Business Type": "Warehouse",
            "Region": "West",
            "Price": 830,
            "Quantity": 4341,
            "Discount": 63,
            "Date": "4/26/2012"
        },
        {
            "Category": "Components",
            "Color": "white",
            "Business Type": "Warehouse",
            "Region": "East",
            "Price": 789,
            "Quantity": 7973,
            "Discount": 37,
            "Date": "4/27/2012"
        },
        {
            "Category": "Components",
            "Color": "white",
            "Business Type": "Warehouse",
            "Region": "North",
            "Price": 324,
            "Quantity": 1908,
            "Discount": 73,
            "Date": "4/28/2012"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Warehouse",
            "Region": "East",
            "Price": 831,
            "Quantity": 6912,
            "Discount": 62,
            "Date": "4/29/2012"
        },
        {
            "Category": "Components",
            "Color": "white",
            "Business Type": "Warehouse",
            "Region": "East",
            "Price": 86,
            "Quantity": 4346,
            "Discount": 96,
            "Date": "4/30/2012"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Warehouse",
            "Region": "North",
            "Price": 181,
            "Quantity": 3045,
            "Discount": 48,
            "Date": "5/1/2012"
        },
        {
            "Category": "Components",
            "Color": "red",
            "Business Type": "Specialty Bike Shop",
            "Region": "North",
            "Price": 295,
            "Quantity": 3429,
            "Discount": 68,
            "Date": "5/2/2012"
        },
        {
            "Category": "Components",
            "Color": "green",
            "Business Type": "Specialty Bike Shop",
            "Region": "East",
            "Price": 675,
            "Quantity": 2581,
            "Discount": 3,
            "Date": "5/3/2012"
        },
        {
            "Category": "Components",
            "Color": "red",
            "Business Type": "Specialty Bike Shop",
            "Region": "North",
            "Price": 302,
            "Quantity": 5919,
            "Discount": 46,
            "Date": "5/4/2012"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Specialty Bike Shop",
            "Region": "East",
            "Price": 620,
            "Quantity": 180,
            "Discount": 64,
            "Date": "5/5/2012"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Specialty Bike Shop",
            "Region": "East",
            "Price": 390,
            "Quantity": 2174,
            "Discount": 22,
            "Date": "5/6/2012"
        },
        {
            "Category": "Components",
            "Color": "red",
            "Business Type": "Specialty Bike Shop",
            "Region": "North",
            "Price": 698,
            "Quantity": 2281,
            "Discount": 61,
            "Date": "5/7/2012"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Value Added Reseller",
            "Region": "North",
            "Price": 195,
            "Quantity": 3606,
            "Discount": 1,
            "Date": "5/8/2012"
        },
        {
            "Category": "Components",
            "Color": "red",
            "Business Type": "Value Added Reseller",
            "Region": "East",
            "Price": 542,
            "Quantity": 6412,
            "Discount": 55,
            "Date": "5/9/2012"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Value Added Reseller",
            "Region": "East",
            "Price": 159,
            "Quantity": 7231,
            "Discount": 79,
            "Date": "5/10/2012"
        },
        {
            "Category": "Components",
            "Color": "red",
            "Business Type": "Value Added Reseller",
            "Region": "East",
            "Price": 190,
            "Quantity": 6419,
            "Discount": 100,
            "Date": "5/11/2012"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Value Added Reseller",
            "Region": "East",
            "Price": 440,
            "Quantity": 9871,
            "Discount": 88,
            "Date": "5/12/2012"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Value Added Reseller",
            "Region": "North",
            "Price": 935,
            "Quantity": 9985,
            "Discount": 1,
            "Date": "5/13/2012"
        },
        {
            "Category": "Components",
            "Color": "green",
            "Business Type": "Warehouse",
            "Region": "North",
            "Price": 971,
            "Quantity": 4955,
            "Discount": 72,
            "Date": "5/14/2012"
        },
        {
            "Category": "Components",
            "Color": "white",
            "Business Type": "Warehouse",
            "Region": "East",
            "Price": 95,
            "Quantity": 9544,
            "Discount": 69,
            "Date": "5/15/2012"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Value Added Reseller",
            "Region": "West",
            "Price": 365,
            "Quantity": 1431,
            "Discount": 94,
            "Date": "5/16/2012"
        },
        {
            "Category": "Components",
            "Color": "red",
            "Business Type": "Value Added Reseller",
            "Region": "Center",
            "Price": 566,
            "Quantity": 3776,
            "Discount": 49,
            "Date": "5/17/2012"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Value Added Reseller",
            "Region": "North",
            "Price": 770,
            "Quantity": 3037,
            "Discount": 59,
            "Date": "5/18/2012"
        },
        {
            "Category": "Components",
            "Color": "red",
            "Business Type": "Value Added Reseller",
            "Region": "East",
            "Price": 590,
            "Quantity": 434,
            "Discount": 60,
            "Date": "5/19/2012"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Value Added Reseller",
            "Region": "Center",
            "Price": 903,
            "Quantity": 9479,
            "Discount": 96,
            "Date": "5/20/2012"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Value Added Reseller",
            "Region": "West",
            "Price": 278,
            "Quantity": 8185,
            "Discount": 91,
            "Date": "5/21/2012"
        },
        {
            "Category": "Components",
            "Color": "green",
            "Business Type": "Warehouse",
            "Region": "West",
            "Price": 551,
            "Quantity": 1950,
            "Discount": 51,
            "Date": "5/22/2012"
        },
        {
            "Category": "Components",
            "Color": "white",
            "Business Type": "Warehouse",
            "Region": "Center",
            "Price": 842,
            "Quantity": 8212,
            "Discount": 55,
            "Date": "5/23/2012"
        },
        {
            "Category": "Components",
            "Color": "green",
            "Business Type": "Warehouse",
            "Region": "West",
            "Price": 480,
            "Quantity": 4721,
            "Discount": 56,
            "Date": "5/24/2012"
        },
        {
            "Category": "Components",
            "Color": "white",
            "Business Type": "Warehouse",
            "Region": "Center",
            "Price": 705,
            "Quantity": 9027,
            "Discount": 51,
            "Date": "5/25/2012"
        },
        {
            "Category": "Components",
            "Color": "white",
            "Business Type": "Warehouse",
            "Region": "North",
            "Price": 628,
            "Quantity": 4955,
            "Discount": 30,
            "Date": "5/26/2012"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Warehouse",
            "Region": "East",
            "Price": 458,
            "Quantity": 8561,
            "Discount": 69,
            "Date": "5/27/2012"
        },
        {
            "Category": "Components",
            "Color": "white",
            "Business Type": "Warehouse",
            "Region": "East",
            "Price": 549,
            "Quantity": 2214,
            "Discount": 73,
            "Date": "5/28/2012"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Warehouse",
            "Region": "West",
            "Price": 179,
            "Quantity": 6684,
            "Discount": 94,
            "Date": "5/29/2012"
        },
        {
            "Category": "Components",
            "Color": "red",
            "Business Type": "Specialty Bike Shop",
            "Region": "West",
            "Price": 96,
            "Quantity": 2187,
            "Discount": 56,
            "Date": "5/30/2012"
        },
        {
            "Category": "Components",
            "Color": "green",
            "Business Type": "Specialty Bike Shop",
            "Region": "East",
            "Price": 361,
            "Quantity": 3485,
            "Discount": 76,
            "Date": "5/31/2012"
        },
        {
            "Category": "Components",
            "Color": "red",
            "Business Type": "Specialty Bike Shop",
            "Region": "North",
            "Price": 734,
            "Quantity": 8064,
            "Discount": 42,
            "Date": "6/1/2012"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Specialty Bike Shop",
            "Region": "North",
            "Price": 807,
            "Quantity": 9929,
            "Discount": 32,
            "Date": "6/2/2012"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Specialty Bike Shop",
            "Region": "East",
            "Price": 348,
            "Quantity": 5143,
            "Discount": 36,
            "Date": "6/3/2012"
        },
        {
            "Category": "Components",
            "Color": "red",
            "Business Type": "Specialty Bike Shop",
            "Region": "West",
            "Price": 185,
            "Quantity": 4411,
            "Discount": 76,
            "Date": "6/4/2012"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Value Added Reseller",
            "Region": "West",
            "Price": 684,
            "Quantity": 1641,
            "Discount": 17,
            "Date": "6/5/2012"
        },
        {
            "Category": "Components",
            "Color": "red",
            "Business Type": "Value Added Reseller",
            "Region": "East",
            "Price": 828,
            "Quantity": 9451,
            "Discount": 55,
            "Date": "6/6/2012"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Value Added Reseller",
            "Region": "East",
            "Price": 814,
            "Quantity": 5582,
            "Discount": 65,
            "Date": "6/7/2012"
        },
        {
            "Category": "Components",
            "Color": "red",
            "Business Type": "Value Added Reseller",
            "Region": "East",
            "Price": 373,
            "Quantity": 8757,
            "Discount": 53,
            "Date": "6/8/2012"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Value Added Reseller",
            "Region": "East",
            "Price": 889,
            "Quantity": 7752,
            "Discount": 85,
            "Date": "6/9/2012"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Value Added Reseller",
            "Region": "West",
            "Price": 904,
            "Quantity": 1064,
            "Discount": 17,
            "Date": "6/10/2012"
        },
        {
            "Category": "Components",
            "Color": "green",
            "Business Type": "Warehouse",
            "Region": "West",
            "Price": 113,
            "Quantity": 3945,
            "Discount": 92,
            "Date": "7/14/2012"
        },
        {
            "Category": "Components",
            "Color": "white",
            "Business Type": "Warehouse",
            "Region": "East",
            "Price": 342,
            "Quantity": 2508,
            "Discount": 84,
            "Date": "7/15/2012"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Value Added Reseller",
            "Region": "West",
            "Price": 557,
            "Quantity": 8695,
            "Discount": 90,
            "Date": "7/16/2012"
        },
        {
            "Category": "Components",
            "Color": "red",
            "Business Type": "Value Added Reseller",
            "Region": "East",
            "Price": 198,
            "Quantity": 5742,
            "Discount": 7,
            "Date": "7/17/2012"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Value Added Reseller",
            "Region": "East",
            "Price": 188,
            "Quantity": 3430,
            "Discount": 57,
            "Date": "7/16/2013"
        },
        {
            "Category": "Components",
            "Color": "red",
            "Business Type": "Value Added Reseller",
            "Region": "East",
            "Price": 331,
            "Quantity": 4245,
            "Discount": 37,
            "Date": "7/17/2013"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Value Added Reseller",
            "Region": "East",
            "Price": 34,
            "Quantity": 5691,
            "Discount": 33,
            "Date": "7/18/2013"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Value Added Reseller",
            "Region": "West",
            "Price": 231,
            "Quantity": 936,
            "Discount": 33,
            "Date": "7/19/2013"
        },
        {
            "Category": "Components",
            "Color": "green",
            "Business Type": "Warehouse",
            "Region": "West",
            "Price": 688,
            "Quantity": 9925,
            "Discount": 8,
            "Date": "7/20/2013"
        },
        {
            "Category": "Components",
            "Color": "white",
            "Business Type": "Warehouse",
            "Region": "East",
            "Price": 53,
            "Quantity": 7524,
            "Discount": 39,
            "Date": "7/21/2013"
        },
        {
            "Category": "Components",
            "Color": "green",
            "Business Type": "Warehouse",
            "Region": "West",
            "Price": 822,
            "Quantity": 5978,
            "Discount": 28,
            "Date": "7/22/2013"
        },
        {
            "Category": "Components",
            "Color": "white",
            "Business Type": "Warehouse",
            "Region": "East",
            "Price": 637,
            "Quantity": 7137,
            "Discount": 25,
            "Date": "7/23/2013"
        },
        {
            "Category": "Components",
            "Color": "white",
            "Business Type": "Warehouse",
            "Region": "North",
            "Price": 180,
            "Quantity": 5678,
            "Discount": 10,
            "Date": "7/24/2013"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Warehouse",
            "Region": "South",
            "Price": 742,
            "Quantity": 6056,
            "Discount": 33,
            "Date": "7/25/2013"
        },
        {
            "Category": "Components",
            "Color": "white",
            "Business Type": "Warehouse",
            "Region": "East",
            "Price": 782,
            "Quantity": 8577,
            "Discount": 35,
            "Date": "7/26/2013"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Warehouse",
            "Region": "West",
            "Price": 115,
            "Quantity": 2586,
            "Discount": 99,
            "Date": "7/27/2013"
        },
        {
            "Category": "Components",
            "Color": "red",
            "Business Type": "Specialty Bike Shop",
            "Region": "West",
            "Price": 676,
            "Quantity": 1980,
            "Discount": 30,
            "Date": "7/28/2013"
        },
        {
            "Category": "Components",
            "Color": "green",
            "Business Type": "Specialty Bike Shop",
            "Region": "East",
            "Price": 904,
            "Quantity": 1752,
            "Discount": 8,
            "Date": "7/29/2013"
        },
        {
            "Category": "Components",
            "Color": "red",
            "Business Type": "Specialty Bike Shop",
            "Region": "North",
            "Price": 981,
            "Quantity": 7228,
            "Discount": 83,
            "Date": "7/30/2013"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Specialty Bike Shop",
            "Region": "South",
            "Price": 383,
            "Quantity": 3419,
            "Discount": 13,
            "Date": "7/31/2013"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Specialty Bike Shop",
            "Region": "East",
            "Price": 189,
            "Quantity": 6398,
            "Discount": 42,
            "Date": "8/1/2013"
        },
        {
            "Category": "Components",
            "Color": "red",
            "Business Type": "Specialty Bike Shop",
            "Region": "West",
            "Price": 423,
            "Quantity": 2636,
            "Discount": 96,
            "Date": "8/2/2013"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Value Added Reseller",
            "Region": "West",
            "Price": 61,
            "Quantity": 3012,
            "Discount": 67,
            "Date": "8/3/2013"
        },
        {
            "Category": "Components",
            "Color": "red",
            "Business Type": "Value Added Reseller",
            "Region": "East",
            "Price": 781,
            "Quantity": 6423,
            "Discount": 54,
            "Date": "8/4/2013"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Value Added Reseller",
            "Region": "North",
            "Price": 758,
            "Quantity": 687,
            "Discount": 4,
            "Date": "8/5/2013"
        },
        {
            "Category": "Components",
            "Color": "red",
            "Business Type": "Value Added Reseller",
            "Region": "South",
            "Price": 902,
            "Quantity": 7931,
            "Discount": 31,
            "Date": "8/6/2013"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Value Added Reseller",
            "Region": "East",
            "Price": 619,
            "Quantity": 2797,
            "Discount": 1,
            "Date": "8/7/2013"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Value Added Reseller",
            "Region": "West",
            "Price": 292,
            "Quantity": 8841,
            "Discount": 22,
            "Date": "8/8/2013"
        },
        {
            "Category": "Components",
            "Color": "green",
            "Business Type": "Warehouse",
            "Region": "West",
            "Price": 986,
            "Quantity": 9811,
            "Discount": 59,
            "Date": "8/9/2013"
        },
        {
            "Category": "Components",
            "Color": "white",
            "Business Type": "Warehouse",
            "Region": "East",
            "Price": 194,
            "Quantity": 1320,
            "Discount": 83,
            "Date": "8/10/2013"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Value Added Reseller",
            "Region": "West",
            "Price": 890,
            "Quantity": 7481,
            "Discount": 58,
            "Date": "8/11/2013"
        },
        {
            "Category": "Components",
            "Color": "red",
            "Business Type": "Value Added Reseller",
            "Region": "East",
            "Price": 381,
            "Quantity": 5940,
            "Discount": 12,
            "Date": "8/12/2013"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Value Added Reseller",
            "Region": "North",
            "Price": 735,
            "Quantity": 633,
            "Discount": 57,
            "Date": "8/13/2013"
        },
        {
            "Category": "Components",
            "Color": "red",
            "Business Type": "Value Added Reseller",
            "Region": "South",
            "Price": 211,
            "Quantity": 6508,
            "Discount": 36,
            "Date": "8/14/2013"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Value Added Reseller",
            "Region": "East",
            "Price": 834,
            "Quantity": 8234,
            "Discount": 8,
            "Date": "8/15/2013"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Value Added Reseller",
            "Region": "West",
            "Price": 646,
            "Quantity": 2296,
            "Discount": 18,
            "Date": "8/16/2013"
        },
        {
            "Category": "Components",
            "Color": "green",
            "Business Type": "Warehouse",
            "Region": "West",
            "Price": 79,
            "Quantity": 726,
            "Discount": 16,
            "Date": "8/17/2013"
        },
        {
            "Category": "Components",
            "Color": "white",
            "Business Type": "Warehouse",
            "Region": "East",
            "Price": 129,
            "Quantity": 4956,
            "Discount": 32,
            "Date": "8/18/2013"
        },
        {
            "Category": "Components",
            "Color": "green",
            "Business Type": "Warehouse",
            "Region": "West",
            "Price": 899,
            "Quantity": 2927,
            "Discount": 70,
            "Date": "8/19/2013"
        },
        {
            "Category": "Components",
            "Color": "white",
            "Business Type": "Warehouse",
            "Region": "East",
            "Price": 266,
            "Quantity": 3561,
            "Discount": 77,
            "Date": "8/20/2013"
        },
        {
            "Category": "Components",
            "Color": "white",
            "Business Type": "Warehouse",
            "Region": "North",
            "Price": 492,
            "Quantity": 1519,
            "Discount": 76,
            "Date": "8/21/2013"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Warehouse",
            "Region": "East",
            "Price": 519,
            "Quantity": 2093,
            "Discount": 47,
            "Date": "8/22/2013"
        },
        {
            "Category": "Components",
            "Color": "white",
            "Business Type": "Warehouse",
            "Region": "East",
            "Price": 549,
            "Quantity": 2363,
            "Discount": 50,
            "Date": "8/23/2013"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Warehouse",
            "Region": "West",
            "Price": 444,
            "Quantity": 9908,
            "Discount": 52,
            "Date": "8/24/2013"
        },
        {
            "Category": "Components",
            "Color": "red",
            "Business Type": "Specialty Bike Shop",
            "Region": "West",
            "Price": 899,
            "Quantity": 6816,
            "Discount": 19,
            "Date": "8/25/2013"
        },
        {
            "Category": "Components",
            "Color": "green",
            "Business Type": "Specialty Bike Shop",
            "Region": "East",
            "Price": 596,
            "Quantity": 481,
            "Discount": 73,
            "Date": "7/26/2013"
        },
        {
            "Category": "Components",
            "Color": "red",
            "Business Type": "Specialty Bike Shop",
            "Region": "North",
            "Price": 102,
            "Quantity": 9587,
            "Discount": 76,
            "Date": "7/27/2013"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Specialty Bike Shop",
            "Region": "East",
            "Price": 189,
            "Quantity": 8228,
            "Discount": 62,
            "Date": "7/28/2013"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Specialty Bike Shop",
            "Region": "East",
            "Price": 70,
            "Quantity": 9156,
            "Discount": 38,
            "Date": "7/29/2013"
        },
        {
            "Category": "Components",
            "Color": "red",
            "Business Type": "Specialty Bike Shop",
            "Region": "West",
            "Price": 476,
            "Quantity": 1233,
            "Discount": 12,
            "Date": "7/30/2013"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Value Added Reseller",
            "Region": "West",
            "Price": 466,
            "Quantity": 6456,
            "Discount": 29,
            "Date": "7/31/2013"
        },
        {
            "Category": "Components",
            "Color": "red",
            "Business Type": "Value Added Reseller",
            "Region": "East",
            "Price": 119,
            "Quantity": 5747,
            "Discount": 89,
            "Date": "8/1/2013"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Value Added Reseller",
            "Region": "North",
            "Price": 887,
            "Quantity": 9592,
            "Discount": 63,
            "Date": "8/2/2013"
        },
        {
            "Category": "Components",
            "Color": "red",
            "Business Type": "Value Added Reseller",
            "Region": "East",
            "Price": 730,
            "Quantity": 826,
            "Discount": 83,
            "Date": "8/3/2013"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Value Added Reseller",
            "Region": "East",
            "Price": 988,
            "Quantity": 4096,
            "Discount": 90,
            "Date": "8/4/2013"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Value Added Reseller",
            "Region": "West",
            "Price": 409,
            "Quantity": 3091,
            "Discount": 47,
            "Date": "8/5/2013"
        },
        {
            "Category": "Components",
            "Color": "green",
            "Business Type": "Warehouse",
            "Region": "West",
            "Price": 688,
            "Quantity": 1801,
            "Discount": 99,
            "Date": "8/6/2013"
        },
        {
            "Category": "Components",
            "Color": "white",
            "Business Type": "Warehouse",
            "Region": "East",
            "Price": 312,
            "Quantity": 2121,
            "Discount": 7,
            "Date": "8/7/2013"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Value Added Reseller",
            "Region": "West",
            "Price": 193,
            "Quantity": 2728,
            "Discount": 29,
            "Date": "8/8/2013"
        },
        {
            "Category": "Components",
            "Color": "red",
            "Business Type": "Value Added Reseller",
            "Region": "Center",
            "Price": 866,
            "Quantity": 4317,
            "Discount": 58,
            "Date": "8/9/2013"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Value Added Reseller",
            "Region": "North",
            "Price": 672,
            "Quantity": 703,
            "Discount": 97,
            "Date": "8/10/2013"
        },
        {
            "Category": "Components",
            "Color": "red",
            "Business Type": "Value Added Reseller",
            "Region": "East",
            "Price": 674,
            "Quantity": 9810,
            "Discount": 72,
            "Date": "8/11/2013"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Value Added Reseller",
            "Region": "East",
            "Price": 350,
            "Quantity": 8356,
            "Discount": 0,
            "Date": "8/12/2013"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Value Added Reseller",
            "Region": "West",
            "Price": 182,
            "Quantity": 4151,
            "Discount": 93,
            "Date": "8/13/2013"
        },
        {
            "Category": "Components",
            "Color": "green",
            "Business Type": "Warehouse",
            "Region": "West",
            "Price": 357,
            "Quantity": 9535,
            "Discount": 87,
            "Date": "8/14/2013"
        },
        {
            "Category": "Components",
            "Color": "white",
            "Business Type": "Warehouse",
            "Region": "East",
            "Price": 72,
            "Quantity": 6426,
            "Discount": 11,
            "Date": "8/15/2013"
        },
        {
            "Category": "Components",
            "Color": "green",
            "Business Type": "Warehouse",
            "Region": "West",
            "Price": 752,
            "Quantity": 9260,
            "Discount": 44,
            "Date": "8/16/2013"
        },
        {
            "Category": "Components",
            "Color": "white",
            "Business Type": "Warehouse",
            "Region": "Center",
            "Price": 766,
            "Quantity": 1411,
            "Discount": 10,
            "Date": "8/17/2013"
        },
        {
            "Category": "Components",
            "Color": "white",
            "Business Type": "Warehouse",
            "Region": "North",
            "Price": 351,
            "Quantity": 4156,
            "Discount": 68,
            "Date": "8/18/2013"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Warehouse",
            "Region": "Center",
            "Price": 799,
            "Quantity": 6014,
            "Discount": 55,
            "Date": "8/19/2013"
        },
        {
            "Category": "Components",
            "Color": "white",
            "Business Type": "Warehouse",
            "Region": "East",
            "Price": 536,
            "Quantity": 3930,
            "Discount": 61,
            "Date": "8/20/2013"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Warehouse",
            "Region": "West",
            "Price": 84,
            "Quantity": 4657,
            "Discount": 85,
            "Date": "8/21/2013"
        },
        {
            "Category": "Components",
            "Color": "red",
            "Business Type": "Specialty Bike Shop",
            "Region": "West",
            "Price": 488,
            "Quantity": 2746,
            "Discount": 1,
            "Date": "8/22/2013"
        },
        {
            "Category": "Components",
            "Color": "green",
            "Business Type": "Specialty Bike Shop",
            "Region": "East",
            "Price": 758,
            "Quantity": 8344,
            "Discount": 65,
            "Date": "8/23/2013"
        },
        {
            "Category": "Components",
            "Color": "red",
            "Business Type": "Specialty Bike Shop",
            "Region": "North",
            "Price": 322,
            "Quantity": 8885,
            "Discount": 92,
            "Date": "8/24/2013"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Specialty Bike Shop",
            "Region": "South",
            "Price": 909,
            "Quantity": 4780,
            "Discount": 13,
            "Date": "8/25/2013"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Specialty Bike Shop",
            "Region": "East",
            "Price": 687,
            "Quantity": 4817,
            "Discount": 100,
            "Date": "8/26/2013"
        },
        {
            "Category": "Components",
            "Color": "red",
            "Business Type": "Specialty Bike Shop",
            "Region": "West",
            "Price": 116,
            "Quantity": 4834,
            "Discount": 59,
            "Date": "8/27/2013"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Value Added Reseller",
            "Region": "West",
            "Price": 797,
            "Quantity": 2034,
            "Discount": 27,
            "Date": "8/28/2013"
        },
        {
            "Category": "Components",
            "Color": "red",
            "Business Type": "Value Added Reseller",
            "Region": "East",
            "Price": 746,
            "Quantity": 402,
            "Discount": 86,
            "Date": "8/29/2013"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Value Added Reseller",
            "Region": "North",
            "Price": 193,
            "Quantity": 8886,
            "Discount": 1,
            "Date": "8/30/2013"
        },
        {
            "Category": "Components",
            "Color": "red",
            "Business Type": "Value Added Reseller",
            "Region": "South",
            "Price": 920,
            "Quantity": 5339,
            "Discount": 48,
            "Date": "8/31/2013"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Value Added Reseller",
            "Region": "East",
            "Price": 597,
            "Quantity": 8674,
            "Discount": 45,
            "Date": "9/1/2013"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Value Added Reseller",
            "Region": "West",
            "Price": 712,
            "Quantity": 991,
            "Discount": 38,
            "Date": "9/2/2013"
        },
        {
            "Category": "Components",
            "Color": "green",
            "Business Type": "Warehouse",
            "Region": "West",
            "Price": 923,
            "Quantity": 4553,
            "Discount": 85,
            "Date": "9/3/2013"
        },
        {
            "Category": "Components",
            "Color": "white",
            "Business Type": "Warehouse",
            "Region": "East",
            "Price": 314,
            "Quantity": 5330,
            "Discount": 50,
            "Date": "9/4/2013"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Value Added Reseller",
            "Region": "West",
            "Price": 977,
            "Quantity": 9449,
            "Discount": 54,
            "Date": "9/5/2013"
        },
        {
            "Category": "Components",
            "Color": "red",
            "Business Type": "Value Added Reseller",
            "Region": "East",
            "Price": 775,
            "Quantity": 5980,
            "Discount": 24,
            "Date": "9/6/2013"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Value Added Reseller",
            "Region": "North",
            "Price": 451,
            "Quantity": 851,
            "Discount": 50,
            "Date": "9/7/2013"
        },
        {
            "Category": "Components",
            "Color": "red",
            "Business Type": "Value Added Reseller",
            "Region": "South",
            "Price": 102,
            "Quantity": 581,
            "Discount": 36,
            "Date": "9/8/2013"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Value Added Reseller",
            "Region": "East",
            "Price": 632,
            "Quantity": 3152,
            "Discount": 20,
            "Date": "9/9/2013"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Value Added Reseller",
            "Region": "West",
            "Price": 292,
            "Quantity": 3785,
            "Discount": 37,
            "Date": "9/10/2013"
        },
        {
            "Category": "Components",
            "Color": "green",
            "Business Type": "Warehouse",
            "Region": "West",
            "Price": 93,
            "Quantity": 4998,
            "Discount": 14,
            "Date": "9/11/2013"
        },
        {
            "Category": "Components",
            "Color": "white",
            "Business Type": "Warehouse",
            "Region": "Center",
            "Price": 440,
            "Quantity": 2988,
            "Discount": 93,
            "Date": "9/12/2013"
        },
        {
            "Category": "Components",
            "Color": "green",
            "Business Type": "Warehouse",
            "Region": "Center",
            "Price": 388,
            "Quantity": 2345,
            "Discount": 80,
            "Date": "9/13/2013"
        },
        {
            "Category": "Components",
            "Color": "white",
            "Business Type": "Warehouse",
            "Region": "East",
            "Price": 984,
            "Quantity": 2116,
            "Discount": 79,
            "Date": "9/14/2013"
        },
        {
            "Category": "Components",
            "Color": "white",
            "Business Type": "Warehouse",
            "Region": "North",
            "Price": 48,
            "Quantity": 742,
            "Discount": 14,
            "Date": "9/15/2013"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Warehouse",
            "Region": "Center",
            "Price": 992,
            "Quantity": 2500,
            "Discount": 0,
            "Date": "9/16/2013"
        },
        {
            "Category": "Components",
            "Color": "white",
            "Business Type": "Warehouse",
            "Region": "East",
            "Price": 216,
            "Quantity": 7771,
            "Discount": 82,
            "Date": "9/17/2013"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Warehouse",
            "Region": "Center",
            "Price": 543,
            "Quantity": 927,
            "Discount": 46,
            "Date": "9/18/2013"
        },
        {
            "Category": "Components",
            "Color": "red",
            "Business Type": "Specialty Bike Shop",
            "Region": "West",
            "Price": 627,
            "Quantity": 1674,
            "Discount": 18,
            "Date": "9/19/2013"
        },
        {
            "Category": "Components",
            "Color": "green",
            "Business Type": "Specialty Bike Shop",
            "Region": "East",
            "Price": 452,
            "Quantity": 6047,
            "Discount": 7,
            "Date": "9/20/2013"
        },
        {
            "Category": "Components",
            "Color": "red",
            "Business Type": "Specialty Bike Shop",
            "Region": "North",
            "Price": 911,
            "Quantity": 5372,
            "Discount": 55,
            "Date": "9/21/2013"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Specialty Bike Shop",
            "Region": "East",
            "Price": 373,
            "Quantity": 7146,
            "Discount": 95,
            "Date": "9/22/2013"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Specialty Bike Shop",
            "Region": "East",
            "Price": 588,
            "Quantity": 756,
            "Discount": 6,
            "Date": "9/23/2013"
        },
        {
            "Category": "Components",
            "Color": "red",
            "Business Type": "Specialty Bike Shop",
            "Region": "South",
            "Price": 374,
            "Quantity": 4335,
            "Discount": 20,
            "Date": "9/24/2013"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Value Added Reseller",
            "Region": "South",
            "Price": 146,
            "Quantity": 2658,
            "Discount": 44,
            "Date": "9/25/2013"
        },
        {
            "Category": "Components",
            "Color": "red",
            "Business Type": "Value Added Reseller",
            "Region": "East",
            "Price": 306,
            "Quantity": 5543,
            "Discount": 73,
            "Date": "9/26/2013"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Value Added Reseller",
            "Region": "North",
            "Price": 545,
            "Quantity": 100,
            "Discount": 78,
            "Date": "9/27/2013"
        },
        {
            "Category": "Components",
            "Color": "red",
            "Business Type": "Value Added Reseller",
            "Region": "East",
            "Price": 387,
            "Quantity": 757,
            "Discount": 40,
            "Date": "9/28/2013"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Warehouse",
            "Region": "South",
            "Price": 978,
            "Quantity": 497,
            "Discount": 81,
            "Date": "9/29/2013"
        },
        {
            "Category": "Accessories",
            "Color": "red",
            "Business Type": "Specialty Bike Shop",
            "Region": "South",
            "Price": 174,
            "Quantity": 605,
            "Discount": 43,
            "Date": "9/30/2013"
        },
        {
            "Category": "Accessories",
            "Color": "yellow",
            "Business Type": "Specialty Bike Shop",
            "Region": "East",
            "Price": 502,
            "Quantity": 825,
            "Discount": 33,
            "Date": "10/1/2013"
        },
        {
            "Category": "Accessories",
            "Color": "white",
            "Business Type": "Specialty Bike Shop",
            "Region": "East",
            "Price": 242,
            "Quantity": 71,
            "Discount": 41,
            "Date": "10/2/2013"
        },
        {
            "Category": "Accessories",
            "Color": "yellow",
            "Business Type": "Specialty Bike Shop",
            "Region": "East",
            "Price": 102,
            "Quantity": 561,
            "Discount": 92,
            "Date": "10/3/2013"
        },
        {
            "Category": "Accessories",
            "Color": "red",
            "Business Type": "Specialty Bike Shop",
            "Region": "East",
            "Price": 126,
            "Quantity": 233,
            "Discount": 49,
            "Date": "10/4/2013"
        },
        {
            "Category": "Accessories",
            "Color": "yellow",
            "Business Type": "Specialty Bike Shop",
            "Region": "North",
            "Price": 1246,
            "Quantity": 331,
            "Discount": 98,
            "Date": "10/5/2013"
        },
        {
            "Category": "Accessories",
            "Color": "green",
            "Business Type": "Value Added Reseller",
            "Region": "North",
            "Price": 680,
            "Quantity": 144,
            "Discount": 11,
            "Date": "10/6/2013"
        },
        {
            "Category": "Accessories",
            "Color": "yellow",
            "Business Type": "Value Added Reseller",
            "Region": "East",
            "Price": 1241,
            "Quantity": 483,
            "Discount": 21,
            "Date": "10/7/2013"
        },
        {
            "Category": "Accessories",
            "Color": "yellow",
            "Business Type": "Value Added Reseller",
            "Region": "North",
            "Price": 150,
            "Quantity": 99,
            "Discount": 12,
            "Date": "10/8/2013"
        },
        {
            "Category": "Accessories",
            "Color": "red",
            "Business Type": "Value Added Reseller",
            "Region": "East",
            "Price": 244,
            "Quantity": 686,
            "Discount": 75,
            "Date": "10/9/2013"
        },
        {
            "Category": "Accessories",
            "Color": "yellow",
            "Business Type": "Value Added Reseller",
            "Region": "East",
            "Price": 501,
            "Quantity": 126,
            "Discount": 20,
            "Date": "10/10/2013"
        },
        {
            "Category": "Accessories",
            "Color": "red",
            "Business Type": "Value Added Reseller",
            "Region": "North",
            "Price": 4960,
            "Quantity": 930,
            "Discount": 39,
            "Date": "10/11/2013"
        },
        {
            "Category": "Accessories",
            "Color": "yellow",
            "Business Type": "Warehouse",
            "Region": "West",
            "Price": 9,
            "Quantity": 966,
            "Discount": 90,
            "Date": "10/12/2013"
        },
        {
            "Category": "Accessories",
            "Color": "red",
            "Business Type": "Warehouse",
            "Region": "Center",
            "Price": 3655,
            "Quantity": 999,
            "Discount": 73,
            "Date": "10/13/2013"
        },
        {
            "Category": "Accessories",
            "Color": "green",
            "Business Type": "Warehouse",
            "Region": "Center",
            "Price": 1654,
            "Quantity": 959,
            "Discount": 99,
            "Date": "10/14/2013"
        },
        {
            "Category": "Accessories",
            "Color": "yellow",
            "Business Type": "Warehouse",
            "Region": "Center",
            "Price": 1190,
            "Quantity": 28,
            "Discount": 53,
            "Date": "10/15/2013"
        },
        {
            "Category": "Accessories",
            "Color": "red",
            "Business Type": "Warehouse",
            "Region": "Center",
            "Price": 1222,
            "Quantity": 405,
            "Discount": 41,
            "Date": "1/18/2014"
        },
        {
            "Category": "Accessories",
            "Color": "white",
            "Business Type": "Warehouse",
            "Region": "North",
            "Price": 7941,
            "Quantity": 84,
            "Discount": 61,
            "Date": "1/19/2014"
        },
        {
            "Category": "Bikes",
            "Color": "white",
            "Business Type": "Specialty Bike Shop",
            "Region": "North",
            "Price": 7310,
            "Quantity": 31,
            "Discount": 44,
            "Date": "1/20/2014"
        },
        {
            "Category": "Bikes",
            "Color": "red",
            "Business Type": "Specialty Bike Shop",
            "Region": "Center",
            "Price": 9423,
            "Quantity": 21,
            "Discount": 79,
            "Date": "1/21/2014"
        },
        {
            "Category": "Bikes",
            "Color": "red",
            "Business Type": "Specialty Bike Shop",
            "Region": "North",
            "Price": 9225,
            "Quantity": 20,
            "Discount": 58,
            "Date": "1/22/2014"
        },
        {
            "Category": "Bikes",
            "Color": "green",
            "Business Type": "Specialty Bike Shop",
            "Region": "South",
            "Price": 1624,
            "Quantity": 48,
            "Discount": 74,
            "Date": "1/23/2014"
        },
        {
            "Category": "Bikes",
            "Color": "green",
            "Business Type": "Specialty Bike Shop",
            "Region": "South",
            "Price": 7217,
            "Quantity": 31,
            "Discount": 81,
            "Date": "1/24/2014"
        },
        {
            "Category": "Bikes",
            "Color": "green",
            "Business Type": "Specialty Bike Shop",
            "Region": "North",
            "Price": 4467,
            "Quantity": 16,
            "Discount": 90,
            "Date": "1/25/2014"
        },
        {
            "Category": "Bikes",
            "Color": "green",
            "Business Type": "Value Added Reseller",
            "Region": "North",
            "Price": 3449,
            "Quantity": 63,
            "Discount": 6,
            "Date": "1/26/2014"
        },
        {
            "Category": "Bikes",
            "Color": "red",
            "Business Type": "Value Added Reseller",
            "Region": "Center",
            "Price": 738,
            "Quantity": 35,
            "Discount": 28,
            "Date": "1/27/2014"
        },
        {
            "Category": "Bikes",
            "Color": "yellow",
            "Business Type": "Value Added Reseller",
            "Region": "North",
            "Price": 8457,
            "Quantity": 35,
            "Discount": 99,
            "Date": "1/28/2014"
        },
        {
            "Category": "Bikes",
            "Color": "red",
            "Business Type": "Value Added Reseller",
            "Region": "South",
            "Price": 2876,
            "Quantity": 20,
            "Discount": 99,
            "Date": "1/29/2014"
        },
        {
            "Category": "Bikes",
            "Color": "blue",
            "Business Type": "Value Added Reseller",
            "Region": "South",
            "Price": 8142,
            "Quantity": 29,
            "Discount": 36,
            "Date": "1/30/2014"
        },
        {
            "Category": "Bikes",
            "Color": "red",
            "Business Type": "Value Added Reseller",
            "Region": "North",
            "Price": 5042,
            "Quantity": 73,
            "Discount": 23,
            "Date": "1/31/2014"
        },
        {
            "Category": "Bikes",
            "Color": "blue",
            "Business Type": "Warehouse",
            "Region": "North",
            "Price": 8393,
            "Quantity": 56,
            "Discount": 97,
            "Date": "2/1/2014"
        },
        {
            "Category": "Bikes",
            "Color": "blue",
            "Business Type": "Warehouse",
            "Region": "South",
            "Price": 2002,
            "Quantity": 53,
            "Discount": 88,
            "Date": "2/2/2014"
        },
        {
            "Category": "Bikes",
            "Color": "purple",
            "Business Type": "Warehouse",
            "Region": "North",
            "Price": 5532,
            "Quantity": 92,
            "Discount": 61,
            "Date": "2/3/2014"
        },
        {
            "Category": "Bikes",
            "Color": "red",
            "Business Type": "Warehouse",
            "Region": "South",
            "Price": 6665,
            "Quantity": 87,
            "Discount": 99,
            "Date": "2/4/2014"
        },
        {
            "Category": "Bikes",
            "Color": "blue",
            "Business Type": "Warehouse",
            "Region": "South",
            "Price": 3449,
            "Quantity": 91,
            "Discount": 39,
            "Date": "2/5/2014"
        },
        {
            "Category": "Bikes",
            "Color": "blue",
            "Business Type": "Warehouse",
            "Region": "North",
            "Price": 3871,
            "Quantity": 41,
            "Discount": 55,
            "Date": "2/6/2014"
        },
        {
            "Category": "Clothing",
            "Color": "yellow",
            "Business Type": "Specialty Bike Shop",
            "Region": "South",
            "Price": 573,
            "Quantity": 1850,
            "Discount": 87,
            "Date": "2/7/2014"
        },
        {
            "Category": "Clothing",
            "Color": "blue",
            "Business Type": "Specialty Bike Shop",
            "Region": "East",
            "Price": 122,
            "Quantity": 2474,
            "Discount": 53,
            "Date": "2/8/2014"
        },
        {
            "Category": "Clothing",
            "Color": "blue",
            "Business Type": "Specialty Bike Shop",
            "Region": "North",
            "Price": 358,
            "Quantity": 9752,
            "Discount": 53,
            "Date": "2/9/2014"
        },
        {
            "Category": "Clothing",
            "Color": "blue",
            "Business Type": "Specialty Bike Shop",
            "Region": "East",
            "Price": 535,
            "Quantity": 9996,
            "Discount": 3,
            "Date": "2/10/2014"
        },
        {
            "Category": "Clothing",
            "Color": "white",
            "Business Type": "Specialty Bike Shop",
            "Region": "East",
            "Price": 12,
            "Quantity": 3128,
            "Discount": 52,
            "Date": "2/11/2014"
        },
        {
            "Category": "Clothing",
            "Color": "purple",
            "Business Type": "Specialty Bike Shop",
            "Region": "West",
            "Price": 422,
            "Quantity": 6602,
            "Discount": 60,
            "Date": "2/12/2014"
        },
        {
            "Category": "Clothing",
            "Color": "red",
            "Business Type": "Value Added Reseller",
            "Region": "South",
            "Price": 548,
            "Quantity": 4819,
            "Discount": 82,
            "Date": "2/13/2014"
        },
        {
            "Category": "Clothing",
            "Color": "purple",
            "Business Type": "Value Added Reseller",
            "Region": "South",
            "Price": 955,
            "Quantity": 3379,
            "Discount": 93,
            "Date": "2/14/2014"
        },
        {
            "Category": "Clothing",
            "Color": "green",
            "Business Type": "Value Added Reseller",
            "Region": "North",
            "Price": 919,
            "Quantity": 3763,
            "Discount": 36,
            "Date": "2/15/2014"
        },
        {
            "Category": "Clothing",
            "Color": "red",
            "Business Type": "Value Added Reseller",
            "Region": "East",
            "Price": 772,
            "Quantity": 7329,
            "Discount": 67,
            "Date": "2/16/2014"
        },
        {
            "Category": "Clothing",
            "Color": "white",
            "Business Type": "Value Added Reseller",
            "Region": "East",
            "Price": 322,
            "Quantity": 6948,
            "Discount": 64,
            "Date": "2/17/2014"
        },
        {
            "Category": "Clothing",
            "Color": "white",
            "Business Type": "Value Added Reseller",
            "Region": "West",
            "Price": 153,
            "Quantity": 2122,
            "Discount": 64,
            "Date": "2/18/2014"
        },
        {
            "Category": "Clothing",
            "Color": "red",
            "Business Type": "Warehouse",
            "Region": "West",
            "Price": 56,
            "Quantity": 4993,
            "Discount": 36,
            "Date": "2/19/2014"
        },
        {
            "Category": "Clothing",
            "Color": "blue",
            "Business Type": "Warehouse",
            "Region": "East",
            "Price": 269,
            "Quantity": 6431,
            "Discount": 29,
            "Date": "2/20/2014"
        },
        {
            "Category": "Clothing",
            "Color": "green",
            "Business Type": "Warehouse",
            "Region": "East",
            "Price": 797,
            "Quantity": 7253,
            "Discount": 74,
            "Date": "2/21/2014"
        },
        {
            "Category": "Clothing",
            "Color": "blue",
            "Business Type": "Warehouse",
            "Region": "East",
            "Price": 593,
            "Quantity": 3836,
            "Discount": 5,
            "Date": "2/22/2014"
        },
        {
            "Category": "Clothing",
            "Color": "green",
            "Business Type": "Warehouse",
            "Region": "East",
            "Price": 957,
            "Quantity": 5405,
            "Discount": 80,
            "Date": "2/23/2014"
        },
        {
            "Category": "Clothing",
            "Color": "green",
            "Business Type": "Warehouse",
            "Region": "West",
            "Price": 976,
            "Quantity": 6190,
            "Discount": 54,
            "Date": "2/24/2014"
        },
        {
            "Category": "Components",
            "Color": "red",
            "Business Type": "Specialty Bike Shop",
            "Region": "West",
            "Price": 645,
            "Quantity": 7079,
            "Discount": 18,
            "Date": "2/25/2014"
        },
        {
            "Category": "Components",
            "Color": "green",
            "Business Type": "Specialty Bike Shop",
            "Region": "East",
            "Price": 445,
            "Quantity": 7289,
            "Discount": 72,
            "Date": "2/26/2014"
        },
        {
            "Category": "Components",
            "Color": "red",
            "Business Type": "Specialty Bike Shop",
            "Region": "North",
            "Price": 73,
            "Quantity": 8624,
            "Discount": 10,
            "Date": "2/27/2014"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Specialty Bike Shop",
            "Region": "East",
            "Price": 776,
            "Quantity": 3344,
            "Discount": 76,
            "Date": "2/28/2014"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Specialty Bike Shop",
            "Region": "East",
            "Price": 444,
            "Quantity": 2591,
            "Discount": 82,
            "Date": "3/1/2014"
        },
        {
            "Category": "Components",
            "Color": "red",
            "Business Type": "Specialty Bike Shop",
            "Region": "West",
            "Price": 547,
            "Quantity": 9271,
            "Discount": 46,
            "Date": "3/2/2014"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Warehouse",
            "Region": "West",
            "Price": 579,
            "Quantity": 5947,
            "Discount": 26,
            "Date": "3/3/2014"
        },
        {
            "Category": "Accessories",
            "Color": "red",
            "Business Type": "Specialty Bike Shop",
            "Region": "West",
            "Price": 174,
            "Quantity": 854,
            "Discount": 84,
            "Date": "3/4/2014"
        },
        {
            "Category": "Accessories",
            "Color": "yellow",
            "Business Type": "Specialty Bike Shop",
            "Region": "East",
            "Price": 502,
            "Quantity": 227,
            "Discount": 61,
            "Date": "3/5/2014"
        },
        {
            "Category": "Accessories",
            "Color": "white",
            "Business Type": "Specialty Bike Shop",
            "Region": "East",
            "Price": 242,
            "Quantity": 121,
            "Discount": 46,
            "Date": "3/6/2014"
        },
        {
            "Category": "Accessories",
            "Color": "yellow",
            "Business Type": "Specialty Bike Shop",
            "Region": "East",
            "Price": 102,
            "Quantity": 289,
            "Discount": 70,
            "Date": "3/7/2014"
        },
        {
            "Category": "Accessories",
            "Color": "red",
            "Business Type": "Specialty Bike Shop",
            "Region": "East",
            "Price": 126,
            "Quantity": 48,
            "Discount": 21,
            "Date": "3/8/2014"
        },
        {
            "Category": "Accessories",
            "Color": "yellow",
            "Business Type": "Specialty Bike Shop",
            "Region": "South",
            "Price": 1246,
            "Quantity": 944,
            "Discount": 36,
            "Date": "3/9/2014"
        },
        {
            "Category": "Accessories",
            "Color": "green",
            "Business Type": "Value Added Reseller",
            "Region": "South",
            "Price": 680,
            "Quantity": 639,
            "Discount": 95,
            "Date": "3/10/2014"
        },
        {
            "Category": "Accessories",
            "Color": "yellow",
            "Business Type": "Value Added Reseller",
            "Region": "East",
            "Price": 1241,
            "Quantity": 892,
            "Discount": 64,
            "Date": "3/11/2014"
        },
        {
            "Category": "Accessories",
            "Color": "yellow",
            "Business Type": "Value Added Reseller",
            "Region": "North",
            "Price": 150,
            "Quantity": 953,
            "Discount": 25,
            "Date": "3/12/2014"
        },
        {
            "Category": "Accessories",
            "Color": "red",
            "Business Type": "Value Added Reseller",
            "Region": "East",
            "Price": 244,
            "Quantity": 791,
            "Discount": 36,
            "Date": "3/13/2014"
        },
        {
            "Category": "Accessories",
            "Color": "yellow",
            "Business Type": "Value Added Reseller",
            "Region": "Center",
            "Price": 501,
            "Quantity": 20,
            "Discount": 13,
            "Date": "3/14/2014"
        },
        {
            "Category": "Accessories",
            "Color": "red",
            "Business Type": "Value Added Reseller",
            "Region": "South",
            "Price": 4960,
            "Quantity": 336,
            "Discount": 4,
            "Date": "3/15/2014"
        },
        {
            "Category": "Accessories",
            "Color": "yellow",
            "Business Type": "Warehouse",
            "Region": "West",
            "Price": 9,
            "Quantity": 121,
            "Discount": 21,
            "Date": "3/16/2014"
        },
        {
            "Category": "Accessories",
            "Color": "red",
            "Business Type": "Warehouse",
            "Region": "Center",
            "Price": 3655,
            "Quantity": 812,
            "Discount": 28,
            "Date": "3/17/2014"
        },
        {
            "Category": "Accessories",
            "Color": "green",
            "Business Type": "Warehouse",
            "Region": "North",
            "Price": 1654,
            "Quantity": 663,
            "Discount": 19,
            "Date": "3/18/2014"
        },
        {
            "Category": "Accessories",
            "Color": "yellow",
            "Business Type": "Warehouse",
            "Region": "Center",
            "Price": 1190,
            "Quantity": 108,
            "Discount": 39,
            "Date": "3/19/2014"
        },
        {
            "Category": "Accessories",
            "Color": "red",
            "Business Type": "Warehouse",
            "Region": "South",
            "Price": 1222,
            "Quantity": 459,
            "Discount": 46,
            "Date": "3/20/2014"
        },
        {
            "Category": "Accessories",
            "Color": "white",
            "Business Type": "Warehouse",
            "Region": "South",
            "Price": 7941,
            "Quantity": 386,
            "Discount": 49,
            "Date": "3/21/2014"
        },
        {
            "Category": "Bikes",
            "Color": "white",
            "Business Type": "Specialty Bike Shop",
            "Region": "South",
            "Price": 2038,
            "Quantity": 94,
            "Discount": 62,
            "Date": "3/22/2014"
        },
        {
            "Category": "Bikes",
            "Color": "red",
            "Business Type": "Specialty Bike Shop",
            "Region": "Center",
            "Price": 3271,
            "Quantity": 20,
            "Discount": 93,
            "Date": "3/23/2014"
        },
        {
            "Category": "Bikes",
            "Color": "red",
            "Business Type": "Specialty Bike Shop",
            "Region": "Center",
            "Price": 1706,
            "Quantity": 77,
            "Discount": 17,
            "Date": "3/24/2014"
        },
        {
            "Category": "Bikes",
            "Color": "green",
            "Business Type": "Specialty Bike Shop",
            "Region": "Center",
            "Price": 3297,
            "Quantity": 65,
            "Discount": 23,
            "Date": "3/25/2014"
        },
        {
            "Category": "Clothing",
            "Color": "green",
            "Business Type": "Specialty Bike Shop",
            "Region": "Center",
            "Price": 518,
            "Quantity": 98,
            "Discount": 43,
            "Date": "3/26/2014"
        },
        {
            "Category": "Bikes",
            "Color": "green",
            "Business Type": "Specialty Bike Shop",
            "Region": "South",
            "Price": 2047,
            "Quantity": 59,
            "Discount": 31,
            "Date": "3/27/2014"
        },
        {
            "Category": "Bikes",
            "Color": "green",
            "Business Type": "Value Added Reseller",
            "Region": "South",
            "Price": 5582,
            "Quantity": 65,
            "Discount": 59,
            "Date": "3/28/2014"
        },
        {
            "Category": "Bikes",
            "Color": "red",
            "Business Type": "Value Added Reseller",
            "Region": "Center",
            "Price": 4235,
            "Quantity": 56,
            "Discount": 23,
            "Date": "3/29/2014"
        },
        {
            "Category": "Bikes",
            "Color": "yellow",
            "Business Type": "Value Added Reseller",
            "Region": "Center",
            "Price": 9127,
            "Quantity": 21,
            "Discount": 19,
            "Date": "3/30/2014"
        },
        {
            "Category": "Bikes",
            "Color": "red",
            "Business Type": "Value Added Reseller",
            "Region": "Center",
            "Price": 4297,
            "Quantity": 12,
            "Discount": 26,
            "Date": "3/31/2014"
        },
        {
            "Category": "Bikes",
            "Color": "blue",
            "Business Type": "Value Added Reseller",
            "Region": "Center",
            "Price": 7214,
            "Quantity": 58,
            "Discount": 28,
            "Date": "4/1/2014"
        },
        {
            "Category": "Bikes",
            "Color": "red",
            "Business Type": "Value Added Reseller",
            "Region": "South",
            "Price": 8641,
            "Quantity": 73,
            "Discount": 28,
            "Date": "4/2/2014"
        },
        {
            "Category": "Bikes",
            "Color": "blue",
            "Business Type": "Warehouse",
            "Region": "South",
            "Price": 7833,
            "Quantity": 20,
            "Discount": 14,
            "Date": "4/3/2014"
        },
        {
            "Category": "Bikes",
            "Color": "blue",
            "Business Type": "Warehouse",
            "Region": "Center",
            "Price": 6627,
            "Quantity": 89,
            "Discount": 21,
            "Date": "4/4/2014"
        },
        {
            "Category": "Bikes",
            "Color": "purple",
            "Business Type": "Warehouse",
            "Region": "Center",
            "Price": 9979,
            "Quantity": 61,
            "Discount": 24,
            "Date": "4/5/2014"
        },
        {
            "Category": "Bikes",
            "Color": "red",
            "Business Type": "Warehouse",
            "Region": "Center",
            "Price": 2751,
            "Quantity": 39,
            "Discount": 26,
            "Date": "4/6/2014"
        },
        {
            "Category": "Bikes",
            "Color": "blue",
            "Business Type": "Warehouse",
            "Region": "Center",
            "Price": 1167,
            "Quantity": 51,
            "Discount": 54,
            "Date": "4/7/2014"
        },
        {
            "Category": "Bikes",
            "Color": "blue",
            "Business Type": "Warehouse",
            "Region": "Center",
            "Price": 8236,
            "Quantity": 16,
            "Discount": 45,
            "Date": "4/8/2014"
        },
        {
            "Category": "Clothing",
            "Color": "yellow",
            "Business Type": "Specialty Bike Shop",
            "Region": "West",
            "Price": 62,
            "Quantity": 4061,
            "Discount": 43,
            "Date": "4/9/2014"
        },
        {
            "Category": "Clothing",
            "Color": "blue",
            "Business Type": "Specialty Bike Shop",
            "Region": "Center",
            "Price": 512,
            "Quantity": 3852,
            "Discount": "",
            "Date": "4/10/2014"
        },
        {
            "Category": "Clothing",
            "Color": "blue",
            "Business Type": "Specialty Bike Shop",
            "Region": "North",
            "Price": 861,
            "Quantity": 8426,
            "Discount": "",
            "Date": "4/11/2014"
        },
        {
            "Category": "Clothing",
            "Color": "blue",
            "Business Type": "Specialty Bike Shop",
            "Region": "Center",
            "Price": 454,
            "Quantity": 821,
            "Discount": "",
            "Date": "4/12/2014"
        },
        {
            "Category": "Clothing",
            "Color": "white",
            "Business Type": "Specialty Bike Shop",
            "Region": "Center",
            "Price": 44,
            "Quantity": 3402,
            "Discount": "",
            "Date": "4/13/2014"
        },
        {
            "Category": "Clothing",
            "Color": "purple",
            "Business Type": "Specialty Bike Shop",
            "Region": "Center",
            "Price": 698,
            "Quantity": 2570,
            "Discount": "",
            "Date": "4/14/2014"
        },
        {
            "Category": "Clothing",
            "Color": "red",
            "Business Type": "Value Added Reseller",
            "Region": "Center",
            "Price": 838,
            "Quantity": 6220,
            "Discount": "",
            "Date": "4/15/2014"
        },
        {
            "Category": "Clothing",
            "Color": "purple",
            "Business Type": "Value Added Reseller",
            "Region": "Center",
            "Price": 708,
            "Quantity": 3030,
            "Discount": "",
            "Date": "4/16/2014"
        },
        {
            "Category": "Clothing",
            "Color": "green",
            "Business Type": "Value Added Reseller",
            "Region": "North",
            "Price": 486,
            "Quantity": 8539,
            "Discount": "",
            "Date": "4/17/2014"
        },
        {
            "Category": "Clothing",
            "Color": "red",
            "Business Type": "Value Added Reseller",
            "Region": "East",
            "Price": 160,
            "Quantity": 8231,
            "Discount": "",
            "Date": "4/18/2014"
        },
        {
            "Category": "Clothing",
            "Color": "white",
            "Business Type": "Value Added Reseller",
            "Region": "East",
            "Price": 403,
            "Quantity": 4240,
            "Discount": "",
            "Date": "4/19/2014"
        },
        {
            "Category": "Clothing",
            "Color": "white",
            "Business Type": "Value Added Reseller",
            "Region": "West",
            "Price": 259,
            "Quantity": 8317,
            "Discount": "",
            "Date": "4/20/2014"
        },
        {
            "Category": "Clothing",
            "Color": "red",
            "Business Type": "Warehouse",
            "Region": "West",
            "Price": 373,
            "Quantity": 9660,
            "Discount": "",
            "Date": "4/21/2014"
        },
        {
            "Category": "Clothing",
            "Color": "blue",
            "Business Type": "Warehouse",
            "Region": "East",
            "Price": 781,
            "Quantity": 6787,
            "Discount": "",
            "Date": "4/22/2014"
        },
        {
            "Category": "Clothing",
            "Color": "green",
            "Business Type": "Warehouse",
            "Region": "North",
            "Price": 839,
            "Quantity": 8285,
            "Discount": "",
            "Date": "4/23/2014"
        },
        {
            "Category": "Clothing",
            "Color": "blue",
            "Business Type": "Warehouse",
            "Region": "South",
            "Price": 102,
            "Quantity": 5120,
            "Discount": "",
            "Date": "4/24/2014"
        },
        {
            "Category": "Clothing",
            "Color": "green",
            "Business Type": "Warehouse",
            "Region": "East",
            "Price": 837,
            "Quantity": 6726,
            "Discount": "",
            "Date": "4/25/2014"
        },
        {
            "Category": "Clothing",
            "Color": "green",
            "Business Type": "Warehouse",
            "Region": "West",
            "Price": 385,
            "Quantity": 7670,
            "Discount": "",
            "Date": "4/26/2014"
        },
        {
            "Category": "Clothing",
            "Color": "red",
            "Business Type": "Specialty Bike Shop",
            "Region": "West",
            "Price": 356,
            "Quantity": 3141,
            "Discount": "",
            "Date": "4/27/2014"
        },
        {
            "Category": "Clothing",
            "Color": "green",
            "Business Type": "Specialty Bike Shop",
            "Region": "East",
            "Price": 829,
            "Quantity": 6800,
            "Discount": "",
            "Date": "4/28/2014"
        },
        {
            "Category": "Clothing",
            "Color": "red",
            "Business Type": "Specialty Bike Shop",
            "Region": "North",
            "Price": 842,
            "Quantity": 9285,
            "Discount": "",
            "Date": "4/29/2014"
        },
        {
            "Category": "Clothing",
            "Color": "blue",
            "Business Type": "Specialty Bike Shop",
            "Region": "South",
            "Price": 740,
            "Quantity": 3246,
            "Discount": "",
            "Date": "4/30/2014"
        },
        {
            "Category": "Clothing",
            "Color": "blue",
            "Business Type": "Specialty Bike Shop",
            "Region": "East",
            "Price": 822,
            "Quantity": 5027,
            "Discount": "",
            "Date": "5/1/2014"
        },
        {
            "Category": "Clothing",
            "Color": "red",
            "Business Type": "Specialty Bike Shop",
            "Region": "West",
            "Price": 785,
            "Quantity": 4653,
            "Discount": "",
            "Date": "5/2/2014"
        },
        {
            "Category": "Clothing",
            "Color": "blue",
            "Business Type": "Value Added Reseller",
            "Region": "West",
            "Price": 250,
            "Quantity": 3974,
            "Discount": "",
            "Date": "8/20/2015"
        },
        {
            "Category": "Clothing",
            "Color": "red",
            "Business Type": "Value Added Reseller",
            "Region": "East",
            "Price": 414,
            "Quantity": 1668,
            "Discount": "",
            "Date": "8/21/2015"
        },
        {
            "Category": "Clothing",
            "Color": "blue",
            "Business Type": "Value Added Reseller",
            "Region": "North",
            "Price": 253,
            "Quantity": 741,
            "Discount": "",
            "Date": "8/22/2015"
        },
        {
            "Category": "Clothing",
            "Color": "red",
            "Business Type": "Value Added Reseller",
            "Region": "East",
            "Price": 730,
            "Quantity": 4650,
            "Discount": "",
            "Date": "8/23/2015"
        },
        {
            "Category": "Clothing",
            "Color": "blue",
            "Business Type": "Value Added Reseller",
            "Region": "East",
            "Price": 430,
            "Quantity": 4001,
            "Discount": "",
            "Date": "8/24/2015"
        },
        {
            "Category": "Clothing",
            "Color": "blue",
            "Business Type": "Value Added Reseller",
            "Region": "West",
            "Price": 678,
            "Quantity": 1938,
            "Discount": "",
            "Date": "8/25/2015"
        },
        {
            "Category": "Components",
            "Color": "green",
            "Business Type": "Warehouse",
            "Region": "West",
            "Price": 363,
            "Quantity": 6459,
            "Discount": "",
            "Date": "8/26/2015"
        },
        {
            "Category": "Components",
            "Color": "white",
            "Business Type": "Warehouse",
            "Region": "East",
            "Price": 735,
            "Quantity": 352,
            "Discount": "",
            "Date": "8/27/2015"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Value Added Reseller",
            "Region": "West",
            "Price": 766,
            "Quantity": 6306,
            "Discount": "",
            "Date": "8/28/2015"
        },
        {
            "Category": "Components",
            "Color": "red",
            "Business Type": "Value Added Reseller",
            "Region": "East",
            "Price": 113,
            "Quantity": 6532,
            "Discount": "",
            "Date": "8/29/2015"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Value Added Reseller",
            "Region": "North",
            "Price": 22,
            "Quantity": 5766,
            "Discount": "",
            "Date": "8/20/2015"
        },
        {
            "Category": "Components",
            "Color": "red",
            "Business Type": "Value Added Reseller",
            "Region": "East",
            "Price": 797,
            "Quantity": 6738,
            "Discount": "",
            "Date": "8/21/2015"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Value Added Reseller",
            "Region": "East",
            "Price": 26,
            "Quantity": 4829,
            "Discount": "",
            "Date": "8/22/2015"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Value Added Reseller",
            "Region": "West",
            "Price": 515,
            "Quantity": 971,
            "Discount": "",
            "Date": "8/23/2015"
        },
        {
            "Category": "Components",
            "Color": "green",
            "Business Type": "Warehouse",
            "Region": "West",
            "Price": 959,
            "Quantity": 9815,
            "Discount": "",
            "Date": "8/24/2015"
        },
        {
            "Category": "Components",
            "Color": "white",
            "Business Type": "Warehouse",
            "Region": "East",
            "Price": 72,
            "Quantity": 8940,
            "Discount": "",
            "Date": "8/25/2015"
        },
        {
            "Category": "Components",
            "Color": "green",
            "Business Type": "Warehouse",
            "Region": "West",
            "Price": 204,
            "Quantity": 2766,
            "Discount": "",
            "Date": "8/26/2015"
        },
        {
            "Category": "Components",
            "Color": "white",
            "Business Type": "Warehouse",
            "Region": "East",
            "Price": 838,
            "Quantity": 4115,
            "Discount": "",
            "Date": "8/27/2015"
        },
        {
            "Category": "Components",
            "Color": "white",
            "Business Type": "Warehouse",
            "Region": "North",
            "Price": 705,
            "Quantity": 5804,
            "Discount": "",
            "Date": "8/28/2015"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Warehouse",
            "Region": "East",
            "Price": 369,
            "Quantity": 2138,
            "Discount": "",
            "Date": "8/29/2015"
        },
        {
            "Category": "Components",
            "Color": "white",
            "Business Type": "Warehouse",
            "Region": "East",
            "Price": 804,
            "Quantity": 964,
            "Discount": "",
            "Date": "8/30/2015"
        },
        {
            "Category": "Components",
            "Color": "blue",
            "Business Type": "Warehouse",
            "Region": "West",
            "Price": 35,
            "Quantity": 2548,
            "Discount": "",
            "Date": "8/31/2015"
        },
        {
            "Category": "Components",
            "Color": "red",
            "Business Type": "Specialty Bike Shop",
            "Region": "West",
            "Price": 700,
            "Quantity": 3288,
            "Discount": "",
            "Date": "9/1/2015"
        },
        {
            "Category": "Components",
            "Color": "green",
            "Business Type": "Specialty Bike Shop",
            "Region": "East",
            "Price": 108,
            "Quantity": 2821,
            "Discount": "",
            "Date": "9/2/2015"
        },
        {
            "Category": "Accessories",
            "Color": "red",
            "Business Type": "Specialty Bike Shop",
            "Region": "West",
            "Price": 174,
            "Quantity": 459,
            "Discount": "",
            "Date": "9/3/2015"
        },
        {
            "Category": "Accessories",
            "Color": "yellow",
            "Business Type": "Specialty Bike Shop",
            "Region": "East",
            "Price": 502,
            "Quantity": 662,
            "Discount": "",
            "Date": "9/4/2015"
        },
        {
            "Category": "Accessories",
            "Color": "white",
            "Business Type": "Specialty Bike Shop",
            "Region": "North",
            "Price": 242,
            "Quantity": 856,
            "Discount": "",
            "Date": "9/5/2015"
        },
        {
            "Category": "Accessories",
            "Color": "yellow",
            "Business Type": "Specialty Bike Shop",
            "Region": "East",
            "Price": 102,
            "Quantity": 828,
            "Discount": "",
            "Date": "9/6/2015"
        },
        {
            "Category": "Accessories",
            "Color": "red",
            "Business Type": "Specialty Bike Shop",
            "Region": "East",
            "Price": 126,
            "Quantity": 385,
            "Discount": "",
            "Date": "9/7/2015"
        },
        {
            "Category": "Accessories",
            "Color": "yellow",
            "Business Type": "Specialty Bike Shop",
            "Region": "West",
            "Price": 1246,
            "Quantity": 721,
            "Discount": "",
            "Date": "9/8/2015"
        },
        {
            "Category": "Accessories",
            "Color": "green",
            "Business Type": "Value Added Reseller",
            "Region": "West",
            "Price": 680,
            "Quantity": 386,
            "Discount": "",
            "Date": "9/9/2015"
        },
        {
            "Category": "Accessories",
            "Color": "yellow",
            "Business Type": "Value Added Reseller",
            "Region": "East",
            "Price": 1241,
            "Quantity": 920,
            "Discount": "",
            "Date": "9/10/2015"
        },
        {
            "Category": "Accessories",
            "Color": "yellow",
            "Business Type": "Value Added Reseller",
            "Region": "North",
            "Price": 150,
            "Quantity": 335,
            "Discount": "",
            "Date": "9/11/2015"
        },
        {
            "Category": "Accessories",
            "Color": "red",
            "Business Type": "Value Added Reseller",
            "Region": "East",
            "Price": 244,
            "Quantity": 365,
            "Discount": "",
            "Date": "9/12/2015"
        },
        {
            "Category": "Accessories",
            "Color": "yellow",
            "Business Type": "Value Added Reseller",
            "Region": "East",
            "Price": 501,
            "Quantity": 248,
            "Discount": "",
            "Date": "9/13/2015"
        },
        {
            "Category": "Accessories",
            "Color": "red",
            "Business Type": "Value Added Reseller",
            "Region": "South",
            "Price": 4960,
            "Quantity": 762,
            "Discount": "",
            "Date": "9/14/2015"
        },
        {
            "Category": "Accessories",
            "Color": "yellow",
            "Business Type": "Warehouse",
            "Region": "West",
            "Price": 9,
            "Quantity": 487,
            "Discount": "",
            "Date": "9/15/2015"
        },
        {
            "Category": "Accessories",
            "Color": "red",
            "Business Type": "Warehouse",
            "Region": "South",
            "Price": 3655,
            "Quantity": 522,
            "Discount": "",
            "Date": "9/16/2015"
        },
        {
            "Category": "Accessories",
            "Color": "green",
            "Business Type": "Warehouse",
            "Region": "North",
            "Price": 1654,
            "Quantity": 108,
            "Discount": "",
            "Date": "9/17/2015"
        },
        {
            "Category": "Accessories",
            "Color": "yellow",
            "Business Type": "Warehouse",
            "Region": "South",
            "Price": 1190,
            "Quantity": 219,
            "Discount": "",
            "Date": "9/18/2015"
        },
        {
            "Category": "Accessories",
            "Color": "red",
            "Business Type": "Warehouse",
            "Region": "South",
            "Price": 1222,
            "Quantity": 419,
            "Discount": "",
            "Date": "9/19/2015"
        },
        {
            "Category": "Accessories",
            "Color": "white",
            "Business Type": "Warehouse",
            "Region": "South",
            "Price": 7941,
            "Quantity": 60,
            "Discount": "",
            "Date": "9/20/2015"
        },
        {
            "Category": "Bikes",
            "Color": "white",
            "Business Type": "Specialty Bike Shop",
            "Region": "South",
            "Price": 6152,
            "Quantity": 64,
            "Discount": "",
            "Date": "9/21/2015"
        },
        {
            "Category": "Bikes",
            "Color": "red",
            "Business Type": "Specialty Bike Shop",
            "Region": "South",
            "Price": 7623,
            "Quantity": 44,
            "Discount": "",
            "Date": "9/22/2015"
        },
        {
            "Category": "Bikes",
            "Color": "red",
            "Business Type": "Specialty Bike Shop",
            "Region": "North",
            "Price": 3971,
            "Quantity": 17,
            "Discount": "",
            "Date": "9/23/2015"
        },
        {
            "Category": "Bikes",
            "Color": "green",
            "Business Type": "Specialty Bike Shop",
            "Region": "South",
            "Price": 3591,
            "Quantity": 11,
            "Discount": "",
            "Date": "9/24/2015"
        },
        {
            "Category": "Bikes",
            "Color": "green",
            "Business Type": "Specialty Bike Shop",
            "Region": "South",
            "Price": 2564,
            "Quantity": 61,
            "Discount": "",
            "Date": "9/25/2015"
        },
        {
            "Category": "Bikes",
            "Color": "green",
            "Business Type": "Specialty Bike Shop",
            "Region": "South",
            "Price": 5165,
            "Quantity": 13,
            "Discount": "",
            "Date": "9/26/2015"
        },
        {
            "Category": "Bikes",
            "Color": "green",
            "Business Type": "Value Added Reseller",
            "Region": "South",
            "Price": 2344,
            "Quantity": 56,
            "Discount": "",
            "Date": "9/27/2015"
        },
        {
            "Category": "Bikes",
            "Color": "red",
            "Business Type": "Value Added Reseller",
            "Region": "South",
            "Price": 3864,
            "Quantity": 24,
            "Discount": "",
            "Date": "9/28/2015"
        },
        {
            "Category": "Bikes",
            "Color": "yellow",
            "Business Type": "Value Added Reseller",
            "Region": "North",
            "Price": 9845,
            "Quantity": 23,
            "Discount": "",
            "Date": "9/29/2015"
        },
        {
            "Category": "Bikes",
            "Color": "red",
            "Business Type": "Value Added Reseller",
            "Region": "South",
            "Price": 4822,
            "Quantity": 27,
            "Discount": "",
            "Date": "9/30/2015"
        },
        {
            "Category": "Clothing",
            "Color": "blue",
            "Business Type": "Value Added Reseller",
            "Region": "South",
            "Price": 3857,
            "Quantity": 98,
            "Discount": "",
            "Date": "10/1/2015"
        },
        {
            "Category": "Clothing",
            "Color": "red",
            "Business Type": "Value Added Reseller",
            "Region": "South",
            "Price": 2360,
            "Quantity": 55,
            "Discount": "",
            "Date": "10/2/2015"
        },
        {
            "Category": "Bikes",
            "Color": "blue",
            "Business Type": "Warehouse",
            "Region": "West",
            "Price": 8499,
            "Quantity": 62,
            "Discount": "",
            "Date": "10/3/2015"
        },
        {
            "Category": "Bikes",
            "Color": "blue",
            "Business Type": "Warehouse",
            "Region": "Center",
            "Price": 4516,
            "Quantity": 38,
            "Discount": "",
            "Date": "10/4/2015"
        },
        {
            "Category": "Bikes",
            "Color": "purple",
            "Business Type": "Warehouse",
            "Region": "North",
            "Price": 5239,
            "Quantity": 39,
            "Discount": "",
            "Date": "10/5/2015"
        },
        {
            "Category": "Bikes",
            "Color": "red",
            "Business Type": "Warehouse",
            "Region": "South",
            "Price": 9633,
            "Quantity": 19,
            "Discount": "",
            "Date": "10/6/2015"
        }
    ]
}

function getJSONPivot() {
    var chartData = [];
    var data = {};

    return $.ajax({
        url: baseUrl + '/Dashboard/RetornarClassificacoes',
        //data: JSON.stringify({ 'mes': 12, 'ano': 2017, 'cls': 1, 'loja': -1 }),
        headers: {
            'RequestVerificationToken': $('#antiForgeryToken').val(),
            'X-Requested-With': 'XMLHttpRequest'
        },
        type: "GET",
        dataType: 'json',
        contentType: 'application/json',
        cache: false,
        success: function (dados) {

            if (dados.StatusCode == 400) {
                alert(dados.StatusDescription);
            }
            else {
                var chart;

                for (var i = 0; i < dados.length; i++) {
                    data =
                        {
                            "Dias": dados[i].Dias,
                            "Mes e Ano": dados[i].MesAno,
                            "Loja": dados[i].Loja,
                            "Venda do Dia": dados[i].VendaDia,
                            "Venda Ate o Dia": dados[i].VendaAteDia,
                            "Lucro Bruto": dados[i].LucroBruto,
                            "Previsao do Mes": dados[i].PrevisaoMes,


                        };
                    chartData.push(data);
                }
                PivotGrid3(chartData);

            }
        },
        error: function (xhr, textStatus, errorThrown) {
            //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
        }
    });

}

function DataTableGridVenUad() {



    var mes = $('select[id=mes]').val() == null ? mesAtual : $('select[id=mes]').val();

    var ano = $('select[id=ano]').val() == null ? anoAtual : $('select[id=ano]').val();


    $.ajax({
        url: baseUrl + '/DashboardVendas/RetornarGridVenUad',
        data: JSON.stringify({ 'mes': mes, 'ano': ano }),
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

                data = [dados[i].Data,
                dados[i].Loja,
                dados[i].Bruto,
                dados[i].Desconto,
                dados[i].Devolucao,
                dados[i].Liquida,
                dados[i].Lucro,
                dados[i].PercentualMargem,
                dados[i].TicketMedio,
                dados[i].QtMediaClientes,
                dados[i].ClientesAtendidos]


                dataSet.push(data);
            }
            $(document).ready(function () {
                $('#dtVendas').DataTable({
                    data: dataSet,
                    columns: [
                        { title: "Data" },
                        { title: "Loja" },
                        { title: "Valor Bruto" },
                        { title: "Valor do Desconto" },
                        { title: "Valor de Devolução" },
                        { title: "Valor Líquido" },
                        { title: "Lucro" },
                        { title: "Percentual Margem" },
                        { title: "Ticket Médio" },
                        { title: "Média de Clientes" },
                        { title: "Quantidade Clientes Atendidos" }


                    ],
                    "bDestroy": true,
                    deferRender: true,
                    scroller: true,
                    "scrollX": true
                });
            });
        },
        error: function (xhr, textStatus, errorThrown) {
            //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
        }
    });
}

function ExportarTodasClassificacoesMensal() {
    var mes = $('select[id=mes]').val() == null ? mesAtual : $('select[id=mes]').val();

    var ano = $('select[id=ano]').val() == null ? anoAtual : $('select[id=ano]').val();

    var loja = $('select[id=ddlLojas]').val();

    $.ajax({
        url: baseUrl + '/Dashboard/RetornarClsVenAllMesesTotal',
        data: JSON.stringify({ 'ano': ano, 'loja': -1 }),
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


            var chartData = [
                {
                    "Ano": "Jan",
                    "Atual": dados[0].MediaJaneiro,
                    "Meta": dados[0].MediaJaneiroAnterior
                },
                {
                    "Ano": "Fev",
                    "Atual": dados[0].MediaFevereiro,
                    "Meta": dados[0].MediaFevereiroAnterior
                },
                {
                    "Ano": "Mar",
                    "Atual": dados[0].MediaMarço,
                    "Meta": dados[0].MediaMarçoAnterior
                },
                {
                    "Ano": "Abr",
                    "Atual": dados[0].MediaAbril,
                    "Meta": dados[0].MediaAbrilAnterior
                },
                {
                    "Ano": "Maio",
                    "Atual": dados[0].MediaMaio,
                    "Meta": dados[0].MediaMaioAnterior
                },
                {
                    "Ano": "Jun",
                    "Atual": dados[0].MediaJunho,
                    "Meta": dados[0].MediaJunhoAnterior
                },
                {
                    "Ano": "Jul",
                    "Atual": dados[0].MediaJulho,
                    "Meta": dados[0].MediaJulhoAnterior
                },
                {
                    "Ano": "Ago",
                    "Atual": dados[0].MediaAgosto,
                    "Meta": dados[0].MediaAgostoAnterior
                },
                {
                    "Ano": "Set",
                    "Atual": dados[0].MediaSetembro,
                    "Meta": dados[0].MediaSetembroAnterior
                },
                {
                    "Ano": "Out",
                    "Atual": dados[0].MediaOutubro,
                    "Meta": dados[0].MediaOutubroAnterior
                },
                {
                    "Ano": "Nov",
                    "Atual": dados[0].MediaNovembro,
                    "Meta": dados[0].MediaNovembroAnterior
                },
                {
                    "Ano": "Dez",
                    "Atual": dados[0].MediaDezembro,
                    "Meta": dados[0].MediaDezembroAnterior
                }


            ];
            alasql('SELECT * INTO XLSX("TodasClassificacoesMensal.xlsx", {headers: true}) FROM ?', [chartData]);
        },
        error: function (xhr, textStatus, errorThrown) {
            //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
        }
    });

}

function ExportarTodasClassificacoesDiario() {
    var mes = $('select[id=mes]').val() == null ? mesAtual : $('select[id=mes]').val();

    var ano = $('select[id=ano]').val() == null ? anoAtual : $('select[id=ano]').val();

    var loja = $('select[id=ddlLojas]').val();


    $.ajax({
        url: baseUrl + '/Dashboard/RetornarClsVenAllDiasTotal',
        data: JSON.stringify({ 'mes': mes, 'ano': ano, 'loja': -1 }),
        headers: {
            'RequestVerificationToken': $('#antiForgeryToken').val(),
            'X-Requested-With': 'XMLHttpRequest'
        },
        type: "POST",
        dataType: 'json',
        contentType: 'application/json',
        cache: false,
        success: function (dados) {

            if (dados.StatusCode == 400) {
                alert(dados.StatusDescription);
            }
            else {
                var chart;

                var chartData = [];
                var data = {};
                for (var i = 0; i < dados.length; i++) {
                    data =
                        {
                            "Data": dados[i].Dia + "/" + mes + "/" + ano,
                            "Atual": dados[i].Classificação1,
                            "Meta": dados[i].Meta,
                            "Percentual": dados[i].Percentual

                        };
                    chartData.push(data);
                }

                alasql('SELECT * INTO XLSX("TodasClassificacoesDiario.xlsx", {headers: true}) FROM ?', [chartData]);

            }
        },
        error: function (xhr, textStatus, errorThrown) {
            //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
        }
    });

}

function ExportarClassificacaoMeses1() {
    var mes = $('select[id=mes]').val();

    var ano = $('select[id=ano]').val();

    var loja = $('select[id=ddlLojas]').val();

    $.ajax({
        url: baseUrl + '/Dashboard/RetornarClsVenAllMeses',
        data: JSON.stringify({ 'ano': ano, 'cls': 1, 'loja': -1 }),
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


            var chartData = [
                {
                    "Ano": "Jan",
                    "Atual": dados[0].MediaJaneiro,
                    "Meta": dados[0].MediaJaneiroAnterior
                },
                {
                    "Ano": "Fev",
                    "Atual": dados[0].MediaFevereiro,
                    "Meta": dados[0].MediaFevereiroAnterior
                },
                {
                    "Ano": "Mar",
                    "Atual": dados[0].MediaMarço,
                    "Meta": dados[0].MediaMarçoAnterior
                },
                {
                    "Ano": "Abr",
                    "Atual": dados[0].MediaAbril,
                    "Meta": dados[0].MediaAbrilAnterior
                },
                {
                    "Ano": "Maio",
                    "Atual": dados[0].MediaMaio,
                    "Meta": dados[0].MediaMaioAnterior
                },
                {
                    "Ano": "Jun",
                    "Atual": dados[0].MediaJunho,
                    "Meta": dados[0].MediaJunhoAnterior
                },
                {
                    "Ano": "Jul",
                    "Atual": dados[0].MediaJulho,
                    "Meta": dados[0].MediaJulhoAnterior
                },
                {
                    "Ano": "Ago",
                    "Atual": dados[0].MediaAgosto,
                    "Meta": dados[0].MediaAgostoAnterior
                },
                {
                    "Ano": "Set",
                    "Atual": dados[0].MediaSetembro,
                    "Meta": dados[0].MediaSetembroAnterior
                },
                {
                    "Ano": "Out",
                    "Atual": dados[0].MediaOutubro,
                    "Meta": dados[0].MediaOutubroAnterior
                },
                {
                    "Ano": "Nov",
                    "Atual": dados[0].MediaNovembro,
                    "Meta": dados[0].MediaNovembroAnterior
                },
                {
                    "Ano": "Dez",
                    "Atual": dados[0].MediaDezembro,
                    "Meta": dados[0].MediaDezembroAnterior
                }


            ];
            alasql('SELECT * INTO XLSX("ClassificacaoMeses1.xlsx", {headers: true}) FROM ?', [chartData]);
        },
        error: function (xhr, textStatus, errorThrown) {
            //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
        }
    });

}

function ExportarClassificacaoMeses2() {
    var mes = $('select[id=mes]').val() == null ? mesAtual : $('select[id=mes]').val();

    var ano = $('select[id=ano]').val() == null ? anoAtual : $('select[id=ano]').val();

    var loja = $('select[id=ddlLojas]').val();

    $.ajax({
        url: baseUrl + '/Dashboard/RetornarClsVenAllMeses',
        data: JSON.stringify({ 'ano': ano, 'cls': 2, 'loja': -1 }),
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


            var chartData = [
                {
                    "Ano": "Jan",
                    "Atual": dados[0].MediaJaneiro,
                    "Meta": dados[0].MediaJaneiroAnterior
                },
                {
                    "Ano": "Fev",
                    "Atual": dados[0].MediaFevereiro,
                    "Meta": dados[0].MediaFevereiroAnterior
                },
                {
                    "Ano": "Mar",
                    "Atual": dados[0].MediaMarço,
                    "Meta": dados[0].MediaMarçoAnterior
                },
                {
                    "Ano": "Abr",
                    "Atual": dados[0].MediaAbril,
                    "Meta": dados[0].MediaAbrilAnterior
                },
                {
                    "Ano": "Maio",
                    "Atual": dados[0].MediaMaio,
                    "Meta": dados[0].MediaMaioAnterior
                },
                {
                    "Ano": "Jun",
                    "Atual": dados[0].MediaJunho,
                    "Meta": dados[0].MediaJunhoAnterior
                },
                {
                    "Ano": "Jul",
                    "Atual": dados[0].MediaJulho,
                    "Meta": dados[0].MediaJulhoAnterior
                },
                {
                    "Ano": "Ago",
                    "Atual": dados[0].MediaAgosto,
                    "Meta": dados[0].MediaAgostoAnterior
                },
                {
                    "Ano": "Set",
                    "Atual": dados[0].MediaSetembro,
                    "Meta": dados[0].MediaSetembroAnterior
                },
                {
                    "Ano": "Out",
                    "Atual": dados[0].MediaOutubro,
                    "Meta": dados[0].MediaOutubroAnterior
                },
                {
                    "Ano": "Nov",
                    "Atual": dados[0].MediaNovembro,
                    "Meta": dados[0].MediaNovembroAnterior
                },
                {
                    "Ano": "Dez",
                    "Atual": dados[0].MediaDezembro,
                    "Meta": dados[0].MediaDezembroAnterior
                }


            ];
            alasql('SELECT * INTO XLSX("ClassificacaoMeses2.xlsx", {headers: true}) FROM ?', [chartData]);
        },
        error: function (xhr, textStatus, errorThrown) {
            //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
        }
    });

}

function ExportarClassificacaoMeses3() {
    var mes = $('select[id=mes]').val() == null ? mesAtual : $('select[id=mes]').val();

    var ano = $('select[id=ano]').val() == null ? anoAtual : $('select[id=ano]').val();

    var loja = $('select[id=ddlLojas]').val();

    $.ajax({
        url: baseUrl + '/Dashboard/RetornarClsVenAllMeses',
        data: JSON.stringify({ 'ano': ano, 'cls': 3, 'loja': -1 }),
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


            var chartData = [
                {
                    "Ano": "Jan",
                    "Atual": dados[0].MediaJaneiro,
                    "Meta": dados[0].MediaJaneiroAnterior
                },
                {
                    "Ano": "Fev",
                    "Atual": dados[0].MediaFevereiro,
                    "Meta": dados[0].MediaFevereiroAnterior
                },
                {
                    "Ano": "Mar",
                    "Atual": dados[0].MediaMarço,
                    "Meta": dados[0].MediaMarçoAnterior
                },
                {
                    "Ano": "Abr",
                    "Atual": dados[0].MediaAbril,
                    "Meta": dados[0].MediaAbrilAnterior
                },
                {
                    "Ano": "Maio",
                    "Atual": dados[0].MediaMaio,
                    "Meta": dados[0].MediaMaioAnterior
                },
                {
                    "Ano": "Jun",
                    "Atual": dados[0].MediaJunho,
                    "Meta": dados[0].MediaJunhoAnterior
                },
                {
                    "Ano": "Jul",
                    "Atual": dados[0].MediaJulho,
                    "Meta": dados[0].MediaJulhoAnterior
                },
                {
                    "Ano": "Ago",
                    "Atual": dados[0].MediaAgosto,
                    "Meta": dados[0].MediaAgostoAnterior
                },
                {
                    "Ano": "Set",
                    "Atual": dados[0].MediaSetembro,
                    "Meta": dados[0].MediaSetembroAnterior
                },
                {
                    "Ano": "Out",
                    "Atual": dados[0].MediaOutubro,
                    "Meta": dados[0].MediaOutubroAnterior
                },
                {
                    "Ano": "Nov",
                    "Atual": dados[0].MediaNovembro,
                    "Meta": dados[0].MediaNovembroAnterior
                },
                {
                    "Ano": "Dez",
                    "Atual": dados[0].MediaDezembro,
                    "Meta": dados[0].MediaDezembroAnterior
                }


            ];
            alasql('SELECT * INTO XLSX("ClassificacaoMeses3.xlsx", {headers: true}) FROM ?', [chartData]);
        },
        error: function (xhr, textStatus, errorThrown) {
            //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
        }
    });

}

function ExportarClassificacaoMeses4() {
    var mes = $('select[id=mes]').val() == null ? mesAtual : $('select[id=mes]').val();

    var ano = $('select[id=ano]').val() == null ? anoAtual : $('select[id=ano]').val();

    var loja = $('select[id=ddlLojas]').val();

    $.ajax({
        url: baseUrl + '/Dashboard/RetornarClsVenAllMeses',
        data: JSON.stringify({ 'ano': ano, 'cls': 4, 'loja': -1 }),
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


            var chartData = [
                {
                    "Ano": "Jan",
                    "Atual": dados[0].MediaJaneiro,
                    "Meta": dados[0].MediaJaneiroAnterior
                },
                {
                    "Ano": "Fev",
                    "Atual": dados[0].MediaFevereiro,
                    "Meta": dados[0].MediaFevereiroAnterior
                },
                {
                    "Ano": "Mar",
                    "Atual": dados[0].MediaMarço,
                    "Meta": dados[0].MediaMarçoAnterior
                },
                {
                    "Ano": "Abr",
                    "Atual": dados[0].MediaAbril,
                    "Meta": dados[0].MediaAbrilAnterior
                },
                {
                    "Ano": "Maio",
                    "Atual": dados[0].MediaMaio,
                    "Meta": dados[0].MediaMaioAnterior
                },
                {
                    "Ano": "Jun",
                    "Atual": dados[0].MediaJunho,
                    "Meta": dados[0].MediaJunhoAnterior
                },
                {
                    "Ano": "Jul",
                    "Atual": dados[0].MediaJulho,
                    "Meta": dados[0].MediaJulhoAnterior
                },
                {
                    "Ano": "Ago",
                    "Atual": dados[0].MediaAgosto,
                    "Meta": dados[0].MediaAgostoAnterior
                },
                {
                    "Ano": "Set",
                    "Atual": dados[0].MediaSetembro,
                    "Meta": dados[0].MediaSetembroAnterior
                },
                {
                    "Ano": "Out",
                    "Atual": dados[0].MediaOutubro,
                    "Meta": dados[0].MediaOutubroAnterior
                },
                {
                    "Ano": "Nov",
                    "Atual": dados[0].MediaNovembro,
                    "Meta": dados[0].MediaNovembroAnterior
                },
                {
                    "Ano": "Dez",
                    "Atual": dados[0].MediaDezembro,
                    "Meta": dados[0].MediaDezembroAnterior
                }


            ];
            alasql('SELECT * INTO XLSX("ClassificacaoMeses4.xlsx", {headers: true}) FROM ?', [chartData]);
        },
        error: function (xhr, textStatus, errorThrown) {
            //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
        }
    });

}

function ExportarClassificacaoMeses5() {
    var mes = $('select[id=mes]').val() == null ? mesAtual : $('select[id=mes]').val();

    var ano = $('select[id=ano]').val() == null ? anoAtual : $('select[id=ano]').val();

    var loja = $('select[id=ddlLojas]').val();

    $.ajax({
        url: baseUrl + '/Dashboard/RetornarClsVenAllMeses',
        data: JSON.stringify({ 'ano': ano, 'cls': 5, 'loja': -1 }),
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


            var chartData = [
                {
                    "Ano": "Jan",
                    "Atual": dados[0].MediaJaneiro,
                    "Meta": dados[0].MediaJaneiroAnterior
                },
                {
                    "Ano": "Fev",
                    "Atual": dados[0].MediaFevereiro,
                    "Meta": dados[0].MediaFevereiroAnterior
                },
                {
                    "Ano": "Mar",
                    "Atual": dados[0].MediaMarço,
                    "Meta": dados[0].MediaMarçoAnterior
                },
                {
                    "Ano": "Abr",
                    "Atual": dados[0].MediaAbril,
                    "Meta": dados[0].MediaAbrilAnterior
                },
                {
                    "Ano": "Maio",
                    "Atual": dados[0].MediaMaio,
                    "Meta": dados[0].MediaMaioAnterior
                },
                {
                    "Ano": "Jun",
                    "Atual": dados[0].MediaJunho,
                    "Meta": dados[0].MediaJunhoAnterior
                },
                {
                    "Ano": "Jul",
                    "Atual": dados[0].MediaJulho,
                    "Meta": dados[0].MediaJulhoAnterior
                },
                {
                    "Ano": "Ago",
                    "Atual": dados[0].MediaAgosto,
                    "Meta": dados[0].MediaAgostoAnterior
                },
                {
                    "Ano": "Set",
                    "Atual": dados[0].MediaSetembro,
                    "Meta": dados[0].MediaSetembroAnterior
                },
                {
                    "Ano": "Out",
                    "Atual": dados[0].MediaOutubro,
                    "Meta": dados[0].MediaOutubroAnterior
                },
                {
                    "Ano": "Nov",
                    "Atual": dados[0].MediaNovembro,
                    "Meta": dados[0].MediaNovembroAnterior
                },
                {
                    "Ano": "Dez",
                    "Atual": dados[0].MediaDezembro,
                    "Meta": dados[0].MediaDezembroAnterior
                }


            ];
            alasql('SELECT * INTO XLSX("ClassificacaoMeses5.xlsx", {headers: true}) FROM ?', [chartData]);
        },
        error: function (xhr, textStatus, errorThrown) {
            //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
        }
    });

}

function ExportarClassificacaoMeses6() {
    var mes = $('select[id=mes]').val() == null ? mesAtual : $('select[id=mes]').val();

    var ano = $('select[id=ano]').val() == null ? anoAtual : $('select[id=ano]').val();

    var loja = $('select[id=ddlLojas]').val();

    $.ajax({
        url: baseUrl + '/Dashboard/RetornarClsVenAllMeses',
        data: JSON.stringify({ 'ano': ano, 'cls': 6, 'loja': -1 }),
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


            var chartData = [
                {
                    "Ano": "Jan",
                    "Atual": dados[0].MediaJaneiro,
                    "Meta": dados[0].MediaJaneiroAnterior
                },
                {
                    "Ano": "Fev",
                    "Atual": dados[0].MediaFevereiro,
                    "Meta": dados[0].MediaFevereiroAnterior
                },
                {
                    "Ano": "Mar",
                    "Atual": dados[0].MediaMarço,
                    "Meta": dados[0].MediaMarçoAnterior
                },
                {
                    "Ano": "Abr",
                    "Atual": dados[0].MediaAbril,
                    "Meta": dados[0].MediaAbrilAnterior
                },
                {
                    "Ano": "Maio",
                    "Atual": dados[0].MediaMaio,
                    "Meta": dados[0].MediaMaioAnterior
                },
                {
                    "Ano": "Jun",
                    "Atual": dados[0].MediaJunho,
                    "Meta": dados[0].MediaJunhoAnterior
                },
                {
                    "Ano": "Jul",
                    "Atual": dados[0].MediaJulho,
                    "Meta": dados[0].MediaJulhoAnterior
                },
                {
                    "Ano": "Ago",
                    "Atual": dados[0].MediaAgosto,
                    "Meta": dados[0].MediaAgostoAnterior
                },
                {
                    "Ano": "Set",
                    "Atual": dados[0].MediaSetembro,
                    "Meta": dados[0].MediaSetembroAnterior
                },
                {
                    "Ano": "Out",
                    "Atual": dados[0].MediaOutubro,
                    "Meta": dados[0].MediaOutubroAnterior
                },
                {
                    "Ano": "Nov",
                    "Atual": dados[0].MediaNovembro,
                    "Meta": dados[0].MediaNovembroAnterior
                },
                {
                    "Ano": "Dez",
                    "Atual": dados[0].MediaDezembro,
                    "Meta": dados[0].MediaDezembroAnterior
                }


            ];
            alasql('SELECT * INTO XLSX("ClassificacaoMeses6.xlsx", {headers: true}) FROM ?', [chartData]);
        },
        error: function (xhr, textStatus, errorThrown) {
            //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
        }
    });

}

function ExportarClassificacaoMeses7() {
    var mes = $('select[id=mes]').val() == null ? mesAtual : $('select[id=mes]').val();

    var ano = $('select[id=ano]').val() == null ? anoAtual : $('select[id=ano]').val();

    var loja = $('select[id=ddlLojas]').val();

    $.ajax({
        url: baseUrl + '/Dashboard/RetornarClsVenAllMeses',
        data: JSON.stringify({ 'ano': ano, 'cls': 7, 'loja': -1 }),
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


            var chartData = [
                {
                    "Ano": "Jan",
                    "Atual": dados[0].MediaJaneiro,
                    "Meta": dados[0].MediaJaneiroAnterior
                },
                {
                    "Ano": "Fev",
                    "Atual": dados[0].MediaFevereiro,
                    "Meta": dados[0].MediaFevereiroAnterior
                },
                {
                    "Ano": "Mar",
                    "Atual": dados[0].MediaMarço,
                    "Meta": dados[0].MediaMarçoAnterior
                },
                {
                    "Ano": "Abr",
                    "Atual": dados[0].MediaAbril,
                    "Meta": dados[0].MediaAbrilAnterior
                },
                {
                    "Ano": "Maio",
                    "Atual": dados[0].MediaMaio,
                    "Meta": dados[0].MediaMaioAnterior
                },
                {
                    "Ano": "Jun",
                    "Atual": dados[0].MediaJunho,
                    "Meta": dados[0].MediaJunhoAnterior
                },
                {
                    "Ano": "Jul",
                    "Atual": dados[0].MediaJulho,
                    "Meta": dados[0].MediaJulhoAnterior
                },
                {
                    "Ano": "Ago",
                    "Atual": dados[0].MediaAgosto,
                    "Meta": dados[0].MediaAgostoAnterior
                },
                {
                    "Ano": "Set",
                    "Atual": dados[0].MediaSetembro,
                    "Meta": dados[0].MediaSetembroAnterior
                },
                {
                    "Ano": "Out",
                    "Atual": dados[0].MediaOutubro,
                    "Meta": dados[0].MediaOutubroAnterior
                },
                {
                    "Ano": "Nov",
                    "Atual": dados[0].MediaNovembro,
                    "Meta": dados[0].MediaNovembroAnterior
                },
                {
                    "Ano": "Dez",
                    "Atual": dados[0].MediaDezembro,
                    "Meta": dados[0].MediaDezembroAnterior
                }


            ];
            alasql('SELECT * INTO XLSX("ClassificacaoMeses7.xlsx", {headers: true}) FROM ?', [chartData]);
        },
        error: function (xhr, textStatus, errorThrown) {
            //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
        }
    });

}

function ExportarClassificacaoMeses8() {
    var mes = $('select[id=mes]').val() == null ? mesAtual : $('select[id=mes]').val();

    var ano = $('select[id=ano]').val() == null ? anoAtual : $('select[id=ano]').val();

    var loja = $('select[id=ddlLojas]').val();

    $.ajax({
        url: baseUrl + '/Dashboard/RetornarClsVenAllMeses',
        data: JSON.stringify({ 'ano': ano, 'cls': 8, 'loja': -1 }),
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


            var chartData = [
                {
                    "Ano": "Jan",
                    "Atual": dados[0].MediaJaneiro,
                    "Meta": dados[0].MediaJaneiroAnterior
                },
                {
                    "Ano": "Fev",
                    "Atual": dados[0].MediaFevereiro,
                    "Meta": dados[0].MediaFevereiroAnterior
                },
                {
                    "Ano": "Mar",
                    "Atual": dados[0].MediaMarço,
                    "Meta": dados[0].MediaMarçoAnterior
                },
                {
                    "Ano": "Abr",
                    "Atual": dados[0].MediaAbril,
                    "Meta": dados[0].MediaAbrilAnterior
                },
                {
                    "Ano": "Maio",
                    "Atual": dados[0].MediaMaio,
                    "Meta": dados[0].MediaMaioAnterior
                },
                {
                    "Ano": "Jun",
                    "Atual": dados[0].MediaJunho,
                    "Meta": dados[0].MediaJunhoAnterior
                },
                {
                    "Ano": "Jul",
                    "Atual": dados[0].MediaJulho,
                    "Meta": dados[0].MediaJulhoAnterior
                },
                {
                    "Ano": "Ago",
                    "Atual": dados[0].MediaAgosto,
                    "Meta": dados[0].MediaAgostoAnterior
                },
                {
                    "Ano": "Set",
                    "Atual": dados[0].MediaSetembro,
                    "Meta": dados[0].MediaSetembroAnterior
                },
                {
                    "Ano": "Out",
                    "Atual": dados[0].MediaOutubro,
                    "Meta": dados[0].MediaOutubroAnterior
                },
                {
                    "Ano": "Nov",
                    "Atual": dados[0].MediaNovembro,
                    "Meta": dados[0].MediaNovembroAnterior
                },
                {
                    "Ano": "Dez",
                    "Atual": dados[0].MediaDezembro,
                    "Meta": dados[0].MediaDezembroAnterior
                }


            ];
            alasql('SELECT * INTO XLSX("ClassificacaoMeses8.xlsx", {headers: true}) FROM ?', [chartData]);
        },
        error: function (xhr, textStatus, errorThrown) {
            //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
        }
    });

}

function ExportarTodasClassificacoes() {
    var mes = $('select[id=mes]').val() == null ? mesAtual : $('select[id=mes]').val();

    var ano = $('select[id=ano]').val() == null ? anoAtual : $('select[id=ano]').val();

    var loja = $('select[id=ddlLojas]').val();

    $.ajax({
        url: baseUrl + '/Dashboard/RetornarClsVenAllGrafico',
        data: JSON.stringify({ 'mes': mes, 'ano': ano, 'loja': -1 }),
        headers: {
            'RequestVerificationToken': $('#antiForgeryToken').val(),
            'X-Requested-With': 'XMLHttpRequest'
        },
        type: "POST",
        dataType: 'json',
        contentType: 'application/json',
        cache: false,
        success: function (dados) {

            if (dados.StatusCode == 400) {
                alert(dados.StatusDescription);
            }
            else {

                var chart;


                var chartData = [
                    {
                        "Classificação": dados[0].NomeClassificação1,
                        "Atual": dados[0].Classificação1,
                        "Meta": dados[0].Classificação1Anterior
                    },
                    {
                        "Classificação": dados[0].NomeClassificação2,
                        "Atual": dados[0].Classificação2,
                        "Meta": dados[0].Classificação2Anterior
                    },
                    {
                        "Classificação": dados[0].NomeClassificação3,
                        "Atual": dados[0].Classificação3,
                        "Meta": dados[0].Classificação3Anterior
                    },
                    {
                        "Classificação": dados[0].NomeClassificação4,
                        "Atual": dados[0].Classificação4,
                        "Meta": dados[0].Classificação4Anterior
                    },
                    {
                        "Classificação": dados[0].NomeClassificação5,
                        "Atual": dados[0].Classificação5,
                        "Meta": dados[0].Classificação5Anterior
                    },
                    {
                        "Classificação": dados[0].NomeClassificação6,
                        "Atual": dados[0].Classificação6,
                        "Meta": dados[0].Classificação6Anterior
                    },
                    {
                        "Classificação": dados[0].NomeClassificação7,
                        "Atual": dados[0].Classificação7,
                        "Meta": dados[0].Classificação7Anterior
                    },
                    {
                        "Classificação": dados[0].NomeClassificação8,
                        "Atual": dados[0].Classificação8,
                        "Meta": dados[0].Classificação8Anterior
                    }


                ];


                alasql('SELECT * INTO XLSX("TodasClassificacoes.xlsx", {headers: true}) FROM ?', [chartData]);

            }
        },
        error: function (xhr, textStatus, errorThrown) {
            //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
        }

    });
}

function ExportarPiramideClassificacoes() {

    var mes = $('select[id=mes]').val() == null ? mesAtual : $('select[id=mes]').val();

    var ano = $('select[id=ano]').val() == null ? anoAtual : $('select[id=ano]').val();

    var loja = $('select[id=ddlLojas]').val();

    $.ajax({
        url: baseUrl + '/Dashboard/RetornarClsVenAll',
        data: JSON.stringify({ 'mes': mes, 'ano': ano, 'loja': -1 }),
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
            var data = [
                {
                    "Classificação": dados[0].NomeClassificação1,
                    "Valor": dados[0].Classificação1
                },
                {
                    "Classificação": dados[0].NomeClassificação2,
                    "Valor": dados[0].Classificação2
                },
                {
                    "Classificação": dados[0].NomeClassificação3,
                    "Valor": dados[0].Classificação3
                },
                {
                    "Classificação": dados[0].NomeClassificação4,
                    "Valor": dados[0].Classificação4
                },
                {
                    "Classificação": dados[0].NomeClassificação5,
                    "Valor": dados[0].Classificação5
                },
                {
                    "Classificação": dados[0].NomeClassificação6,
                    "Valor": dados[0].Classificação6
                },
                {
                    "Classificação": dados[0].NomeClassificação7,
                    "Valor": dados[0].Classificação7
                },
                {
                    "Classificação": dados[0].NomeClassificação8,
                    "Valor": dados[0].Classificação8
                }


            ];
            alasql('SELECT * INTO XLSX("PiramideClassificacoes.xlsx", {headers: true}) FROM ?', [data]);

        },
        error: function (xhr, textStatus, errorThrown) {
            //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
        }
    });
}

function ExportarTortaClassificacoes() {


    var mes = $('select[id=mes]').val() == null ? mesAtual : $('select[id=mes]').val();

    var ano = $('select[id=ano]').val() == null ? anoAtual : $('select[id=ano]').val();

    var loja = $('select[id=ddlLojas]').val();

    $.ajax({
        url: baseUrl + '/Dashboard/RetornarClassificacoes',
        data: JSON.stringify({ 'mes': mes, 'ano': ano, 'loja': -1 }),
        headers: {
            'RequestVerificationToken': $('#antiForgeryToken').val(),
            'X-Requested-With': 'XMLHttpRequest'
        },
        type: "POST",
        dataType: 'json',
        contentType: 'application/json',
        cache: false,
        success: function (dados) {
            //  Chart 2
            var chart2_data = [
                ['Classificação', 'Valor'],
                [dados[0].NomeClassificação1, dados[0].Classificação1],
                [dados[0].NomeClassificação2, dados[0].Classificação2],
                [dados[0].NomeClassificação3, dados[0].Classificação3],
                [dados[0].NomeClassificação4, dados[0].Classificação4],
                [dados[0].NomeClassificação5, dados[0].Classificação5],
                [dados[0].NomeClassificação6, dados[0].Classificação6],
                [dados[0].NomeClassificação7, dados[0].Classificação7],
                [dados[0].NomeClassificação8, dados[0].Classificação8]
            ];

            alasql('SELECT * INTO XLSX("TortaClassificacoes.xlsx", {headers: true}) FROM ?', [chart2_data]);
        },
        error: function (xhr, textStatus, errorThrown) {
            //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
        }
    });
}

function ExportarClassificacaoDiaria1() {
    var mes = $('select[id=mes]').val() == null ? mesAtual : $('select[id=mes]').val();

    var ano = $('select[id=ano]').val() == null ? anoAtual : $('select[id=ano]').val();

    var loja = $('select[id=ddlLojas]').val();

    $.ajax({
        url: baseUrl + '/Dashboard/RetornarClsVenAllDias',
        data: JSON.stringify({ 'mes': mes, 'ano': ano, 'cls': 1, 'loja': -1 }),
        headers: {
            'RequestVerificationToken': $('#antiForgeryToken').val(),
            'X-Requested-With': 'XMLHttpRequest'
        },
        type: "POST",
        dataType: 'json',
        contentType: 'application/json',
        cache: false,
        success: function (dados) {

            if (dados.StatusCode == 400) {
                alert(dados.StatusDescription);
            }
            else {
                var chart;

                var chartData = [];
                var data = {};
                for (var i = 0; i < dados.length; i++) {
                    data =
                        {
                            "Data": dados[i].Dia + "/" + mes + "/" + ano,
                            "Atual": dados[i].Classificação1,
                            "Meta": dados[i].Meta,
                            "Percentual": dados[i].Percentual

                        };
                    chartData.push(data);
                }

                alasql('SELECT * INTO XLSX("ClassificacaoDiaria1.xlsx", {headers: true}) FROM ?', [chartData]);

            }
        },
        error: function (xhr, textStatus, errorThrown) {
            //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
        }
    });

}

function ExportarClassificacaoDiaria2() {
    var mes = $('select[id=mes]').val() == null ? mesAtual : $('select[id=mes]').val();

    var ano = $('select[id=ano]').val() == null ? anoAtual : $('select[id=ano]').val();

    var loja = $('select[id=ddlLojas]').val();

    $.ajax({
        url: baseUrl + '/Dashboard/RetornarClsVenAllDias',
        data: JSON.stringify({ 'mes': mes, 'ano': ano, 'cls': 2, 'loja': -1 }),
        headers: {
            'RequestVerificationToken': $('#antiForgeryToken').val(),
            'X-Requested-With': 'XMLHttpRequest'
        },
        type: "POST",
        dataType: 'json',
        contentType: 'application/json',
        cache: false,
        success: function (dados) {

            if (dados.StatusCode == 400) {
                alert(dados.StatusDescription);
            }
            else {
                var chart;

                var chartData = [];
                var data = {};
                for (var i = 0; i < dados.length; i++) {
                    data =
                        {
                            "Data": dados[i].Dia + "/" + mes + "/" + ano,
                            "Atual": dados[i].Classificação1,
                            "Meta": dados[i].Meta,
                            "Percentual": dados[i].Percentual

                        };
                    chartData.push(data);
                }

                alasql('SELECT * INTO XLSX("ClassificacaoDiaria2.xlsx", {headers: true}) FROM ?', [chartData]);

            }
        },
        error: function (xhr, textStatus, errorThrown) {
            //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
        }
    });

}

function ExportarClassificacaoDiaria3() {
    var mes = $('select[id=mes]').val() == null ? mesAtual : $('select[id=mes]').val();

    var ano = $('select[id=ano]').val() == null ? anoAtual : $('select[id=ano]').val();

    var loja = $('select[id=ddlLojas]').val();

    $.ajax({
        url: baseUrl + '/Dashboard/RetornarClsVenAllDias',
        data: JSON.stringify({ 'mes': mes, 'ano': ano, 'cls': 3, 'loja': -1 }),
        headers: {
            'RequestVerificationToken': $('#antiForgeryToken').val(),
            'X-Requested-With': 'XMLHttpRequest'
        },
        type: "POST",
        dataType: 'json',
        contentType: 'application/json',
        cache: false,
        success: function (dados) {

            if (dados.StatusCode == 400) {
                alert(dados.StatusDescription);
            }
            else {
                var chart;

                var chartData = [];
                var data = {};
                for (var i = 0; i < dados.length; i++) {
                    data =
                        {
                            "Data": dados[i].Dia + "/" + mes + "/" + ano,
                            "Atual": dados[i].Classificação1,
                            "Meta": dados[i].Meta,
                            "Percentual": dados[i].Percentual

                        };
                    chartData.push(data);
                }

                alasql('SELECT * INTO XLSX("ClassificacaoDiaria3.xlsx", {headers: true}) FROM ?', [chartData]);

            }
        },
        error: function (xhr, textStatus, errorThrown) {
            //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
        }
    });

}

function ExportarClassificacaoDiaria4() {
    var mes = $('select[id=mes]').val() == null ? mesAtual : $('select[id=mes]').val();

    var ano = $('select[id=ano]').val() == null ? anoAtual : $('select[id=ano]').val();

    var loja = $('select[id=ddlLojas]').val();

    $.ajax({
        url: baseUrl + '/Dashboard/RetornarClsVenAllDias',
        data: JSON.stringify({ 'mes': mes, 'ano': ano, 'cls': 4, 'loja': -1 }),
        headers: {
            'RequestVerificationToken': $('#antiForgeryToken').val(),
            'X-Requested-With': 'XMLHttpRequest'
        },
        type: "POST",
        dataType: 'json',
        contentType: 'application/json',
        cache: false,
        success: function (dados) {

            if (dados.StatusCode == 400) {
                alert(dados.StatusDescription);
            }
            else {
                var chart;

                var chartData = [];
                var data = {};
                for (var i = 0; i < dados.length; i++) {
                    data =
                        {
                            "Data": dados[i].Dia + "/" + mes + "/" + ano,
                            "Atual": dados[i].Classificação1,
                            "Meta": dados[i].Meta,
                            "Percentual": dados[i].Percentual

                        };
                    chartData.push(data);
                }

                alasql('SELECT * INTO XLSX("ClassificacaoDiaria4.xlsx", {headers: true}) FROM ?', [chartData]);

            }
        },
        error: function (xhr, textStatus, errorThrown) {
            //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
        }
    });

}

function ExportarClassificacaoDiaria5() {
    var mes = $('select[id=mes]').val() == null ? mesAtual : $('select[id=mes]').val();

    var ano = $('select[id=ano]').val() == null ? anoAtual : $('select[id=ano]').val();

    var loja = $('select[id=ddlLojas]').val();

    $.ajax({
        url: baseUrl + '/Dashboard/RetornarClsVenAllDias',
        data: JSON.stringify({ 'mes': mes, 'ano': ano, 'cls': 5, 'loja': -1 }),
        headers: {
            'RequestVerificationToken': $('#antiForgeryToken').val(),
            'X-Requested-With': 'XMLHttpRequest'
        },
        type: "POST",
        dataType: 'json',
        contentType: 'application/json',
        cache: false,
        success: function (dados) {

            if (dados.StatusCode == 400) {
                alert(dados.StatusDescription);
            }
            else {
                var chart;

                var chartData = [];
                var data = {};
                for (var i = 0; i < dados.length; i++) {
                    data =
                        {
                            "Data": dados[i].Dia + "/" + mes + "/" + ano,
                            "Atual": dados[i].Classificação1,
                            "Meta": dados[i].Meta,
                            "Percentual": dados[i].Percentual

                        };
                    chartData.push(data);
                }

                alasql('SELECT * INTO XLSX("ClassificacaoDiaria5.xlsx", {headers: true}) FROM ?', [chartData]);

            }
        },
        error: function (xhr, textStatus, errorThrown) {
            //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
        }
    });

}

function ExportarClassificacaoDiaria6() {
    var mes = $('select[id=mes]').val() == null ? mesAtual : $('select[id=mes]').val();

    var ano = $('select[id=ano]').val() == null ? anoAtual : $('select[id=ano]').val();

    var loja = $('select[id=ddlLojas]').val();

    $.ajax({
        url: baseUrl + '/Dashboard/RetornarClsVenAllDias',
        data: JSON.stringify({ 'mes': mes, 'ano': ano, 'cls': 6, 'loja': -1 }),
        headers: {
            'RequestVerificationToken': $('#antiForgeryToken').val(),
            'X-Requested-With': 'XMLHttpRequest'
        },
        type: "POST",
        dataType: 'json',
        contentType: 'application/json',
        cache: false,
        success: function (dados) {

            if (dados.StatusCode == 400) {
                alert(dados.StatusDescription);
            }
            else {
                var chart;

                var chartData = [];
                var data = {};
                for (var i = 0; i < dados.length; i++) {
                    data =
                        {
                            "Data": dados[i].Dia + "/" + mes + "/" + ano,
                            "Atual": dados[i].Classificação1,
                            "Meta": dados[i].Meta,
                            "Percentual": dados[i].Percentual

                        };
                    chartData.push(data);
                }

                alasql('SELECT * INTO XLSX("ClassificacaoDiaria6.xlsx", {headers: true}) FROM ?', [chartData]);

            }
        },
        error: function (xhr, textStatus, errorThrown) {
            //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
        }
    });

}

function ExportarClassificacaoDiaria7() {
    var mes = $('select[id=mes]').val() == null ? mesAtual : $('select[id=mes]').val();

    var ano = $('select[id=ano]').val() == null ? anoAtual : $('select[id=ano]').val();

    var loja = $('select[id=ddlLojas]').val();

    $.ajax({
        url: baseUrl + '/Dashboard/RetornarClsVenAllDias',
        data: JSON.stringify({ 'mes': mes, 'ano': ano, 'cls': 7, 'loja': -1 }),
        headers: {
            'RequestVerificationToken': $('#antiForgeryToken').val(),
            'X-Requested-With': 'XMLHttpRequest'
        },
        type: "POST",
        dataType: 'json',
        contentType: 'application/json',
        cache: false,
        success: function (dados) {

            if (dados.StatusCode == 400) {
                alert(dados.StatusDescription);
            }
            else {
                var chart;

                var chartData = [];
                var data = {};
                for (var i = 0; i < dados.length; i++) {
                    data =
                        {
                            "Data": dados[i].Dia + "/" + mes + "/" + ano,
                            "Atual": dados[i].Classificação1,
                            "Meta": dados[i].Meta,
                            "Percentual": dados[i].Percentual

                        };
                    chartData.push(data);
                }

                alasql('SELECT * INTO XLSX("ClassificacaoDiaria7.xlsx", {headers: true}) FROM ?', [chartData]);

            }
        },
        error: function (xhr, textStatus, errorThrown) {
            //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
        }
    });

}

function ExportarClassificacaoDiaria8() {
    var mes = $('select[id=mes]').val() == null ? mesAtual : $('select[id=mes]').val();

    var ano = $('select[id=ano]').val() == null ? anoAtual : $('select[id=ano]').val();

    var loja = $('select[id=ddlLojas]').val();

    $.ajax({
        url: baseUrl + '/Dashboard/RetornarClsVenAllDias',
        data: JSON.stringify({ 'mes': mes, 'ano': ano, 'cls': 8, 'loja': -1 }),
        headers: {
            'RequestVerificationToken': $('#antiForgeryToken').val(),
            'X-Requested-With': 'XMLHttpRequest'
        },
        type: "POST",
        dataType: 'json',
        contentType: 'application/json',
        cache: false,
        success: function (dados) {

            if (dados.StatusCode == 400) {
                alert(dados.StatusDescription);
            }
            else {
                var chart;

                var chartData = [];
                var data = {};
                for (var i = 0; i < dados.length; i++) {
                    data =
                        {
                            "Data": dados[i].Dia + "/" + mes + "/" + ano,
                            "Atual": dados[i].Classificação1,
                            "Meta": dados[i].Meta,
                            "Percentual": dados[i].Percentual

                        };
                    chartData.push(data);
                }

                alasql('SELECT * INTO XLSX("ClassificacaoDiaria8.xlsx", {headers: true}) FROM ?', [chartData]);

            }
        },
        error: function (xhr, textStatus, errorThrown) {
            //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
        }
    });

}

function ExportarTicketMedioMes() {
    var mes = $('select[id=mes]').val() == null ? mesAtual : $('select[id=mes]').val();

    var ano = $('select[id=ano]').val() == null ? anoAtual : $('select[id=ano]').val();

    var loja = $('select[id=ddlLojas]').val();

    $.ajax({
        url: baseUrl + '/Dashboard/RetornarTicketMedioMeses',
        data: JSON.stringify({ 'ano': ano, 'loja': -1 }),
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


            var chartData = [
                {
                    "Mês": "Jan",
                    "Média": dados[0].MediaJaneiro,
                    "Meta": dados[0].MediaJaneiroAnterior
                },
                {
                    "Mês": "Fev",
                    "Média": dados[0].MediaFevereiro,
                    "Meta": dados[0].MediaFevereiroAnterior
                },
                {
                    "Mês": "Mar",
                    "Média": dados[0].MediaMarço,
                    "Meta": dados[0].MediaMarçoAnterior
                },
                {
                    "Mês": "Abr",
                    "Média": dados[0].MediaAbril,
                    "Meta": dados[0].MediaAbrilAnterior
                },
                {
                    "Mês": "Maio",
                    "Média": dados[0].MediaMaio,
                    "Meta": dados[0].MediaMaioAnterior
                },
                {
                    "Mês": "Jun",
                    "Média": dados[0].MediaJunho,
                    "Meta": dados[0].MediaJunhoAnterior
                },
                {
                    "Mês": "Jul",
                    "Média": dados[0].MediaJulho,
                    "Meta": dados[0].MediaJulhoAnterior
                },
                {
                    "Mês": "Ago",
                    "Média": dados[0].MediaAgosto,
                    "Meta": dados[0].MediaAgostoAnterior
                },
                {
                    "Mês": "Set",
                    "Média": dados[0].MediaSetembro,
                    "Meta": dados[0].MediaSetembroAnterior
                },
                {
                    "Mês": "Out",
                    "Média": dados[0].MediaOutubro,
                    "Meta": dados[0].MediaOutubroAnterior
                },
                {
                    "Mês": "Nov",
                    "Média": dados[0].MediaNovembro,
                    "Meta": dados[0].MediaNovembroAnterior
                },
                {
                    "Mês": "Dez",
                    "Média": dados[0].MediaDezembro,
                    "Meta": dados[0].MediaDezembroAnterior
                }


            ];

            alasql('SELECT * INTO XLSX("TicketMedioMensal.xlsx", {headers: true}) FROM ?', [chartData]);
        },
        error: function (xhr, textStatus, errorThrown) {
            //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
        }
    });

}

function ExportarTotalClientesMes() {
    var mes = $('select[id=mes]').val() == null ? mesAtual : $('select[id=mes]').val();

    var ano = $('select[id=ano]').val() == null ? anoAtual : $('select[id=ano]').val();

    var loja = $('select[id=ddlLojas]').val();

    $.ajax({
        url: baseUrl + '/Dashboard/RetornarTicketMedioClientesMeses',
        data: JSON.stringify({ 'ano': ano, 'loja': -1 }),
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

            var chartData = [
                {
                    "Mês": "Jan",
                    "Média": dados[0].MediaJaneiro,
                    "Meta": dados[0].MediaJaneiroAnterior
                },
                {
                    "Mês": "Fev",
                    "Média": dados[0].MediaFevereiro,
                    "Meta": dados[0].MediaFevereiroAnterior
                },
                {
                    "Mês": "Mar",
                    "Média": dados[0].MediaMarço,
                    "Meta": dados[0].MediaMarçoAnterior
                },
                {
                    "Mês": "Abr",
                    "Média": dados[0].MediaAbril,
                    "Meta": dados[0].MediaAbrilAnterior
                },
                {
                    "Mês": "Maio",
                    "Média": dados[0].MediaMaio,
                    "Meta": dados[0].MediaMaioAnterior
                },
                {
                    "Mês": "Jun",
                    "Média": dados[0].MediaJunho,
                    "Meta": dados[0].MediaJunhoAnterior
                },
                {
                    "Mês": "Jul",
                    "Média": dados[0].MediaJulho,
                    "Meta": dados[0].MediaJulhoAnterior
                },
                {
                    "Mês": "Ago",
                    "Média": dados[0].MediaAgosto,
                    "Meta": dados[0].MediaAgostoAnterior
                },
                {
                    "Mês": "Set",
                    "Média": dados[0].MediaSetembro,
                    "Meta": dados[0].MediaSetembroAnterior
                },
                {
                    "Mês": "Out",
                    "Média": dados[0].MediaOutubro,
                    "Meta": dados[0].MediaOutubroAnterior
                },
                {
                    "Mês": "Nov",
                    "Média": dados[0].MediaNovembro,
                    "Meta": dados[0].MediaNovembroAnterior
                },
                {
                    "Mês": "Dez",
                    "Média": dados[0].MediaDezembro,
                    "Meta": dados[0].MediaDezembroAnterior
                }


            ];

            alasql('SELECT * INTO XLSX("TotalClientesMensal.xlsx", {headers: true}) FROM ?', [chartData]);


        },
        error: function (xhr, textStatus, errorThrown) {
            //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
        }
    });

}

function ExportarTotalItensVendidosMes() {
    var mes = $('select[id=mes]').val() == null ? mesAtual : $('select[id=mes]').val();

    var ano = $('select[id=ano]').val() == null ? anoAtual : $('select[id=ano]').val();

    var loja = $('select[id=ddlLojas]').val();

    $.ajax({
        url: baseUrl + '/Dashboard/RetornarTicketMedioItensMeses',
        data: JSON.stringify({ 'ano': ano, 'loja': -1 }),
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

            var chartData = [
                {
                    "Mês": "Jan",
                    "Média": dados[0].MediaJaneiro,
                    "Meta": dados[0].MediaJaneiroAnterior
                },
                {
                    "Mês": "Fev",
                    "Média": dados[0].MediaFevereiro,
                    "Meta": dados[0].MediaFevereiroAnterior
                },
                {
                    "Mês": "Mar",
                    "Média": dados[0].MediaMarço,
                    "Meta": dados[0].MediaMarçoAnterior
                },
                {
                    "Mês": "Abr",
                    "Média": dados[0].MediaAbril,
                    "Meta": dados[0].MediaAbrilAnterior
                },
                {
                    "Mês": "Maio",
                    "Média": dados[0].MediaMaio,
                    "Meta": dados[0].MediaMaioAnterior
                },
                {
                    "Mês": "Jun",
                    "Média": dados[0].MediaJunho,
                    "Meta": dados[0].MediaJunhoAnterior
                },
                {
                    "Mês": "Jul",
                    "Média": dados[0].MediaJulho,
                    "Meta": dados[0].MediaJulhoAnterior
                },
                {
                    "Mês": "Ago",
                    "Média": dados[0].MediaAgosto,
                    "Meta": dados[0].MediaAgostoAnterior
                },
                {
                    "Mês": "Set",
                    "Média": dados[0].MediaSetembro,
                    "Meta": dados[0].MediaSetembroAnterior
                },
                {
                    "Mês": "Out",
                    "Média": dados[0].MediaOutubro,
                    "Meta": dados[0].MediaOutubroAnterior
                },
                {
                    "Mês": "Nov",
                    "Média": dados[0].MediaNovembro,
                    "Meta": dados[0].MediaNovembroAnterior
                },
                {
                    "Mês": "Dez",
                    "Média": dados[0].MediaDezembro,
                    "Meta": dados[0].MediaDezembroAnterior
                }


            ];

            alasql('SELECT * INTO XLSX("TotalItensVendidosMensal.xlsx", {headers: true}) FROM ?', [chartData]);

        },
        error: function (xhr, textStatus, errorThrown) {
            //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
        }
    });

}

function DataTableGridVenda() {

    var mes = $('select[id=mes]').val() == null ? mesAtual : $('select[id=mes]').val();

    var ano = $('select[id=ano]').val() == null ? anoAtual : $('select[id=ano]').val();


    $.ajax({
        url: baseUrl + '/DashboardVendas/RetornarGridVenUadTotal',
        data: JSON.stringify({ 'mes': mes, 'ano': ano }),
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

                data = [dados[i].Data,
                dados[i].TotalLojas,
                dados[i].Lucro,
                dados[i].Bruto,
                dados[i].Liquida,
                dados[i].Desconto,
                dados[i].PercentualMargem,
                dados[i].QtMediaClientes,
                dados[i].ClientesAtendidos,
                dados[i].Custo,
                dados[i].Devolucao]


                dataSet.push(data);
            }
            $(document).ready(function () {
                $('#example').DataTable({
                    data: dataSet,
                    columns: [
                        { title: "Data" },
                        { title: "Total de Lojas" },
                        { title: "Lucro" },
                        { title: "Venda Bruta" },
                        { title: "Valor de Liquído" },
                        { title: "Valor de Desconto" },
                        { title: "Percentual de Margem" },
                        { title: "Quantidade Média de Clientes" },
                        { title: "Clientes Atendidos" },
                        { title: "Custo" },
                        { title: "Valor de Devolução" }


                    ],
                    "bDestroy": true,
                    deferRender: true,
                    scroller: true,
                    "scrollX": true
                });
            });
        },
        error: function (xhr, textStatus, errorThrown) {
            //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
        }
    });
}

function ExportarDataTableGridVenda() {
    var mes = $('select[id=mes]').val() == null ? mesAtual : $('select[id=mes]').val();

    var ano = $('select[id=ano]').val() == null ? anoAtual : $('select[id=ano]').val();


    $.ajax({
        url: baseUrl + '/DashboardVendas/RetornarGridVenUadTotal',
        data: JSON.stringify({ 'mes': mes, 'ano': ano }),
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
                    "Data": dados[i].Data,
                    "Total de Lojas": dados[i].TotalLojas,
                    "Lucro": dados[i].Lucro,
                    "Venda Bruta": dados[i].Bruto,
                    "Valor de Liquído": dados[i].Liquida,
                    "Valor de Desconto": dados[i].Desconto,
                    "Percentual de Margem": dados[i].PercentualMargem,
                    "Quantidade Média de Clientes": dados[i].QtMediaClientes,
                    "Clientes Atendidos": dados[i].ClientesAtendidos,
                    "Custo": dados[i].Custo,
                    "Valor de Devolução": dados[i].Devolucao
                }


                dataSet.push(data);
            }
            alasql('SELECT * INTO XLSX("TotalizadorVendas.xlsx", {headers: true}) FROM ?', [dataSet]);
        },
        error: function (xhr, textStatus, errorThrown) {
            //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
        }
    });
}

function ExportarDataTableGridVenUad() {

    var mes = $('select[id=mes]').val() == null ? mesAtual : $('select[id=mes]').val();

    var ano = $('select[id=ano]').val() == null ? anoAtual : $('select[id=ano]').val();


    $.ajax({
        url: baseUrl + '/DashboardVendas/RetornarGridVenUad',
        data: JSON.stringify({ 'mes': mes, 'ano': ano }),
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
                    "Data": dados[i].Data,
                    "Loja": dados[i].Loja,
                    "Valor Bruto": dados[i].Bruto,
                    "Valor do Desconto": dados[i].Desconto,
                    "Valor de Devolução": dados[i].Devolucao,
                    "Valor Líquido": dados[i].Liquida,
                    "Lucro": dados[i].Lucro,
                    "Percentual Margem": dados[i].PercentualMargem,
                    "Ticket Médio": dados[i].TicketMedio,
                    "Média de Clientes": dados[i].QtMediaClientes,
                    "Quantidade Clientes Atendidos": dados[i].ClientesAtendidos
                }


                dataSet.push(data);
            }
            alasql('SELECT * INTO XLSX("VendasLojas.xlsx", {headers: true}) FROM ?', [dataSet]);
        },
        error: function (xhr, textStatus, errorThrown) {
            //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
        }
    });
}

function ExportarGraficoVendas() {

    var mes = $('select[id=mes]').val() == null ? mesAtual : $('select[id=mes]').val();

    var ano = $('select[id=ano]').val() == null ? anoAtual : $('select[id=ano]').val();


    $.ajax({
        url: baseUrl + '/DashboardVendas/RetornarClsVenAllGrafico',
        data: JSON.stringify({ 'mes': mes, 'ano': ano, 'loja': -1 }),
        headers: {
            'RequestVerificationToken': $('#antiForgeryToken').val(),
            'X-Requested-With': 'XMLHttpRequest'
        },
        type: "POST",
        dataType: 'json',
        contentType: 'application/json',
        cache: false,
        success: function (dados) {

            var jsonArray = [
                {
                    "Classificação": dados[0].NomeClassificação1,
                    "Valor": dados[0].Classificação1,
                },
                {
                    "Classificação": dados[0].NomeClassificação2,
                    "Valor": dados[0].Classificação2,
                },
                {
                    "Classificação": dados[0].NomeClassificação3,
                    "Valor": dados[0].Classificação3,
                },
                {
                    "Classificação": dados[0].NomeClassificação4,
                    "Valor": dados[0].Classificação4,
                },
                {
                    "Classificação": dados[0].NomeClassificação5,
                    "Valor": dados[0].Classificação5,
                },
                {
                    "Classificação": dados[0].NomeClassificação6,
                    "Valor": dados[0].Classificação6,
                },
                {
                    "Classificação": dados[0].NomeClassificação7,
                    "Valor": dados[0].Classificação7,
                },
                {
                    "Classificação": dados[0].NomeClassificação8,
                    "Valor": dados[0].Classificação8,
                }
            ];

            alasql('SELECT * INTO XLSX("GraficoClassificacoes.xlsx", {headers: true}) FROM ?', [jsonArray]);
        },
        error: function (xhr, textStatus, errorThrown) {
            //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
        }
    });
}

function HighchartsClassificacoes() {


    var mes = $('select[id=mes]').val() == null ? mesAtual : $('select[id=mes]').val();

    var ano = $('select[id=ano]').val() == null ? anoAtual : $('select[id=ano]').val();

    var loja = $('select[id=ddlLojas]').val();

    $.ajax({
        url: baseUrl + '/Dashboard/RetornarClsVenAllGrafico',
        data: JSON.stringify({ 'mes': mes, 'ano': ano, 'loja': -1 }),
        headers: {
            'RequestVerificationToken': $('#antiForgeryToken').val(),
            'X-Requested-With': 'XMLHttpRequest'
        },
        type: "POST",
        dataType: 'json',
        contentType: 'application/json',
        cache: false,
        success: function (dados) {

            var somaClassificacoes = dados[0].Classificação1 + dados[0].Classificação2 + dados[0].Classificação3 + dados[0].Classificação4 + dados[0].Classificação5 +
                dados[0].Classificação6 + dados[0].Classificação7 + dados[0].Classificação8;

            var classificacaoPorcentagem1 = (dados[0].Classificação1 / somaClassificacoes) * 100;
            var classificacaoPorcentagem2 = (dados[0].Classificação2 / somaClassificacoes) * 100;
            var classificacaoPorcentagem3 = (dados[0].Classificação3 / somaClassificacoes) * 100;
            var classificacaoPorcentagem4 = (dados[0].Classificação4 / somaClassificacoes) * 100;
            var classificacaoPorcentagem5 = (dados[0].Classificação5 / somaClassificacoes) * 100;
            var classificacaoPorcentagem6 = (dados[0].Classificação6 / somaClassificacoes) * 100;
            var classificacaoPorcentagem7 = (dados[0].Classificação7 / somaClassificacoes) * 100;
            var classificacaoPorcentagem8 = (dados[0].Classificação8 / somaClassificacoes) * 100;


            Highcharts.setOptions({
                lang: {
                    thousandsSep: '.',
                    decimalPoint: ','
                }
            });

            var chart = Highcharts.chart('container', {

                title: {
                    text: 'Classificações'
                },

                subtitle: {
                    text: ''
                },

                xAxis: {
                    categories: [dados[0].NomeClassificação1 + "    " + classificacaoPorcentagem1.toFixed(2) + '%', dados[0].NomeClassificação2 + "   " + classificacaoPorcentagem2.toFixed(2) + '%', dados[0].NomeClassificação3 + "   " + classificacaoPorcentagem3.toFixed(2) + '%', dados[0].NomeClassificação4 + "   " + classificacaoPorcentagem4.toFixed(2) + '%', dados[0].NomeClassificação5 + "    " + classificacaoPorcentagem5.toFixed(2) + '%', dados[0].NomeClassificação6 + "    " + classificacaoPorcentagem6.toFixed(2) + '%', dados[0].NomeClassificação7 + "   " + classificacaoPorcentagem7.toFixed(2) + '%', dados[0].NomeClassificação8 + "    " + classificacaoPorcentagem8.toFixed(2) + '%']
                },

                series: [{
                    type: 'column',
                    colorByPoint: true,
                    data: [dados[0].Classificação1, dados[0].Classificação2, dados[0].Classificação3, dados[0].Classificação4, dados[0].Classificação5, dados[0].Classificação6, dados[0].Classificação7, dados[0].Classificação8],
                    showInLegend: false
                }],
                plotOptions: {
                    column: {
                        dataLabels: {
                            enabled: true,
                            crop: true,
                            overflow: 'none'
                        }
                    },
                }
            });
        },
        error: function (xhr, textStatus, errorThrown) {
            //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
        }
    });

}

function PivotGrid() {
    new Flexmonster({
        container: "#pivot-container",
        componentFolder: "https://cdn.flexmonster.com/2.4/",
        width: "100%",
        height: 430,
        toolbar: true,
        report: {
            dataSource: {
                filename: "data/sales.csv"
            },
            slice: {
                rows: [{
                    uniqueName: "Month"
                }, {
                    uniqueName: "[Measures]"
                }],
                columns: [{
                    uniqueName: "Category",
                    levelName: "Product Name",
                    filter: {
                        members: [
                            "category.[condiments].[bbq sauce]",
                            "category.[breakfast cereals].[corn flakes]",
                            "category.[confectionery]",
                            "category.[bakery].[chocolate biscuits]",
                            "category.[fruit preserves].[apple jam]",
                            "category.[bakery].[apple cake]",
                            "category.[soups].[tomato soup]"
                        ]
                    }
                }],
                measures: [{
                    "uniqueName": "Revenue",
                    "aggregation": "sum",
                    "format": "2sfou03a"
                }]
            },
            conditions: [{
                formula: "#value < 2500",
                measure: "Revenue",
                format: {
                    backgroundColor: "#df3800",
                    color: "#FFFFFF"
                },
                isTotal: false
            }, {
                formula: "#value > 20000",
                measure: "Revenue",
                format: {
                    backgroundColor: "#00A45A",
                    color: "#FFFFFF"
                },
                isTotal: false
            }],
            formats: [{
                name: "2sfou03a",
                thousandsSeparator: ",",
                decimalSeparator: ".",
                decimalPlaces: 2,
                currencySymbol: "$",
                currencySymbolAlign: "left",
                nullValue: "",
                textAlign: "right",
                isPercent: false
            }]
        }
    });
}

function PivotGrid2() {
    $("#sales").dxPivotGrid({
        allowSortingBySummary: true,
        allowSorting: true,
        allowFiltering: true,
        allowExpandAll: true,
        height: 570,
        showBorders: true,
        "export": {
            enabled: true,
            fileName: "Adventure Works"
        },
        fieldChooser: {
            allowSearch: true
        },
        dataSource: {
            fields: [
                { dataField: "[Product].[Category]", area: "row" },
                {
                    dataField: "[Product].[Subcategory]",
                    area: "row",
                    headerFilter: {
                        allowSearch: true
                    }
                },
                { dataField: "[Ship Date].[Calendar Year]", area: "column" },
                { dataField: "[Ship Date].[Month of Year]", area: "column" },
                { dataField: "[Measures].[Customer Count]", area: "data" }
            ],
            store: {
                type: "xmla",
                url: "https://demos.devexpress.com/Services/OLAP/msmdpump.dll",
                catalog: "Adventure Works DW Standard Edition",
                cube: "Adventure Works"
            }
        }
    });


}

function PivotGrid3(data) {
    var pivot = new Flexmonster({
        container: "#pivot-container2",
        report: {
            dataSource: {
                dataSourceType: "json",
                data: data
            },
            formats: [
                {
                    name: "",
                    thousandsSeparator: ".",
                    decimalSeparator: ",",
                    decimalPlaces: -1,
                    maxDecimalPlaces: -1,
                    maxSymbols: 20,
                    decimalPlaces: 2,
                    currencySymbol: "R$ ",
                    currencySymbolAlign: "left",
                    isPercent: "false",
                    nullValue: "",
                    infinityValue: "Infinity",
                    divideByZeroValue: "Infinity",
                    textAlign: "right"
                }
            ],
            slice: {
                rows: [{
                    uniqueName: "Dias"
                }],
                columns: [{
                    uniqueName: "Loja"
                },
                {
                    uniqueName: "[Measures]"
                }],
                measures: [{
                    uniqueName: "Venda do Dia"
                }],
            },
            options: {
                viewType: "grid",
                configuratorActive: false,
                grid: {
                    type: "compact",
                    showHeaders: false
                }
            }
        },
        height: 280,
        toolbar: true,
        componentFolder: "https://cdn.flexmonster.com/2.4/",
        reportcomplete: function () {
            pivot.off("reportcomplete");

            pivot.highcharts.getData({
                type: "column",
                slice: {
                    rows: [{ uniqueName: "Dias" }],
                    columns: [{ uniqueName: "[Measures]" }],
                    measures: [{ uniqueName: "Venda do Dia" }, { uniqueName: "Venda Ate o Dia" }],
                    sorting: {
                        column: {
                            type: "desc",
                            tuple: [],
                            measure: "Venda do Dia"
                        }
                    }
                },
                formats: [
                    {
                        name: "",
                        thousandsSeparator: " ",
                        decimalSeparator: ",",
                        decimalPlaces: -1,
                        maxDecimalPlaces: -1,
                        maxSymbols: 15,
                        currencySymbol: "R$",
                        currencySymbolAlign: "left",
                        isPercent: "false",
                        nullValue: "",
                        infinityValue: "Infinity",
                        divideByZeroValue: "Infinity",
                        textAlign: "right"
                    }
                ]
            }, function (data) {
                if (data.series != undefined) {
                    data.series[data.series.length - 1].type = "spline";
                }
                Highcharts.chart('highcharts-container', data);
            }, function (data) {
                if (data.series != undefined) {
                    data.series[data.series.length - 1].type = "spline";
                }
                Highcharts.chart('highcharts-container', data);
            });
        }
    });
}


function DataTableDreCustoMedio() {

    var ano = $('select[id=ano]').val() == null ? anoAtual : $('select[id=ano]').val();

    var loja = $("#loja").val() == undefined ? -1 : $("#loja").val();

    $.ajax({
        url: baseUrl + '/Dashboard/RetornarDreCustoMedio',
        data: JSON.stringify({ 'ano': ano, 'loja': loja }),
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
            for (var i = 0; i < dados.listRetorno.length; i++) {

                data = [
                    dados.listRetorno[i].Cls,
                    dados.listRetorno[i].Janeiro,
                    dados.listRetorno[i].Fevereiro,
                    dados.listRetorno[i].Marco,
                    dados.listRetorno[i].Abril,
                    dados.listRetorno[i].Maio,
                    dados.listRetorno[i].Junho,
                    dados.listRetorno[i].Julho,
                    dados.listRetorno[i].Agosto,
                    dados.listRetorno[i].Setembro,
                    dados.listRetorno[i].Outubro,
                    dados.listRetorno[i].Novembro,
                    dados.listRetorno[i].Dezembro,
                    dados.listRetorno[i].TotalCls
                ]


                dataSet.push(data);
            }
            $(document).ready(function () {
                $('#dtDreCustoMedio').DataTable({
                    data: dataSet,
                    columns: [
                        { title: "Classificação" },
                        { title: "Janeiro" },
                        { title: "Fevereiro" },
                        { title: "Março" },
                        { title: "Abril" },
                        { title: "Maio" },
                        { title: "Junho" },
                        { title: "Julho" },
                        { title: "Agosto" },
                        { title: "Setembro" },
                        { title: "Outubro" },
                        { title: "Novembro" },
                        { title: "Dezembro" },
                        { title: "Total por Classificação" }
                    ],
                    "bDestroy": true,
                    deferRender: true,
                    scroller: true,
                    "scrollX": true,
                    "footerCallback": function (tfoot, data, start, end, display) {
                        var api = this.api(), data;

                        $(api.column(1).footer()).html(dados.somaColunas.TotalJaneiro);
                        $(api.column(2).footer()).html(dados.somaColunas.TotalFevereiro);
                        $(api.column(3).footer()).html(dados.somaColunas.TotalMarco);
                        $(api.column(4).footer()).html(dados.somaColunas.TotalAbril);
                        $(api.column(5).footer()).html(dados.somaColunas.TotalMaio);
                        $(api.column(6).footer()).html(dados.somaColunas.TotalJunho);
                        $(api.column(7).footer()).html(dados.somaColunas.TotalJulho);
                        $(api.column(8).footer()).html(dados.somaColunas.TotalAgosto);
                        $(api.column(9).footer()).html(dados.somaColunas.TotalSetembro);
                        $(api.column(10).footer()).html(dados.somaColunas.TotalOutubro);
                        $(api.column(11).footer()).html(dados.somaColunas.TotalNovembro);
                        $(api.column(12).footer()).html(dados.somaColunas.TotalDezembro);
                        $(api.column(13).footer()).html(dados.somaColunas.Total);

                    }
                });
            });
        },
        error: function (xhr, textStatus, errorThrown) {
            //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
        }
    });
}

function DataTableDreDesconto() {

    var ano = $('select[id=ano]').val() == null ? anoAtual : $('select[id=ano]').val();

    var loja = $("#loja").val() == undefined ? -1 : $("#loja").val();

    $.ajax({
        url: baseUrl + '/Dashboard/RetornarDreDesconto',
        data: JSON.stringify({ 'ano': ano, 'loja': loja }),
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
            for (var i = 0; i < dados.listRetorno.length; i++) {

                data = [
                    dados.listRetorno[i].Cls,
                    dados.listRetorno[i].Janeiro,
                    dados.listRetorno[i].Fevereiro,
                    dados.listRetorno[i].Marco,
                    dados.listRetorno[i].Abril,
                    dados.listRetorno[i].Maio,
                    dados.listRetorno[i].Junho,
                    dados.listRetorno[i].Julho,
                    dados.listRetorno[i].Agosto,
                    dados.listRetorno[i].Setembro,
                    dados.listRetorno[i].Outubro,
                    dados.listRetorno[i].Novembro,
                    dados.listRetorno[i].Dezembro,
                    dados.listRetorno[i].TotalCls
                ]


                dataSet.push(data);
            }
            $(document).ready(function () {
                $('#dtDreDesconto').DataTable({
                    data: dataSet,
                    columns: [
                        { title: "Classificação" },
                        { title: "Janeiro" },
                        { title: "Fevereiro" },
                        { title: "Março" },
                        { title: "Abril" },
                        { title: "Maio" },
                        { title: "Junho" },
                        { title: "Julho" },
                        { title: "Agosto" },
                        { title: "Setembro" },
                        { title: "Outubro" },
                        { title: "Novembro" },
                        { title: "Dezembro" },
                        { title: "Total por Classificação" }
                    ],
                    "bDestroy": true,
                    deferRender: true,
                    scroller: true,
                    "scrollX": true,
                    "footerCallback": function (tfoot, data, start, end, display) {
                        var api = this.api(), data;

                        $(api.column(1).footer()).html(dados.somaColunas.TotalJaneiro);
                        $(api.column(2).footer()).html(dados.somaColunas.TotalFevereiro);
                        $(api.column(3).footer()).html(dados.somaColunas.TotalMarco);
                        $(api.column(4).footer()).html(dados.somaColunas.TotalAbril);
                        $(api.column(5).footer()).html(dados.somaColunas.TotalMaio);
                        $(api.column(6).footer()).html(dados.somaColunas.TotalJunho);
                        $(api.column(7).footer()).html(dados.somaColunas.TotalJulho);
                        $(api.column(8).footer()).html(dados.somaColunas.TotalAgosto);
                        $(api.column(9).footer()).html(dados.somaColunas.TotalSetembro);
                        $(api.column(10).footer()).html(dados.somaColunas.TotalOutubro);
                        $(api.column(11).footer()).html(dados.somaColunas.TotalNovembro);
                        $(api.column(12).footer()).html(dados.somaColunas.TotalDezembro);
                        $(api.column(13).footer()).html(dados.somaColunas.Total);

                    }
                });
            });
        },
        error: function (xhr, textStatus, errorThrown) {
            //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
        }
    });
}

function DataTableDreFaturamentoBruto() {

    var ano = $('select[id=ano]').val() == null ? anoAtual : $('select[id=ano]').val();

    var loja = $("#loja").val() == undefined ? -1 : $("#loja").val();

    $.ajax({
        url: baseUrl + '/Dashboard/RetornarDreFaturamentoBruto',
        data: JSON.stringify({ 'ano': ano, 'loja': loja }),
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
            for (var i = 0; i < dados.listRetorno.length; i++) {

                data = [
                    dados.listRetorno[i].Cls,
                    dados.listRetorno[i].Janeiro,
                    dados.listRetorno[i].Fevereiro,
                    dados.listRetorno[i].Marco,
                    dados.listRetorno[i].Abril,
                    dados.listRetorno[i].Maio,
                    dados.listRetorno[i].Junho,
                    dados.listRetorno[i].Julho,
                    dados.listRetorno[i].Agosto,
                    dados.listRetorno[i].Setembro,
                    dados.listRetorno[i].Outubro,
                    dados.listRetorno[i].Novembro,
                    dados.listRetorno[i].Dezembro,
                    dados.listRetorno[i].TotalCls
                ]


                dataSet.push(data);
            }
            $(document).ready(function () {
                    $('#dtDreFaturamentoBruto').DataTable({
                    data: dataSet,
                    columns: [
                        { title: "Classificação"},
                        { title: "Janeiro"},
                        { title: "Fevereiro"},
                        { title: "Março"},
                        { title: "Abril"},
                        { title: "Maio"},
                        { title: "Junho"},
                        { title: "Julho"},
                        { title: "Agosto"},
                        { title: "Setembro"},
                        { title: "Outubro"},
                        { title: "Novembro"},
                        { title: "Dezembro"},
                        { title: "Total"}
                    ],
                    "bDestroy": true,
                    deferRender: true,
                    scroller: true,
                        "scrollX": true,
                        "footerCallback": function (tfoot, data, start, end, display) {
                            var api = this.api(), data;

                            $(api.column(1).footer()).html(dados.somaColunas.TotalJaneiro);
                            $(api.column(2).footer()).html(dados.somaColunas.TotalFevereiro);
                            $(api.column(3).footer()).html(dados.somaColunas.TotalMarco);
                            $(api.column(4).footer()).html(dados.somaColunas.TotalAbril);
                            $(api.column(5).footer()).html(dados.somaColunas.TotalMaio);
                            $(api.column(6).footer()).html(dados.somaColunas.TotalJunho);
                            $(api.column(7).footer()).html(dados.somaColunas.TotalJulho);
                            $(api.column(8).footer()).html(dados.somaColunas.TotalAgosto);
                            $(api.column(9).footer()).html(dados.somaColunas.TotalSetembro);
                            $(api.column(10).footer()).html(dados.somaColunas.TotalOutubro);
                            $(api.column(11).footer()).html(dados.somaColunas.TotalNovembro);
                            $(api.column(12).footer()).html(dados.somaColunas.TotalDezembro);
                            $(api.column(13).footer()).html(dados.somaColunas.Total);

                        }
                });

            });
        },
        error: function (xhr, textStatus, errorThrown) {
            //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
        }
    });
}

function DataTableDreFaturamentoLiquido() {

    var ano = $('select[id=ano]').val() == null ? anoAtual : $('select[id=ano]').val();

    var loja = $("#loja").val() == undefined ? -1 : $("#loja").val();

    $.ajax({
        url: baseUrl + '/Dashboard/RetornarDreFaturamentoLiquido',
        data: JSON.stringify({ 'ano': ano, 'loja': loja }),
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
            for (var i = 0; i < dados.listRetorno.length; i++) {

                data = [
                    dados.listRetorno[i].Cls,
                    dados.listRetorno[i].Janeiro,
                    dados.listRetorno[i].Fevereiro,
                    dados.listRetorno[i].Marco,
                    dados.listRetorno[i].Abril,
                    dados.listRetorno[i].Maio,
                    dados.listRetorno[i].Junho,
                    dados.listRetorno[i].Julho,
                    dados.listRetorno[i].Agosto,
                    dados.listRetorno[i].Setembro,
                    dados.listRetorno[i].Outubro,
                    dados.listRetorno[i].Novembro,
                    dados.listRetorno[i].Dezembro,
                    dados.listRetorno[i].TotalCls
                ]


                dataSet.push(data);
            }
            $(document).ready(function () {
                $('#dtDreFaturamentoLiquido').DataTable({
                    data: dataSet,
                    columns: [
                        { title: "Classificação" },
                        { title: "Janeiro" },
                        { title: "Fevereiro" },
                        { title: "Março" },
                        { title: "Abril" },
                        { title: "Maio" },
                        { title: "Junho" },
                        { title: "Julho" },
                        { title: "Agosto" },
                        { title: "Setembro" },
                        { title: "Outubro" },
                        { title: "Novembro" },
                        { title: "Dezembro" },
                        { title: "Total" }
                    ],
                    "bDestroy": true,
                    deferRender: true,
                    scroller: true,
                    "scrollX": true,
                    "footerCallback": function (tfoot, data, start, end, display) {
                        var api = this.api(), data;

                        $(api.column(1).footer()).html(dados.somaColunas.TotalJaneiro);
                        $(api.column(2).footer()).html(dados.somaColunas.TotalFevereiro);
                        $(api.column(3).footer()).html(dados.somaColunas.TotalMarco);
                        $(api.column(4).footer()).html(dados.somaColunas.TotalAbril);
                        $(api.column(5).footer()).html(dados.somaColunas.TotalMaio);
                        $(api.column(6).footer()).html(dados.somaColunas.TotalJunho);
                        $(api.column(7).footer()).html(dados.somaColunas.TotalJulho);
                        $(api.column(8).footer()).html(dados.somaColunas.TotalAgosto);
                        $(api.column(9).footer()).html(dados.somaColunas.TotalSetembro);
                        $(api.column(10).footer()).html(dados.somaColunas.TotalOutubro);
                        $(api.column(11).footer()).html(dados.somaColunas.TotalNovembro);
                        $(api.column(12).footer()).html(dados.somaColunas.TotalDezembro);
                        $(api.column(13).footer()).html(dados.somaColunas.Total);

                    }
                });
            });
        },
        error: function (xhr, textStatus, errorThrown) {
            //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
        }
    });
}

function DataTableDreMargemBruto() {

    var ano = $('select[id=ano]').val() == null ? anoAtual : $('select[id=ano]').val();

    var loja = $("#loja").val() == undefined ? -1 : $("#loja").val();

    $.ajax({
        url: baseUrl + '/Dashboard/RetornarDreMargemBruto',
        data: JSON.stringify({ 'ano': ano, 'loja': loja }),
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
            for (var i = 0; i < dados.listRetorno.length; i++) {

                data = [
                    dados.listRetorno[i].Cls,
                    dados.listRetorno[i].Janeiro,
                    dados.listRetorno[i].Fevereiro,
                    dados.listRetorno[i].Marco,
                    dados.listRetorno[i].Abril,
                    dados.listRetorno[i].Maio,
                    dados.listRetorno[i].Junho,
                    dados.listRetorno[i].Julho,
                    dados.listRetorno[i].Agosto,
                    dados.listRetorno[i].Setembro,
                    dados.listRetorno[i].Outubro,
                    dados.listRetorno[i].Novembro,
                    dados.listRetorno[i].Dezembro,
                    dados.listRetorno[i].TotalCls
                ]


                dataSet.push(data);
            }
            $(document).ready(function () {
                $('#dtDreMargemBruto').DataTable({
                    data: dataSet,
                    columns: [
                        { title: "Classificação" },
                        { title: "Janeiro" },
                        { title: "Fevereiro" },
                        { title: "Março" },
                        { title: "Abril" },
                        { title: "Maio" },
                        { title: "Junho" },
                        { title: "Julho" },
                        { title: "Agosto" },
                        { title: "Setembro" },
                        { title: "Outubro" },
                        { title: "Novembro" },
                        { title: "Dezembro" },
                        { title: "Total" }
                    ],
                    "bDestroy": true,
                    deferRender: true,
                    scroller: true,
                    "scrollX": true,
                    "footerCallback": function (tfoot, data, start, end, display) {
                        var api = this.api(), data;

                        $(api.column(1).footer()).html(dados.somaColunas.TotalJaneiro);
                        $(api.column(2).footer()).html(dados.somaColunas.TotalFevereiro);
                        $(api.column(3).footer()).html(dados.somaColunas.TotalMarco);
                        $(api.column(4).footer()).html(dados.somaColunas.TotalAbril);
                        $(api.column(5).footer()).html(dados.somaColunas.TotalMaio);
                        $(api.column(6).footer()).html(dados.somaColunas.TotalJunho);
                        $(api.column(7).footer()).html(dados.somaColunas.TotalJulho);
                        $(api.column(8).footer()).html(dados.somaColunas.TotalAgosto);
                        $(api.column(9).footer()).html(dados.somaColunas.TotalSetembro);
                        $(api.column(10).footer()).html(dados.somaColunas.TotalOutubro);
                        $(api.column(11).footer()).html(dados.somaColunas.TotalNovembro);
                        $(api.column(12).footer()).html(dados.somaColunas.TotalDezembro);
                        $(api.column(13).footer()).html(dados.somaColunas.Total);

                    }
                });
            });
        },
        error: function (xhr, textStatus, errorThrown) {
            //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
        }
    });
}

function DataTableDreValorDesconto() {

    var ano = $('select[id=ano]').val() == null ? anoAtual : $('select[id=ano]').val();

    var loja = $("#loja").val() == undefined ? -1 : $("#loja").val();

    $.ajax({
        url: baseUrl + '/Dashboard/RetornarDreValorDesconto',
        data: JSON.stringify({ 'ano': ano, 'loja': loja }),
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
            for (var i = 0; i < dados.listRetorno.length; i++) {

                data = [
                    dados.listRetorno[i].Cls,
                    dados.listRetorno[i].Janeiro,
                    dados.listRetorno[i].Fevereiro,
                    dados.listRetorno[i].Marco,
                    dados.listRetorno[i].Abril,
                    dados.listRetorno[i].Maio,
                    dados.listRetorno[i].Junho,
                    dados.listRetorno[i].Julho,
                    dados.listRetorno[i].Agosto,
                    dados.listRetorno[i].Setembro,
                    dados.listRetorno[i].Outubro,
                    dados.listRetorno[i].Novembro,
                    dados.listRetorno[i].Dezembro,
                    dados.listRetorno[i].TotalCls
                ]


                dataSet.push(data);
            }
            $(document).ready(function () {
                $('#dtDreValorDesconto').DataTable({
                    data: dataSet,
                    columns: [
                        { title: "Classificação" },
                        { title: "Janeiro" },
                        { title: "Fevereiro" },
                        { title: "Março" },
                        { title: "Abril" },
                        { title: "Maio" },
                        { title: "Junho" },
                        { title: "Julho" },
                        { title: "Agosto" },
                        { title: "Setembro" },
                        { title: "Outubro" },
                        { title: "Novembro" },
                        { title: "Dezembro" },
                        { title: "Total" }
                    ],
                    "bDestroy": true,
                    deferRender: true,
                    scroller: true,
                    "scrollX": true,
                    "footerCallback": function (tfoot, data, start, end, display) {
                        var api = this.api(), data;

                        $(api.column(1).footer()).html(dados.somaColunas.TotalJaneiro);
                        $(api.column(2).footer()).html(dados.somaColunas.TotalFevereiro);
                        $(api.column(3).footer()).html(dados.somaColunas.TotalMarco);
                        $(api.column(4).footer()).html(dados.somaColunas.TotalAbril);
                        $(api.column(5).footer()).html(dados.somaColunas.TotalMaio);
                        $(api.column(6).footer()).html(dados.somaColunas.TotalJunho);
                        $(api.column(7).footer()).html(dados.somaColunas.TotalJulho);
                        $(api.column(8).footer()).html(dados.somaColunas.TotalAgosto);
                        $(api.column(9).footer()).html(dados.somaColunas.TotalSetembro);
                        $(api.column(10).footer()).html(dados.somaColunas.TotalOutubro);
                        $(api.column(11).footer()).html(dados.somaColunas.TotalNovembro);
                        $(api.column(12).footer()).html(dados.somaColunas.TotalDezembro);
                        $(api.column(13).footer()).html(dados.somaColunas.Total);

                    }
                });
            });
        },
        error: function (xhr, textStatus, errorThrown) {
            //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
        }
    });
}

function DataTableDreDespesa() {

    var ano = $('select[id=ano]').val() == null ? anoAtual : $('select[id=ano]').val();

    var loja = $("#loja").val() == undefined ? -1 : $("#loja").val();

    $.ajax({
        url: baseUrl + '/Dashboard/RetornarDreDespesas',
        data: JSON.stringify({ 'ano': ano, 'loja': loja }),
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
            for (var i = 0; i < dados.listRetorno.length; i++) {

                data = [
                    dados.listRetorno[i].Cls,
                    dados.listRetorno[i].Janeiro,
                    dados.listRetorno[i].Fevereiro,
                    dados.listRetorno[i].Marco,
                    dados.listRetorno[i].Abril,
                    dados.listRetorno[i].Maio,
                    dados.listRetorno[i].Junho,
                    dados.listRetorno[i].Julho,
                    dados.listRetorno[i].Agosto,
                    dados.listRetorno[i].Setembro,
                    dados.listRetorno[i].Outubro,
                    dados.listRetorno[i].Novembro,
                    dados.listRetorno[i].Dezembro,
                    dados.listRetorno[i].TotalCls
                ]


                dataSet.push(data);
            }
            $(document).ready(function () {
                $('#dtDreDespesas').DataTable({
                    data: dataSet,
                    columns: [
                        { title: "Classificação" },
                        { title: "Janeiro" },
                        { title: "Fevereiro" },
                        { title: "Março" },
                        { title: "Abril" },
                        { title: "Maio" },
                        { title: "Junho" },
                        { title: "Julho" },
                        { title: "Agosto" },
                        { title: "Setembro" },
                        { title: "Outubro" },
                        { title: "Novembro" },
                        { title: "Dezembro" },
                        { title: "Total" }
                    ],
                    "bDestroy": true,
                    deferRender: true,
                    scroller: true,
                    "scrollX": true,
                    "footerCallback": function (tfoot, data, start, end, display) {
                        var api = this.api(), data;

                        $(api.column(1).footer()).html(dados.somaColunas.TotalJaneiro);
                        $(api.column(2).footer()).html(dados.somaColunas.TotalFevereiro);
                        $(api.column(3).footer()).html(dados.somaColunas.TotalMarco);
                        $(api.column(4).footer()).html(dados.somaColunas.TotalAbril);
                        $(api.column(5).footer()).html(dados.somaColunas.TotalMaio);
                        $(api.column(6).footer()).html(dados.somaColunas.TotalJunho);
                        $(api.column(7).footer()).html(dados.somaColunas.TotalJulho);
                        $(api.column(8).footer()).html(dados.somaColunas.TotalAgosto);
                        $(api.column(9).footer()).html(dados.somaColunas.TotalSetembro);
                        $(api.column(10).footer()).html(dados.somaColunas.TotalOutubro);
                        $(api.column(11).footer()).html(dados.somaColunas.TotalNovembro);
                        $(api.column(12).footer()).html(dados.somaColunas.TotalDezembro);
                        $(api.column(13).footer()).html(dados.somaColunas.Total);

                    }
                });
            });
        },
        error: function (xhr, textStatus, errorThrown) {
            //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
        }
    });
}

function ItensPorCliente() {

    var ano = $('select[id=ano]').val() == null ? anoAtual : $('select[id=ano]').val();

    $.ajax({
        url: baseUrl + '/Dashboard/RetornarItensPorCliente',
        data: JSON.stringify({ 'ano': ano }),
        headers: {
            'RequestVerificationToken': $('#antiForgeryToken').val(),
            'X-Requested-With': 'XMLHttpRequest'
        },
        type: "POST",
        dataType: 'json',
        contentType: 'application/json',
        cache: false,
        success: function (dados) {

            if (myChart27) {
                myChart27.destroy();
            }

            $("#itensPorCliente-legenda").empty();
            $("#itensPorCliente-legenda").append("<i class='fa fa-line-chart' style='color: #3e95cd'></i>Faturamento - " + anoAnterior + "   <i class='fa fa-bar-chart' style='color: #722F37'></i>Faturamento - " + ano + "  ");

            myChart27 = new Chart(document.getElementById("itensPorCliente"), {
                type: 'bar',
                data: {
                    labels: ["Jan", "Fev", "Mar", "Abr", "Maio", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
                    datasets: [
                        {
                            label: "Faturamento - " + anoAnterior + "",
                            type: "line",
                            borderColor: "#3e95cd",
                            data: [dados[0].MediaJaneiroAnterior,
                            dados[0].MediaFevereiroAnterior,
                            dados[0].MediaMarçoAnterior,
                            dados[0].MediaAbrilAnterior,
                            dados[0].MediaMaioAnterior,
                            dados[0].MediaJunhoAnterior,
                            dados[0].MediaJulhoAnterior,
                            dados[0].MediaAgostoAnterior,
                            dados[0].MediaSetembroAnterior,
                            dados[0].MediaOutubroAnterior,
                            dados[0].MediaNovembroAnterior,
                            dados[0].MediaDezembroAnterior],
                            fill: false
                        }, {
                            label: "Faturamento - " + ano + "",
                            type: "bar",
                            backgroundColor: "#722F37",
                            data: [dados[0].MediaJaneiro,
                            dados[0].MediaFevereiro,
                            dados[0].MediaMarço,
                            dados[0].MediaAbril,
                            dados[0].MediaMaio,
                            dados[0].MediaJunho,
                            dados[0].MediaJulho,
                            dados[0].MediaAgosto,
                            dados[0].MediaSetembro,
                            dados[0].MediaOutubro,
                            dados[0].MediaNovembro,
                            dados[0].MediaDezembro
                            ]
                        }
                    ]
                },
                options: {
                    title: {
                        display: true
                    },
                    legend: { display: false }
                }
            });

        },
        error: function (xhr, textStatus, errorThrown) {
            //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
        }
    });
}

function ExportarItensPorCliente() {

    var ano = $('select[id=ano]').val() == null ? anoAtual : $('select[id=ano]').val();

    $.ajax({
        url: baseUrl + '/Dashboard/RetornarItensPorCliente',
        data: JSON.stringify({ 'ano': ano}),
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


            var chartData = [
                {
                    "Mês": "Jan",
                    "Média": dados[0].MediaJaneiro,
                    "Meta": dados[0].MediaJaneiroAnterior
                },
                {
                    "Mês": "Fev",
                    "Média": dados[0].MediaFevereiro,
                    "Meta": dados[0].MediaFevereiroAnterior
                },
                {
                    "Mês": "Mar",
                    "Média": dados[0].MediaMarço,
                    "Meta": dados[0].MediaMarçoAnterior
                },
                {
                    "Mês": "Abr",
                    "Média": dados[0].MediaAbril,
                    "Meta": dados[0].MediaAbrilAnterior
                },
                {
                    "Mês": "Maio",
                    "Média": dados[0].MediaMaio,
                    "Meta": dados[0].MediaMaioAnterior
                },
                {
                    "Mês": "Jun",
                    "Média": dados[0].MediaJunho,
                    "Meta": dados[0].MediaJunhoAnterior
                },
                {
                    "Mês": "Jul",
                    "Média": dados[0].MediaJulho,
                    "Meta": dados[0].MediaJulhoAnterior
                },
                {
                    "Mês": "Ago",
                    "Média": dados[0].MediaAgosto,
                    "Meta": dados[0].MediaAgostoAnterior
                },
                {
                    "Mês": "Set",
                    "Média": dados[0].MediaSetembro,
                    "Meta": dados[0].MediaSetembroAnterior
                },
                {
                    "Mês": "Out",
                    "Média": dados[0].MediaOutubro,
                    "Meta": dados[0].MediaOutubroAnterior
                },
                {
                    "Mês": "Nov",
                    "Média": dados[0].MediaNovembro,
                    "Meta": dados[0].MediaNovembroAnterior
                },
                {
                    "Mês": "Dez",
                    "Média": dados[0].MediaDezembro,
                    "Meta": dados[0].MediaDezembroAnterior
                }


            ];

            alasql('SELECT * INTO XLSX("ItensPorCliente.xlsx", {headers: true}) FROM ?', [chartData]);
        },
        error: function (xhr, textStatus, errorThrown) {
            //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
        }
    });

}