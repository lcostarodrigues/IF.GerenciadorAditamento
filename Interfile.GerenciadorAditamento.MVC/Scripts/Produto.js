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

    var produto = {
        IdProduto: 0,
        NomeProduto: "",
        DescricaoProduto: "",
        PrecoProduto: 0
    };

    function Salvar() {
        if (Validar()) {
            produto.IdProduto = 0;
            produto.NomeProduto = $("#idNomeProduto").val();
            produto.DescricaoProduto = $("#idDescricaoProduto").val();
            produto.PrecoProduto = parseInt($("#idPrecoProduto").val().replace(".", ","));

            $.ajax({
                url: baseUrl + '/Produto/Salvar',
                data: JSON.stringify({ 'produto': produto }),
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
                        DestroiTable('dtProduto');
                        LimparDados();
                        CarregarProdutos();
                        isSalvo = false;
                        BMG.ShowAlert("Notificação", "Produto salvo com sucesso.");
                    }
                },
                error: function (xhr, textStatus, errorThrown) {
                    TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
                }
            });
        }
    }

    function Alterar() {
        if (Validar()) {
            produto.NomeProduto = $("#idNomeProduto").val();
            produto.DescricaoProduto = $("#idDescricaoProduto").val();
            produto.PrecoProduto = parseInt($("#idPrecoProduto").val().replace(".", ","));

            $.ajax({
                url: baseUrl + '/Produto/Alterar',
                data: JSON.stringify({ 'produto': produto }),
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
                        DestroiTable('dtProduto');
                        LimparDados();
                        CarregarProdutos();
                        isSalvo = false;
                        BMG.ShowAlert("Notificação", "Produto atualizado com sucesso.");
                    }
                },
                error: function (xhr, textStatus, errorThrown) {
                    TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
                }
            });
        }
    }

    function Excluir() {
        $.ajax({
            url: baseUrl + '/Produto/Excluir',
            data: JSON.stringify({ 'IdProduto': produto.IdProduto }),
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
                    DestroiTable('dtProduto');
                    LimparDados();
                    CarregarProdutos();
                    isSalvo = false;
                    BMG.ShowAlert("Notificação", "Produto excluído com sucesso.");
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                TratarErro(xhr, textStatus, errorThrown, "Erro ao excluir o produto.");
            }
        });
    }

    function Validar() {
        if ($("#idNomeProduto").val() == ""
            || $("#idNomeProduto").val() == ""
            || $("#idPrecoProduto").val() == ""
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

    function CarregarProdutos() {
        DestroiTable('dtProduto');

        $('#dtProduto').dataTable({
            "bServerSide": true,
            "bFilter": false,
            "sAjaxSource": baseUrl + "/Produto/RetornarProdutos/",
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
                { "sName": "NomeProduto" },
                { "sName": "DescricaoProduto" },
                { "sName": "PrecoProduto" },
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
                        BMG.ShowConfirm("Excluir", "Esta ação irá excluir o produto.", function () {
                            produto.IdProduto = parseInt(data[3]);
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
                "sSearch": "Buscar pelo produto: ",
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
        produto.IdProduto = parseInt(obj[3]);
        $("#idNomeProduto").val(obj[0]);
        $("#idDescricaoProduto").val(obj[1]);
        $("#idPrecoProduto").val(parseInt(obj[2].replace(".", ",")));
    }

    function LimparDados() {
        isSalvo = false;

        produto.IdProduto = 0;
        $("#idNomeProduto").val("");
        $("#idDescricaoProduto").val("");
        $("#idPrecoProduto").val("");
    }

    //function CarregarDadosIniciais() {
    //    $.ajax({
    //        url: baseUrl + '/Produto/CarregarDadosIniciais',
    //        headers: {
    //            'RequestVerificationToken': $('#antiForgeryToken').val(),
    //            'X-Requested-With': 'XMLHttpRequest'
    //        },
    //        type: "POST",
    //        dataType: 'json',
    //        contentType: 'application/json',
    //        cache: false,
    //        success: function (dados) {
    //            //Combo indice
    //            var comboIndice = document.getElementById("idIndice");
    //            for (var i = 0; i < dados.listIndice.length; i++) {
    //                var opt = document.createElement("option");
    //                opt.value = dados.listIndice[i].IndiceID;
    //                opt.text = dados.listIndice[i].NomeIndice;
    //                comboIndice.add(opt, comboIndice.options[0]);
    //            }

    //            //Combo Ir
    //            var comboIr = document.getElementById("idIr");
    //            PreencherCombo(comboIr, dados.listSimNao)

    //            //Combo Benchmark
    //            var comboBenchmark = document.getElementById("idBenchmark");
    //            PreencherCombo(comboBenchmark, dados.listSimNao)

    //            //Combo Ativo
    //            var comboAtivo = document.getElementById("idAtivo");
    //            PreencherCombo(comboAtivo, dados.listSimNao)

    //            LimparDados();
    //        },
    //        error: function (xhr, textStatus, errorThrown) {
    //            TratarErro(xhr, textStatus, errorThrown, "Erro ao carregar o produto.");
    //        }
    //    });
    //}

    //function PreencherCombo(combo, lista) {
    //    for (var i = 0; i < lista.length; i++) {
    //        var opt = document.createElement("option");
    //        opt.value = lista[i][0];
    //        opt.text = lista[i][1];
    //        combo.add(opt, combo.options[0]);
    //    }
    //}

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

    CarregarProdutos();
    //CarregarDadosIniciais();
});