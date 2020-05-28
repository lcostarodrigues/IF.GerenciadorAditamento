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

    var usuario = {
        IdUsuario: 0,
        NomeUsuario: "",
        LoginUsuario: "",
        EmailUsuario: "",
        SenhaUsuario: "",
        IdGrupo: 0,
        FlAtivo: false,
    };

    function Salvar() {
        if (Validar()) {
            usuario.IdUsuario = 0;
            usuario.NomeUsuario = $("#idNomeUsuario").val();
            usuario.LoginUsuario = $("#idLoginUsuario").val();
            //usuario.EmailUsuario = $("#idEmailUsuario").val();
            usuario.SenhaUsuario = $("#idSenhaUsuario").val();
            usuario.IdGrupo = parseInt($("#IdGrupo").val());
            //usuario.FlAtivo = parseInt($("#idFlAtivo").val());

            $.ajax({
                url: baseUrl + '/Usuario/Salvar',
                data: JSON.stringify({ 'usuario': usuario }),
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
                        DestroiTable('dtUsuario');
                        LimparDados();
                        CarregarUsuarios();
                        isSalvo = false;
                        BMG.ShowAlert("Notificação", "Usuário salvo com sucesso.");
                    }
                },
                error: function (xhr, textStatus, errorThrown) {
                    TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o usuário.");
                }
            });
        }
    }

    function Alterar() {
        if (Validar()) {
            usuario.NomeUsuario = $("#idNomeUsuario").val();
            //usuario.EmailUsuario = $("#idEmailUsuario").val();
            usuario.LoginUsuario = $("#idLoginUsuario").val();
            usuario.SenhaUsuario = $("#idSenhaUsuario").val();
            usuario.IdGrupo = parseInt($("#IdGrupo").val());
            //usuario.FlAtivo = parseInt($("#idFlAtivo").val());

            $.ajax({
                url: baseUrl + '/Usuario/Alterar',
                data: JSON.stringify({ 'usuario': usuario }),
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
                        DestroiTable('dtUsuario');
                        LimparDados();
                        CarregarUsuarios();
                        isSalvo = false;
                        BMG.ShowAlert("Notificação", "Usuário atualizado com sucesso.");
                    }
                },
                error: function (xhr, textStatus, errorThrown) {
                    TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o usuário.");
                }
            });
        }
    }

    function Excluir() {
        $.ajax({
            url: baseUrl + '/Usuario/Excluir',
            data: JSON.stringify({ 'IdUsuario': usuario.IdUsuario }),
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
                    DestroiTable('dtUsuario');
                    LimparDados();
                    CarregarUsuarios();
                    isSalvo = false;
                    BMG.ShowAlert("Notificação", "Usuário excluído com sucesso.");
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                TratarErro(xhr, textStatus, errorThrown, "Erro ao excluir o produto.");
            }
        });
    }

    function Validar() {
        if ($("#idNomeUsuario").val() == ""
            || $("#idLoginUsuario").val() == ""
            //|| $("#idEmailUsuario").val() == ""
            || $("#idSenhaUsuario").val() == ""
            || $("#IdGrupo").val() == ""
            //|| $("#idFlAtivo").val() == ""
        ) {
            BMG.ShowAlert("Aviso", "Preencha os campos corretamente.");
            return false;
        }
        else if (/^[a-zA-Z\s]+$/.test($("#idNomeUsuario").val()))
            BMG.ShowAlert("Aviso", "Nome invalido..");

        return true;
    }

    function DestroiTable(table) {
        if ($('#' + table).hasClass('dataTable')) {
            var tableGrupo = $('#' + table).DataTable();
            tableGrupo.destroy();
        }
    }

    function CarregarUsuarios() {
        DestroiTable('dtUsuario');

        $('#dtUsuario').dataTable({
            "bServerSide": true,
            "bFilter": false,
            "sAjaxSource": baseUrl + "/Usuario/RetornarUsuarios/",
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
                { "sName": "NomeUsuario" },
                { "sName": "LoginUsuario" },
                { "sName": "IdGrupo" },
                {
                    "mData": null,
                    "mRender": function (o) {
                        return '<div style="text-align: center;"><a href="#" class="glyphicon glyphicon-pencil"></a></div>';
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
                    'if ($(e.toElement).hasClass("glyphicon glyphicon-pencil")) {'
                    if ($(e.originalEvent.target).hasClass("glyphicon-pencil")) {                   
                        RetornarDados(data)
                    }
                })
                $($(row).children()[4]).on("click", function (e) {
                    isSalvo = false;
                    'if ($(e.toElement).hasClass("glyphicon-remove")) {'
                    if ($(e.originalEvent.target).hasClass("glyphicon-remove")) {
                        BMG.ShowConfirm("Excluir", "Esta ação irá excluir o usuário.", function () {
                            usuario.IdUsuario = parseInt(data[6]);
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
                "sSearch": "Buscar: ",
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
        usuario.IdUsuario = parseInt(obj[6]);
        $("#idNomeUsuario").val(obj[0]);
        $("#idLoginUsuario").val(obj[1]);
        usuario.EmailUsuario = val(obj[2]);
        usuario.SenhaUsuario = val(obj[3]);
        usuario.FlAtivo = val(obj[4]);
        $("#IdGrupo")[0].value = parseInt(obj[7]);
        //$("#idEmailUsuario").val(obj[2]);
        //$("#idSenhaUsuario").val(obj[3]);
        //$("#idFlAtivo")[0].selectedIndex = obj[5] == "Sim" ? 1 : 0;
    }

    function LimparDados() {
        isSalvo = false;

        usuario.IdUsuario = 0;
        $("#idNomeUsuario").val("");
        $("#idLoginUsuario").val("");
        //$("#idEmailUsuario").val("");
        $("#idSenhaUsuario").val("");
        $("#IdGrupo")[0].selectedIndex = 0;
        //$("#idFlAtivo")[0].selectedIndex = 0;
    }

    function CarregarDadosIniciais() {
        $.ajax({
            url: baseUrl + '/Usuario/CarregarDadosIniciais',
            headers: {
                'RequestVerificationToken': $('#antiForgeryToken').val(),
                'X-Requested-With': 'XMLHttpRequest'
            },
            type: "POST",
            dataType: 'json',
            contentType: 'application/json',
            cache: false,
            success: function (dados) {
                //Combo Grupo
                var comboGrupo = document.getElementById("IdGrupo");
                for (var i = 0; i < dados.listGrupo.length; i++) {
                    var opt = document.createElement("option");
                    opt.value = dados.listGrupo[i].GrupoID;
                    opt.text = dados.listGrupo[i].Descricao;
                    comboGrupo.add(opt, comboGrupo.options[0]);
                }

                //Combo Ativo
                //var comboPercentualAditivo = document.getElementById("idFlAtivo");
                //for (var i = 0; i < dados.listSimNao.length; i++) {
                //    var opt = document.createElement("option");
                //    opt.value = dados.listSimNao[i][0];
                //    opt.text = dados.listSimNao[i][1];
                //    comboPercentualAditivo.add(opt, comboPercentualAditivo.options[0]);
                //}

                LimparDados();
            },
            error: function (xhr, textStatus, errorThrown) {
                TratarErro(xhr, textStatus, errorThrown, "Erro ao carregar o usuário.");
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

    $("#idNomeUsuario").keypress(function (event) {
        var inputValue = event.charCode;
        if (!(inputValue >= 65 && inputValue <= 120) && (inputValue != 32 && inputValue != 0)) {
            event.preventDefault();
        }
    });    

    CarregarUsuarios();
    CarregarDadosIniciais();
});