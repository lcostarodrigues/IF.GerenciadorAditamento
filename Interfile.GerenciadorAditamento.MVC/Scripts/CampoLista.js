$(document).ready(function () {


    $("#idDsLista").change(function () {
        CarregarComboTipoDemanda();
    });

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

    var camposLista = {
        IdItem: 0,
        DsItem: "",
        TipoDemanda: "",
        IdLista: 0,
        DsLista: ""
    };

    function Salvar() {
        if (Validar()) {
            camposLista.IdItem = 0;
            camposLista.DsItem = $("#idDsItem").val();
            camposLista.TipoDemanda = $("#idTipoDemanda").val();
            camposLista.IdLista = 0;
            camposLista.DsLista = $("#idDsLista").val();


            $.ajax({
                url: baseUrl + '/CampoLista/Salvar',
                data: JSON.stringify({ 'viewModelCamposListas': camposLista }),
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
                        DestroiTable('dtCampoLista');
                        LimparDados();
                        CarregarCampoLista();
                        isSalvo = false;
                        BMG.ShowAlert("Notificação", "Nova opção adicionada com sucesso.");
                    }
                },
                error: function (xhr, textStatus, errorThrown) {
                    TratarErro(xhr, textStatus, errorThrown, "Erro ao adicionar o campo na lista.");
                }
            });
        }
    }

    function Alterar() {
        if (Validar()) {
            camposLista.DsItem = $("#idDsItem").val();
            camposLista.TipoDemanda = $("#idTipoDemanda").val();
            camposLista.DsLista = $("#idDsLista").val();

            $.ajax({
                url: baseUrl + '/CampoLista/Alterar',
                data: JSON.stringify({ 'viewModelCamposListas': camposLista }),
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
                        DestroiTable('dtCampoLista');
                        LimparDados();
                        CarregarCampoLista();
                        isSalvo = false;
                        BMG.ShowAlert("Notificação", "Opção atualizada com sucesso.");
                    }
                },
                error: function (xhr, textStatus, errorThrown) {
                    TratarErro(xhr, textStatus, errorThrown, "Erro ao atualizar a opção.");
                }
            });
        }
    }

    function Excluir() {
        $.ajax({
            url: baseUrl + '/CampoLista/Excluir',
            data: JSON.stringify({ 'IdLista': camposLista.IdItem, 'DsLista': camposLista.DsLista, }),
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
                    DestroiTable('dtCampoLista');
                    LimparDados();
                    CarregarCampoLista();
                    isSalvo = false;
                    BMG.ShowAlert("Notificação", "Opção excluída com sucesso.");
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                TratarErro(xhr, textStatus, errorThrown, "Erro ao excluir a opção.");
            }
        });
    }

    function Validar() {
        if ($("#idDsItem").val() == ""
            || $("#idTipoDemanda").val() == ""
            || $("#idDsLista").val() == ""
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

    function CarregarCampoLista() {
        DestroiTable('dtCampoLista');

        $('#dtCampoLista').dataTable({
            "bServerSide": true,
            "bFilter": false,
            "sAjaxSource": baseUrl + "/CampoLista/RetornarCampoLista/",
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
                { "sName": "DsItem" },
                { "sName": "DsLista" },
                { "sName": "TipoDemanda" },
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

                $($(row).children()[3]).on("click", function (e) {
                    isSalvo = true;
                    if ($(e.toElement).hasClass("glyphicon-pencil")) {
                        RetornarDados(data)
                    }
                })
                $($(row).children()[4]).on("click", function (e) {
                    isSalvo = false;
                    if ($(e.toElement).hasClass("glyphicon-remove")) {
                        BMG.ShowConfirm("Excluir", "Esta ação irá excluir a opção selecionada.", function () {
                            camposLista.IdItem = parseInt(data[3]);
                            camposLista.DsLista = data[1];
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

        CarregarComboTipoDemanda();

        camposLista.IdItem = parseInt(obj[3]);
        camposLista.IdLista = parseInt(obj[4]);
        $("#idDsItem").val(obj[0]);
        $("#idDsLista").val(obj[1]);
        $("#idTipoDemanda").val(obj[2]);


        //$("#idFlObrigatorio")[0].selectedIndex = obj[1] == "Sim" ? 1 : 0;
    }

    function LimparDados() {
        isSalvo = false;

        camposLista.IdLista = 0;
        camposLista.IdItem = 0;
        $("#idDsItem").val("");
        //$("#idDsLista").val("");
        //$("#idTipoDemanda").val("");
        $("#idDsLista")[0].selectedIndex = 0;
        $("#idTipoDemanda")[0].selectedIndex = 0;
    }

    function CarregarDadosIniciais() {
        $.ajax({
            url: baseUrl + '/CampoLista/CarregarDadosIniciais',
            headers: {
                'RequestVerificationToken': $('#antiForgeryToken').val(),
                'X-Requested-With': 'XMLHttpRequest'
            },
            type: "POST",
            dataType: 'json',
            contentType: 'application/json',
            cache: false,
            success: function (dados) {


                ////Combo Ativo
                //var comboAtivo = document.getElementById("idFlObrigatorio");
                //PreencherCombo(comboAtivo, dados.listSimNao)

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

    function CarregarComboLista() {


        $('#idDsLista').html("");

        var comboDsLista = document.getElementById("idDsLista");

        var selectDsLista = document.createElement("option");
        selectDsLista.value = "Status Final";
        selectDsLista.text = "Status Final";
        comboDsLista.add(selectDsLista, comboDsLista.options[0]);


        var selectDsLista = document.createElement("option");
        selectDsLista.value = "Sub Status";
        selectDsLista.text = "Sub Status";
        comboDsLista.add(selectDsLista, comboDsLista.options[0]);

        var selectDsLista = document.createElement("option");
        selectDsLista.value = "Tipo de Subsídio";
        selectDsLista.text = "Tipo de Subsídio";
        comboDsLista.add(selectDsLista, comboDsLista.options[0]);

        var selectDsLista = document.createElement("option");
        selectDsLista.value = "Área Envolvida";
        selectDsLista.text = "Área Envolvida";
        comboDsLista.add(selectDsLista, comboDsLista.options[0]);



        var selectDsLista = document.createElement("option");
        selectDsLista.value = "Causa Real";
        selectDsLista.text = "Causa Real";
        comboDsLista.add(selectDsLista, comboDsLista.options[0]);

        var selectDsLista = document.createElement("option");
        selectDsLista.value = "Produto da Demanda";
        selectDsLista.text = "Produto da Demanda";
        comboDsLista.add(selectDsLista, comboDsLista.options[0]);

        var selectDsLista = document.createElement("option");
        selectDsLista.value = "Empresa da Demanda";
        selectDsLista.text = "Empresa da Demanda";
        comboDsLista.add(selectDsLista, comboDsLista.options[0]);

        var selectDsLista = document.createElement("option");
        selectDsLista.value = "Resultado da Ação";
        selectDsLista.text = "Resultado da Ação";
        comboDsLista.add(selectDsLista, comboDsLista.options[0]);



        var selectDsLista = document.createElement("option");
        selectDsLista.value = "Nome Responsável Falhas";
        selectDsLista.text = "Nome Responsável Falhas";
        comboDsLista.add(selectDsLista, comboDsLista.options[0]);




        var selectDsLista = document.createElement("option");
        selectDsLista.value = "Cadastrado Falhas";
        selectDsLista.text = "Cadastrado Falhas";
        comboDsLista.add(selectDsLista, comboDsLista.options[0]);


        var selectDsLista = document.createElement("option");
        selectDsLista.value = "Falha na Condução Falhas";
        selectDsLista.text = "Falha na Condução Falhas";
        comboDsLista.add(selectDsLista, comboDsLista.options[0]);

        

        var selectDsLista = document.createElement("option");
        selectDsLista.value = "";
        selectDsLista.text = "Selecione uma Lista";
        comboDsLista.add(selectDsLista, comboDsLista.options[0]);

        $("#idDsLista")[0].selectedIndex = 0;


                //LimparDados();
    }


    function CarregarComboTipoDemanda() {


        $('#idTipoDemanda').html("");

        var comboTipoDemanda = document.getElementById("idTipoDemanda");





        if ($("#idDsLista").val() == "Área Envolvida") {


            var selectTipoDemanda = document.createElement("option");
            selectTipoDemanda.value = "SPA";
            selectTipoDemanda.text = "SPA";
            comboTipoDemanda.add(selectTipoDemanda, comboTipoDemanda.options[0]);

            var selectTipoDemanda = document.createElement("option");
            selectTipoDemanda.value = "PANJUR";
            selectTipoDemanda.text = "PANJUR";
            comboTipoDemanda.add(selectTipoDemanda, comboTipoDemanda.options[0]);
        }

        else if ($("#idDsLista").val() == "Tipo de Subsídio") {


            var selectTipoDemanda = document.createElement("option");
            selectTipoDemanda.value = "SUBSIDIOS";
            selectTipoDemanda.text = "SUBSIDIOS";
            comboTipoDemanda.add(selectTipoDemanda, comboTipoDemanda.options[0]);

            var selectTipoDemanda = document.createElement("option");
            selectTipoDemanda.value = "ENCERRAMENTOS";
            selectTipoDemanda.text = "ENCERRAMENTOS";
            comboTipoDemanda.add(selectTipoDemanda, comboTipoDemanda.options[0]);
        }


        else if ($("#idDsLista").val() == "Nome Responsável Falhas") {


            var selectTipoDemanda = document.createElement("option");
            selectTipoDemanda.value = "Interfile";
            selectTipoDemanda.text = "Interfile";
            comboTipoDemanda.add(selectTipoDemanda, comboTipoDemanda.options[0]);

            var selectTipoDemanda = document.createElement("option");
            selectTipoDemanda.value = "Assessorias";
            selectTipoDemanda.text = "Assessorias";
            comboTipoDemanda.add(selectTipoDemanda, comboTipoDemanda.options[0]);

            var selectTipoDemanda = document.createElement("option");
            selectTipoDemanda.value = "Banco";
            selectTipoDemanda.text = "Banco";
            comboTipoDemanda.add(selectTipoDemanda, comboTipoDemanda.options[0]);
        }
        else {



            var selectTipoDemanda = document.createElement("option");
            selectTipoDemanda.value = "Geral";
            selectTipoDemanda.text = "Geral";
            comboTipoDemanda.add(selectTipoDemanda, comboTipoDemanda.options[0]);


        }

        var selectTipoDemanda = document.createElement("option");
        selectTipoDemanda.value = "";
        selectTipoDemanda.text = "Selecione uma Lista";
        comboTipoDemanda.add(selectTipoDemanda, comboTipoDemanda.options[0]);

        $("#idTipoDemanda")[0].selectedIndex = 0;


        //LimparDados();
    }

    CarregarComboTipoDemanda();
    CarregarComboLista();
    CarregarCampoLista();
    //CarregarDadosIniciais();
});