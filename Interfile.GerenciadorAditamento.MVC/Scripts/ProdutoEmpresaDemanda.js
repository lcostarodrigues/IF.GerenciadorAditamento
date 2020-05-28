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

    var produtoEmpresaDemanda = {
        IdProdutoEmpresaDemanda: 0,
        IdProduto: 0,
        IdEmpresaDemanda: 0,
    };

    function Salvar() {
        if (Validar()) {
            produtoEmpresaDemanda.IdProdutoEmpresaDemanda = 0;
            produtoEmpresaDemanda.IdProduto = $("#idProduto").val();
            produtoEmpresaDemanda.IdEmpresaDemanda = $("#idEmpresaDemanda").val();

            $.ajax({
                url: baseUrl + '/ProdutoEmpresaDemanda/Salvar',
                data: JSON.stringify({ 'produtoEmpresaDemanda': produtoEmpresaDemanda }),
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
                        DestroiTable('dtProdutoEmpresaDemanda');
                        LimparDados();
                        CarregarProdutoEmpresaDemanda();
                        isSalvo = false;
                        BMG.ShowAlert("Notificação", "Produto atribuído a Empresa com sucesso.");
                    }
                },
                error: function (xhr, textStatus, errorThrown) {
                    TratarErro(xhr, textStatus, errorThrown, "Erro ao atribuir produto a empresa.");
                }
            });
        }
    }

    function Alterar() {
        if (Validar()) {
            produtoEmpresaDemanda.IdProduto = $("#idProduto").val();
            produtoEmpresaDemanda.IdEmpresaDemanda = $("#idEmpresaDemanda").val();

            $.ajax({
                url: baseUrl + '/ProdutoEmpresaDemanda/Alterar',
                data: JSON.stringify({ 'produtoEmpresaDemanda': produtoEmpresaDemanda }),
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
                        DestroiTable('dtProdutoEmpresaDemanda');
                        LimparDados();
                        CarregarProdutoEmpresaDemanda();
                        isSalvo = false;
                        BMG.ShowAlert("Notificação", "Produto atribuído a Empresa com sucesso.");
                    }
                },
                error: function (xhr, textStatus, errorThrown) {
                    TratarErro(xhr, textStatus, errorThrown, "Erro ao atribuir produto a empresa.");
                }
            });
        }
    }

    function Excluir() {
        $.ajax({
            url: baseUrl + '/ProdutoEmpresaDemanda/Excluir',
            data: JSON.stringify({ 'idProdutoEmpresaDemanda': produtoEmpresaDemanda.IdProdutoEmpresaDemanda }),
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
                    DestroiTable('dtProdutoEmpresaDemanda');
                    LimparDados();
                    CarregarProdutoEmpresaDemanda();
                    isSalvo = false;
                    BMG.ShowAlert("Notificação", "Atribuição de produto a empresa excluída com sucesso.");
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                TratarErro(xhr, textStatus, errorThrown, "Erro ao excluir a atribuição de produto a empresa.");
            }
        });
    }

    function Validar() {
        if ($("#idProduto").val() == "" ||
            $("#idEmpresaDemanda").val() == "") {
            BMG.ShowAlert("Aviso", "Preencha o campo corretamente.");
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

    function CarregarProdutoEmpresaDemanda() {
        DestroiTable('dtProdutoEmpresaDemanda');

        $('#dtProdutoEmpresaDemanda').dataTable({
            "bServerSide": true,
            "bFilter": false,
            "sAjaxSource": baseUrl + "/ProdutoEmpresaDemanda/RetornarProdutoEmpresaDemanda/",
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
                { "sName": "DsProduto" },
                { "sName": "NomeEmpresaDemanda" },
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
                    isSalvo = true;
                    if ($(e.toElement).hasClass("glyphicon-pencil")) {
                        RetornarDados(data)

                        $('#idProduto').attr('disabled', true);
                    }
                })
                $($(row).children()[3]).on("click", function (e) {
                    isSalvo = false;
                    if ($(e.toElement).hasClass("glyphicon-remove")) {
                        BMG.ShowConfirm("Excluir", "Esta ação irá excluir a atribuição do produto a empresa.", function () {
                            produtoEmpresaDemanda.IdProdutoEmpresaDemanda = parseInt(data[4]);
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
                "sSearch": "Buscar : ",
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
        produtoEmpresaDemanda.IdProdutoEmpresaDemanda = parseInt(obj[4]);
        $("#idProduto").val(obj[3]);
        $("#idEmpresaDemanda").val(obj[2]);
    }

    function LimparDados() {
        isSalvo = false;

        produtoEmpresaDemanda.IdProdutoEmpresaDemanda = 0;
        $("#idProduto")[0].selectedIndex = 0;
        $("#idEmpresaDemanda")[0].selectedIndex = 0;

        $('#idProduto').attr('disabled', false);
    }

    function CarregarDadosIniciais() {
        $.ajax({
            url: baseUrl + '/ProdutoEmpresaDemanda/CarregarDadosIniciais',
            headers: {
                'RequestVerificationToken': $('#antiForgeryToken').val(),
                'X-Requested-With': 'XMLHttpRequest'
            },
            type: "POST",
            dataType: 'json',
            contentType: 'application/json',
            cache: false,
            success: function (dados) {
                //Combo Produto
                var comboProduto = document.getElementById("idProduto");
                for (var i = 0; i < dados.listProdutos.length; i++) {
                    var opt = document.createElement("option");
                    opt.value = dados.listProdutos[i].IdProduto;
                    opt.text = dados.listProdutos[i].DsProduto;
                    comboProduto.add(opt, comboProduto.options[0]);
                }


                //Combo Empresa
                var comboEmpresa = document.getElementById("idEmpresaDemanda");
                for (var i = 0; i < dados.listEmpresaDemanda.length; i++) {
                    var opt = document.createElement("option");
                    opt.value = dados.listEmpresaDemanda[i].IdEmpresaDemanda;
                    opt.text = dados.listEmpresaDemanda[i].NomeEmpresaDemanda;
                    comboEmpresa.add(opt, comboEmpresa.options[0]);
                }

                LimparDados();
            },
            error: function (xhr, textStatus, errorThrown) {
                TratarErro(xhr, textStatus, errorThrown, "Erro ao carregar os dados iniciais.");
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

    CarregarProdutoEmpresaDemanda();
    CarregarDadosIniciais();
});