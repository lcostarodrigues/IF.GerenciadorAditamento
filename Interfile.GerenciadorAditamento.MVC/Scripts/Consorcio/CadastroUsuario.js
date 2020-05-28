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

    var consorcioCadastroPermissao = {
        Id: 0,
        Nome: "",
        UsuarioRede: "",
        IdGrupo: 0,
        Senha: ""
    };

    function Salvar() {
        if (Validar()) {
            consorcioCadastroPermissao.Id = 0;
            consorcioCadastroPermissao.Nome = $("#idNomeUsuario").val();
            consorcioCadastroPermissao.UsuarioRede = $("#idLoginUsuario").val();
            //consorcioCadastroPermissao.EmailUsuario = $("#idEmailUsuario").val();
            consorcioCadastroPermissao.Senha = $("#idSenhaUsuario").val();
            consorcioCadastroPermissao.IdGrupo = parseInt($("#IdGrupo").val());

            $.ajax({
                url: baseUrl + '/CadastroUsuario/Salvar',
                data: JSON.stringify({ 'consorcioCadastroPermissao': consorcioCadastroPermissao }),
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
                        BMG.ShowAlert("Notificação", "Cadastro realizado com sucesso!");
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
            consorcioCadastroPermissao.Nome = $("#idNomeUsuario").val();
            consorcioCadastroPermissao.UsuarioRede = $("#idLoginUsuario").val();
            //consorcioCadastroPermissao.EmailUsuario = $("#idEmailUsuario").val();
            consorcioCadastroPermissao.Senha = $("#idSenhaUsuario").val();
            consorcioCadastroPermissao.IdGrupo = parseInt($("#IdGrupo").val());

            $.ajax({
                url: baseUrl + '/CadastroUsuario/Alterar',
                data: JSON.stringify({ 'consorcioCadastroPermissao': consorcioCadastroPermissao }),
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
            url: baseUrl + '/CadastroUsuario/Excluir',
            data: JSON.stringify({ 'IdUsuario': consorcioCadastroPermissao.Id }),
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

        if ($("#idLoginUsuario").val() == "") {
            BMG.ShowAlert("Aviso", "Campo Matrícula não preenchido.");
            return false;
        }
        else if ($("#idNomeUsuario").val() == "") {
            BMG.ShowAlert("Aviso", "Campo Nome não preenchido.");
            return false;
        }
        else if ($("#IdGrupo").val() == "") {
            BMG.ShowAlert("Aviso", "Campo Nível de Acesso não preenchido.");
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

    function CarregarUsuarios() {
        DestroiTable('dtUsuario');

        $('#dtUsuario').dataTable({
            "bServerSide": true,
            "bFilter": false,
            "sAjaxSource": baseUrl + "/CadastroUsuario/RetornarUsuarios/",
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
            bSort: false,
            "aoColumns": [
                { "sName": "Nome" },
                { "sName": "UsuarioRede" },
                { "sName": "Descricao" },
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
                        BMG.ShowConfirm("Excluir", "Deseja realmente excluir o usuário?", function () {
                            consorcioCadastroPermissao.Id = parseInt(data[4]);
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
        consorcioCadastroPermissao.Id = parseInt(obj[4]);
        $("#idNomeUsuario").val(obj[0]);
        $("#idLoginUsuario").val(obj[1]);
        //$("#idSenhaUsuario").val(obj[3]);
        $("#IdGrupo")[0].value = parseInt(obj[3]);
    }

    function LimparDados() {
        isSalvo = false;

        consorcioCadastroPermissao.IdUsuario = 0;
        $("#idNomeUsuario").val("");
        $("#idLoginUsuario").val("");
        $("#idSenhaUsuario").val("");
        $("#IdGrupo")[0].selectedIndex = 0;
    }

    function CarregarDadosIniciais() {
        $.ajax({
            url: baseUrl + '/CadastroUsuario/CarregarDadosIniciais',
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

    CarregarUsuarios();
    CarregarDadosIniciais();
});