$(document).ready(function () {

    var baseUrl = $("#BaseURL").val();

    $("#salvarId").click(function () {
        Salvar();
    });

    var listGrupoObjetoBase;
    var listObjeto;

    var Retangulo = class Retangulo {
        constructor(altura, largura) {
            this.altura = altura;
            this.largura = largura;
        }
    };
    var grupoObjeto = class grupoObjeto {
        constructor(grupoID, objetoID) {
            this.GrupoID = grupoID;
            this.ObjetoID = objetoID;
        }
    };

    function Salvar() {
        var listGrupoObjetoNovo = [];
        $("input:checkbox").each(function (index) {
            if ($(this)[0].checked) {
                var item = new grupoObjeto();
                item.GrupoID = $("#idGrupo").val();
                item.ObjetoID = $(this)[0].id;

                listGrupoObjetoNovo.push(item);
            }
        });

        if (listGrupoObjetoNovo.length > 0)
            $.ajax({
                url: baseUrl + '/PerfilTela/Salvar',
                data: JSON.stringify({ 'listGrupoObjeto': listGrupoObjetoNovo }),
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
                        CarregarDadosIniciais();
                        BMG.ShowAlert("Notificação", "Perfil por tela salvo com sucesso.");
                    }
                },
                error: function (xhr, textStatus, errorThrown) {
                    TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o perfil por tela.");
                }
            });
        else
            BMG.ShowAlert("Alerta", "Campo Etapa não selecionado. Verifique.");
    }

    function CarregarDadosIniciais() {
        $.ajax({
            url: baseUrl + '/PerfilTela/CarregarDadosIniciais',
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
                if ($("#idGrupo").find('option').length <= 0) {
                    var comboGrupo = document.getElementById("idGrupo");
                    for (var i = 0; i < dados.listGrupo.length; i++) {
                        var opt = document.createElement("option");
                        opt.value = dados.listGrupo[i].GrupoID;
                        opt.text = dados.listGrupo[i].Descricao;
                        comboGrupo.add(opt, comboGrupo.options[0]);
                    }
                }

                listGrupoObjetoBase = dados.listGrupoObjeto;
                listObjeto = dados.listObjeto;

                if ($('#dtPerfilTela').find('tr').length <= 1) {
                    CarregarPerfilTela();
                }

                PreencherPerfilTela();

                $("#idGrupo").change(function () {
                    PreencherPerfilTela();
                });
            },
            error: function (xhr, textStatus, errorThrown) {
                TratarErro(xhr, textStatus, errorThrown, "Erro ao carregar o perfil por tela.");
            }
        });
    }

    function CarregarPerfilTela() {
        var tableRef = document.getElementById('dtPerfilTela').getElementsByTagName('tbody')[0];
        for (var i = 0; i < listObjeto.length; i++) {
            var newRow = tableRef.insertRow(tableRef.rows.length);

            var newCell = newRow.insertCell(0);
            var newText = document.createTextNode(listObjeto[i].Descricao);
            newCell.appendChild(newText);

            var newCellCheckbox = newRow.insertCell(1);
            var inputCheckbox = document.createElement('input');
            inputCheckbox.type = "checkbox";
            inputCheckbox.id = listObjeto[i].ObjetoID;
            newCellCheckbox.appendChild(inputCheckbox);
        }
    }

    function PreencherPerfilTela() {
        $("input:checkbox").each(function (index) {
            $(this)[0].checked = false;
        });
        for (var i = 0; i < listGrupoObjetoBase.length; i++) {
            if (listGrupoObjetoBase[i].GrupoID == $("#idGrupo").val()) {
                $('#' + listGrupoObjetoBase[i].ObjetoID)[0].checked = true
            }
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

    CarregarDadosIniciais();
});