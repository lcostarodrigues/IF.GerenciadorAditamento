$(document).ready(function () {


    $("#idSituacaoFiltro").change(function () {
        CarregarComboArea();
    });


    $("#idAreaFiltro").change(function () {
        CarregarComboItem();
    });

    var baseUrl = $("#BaseURL").val();

   

    $("#rbPanjur").click(function () {
        CarregarFilaFiltro();
        CarregarFila();
        CarregarDadosIniciais();
        
    });

    $("#rbSPA").click(function () {
        CarregarFilaFiltro();
        CarregarFila();
        CarregarDadosIniciais();
    });



    $("#rbPagamento").click(function () {
        CarregarFilaFiltro();
        CarregarFila();
        CarregarDadosIniciais();

    });



    $("#rbEncerramento").click(function () {
        CarregarFilaFiltro();
        CarregarFila();
        CarregarDadosIniciais();

    });

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

    $("#salvarIdFila").click(function () {
        if (isSalvoFila) {
            AlterarFila();
        } else {
            SalvarFila();
        }
    });

    $("#limparIdFila").click(function () {
        LimparDadosFila();
    });



    $("#btnModalCriarFila").click(function () {

        $('#modalCriarFila').modal();

    });


    var isSalvo = false;

    var isSalvoFila = false;

    var filaFiltro = {
        IdFilaFiltro: 0,
        IdFila: 0,
        IdSituacao: 0,
        AreaFiltro: "",
        ItemFiltro: "",
        Sla: "",
        TipoDemanda: ""
    };

    var fila = {
        IdFila: 0,
        DsFila: "",
        Sla: "",
        TipoDemanda: ""
    };

    function SalvarFila() {

        var rbPanjur = $("#rbPanjur").is(":checked");

        var rbSPA = $("#rbSPA").is(":checked");

        var rbEncerramento = $("#rbEncerramento").is(":checked");
        var rbPagamento = $("#rbPagamento").is(":checked");

        if (ValidarFila()) {
            fila.IdFila = 0;
            fila.DsFila = $("#idFilaCriar").val();
            fila.Sla = $("#idSlaCriar").val();
            //filaFiltro.Sla = $("#idEmailUsuario").val();
            //filaFiltro.TipoDemanda = $("#idTipoDemandaFiltro").val();

            $.ajax({
                url: baseUrl + '/FilaFiltro/SalvarFila',
                data: JSON.stringify({ 'fila': fila, 'rbPanjur': rbPanjur, 'rbSPA': rbSPA, 'rbEncerramento': rbEncerramento, 'rbPagamento': rbPagamento  }),
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
                        DestroiTable('dtFila');
                        LimparDadosFila();
                        CarregarFila();
                        CarregarDadosIniciais();
                        isSalvoFila = false;
                        BMG.ShowAlert("Notificação", "Fila criada com sucesso.");
                    }
                },
                error: function (xhr, textStatus, errorThrown) {
                    TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar a fila.");
                }
            });
        }
    }

    function Salvar() {

        var rbPanjur = $("#rbPanjur").is(":checked");

        var rbSPA = $("#rbSPA").is(":checked");

        var rbEncerramento = $("#rbEncerramento").is(":checked");
        var rbPagamento = $("#rbPagamento").is(":checked");

        if (Validar()) {
            filaFiltro.IdFilaFiltro = 0;
            filaFiltro.IdFila = $("#idFila").val();
            filaFiltro.IdSituacao = $("#idSituacaoFiltro").val();
            filaFiltro.AreaFiltro = $("#idAreaFiltro").val();
            filaFiltro.ItemFiltro = $("#idItemFiltro").val();
            //filaFiltro.Sla = $("#idEmailUsuario").val();
            //filaFiltro.TipoDemanda = $("#idTipoDemandaFiltro").val();

            $.ajax({
                url: baseUrl + '/FilaFiltro/Salvar',
                data: JSON.stringify({ 'filaFiltro': filaFiltro, 'rbPanjur': rbPanjur, 'rbSPA': rbSPA, 'rbEncerramento': rbEncerramento, 'rbPagamento': rbPagamento }),
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
                        DestroiTable('dtFilaFiltro');
                        LimparDados();
                        CarregarFilaFiltro();
                        isSalvo = false;
                        BMG.ShowAlert("Notificação", "Fila salva com sucesso.");
                    }
                },
                error: function (xhr, textStatus, errorThrown) {
                    TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar a fila.");
                }
            });
        }
    }

    function AlterarFila() {
        if (ValidarFila()) {
            fila.DsFila = $("#idFilaCriar").val();
            fila.Sla = $("#idSlaCriar").val();
            //filaFiltro.Sla = $("#idEmailUsuario").val();
            //filaFiltro.TipoDemanda = $("#idTipoDemandaFiltro").val();

            $.ajax({
                url: baseUrl + '/FilaFiltro/AlterarFila',
                data: JSON.stringify({ 'fila': fila }),
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
                        DestroiTable('dtFila');
                        LimparDadosFila();
                        CarregarFila();
                        CarregarDadosIniciais();
                        isSalvoFila = false;
                        BMG.ShowAlert("Notificação", "Fila atualizada com sucesso.");
                    }
                },
                error: function (xhr, textStatus, errorThrown) {
                    TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar a fila.");
                }
            });
        }
    }

    function Alterar() {
        if (Validar()) {
            filaFiltro.IdFila = $("#idFila").val();
            filaFiltro.IdSituacao = $("#idSituacaoFiltro").val();
            filaFiltro.AreaFiltro = $("#idAreaFiltro").val();
            filaFiltro.ItemFiltro = $("#idItemFiltro").val();
            //filaFiltro.Sla = $("#idEmailUsuario").val();
            //filaFiltro.TipoDemanda = $("#idTipoDemandaFiltro").val();

            $.ajax({
                url: baseUrl + '/FilaFiltro/Alterar',
                data: JSON.stringify({ 'filaFiltro': filaFiltro }),
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
                        DestroiTable('dtFilaFiltro');
                        LimparDados();
                        CarregarFilaFiltro();
                        isSalvo = false;
                        BMG.ShowAlert("Notificação", "Fila atualizada com sucesso.");
                    }
                },
                error: function (xhr, textStatus, errorThrown) {
                    TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar a fila.");
                }
            });
        }
    }

    function ExcluirFila() {
        $.ajax({
            url: baseUrl + '/FilaFiltro/ExcluirFila',
            data: JSON.stringify({ 'IdFila': fila.IdFila }),
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
                    DestroiTable('dtFila');
                    LimparDadosFila();
                    CarregarFila();
                    CarregarDadosIniciais();
                    isSalvoFila = false;
                    BMG.ShowAlert("Notificação", "Fila excluída com sucesso.");
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                TratarErro(xhr, textStatus, errorThrown, "Erro ao excluir o registro da fila.");
            }
        });
    }

    function Excluir() {
        $.ajax({
            url: baseUrl + '/FilaFiltro/Excluir',
            data: JSON.stringify({ 'IdFilaFiltro': filaFiltro.IdFilaFiltro }),
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
                    DestroiTable('dtFilaFiltro');
                    LimparDadosFila();
                    CarregarFilaFiltro();
                    //CarregarDadosIniciais();
                    isSalvoFila = false;
                    BMG.ShowAlert("Notificação", "Opção da fila excluída com sucesso.");
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                TratarErro(xhr, textStatus, errorThrown, "Erro ao excluir o registro da fila.");
            }
        });
    }

    function Validar() {

        var rbPanjur = $("#rbPanjur").is(":checked");
        var rbSPA = $("#rbSPA").is(":checked");
        var rbEncerramento = $("#rbEncerramento").is(":checked");
        var rbPagamento = $("#rbPagamento").is(":checked");


        if (rbEncerramento) {

            if ($("#idFila").val() == ""
                || $("#idSituacaoFiltro").val() == ""
            ) {
                BMG.ShowAlert("Aviso", "Preencha os campos corretamente.");
                return false;
            }
        }
        else
        {
            if ($("#idFila").val() == ""
                || $("#idSituacaoFiltro").val() == ""
                || $("#idAreaFiltro").val() == ""
                || $("#idItemFiltro").val() == ""
                // || $("#idTipoDemandaFiltro").val() == ""
            ) {
                BMG.ShowAlert("Aviso", "Preencha os campos corretamente.");
                return false;
            }
        }
        return true;
    }

    function ValidarFila() {
        if ($("#idFilaCriar").val() == ""
            || $("#idSlaCriar").val() == ""
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

    function CarregarFila() {

        var rbPanjur = $("#rbPanjur").is(":checked");

        var rbSPA = $("#rbSPA").is(":checked");

        var rbEncerramento = $("#rbEncerramento").is(":checked");
        var rbPagamento = $("#rbPagamento").is(":checked");

        if (rbPanjur == true) {
            CarregarFilaPanjur();
        }
        else if (rbSPA == true) {
            CarregarFilaSPA();
        }
        else if (rbEncerramento == true) {
            CarregarFilaEncerramento();
        }
        else if (rbPagamento == true) {
            CarregarFilaPagamento();
        }

    }

    function CarregarFilaPanjur() {
        DestroiTable('dtFila');

        $('#dtFila').dataTable({
            "bServerSide": true,
            "bFilter": false,
            "sAjaxSource": baseUrl + "/FilaFiltro/RetornarFilaPanjur/",
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
                { "sName": "DsFila" },
                { "sName": "Sla" },
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
                    isSalvoFila = true;
                    if ($(e.toElement).hasClass("glyphicon-pencil")) {
                        RetornarDadosFila(data)
                    }
                })
                $($(row).children()[4]).on("click", function (e) {
                    isSalvoFila = false;
                    if ($(e.toElement).hasClass("glyphicon-remove")) {
                        BMG.ShowConfirm("Excluir", "Esta ação irá excluir a fila.", function () {
                            fila.IdFila = parseInt(data[3]);
                            ExcluirFila();
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
                "sSearch": "Buscar pela Fila: ",
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

    function CarregarFilaSPA() {
        DestroiTable('dtFila');

        $('#dtFila').dataTable({
            "bServerSide": true,
            "bFilter": false,
            "sAjaxSource": baseUrl + "/FilaFiltro/RetornarFilaSPA/",
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
                { "sName": "DsFila" },
                { "sName": "Sla" },
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
                    isSalvoFila = true;
                    if ($(e.toElement).hasClass("glyphicon-pencil")) {
                        RetornarDadosFila(data)
                    }
                })
                $($(row).children()[4]).on("click", function (e) {
                    isSalvoFila = false;
                    if ($(e.toElement).hasClass("glyphicon-remove")) {
                        BMG.ShowConfirm("Excluir", "Esta ação irá excluir a fila.", function () {
                            fila.IdFila = parseInt(data[3]);
                            ExcluirFila();
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
                "sSearch": "Buscar pela Fila: ",
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


    function CarregarFilaPagamento() {
        DestroiTable('dtFila');

        $('#dtFila').dataTable({
            "bServerSide": true,
            "bFilter": false,
            "sAjaxSource": baseUrl + "/FilaFiltro/RetornarFilaPagamentos/",
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
                { "sName": "DsFila" },
                { "sName": "Sla" },
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
                    isSalvoFila = true;
                    if ($(e.toElement).hasClass("glyphicon-pencil")) {
                        RetornarDadosFila(data)
                    }
                })
                $($(row).children()[4]).on("click", function (e) {
                    isSalvoFila = false;
                    if ($(e.toElement).hasClass("glyphicon-remove")) {
                        BMG.ShowConfirm("Excluir", "Esta ação irá excluir a fila.", function () {
                            fila.IdFila = parseInt(data[3]);
                            ExcluirFila();
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
                "sSearch": "Buscar pela Fila: ",
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

    function CarregarFilaEncerramento() {
        DestroiTable('dtFila');

        $('#dtFila').dataTable({
            "bServerSide": true,
            "bFilter": false,
            "sAjaxSource": baseUrl + "/FilaFiltro/RetornarFilaEncerramentos/",
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
                { "sName": "DsFila" },
                { "sName": "Sla" },
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
                    isSalvoFila = true;
                    if ($(e.toElement).hasClass("glyphicon-pencil")) {
                        RetornarDadosFila(data)
                    }
                })
                $($(row).children()[4]).on("click", function (e) {
                    isSalvoFila = false;
                    if ($(e.toElement).hasClass("glyphicon-remove")) {
                        BMG.ShowConfirm("Excluir", "Esta ação irá excluir a fila.", function () {
                            fila.IdFila = parseInt(data[3]);
                            ExcluirFila();
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
                "sSearch": "Buscar pela Fila: ",
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

    function CarregarFilaFiltro() {

        var rbPanjur = $("#rbPanjur").is(":checked");

        var rbSPA = $("#rbSPA").is(":checked");

        var rbEncerramento = $("#rbEncerramento").is(":checked");
        var rbPagamento = $("#rbPagamento").is(":checked");

        if (rbPanjur == true) {
            CarregarFilaFiltroPanjur();
        }
        else if (rbSPA == true) {
            CarregarFilaFiltroSPA();
        }
        else if (rbEncerramento == true) {
            CarregarFilaFiltroEncerramento();
        }
        else if (rbPagamento == true) {
            CarregarFilaFiltroPagamento();
        }

    }

    function CarregarFilaFiltroPanjur() {
        DestroiTable('dtFilaFiltro');

        $('#dtFilaFiltro').dataTable({
            "bServerSide": true,
            "bFilter": false,
            "sAjaxSource": baseUrl + "/FilaFiltro/RetornarFilaFiltroPanjur/",
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
                { "sName": "DsFila" },
                { "sName": "Descricao" },
                { "sName": "AreaFiltro" },
                { "sName": "ItemFiltro" },
                { "sName": "Sla" },
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

                $($(row).children()[6]).on("click", function (e) {
                    isSalvo = true;
                    if ($(e.toElement).hasClass("glyphicon-pencil")) {
                        RetornarDados(data)
                    }
                })
                $($(row).children()[7]).on("click", function (e) {
                    isSalvo = false;
                    if ($(e.toElement).hasClass("glyphicon-remove")) {
                        BMG.ShowConfirm("Excluir", "Esta ação irá excluir a opção da fila.", function () {
                            filaFiltro.IdFilaFiltro = parseInt(data[7]);
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
                "sSearch": "Buscar pela Fila: ",
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

    function CarregarFilaFiltroSPA() {
        DestroiTable('dtFilaFiltro');

        $('#dtFilaFiltro').dataTable({
            "bServerSide": true,
            "bFilter": false,
            "sAjaxSource": baseUrl + "/FilaFiltro/RetornarFilaFiltroSPA/",
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
                { "sName": "DsFila" },
                { "sName": "Descricao" },
                { "sName": "AreaFiltro" },
                { "sName": "ItemFiltro" },
                { "sName": "Sla" },
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

                $($(row).children()[6]).on("click", function (e) {
                    isSalvo = true;
                    if ($(e.toElement).hasClass("glyphicon-pencil")) {
                        RetornarDados(data)
                    }
                })
                $($(row).children()[7]).on("click", function (e) {
                    isSalvo = false;
                    if ($(e.toElement).hasClass("glyphicon-remove")) {
                        BMG.ShowConfirm("Excluir", "Esta ação irá excluir a opção da fila.", function () {
                            filaFiltro.IdFilaFiltro = parseInt(data[7]);
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
                "sSearch": "Buscar pela Fila: ",
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

    function CarregarFilaFiltroEncerramento() {
        DestroiTable('dtFilaFiltro');

        $('#dtFilaFiltro').dataTable({
            "bServerSide": true,
            "bFilter": false,
            "sAjaxSource": baseUrl + "/FilaFiltro/RetornarFilaFiltroEncerramentos/",
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
                { "sName": "DsFila" },
                { "sName": "Descricao" },
                { "sName": "AreaFiltro" },
                { "sName": "ItemFiltro" },
                { "sName": "Sla" },
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

                $($(row).children()[6]).on("click", function (e) {
                    isSalvo = true;
                    if ($(e.toElement).hasClass("glyphicon-pencil")) {
                        RetornarDados(data)
                    }
                })
                $($(row).children()[7]).on("click", function (e) {
                    isSalvo = false;
                    if ($(e.toElement).hasClass("glyphicon-remove")) {
                        BMG.ShowConfirm("Excluir", "Esta ação irá excluir a opção da fila.", function () {
                            filaFiltro.IdFilaFiltro = parseInt(data[7]);
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
                "sSearch": "Buscar pela Fila: ",
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

    function CarregarFilaFiltroPagamento() {
        DestroiTable('dtFilaFiltro');

        $('#dtFilaFiltro').dataTable({
            "bServerSide": true,
            "bFilter": false,
            "sAjaxSource": baseUrl + "/FilaFiltro/RetornarFilaFiltroPagamentos/",
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
                { "sName": "DsFila" },
                { "sName": "Descricao" },
                { "sName": "AreaFiltro" },
                { "sName": "ItemFiltro" },
                { "sName": "Sla" },
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

                $($(row).children()[6]).on("click", function (e) {
                    isSalvo = true;
                    if ($(e.toElement).hasClass("glyphicon-pencil")) {
                        RetornarDados(data)
                    }
                })
                $($(row).children()[7]).on("click", function (e) {
                    isSalvo = false;
                    if ($(e.toElement).hasClass("glyphicon-remove")) {
                        BMG.ShowConfirm("Excluir", "Esta ação irá excluir a opção da fila.", function () {
                            filaFiltro.IdFilaFiltro = parseInt(data[7]);
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
                "sSearch": "Buscar pela Fila: ",
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
        filaFiltro.IdFilaFiltro = parseInt(obj[7]);
        filaFiltro.IdFila = parseInt(obj[6]);
        $("#idFila")[0].value = parseInt(obj[6]);
        //$("#idFila").val(obj[0]);
        $("#idSituacaoFiltro")[0].value = parseInt(obj[8]);
        //$("#idSituacaoFiltro").val(obj[1]);
        $("#idAreaFiltro").val(obj[2]);
        $("#idItemFiltro").val(obj[3]);
        $("#idSla").val(obj[4]);
        //$("#idTipoDemandaFiltro").val(obj[4]);
        //$("#idSenhaUsuario").val(obj[3]);
        //$("#idFlAtivo")[0].selectedIndex = obj[5] == "Sim" ? 1 : 0;
    }

    function RetornarDadosFila(obj) {
        fila.IdFila = parseInt(obj[3]);
        $("#idFilaCriar").val(obj[0]);
        $("#idSlaCriar").val(obj[1]);
        //$("#idTipoDemandaFiltro").val(obj[4]);
        //$("#idSenhaUsuario").val(obj[3]);
        //$("#idTipoDemandaFiltro")[0].value = parseInt(obj[4]);
        //$("#idFlAtivo")[0].selectedIndex = obj[5] == "Sim" ? 1 : 0;
    }

    function LimparDados() {
        isSalvo = false;

        filaFiltro.IdFilaFiltro = 0;
        filaFiltro.IdFila = 0;
        $("#idFila")[0].selectedIndex = 0;
        $("#idSituacaoFiltro")[0].selectedIndex = 0;
        $("#idAreaFiltro")[0].selectedIndex = 0;
        $("#idItemFiltro")[0].selectedIndex = 0;
        //$("#idTipoDemandaFiltro")[0].selectedIndex = 0;
        $("#idSla").val("");
    }

    function LimparDadosFila() {
        isSalvoFila = false;

        fila.IdFila = 0
        $("#idFilaCriar").val("");
        $("#idSlaCriar").val("");
    }
    
    function CarregarDadosIniciais() {

        var rbPanjur = $("#rbPanjur").is(":checked");

        var rbSPA = $("#rbSPA").is(":checked");

        var rbEncerramento = $("#rbEncerramento").is(":checked");
        var rbPagamento = $("#rbPagamento").is(":checked");

        $.ajax({
            url: baseUrl + '/FilaFiltro/CarregarDadosIniciais',
            data: JSON.stringify({ 'rbPanjur': rbPanjur, 'rbSPA': rbSPA, 'rbEncerramento': rbEncerramento, 'rbPagamento': rbPagamento    }),
            headers: {
                'RequestVerificationToken': $('#antiForgeryToken').val(),
                'X-Requested-With': 'XMLHttpRequest'
            },
            type: "POST",
            dataType: 'json',
            contentType: 'application/json',
            cache: false,
            success: function (dados) {
                $('#idFila').html("");
                $('#idSituacaoFiltro').html("");
                $('#idAreaFiltro').html("");
                $('#idItemFiltro').html("");



                //Combo Situacao 
                var comboSituacaoCnj = document.getElementById("idSituacaoFiltro");


                for (var i = 0; i < dados.listSituacaoCnj.length; i++) {
                    var opt = document.createElement("option");
                    opt.value = dados.listSituacaoCnj[i].IdSituacaoCnj;
                    opt.text = dados.listSituacaoCnj[i].Descricao;
                    comboSituacaoCnj.add(opt, comboSituacaoCnj.options[0]);
                }


                var selectSituacao = document.createElement("option");
                selectSituacao.value = "";
                selectSituacao.text = "Selecione uma situação";
                comboSituacaoCnj.add(selectSituacao, comboSituacaoCnj.options[0]);
                
                $("#idSituacaoFiltro")[0].selectedIndex = 0;

                if (rbPanjur == true) {
                    //Combo Area Panjur
                    var comboAreaPanjur = document.getElementById("idAreaFiltro");

                    for (var i = 0; i < dados.listAreasPanjur.length; i++) {
                        var opt = document.createElement("option");
                        opt.value = dados.listAreasPanjur[i].Area;
                        opt.text = dados.listAreasPanjur[i].Area;
                        comboAreaPanjur.add(opt, comboAreaPanjur.options[0]);
                    }

                    var selectArea = document.createElement("option");
                    selectArea.value = "";
                    selectArea.text = "Selecione uma Área";
                    comboAreaPanjur.add(selectArea, comboAreaPanjur.options[0]);

                    $("#idAreaFiltro")[0].selectedIndex = 0;

                    //Combo Item Panjur
                    var comboItemPanjur = document.getElementById("idItemFiltro");

                    for (var i = 0; i < dados.listItemPanjur.length; i++) {
                        var opt = document.createElement("option");
                        opt.value = dados.listItemPanjur[i].Item;
                        opt.text = dados.listItemPanjur[i].Item;
                        comboItemPanjur.add(opt, comboItemPanjur.options[0]);
                    }

                    var selectItemPanjurTodos = document.createElement("option");
                    selectItemPanjurTodos.value = "-1";
                    selectItemPanjurTodos.text = "Todos";
                    comboItemPanjur.add(selectItemPanjurTodos, comboItemPanjur.options[0]);

                    var selectItemPanjur = document.createElement("option");
                    selectItemPanjur.value = "";
                    selectItemPanjur.text = "Selecione um Item";
                    comboItemPanjur.add(selectItemPanjur, comboItemPanjur.options[0]);
                    
                    $("#idItemFiltro")[0].selectedIndex = 0;

                    //Combo Fila Panjur
                    var comboFilaPanjur = document.getElementById("idFila");

                    for (var i = 0; i < dados.listFilaPanjur.length; i++) {
                        var opt = document.createElement("option");
                        opt.value = dados.listFilaPanjur[i].IdFila;
                        opt.text = dados.listFilaPanjur[i].DsFila;
                        comboFilaPanjur.add(opt, comboFilaPanjur.options[0]);
                    }

                    var selectFilaPanjur = document.createElement("option");
                    selectFilaPanjur.value = "";
                    selectFilaPanjur.text = "Selecione uma Fila";
                    comboFilaPanjur.add(selectFilaPanjur, comboFilaPanjur.options[0]);

                    $("#idFila")[0].selectedIndex = 0;

                }
                else if (rbSPA == true) {
                    //Combo Area SPA
                    var comboAreaSpa = document.getElementById("idAreaFiltro");

                    for (var i = 0; i < dados.listAreasSpa.length; i++) {
                        var opt = document.createElement("option");
                        opt.value = dados.listAreasSpa[i].AreaAtendimento;
                        opt.text = dados.listAreasSpa[i].AreaAtendimento;
                        comboAreaSpa.add(opt, comboAreaSpa.options[0]);
                    }


                    var selectAreaSpa = document.createElement("option");
                    selectAreaSpa.value = "";
                    selectAreaSpa.text = "Selecione uma Área";
                    comboAreaSpa.add(selectAreaSpa, comboAreaSpa.options[0]);

                    $("#idAreaFiltro")[0].selectedIndex = 0;

                    //Combo Item SPA
                    var comboItemSpa = document.getElementById("idItemFiltro");

                    for (var i = 0; i < dados.listItemsSpa.length; i++) {
                        var opt = document.createElement("option");
                        opt.value = dados.listItemsSpa[i].TpAtendimento;
                        opt.text = dados.listItemsSpa[i].TpAtendimento;
                        comboItemSpa.add(opt, comboItemSpa.options[0]);
                    }

                    var selectItemSPATodos = document.createElement("option");
                    selectItemSPATodos.value = "-1";
                    selectItemSPATodos.text = "Todos";
                    comboItemSpa.add(selectItemSPATodos, comboItemSpa.options[0]);

                    var selectItemSPA = document.createElement("option");
                    selectItemSPA.value = "";
                    selectItemSPA.text = "Selecione um Item";
                    comboItemSpa.add(selectItemSPA, comboItemSpa.options[0]);

                    $("#idItemFiltro")[0].selectedIndex = 0;


                    //Combo Fila SPA
                    var comboFilaSPA = document.getElementById("idFila");

                    for (var i = 0; i < dados.listFilaSPA.length; i++) {
                        var opt = document.createElement("option");
                        opt.value = dados.listFilaSPA[i].IdFila;
                        opt.text = dados.listFilaSPA[i].DsFila;
                        comboFilaSPA.add(opt, comboFilaSPA.options[0]);
                    }

                    var selectFilaSPA = document.createElement("option");
                    selectFilaSPA.value = "";
                    selectFilaSPA.text = "Selecione uma Fila";
                    comboFilaSPA.add(selectFilaSPA, comboFilaSPA.options[0]);

                    $("#idFila")[0].selectedIndex = 0;
                }

                else if (rbEncerramento == true) {
                    //Combo Area Encerramento
                    var comboAreaSpa = document.getElementById("idAreaFiltro");

                    

                    var selectAreaSpa = document.createElement("option");
                    selectAreaSpa.value = "";
                    selectAreaSpa.text = "";
                    comboAreaSpa.add(selectAreaSpa, comboAreaSpa.options[0]);

                    $("#idAreaFiltro")[0].selectedIndex = 0;

                    //Combo Item Encerramento
                    var comboItemSpa = document.getElementById("idItemFiltro");

                    var selectItemSPA = document.createElement("option");
                    selectItemSPA.value = "";
                    selectItemSPA.text = "";
                    comboItemSpa.add(selectItemSPA, comboItemSpa.options[0]);

                    $("#idItemFiltro")[0].selectedIndex = 0;


                    //Combo Fila SPA
                    var comboFilaSPA = document.getElementById("idFila");

                    for (var i = 0; i < dados.listFilaEncerramento.length; i++) {
                        var opt = document.createElement("option");
                        opt.value = dados.listFilaEncerramento[i].IdFila;
                        opt.text = dados.listFilaEncerramento[i].DsFila;
                        comboFilaSPA.add(opt, comboFilaSPA.options[0]);
                    }

                    var selectFilaSPA = document.createElement("option");
                    selectFilaSPA.value = "";
                    selectFilaSPA.text = "Selecione uma Fila";
                    comboFilaSPA.add(selectFilaSPA, comboFilaSPA.options[0]);

                    $("#idFila")[0].selectedIndex = 0;
                }

                else if (rbPagamento == true) {
                    //Combo Area Pagamento
                    var comboAreaSpa = document.getElementById("idAreaFiltro");

                    for (var i = 0; i < dados.listNaturezaPagamento.length; i++) {
                        var opt = document.createElement("option");
                        opt.value = dados.listNaturezaPagamento[i].Natureza;
                        opt.text = dados.listNaturezaPagamento[i].Natureza;
                        comboAreaSpa.add(opt, comboAreaSpa.options[0]);
                    }


                    var selectAreaSpa = document.createElement("option");
                    selectAreaSpa.value = "";
                    selectAreaSpa.text = "Selecione uma Área";
                    comboAreaSpa.add(selectAreaSpa, comboAreaSpa.options[0]);

                    $("#idAreaFiltro")[0].selectedIndex = 0;

                    //Combo Item Pagamento
                    var comboItemSpa = document.getElementById("idItemFiltro");

                    for (var i = 0; i < dados.listTipoPagamentoPagamento.length; i++) {
                        var opt = document.createElement("option");
                        opt.value = dados.listTipoPagamentoPagamento[i].TipoPagamento;
                        opt.text = dados.listTipoPagamentoPagamento[i].TipoPagamento;
                        comboItemSpa.add(opt, comboItemSpa.options[0]);
                    }

                    var selectItemSPATodos = document.createElement("option");
                    selectItemSPATodos.value = "-1";
                    selectItemSPATodos.text = "Todos";
                    comboItemSpa.add(selectItemSPATodos, comboItemSpa.options[0]);

                    var selectItemSPA = document.createElement("option");
                    selectItemSPA.value = "";
                    selectItemSPA.text = "Selecione um Item";
                    comboItemSpa.add(selectItemSPA, comboItemSpa.options[0]);

                    $("#idItemFiltro")[0].selectedIndex = 0;


                    //Combo Fila Pagamento
                    var comboFilaSPA = document.getElementById("idFila");

                    for (var i = 0; i < dados.listFilaPagamento.length; i++) {
                        var opt = document.createElement("option");
                        opt.value = dados.listFilaPagamento[i].IdFila;
                        opt.text = dados.listFilaPagamento[i].DsFila;
                        comboFilaSPA.add(opt, comboFilaSPA.options[0]);
                    }

                    var selectFilaSPA = document.createElement("option");
                    selectFilaSPA.value = "";
                    selectFilaSPA.text = "Selecione uma Fila";
                    comboFilaSPA.add(selectFilaSPA, comboFilaSPA.options[0]);

                    $("#idFila")[0].selectedIndex = 0;
                }
                LimparDados();
            },
            error: function (xhr, textStatus, errorThrown) {
                TratarErro(xhr, textStatus, errorThrown, "Erro ao carregar os combos.");
            }
        });
    }



    function CarregarComboArea() {

        var rbPanjur = $("#rbPanjur").is(":checked");

        var rbSPA = $("#rbSPA").is(":checked");

        var rbEncerramento = $("#rbEncerramento").is(":checked");
        var rbPagamento = $("#rbPagamento").is(":checked");

        var situacao = $("#idSituacaoFiltro").val();


        $.ajax({
            url: baseUrl + '/FilaFiltro/CarregarListaAreas',
            data: JSON.stringify({ 'rbPanjur': rbPanjur, 'rbSPA': rbSPA, 'situacao': situacao, 'rbEncerramento': rbEncerramento, 'rbPagamento': rbPagamento   }),
            headers: {
                'RequestVerificationToken': $('#antiForgeryToken').val(),
                'X-Requested-With': 'XMLHttpRequest'
            },
            type: "POST",
            dataType: 'json',
            contentType: 'application/json',
            cache: false,
            success: function (dados) {

                $('#idAreaFiltro').html("");



                if (rbPanjur == true) {
                    //Combo Area Panjur
                    var comboAreaPanjur = document.getElementById("idAreaFiltro");

                    for (var i = 0; i < dados.listAreasPanjur.length; i++) {
                        var opt = document.createElement("option");
                        opt.value = dados.listAreasPanjur[i].Area;
                        opt.text = dados.listAreasPanjur[i].Area;
                        comboAreaPanjur.add(opt, comboAreaPanjur.options[0]);
                    }

                    var selectArea = document.createElement("option");
                    selectArea.value = "";
                    selectArea.text = "Selecione uma Área";
                    comboAreaPanjur.add(selectArea, comboAreaPanjur.options[0]);

                    $("#idAreaFiltro")[0].selectedIndex = 0;


                }
                else if (rbSPA == true) {
                    //Combo Area SPA
                    var comboAreaSpa = document.getElementById("idAreaFiltro");

                    for (var i = 0; i < dados.listAreasSpa.length; i++) {
                        var opt = document.createElement("option");
                        opt.value = dados.listAreasSpa[i].AreaAtendimento;
                        opt.text = dados.listAreasSpa[i].AreaAtendimento;
                        comboAreaSpa.add(opt, comboAreaSpa.options[0]);
                    }

                    var selectAreaSpa = document.createElement("option");
                    selectAreaSpa.value = "";
                    selectAreaSpa.text = "Selecione uma Área";
                    comboAreaSpa.add(selectAreaSpa, comboAreaSpa.options[0]);

                    $("#idAreaFiltro")[0].selectedIndex = 0;
                }

                else if (rbEncerramento == true) {
                    //Combo Area 
                    var comboAreaSpa = document.getElementById("idAreaFiltro");

                    

                    var selectAreaSpa = document.createElement("option");
                    selectAreaSpa.value = "";
                    selectAreaSpa.text = "";
                    comboAreaSpa.add(selectAreaSpa, comboAreaSpa.options[0]);

                    $("#idAreaFiltro")[0].selectedIndex = 0;
                }

                else if (rbPagamento == true) {
                    //Combo Area SPA
                    var comboAreaSpa = document.getElementById("idAreaFiltro");

                    for (var i = 0; i < dados.listNaturezaPagamento.length; i++) {
                        var opt = document.createElement("option");
                        opt.value = dados.listNaturezaPagamento[i].Natureza;
                        opt.text = dados.listNaturezaPagamento[i].Natureza;
                        comboAreaSpa.add(opt, comboAreaSpa.options[0]);
                    }

                    var selectAreaSpa = document.createElement("option");
                    selectAreaSpa.value = "";
                    selectAreaSpa.text = "Selecione uma Área";
                    comboAreaSpa.add(selectAreaSpa, comboAreaSpa.options[0]);

                    $("#idAreaFiltro")[0].selectedIndex = 0;
                }
                //LimparDados();
            },
            error: function (xhr, textStatus, errorThrown) {
                TratarErro(xhr, textStatus, errorThrown, "Erro ao carregar os combos.");
            }
        });
    }

    function CarregarComboItem() {

        var rbPanjur = $("#rbPanjur").is(":checked");

        var rbSPA = $("#rbSPA").is(":checked");

        var situacao = $("#idSituacaoFiltro").val();

        var area = $("#idAreaFiltro").val();

        var rbEncerramento = $("#rbEncerramento").is(":checked");
        var rbPagamento = $("#rbPagamento").is(":checked");
        

        $.ajax({
            url: baseUrl + '/FilaFiltro/CarregarListaItens',
            data: JSON.stringify({ 'rbPanjur': rbPanjur, 'rbSPA': rbSPA, 'situacao': situacao, 'area': area, 'rbEncerramento': rbEncerramento, 'rbPagamento': rbPagamento   }),
            headers: {
                'RequestVerificationToken': $('#antiForgeryToken').val(),
                'X-Requested-With': 'XMLHttpRequest'
            },
            type: "POST",
            dataType: 'json',
            contentType: 'application/json',
            cache: false,
            success: function (dados) {

                $('#idItemFiltro').html("");

                if (rbPanjur == true) {

                    //Combo Item Panjur
                    var comboItemPanjur = document.getElementById("idItemFiltro");

                    for (var i = 0; i < dados.listItemPanjur.length; i++) {
                        var opt = document.createElement("option");
                        opt.value = dados.listItemPanjur[i].Item;
                        opt.text = dados.listItemPanjur[i].Item;
                        comboItemPanjur.add(opt, comboItemPanjur.options[0]);
                    }

                    var selectItemPanjurTodos = document.createElement("option");
                    selectItemPanjurTodos.value = "-1";
                    selectItemPanjurTodos.text = "Todos";
                    comboItemPanjur.add(selectItemPanjurTodos, comboItemPanjur.options[0]);

                    var selectItemPanjur = document.createElement("option");
                    selectItemPanjur.value = "";
                    selectItemPanjur.text = "Selecione um Item";
                    comboItemPanjur.add(selectItemPanjur, comboItemPanjur.options[0]);



                    $("#idItemFiltro")[0].selectedIndex = 0;

                }
                else if (rbSPA == true) {

                    //Combo Item SPA
                    var comboItemSpa = document.getElementById("idItemFiltro");

                    for (var i = 0; i < dados.listItemsSpa.length; i++) {
                        var opt = document.createElement("option");
                        opt.value = dados.listItemsSpa[i].TpAtendimento;
                        opt.text = dados.listItemsSpa[i].TpAtendimento;
                        comboItemSpa.add(opt, comboItemSpa.options[0]);
                    }

                    var selectItemSPATodos = document.createElement("option");
                    selectItemSPATodos.value = "-1";
                    selectItemSPATodos.text = "Todos";
                    comboItemSpa.add(selectItemSPATodos, comboItemSpa.options[0]);

                    var selectItemSPA = document.createElement("option");
                    selectItemSPA.value = "";
                    selectItemSPA.text = "Selecione um Item";
                    comboItemSpa.add(selectItemSPA, comboItemSpa.options[0]);

                    $("#idItemFiltro")[0].selectedIndex = 0;
                }
                else if (rbEncerramento == true) {

                    //Combo Item Encerramento
                    var comboItemSpa = document.getElementById("idItemFiltro");

                    var selectItemSPA = document.createElement("option");
                    selectItemSPA.value = "";
                    selectItemSPA.text = "";
                    comboItemSpa.add(selectItemSPA, comboItemSpa.options[0]);

                    $("#idItemFiltro")[0].selectedIndex = 0;
                }
                else if (rbPagamento == true) {

                    //Combo Item Pagamento
                    var comboItemSpa = document.getElementById("idItemFiltro");

                    for (var i = 0; i < dados.listTipoPagamentoPagamento.length; i++) {
                        var opt = document.createElement("option");
                        opt.value = dados.listTipoPagamentoPagamento[i].TipoPagamento;
                        opt.text = dados.listTipoPagamentoPagamento[i].TipoPagamento;
                        comboItemSpa.add(opt, comboItemSpa.options[0]);
                    }

                    var selectItemSPATodos = document.createElement("option");
                    selectItemSPATodos.value = "-1";
                    selectItemSPATodos.text = "Todos";
                    comboItemSpa.add(selectItemSPATodos, comboItemSpa.options[0]);

                    var selectItemSPA = document.createElement("option");
                    selectItemSPA.value = "";
                    selectItemSPA.text = "Selecione um Item";
                    comboItemSpa.add(selectItemSPA, comboItemSpa.options[0]);

                    $("#idItemFiltro")[0].selectedIndex = 0;
                }
                //LimparDados();
            },
            error: function (xhr, textStatus, errorThrown) {
                TratarErro(xhr, textStatus, errorThrown, "Erro ao carregar os combos.");
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


    CarregarFila();
    CarregarFilaFiltro();
    CarregarDadosIniciais();
});