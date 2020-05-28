
function MontaMenu(dados, baseUrl) {

    dados.forEach(function (item, index) {

        var menu = "";

        if (item.Submenu.length > 0) {

            menu = '<li role="presentation" class="dropdown">' +
                '<a class="dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">' +
                '<i class="fa fa-2x icon-wallet"></i> ' + item.Descricao + '<span class="caret"></span>' +
                '</a>' +
                '<ul class="dropdown-menu">';

            item.Submenu.forEach(function (submenu, index) {
                menu = menu + '<li><a href="' + baseUrl + submenu.Rota + '"> ' + submenu.Descricao + '</a></li>';
            });

            menu = menu + '</ul></li>';
        }
        else {
            menu = '<li><a href="' + baseUrl + item.Rota + '"><i class="fa fa-2x icon-screen-desktop"></i> ' + item.Descricao + '</a></li>';
        }

        $("#active").append(menu);
    });

};

$(document).ready(function () {


    $("#frmAlterarSenha").submit(function () {

        if ($("#txtConfirmarSenha").val() === $("#txtNovaSenha").val())
        {
            BMG.ShowConfirm("Alterar Senha", "Confirmar alteração de senha", function () {
                AlterarSenha();
            });
        }
        else
        {
            BMG.ShowAlert("Alerta", "As senhas não combinam.");
        }
    });

    $("#btnEncerrarJornada").click(function () {
        BMG.ShowConfirm("Encerrar Jornada", "Deseja realmente encerrar a jornada ?", function () {
            EncerrarJornada();
        });
    });

    var baseUrl = $("#BaseURL").val();

    $.ajax({
        url: baseUrl + '/Menu/RetornaMenuPerfil',
        data: {},
        type: "POST",
        cache: false,
        success: function (dados) {
            MontaMenu(dados, baseUrl);
        },
        error: function (data, status, headers, config) {
            alert(headers.message);
        }
    });


    function EncerrarJornada() {
       

            $.ajax({
                url: baseUrl + '/Login/EncerrarJornada',
                data: JSON.stringify({}),
                type: "POST",
                dataType: 'json',
                contentType: 'application/json',
                cache: false,
                success: function (dados) {
                    BMG.ShowAlert("Jornada", "Jornada encerrada com sucesso.");
                },
                error: function (xhr, textStatus, errorThrown) {
                    TratarErro(xhr, textStatus, errorThrown, "Erro ao encerrar a jornada.");
                }
            });
     
    }


    function AlterarSenha() {
        $.ajax({
            url: baseUrl + '/Usuario/AlterarSenha',
            data: JSON.stringify({ 'novaSenha': $("#txtNovaSenha").val() }),
            headers: {
                'RequestVerificationToken': $('#antiForgeryToken').val(),
                'X-Requested-With': 'XMLHttpRequest'
            },
            type: "POST",
            dataType: 'json',
            contentType: 'application/json',
            cache: false,
            success: function (dados) {
                BMG.ShowAlert("Senha", "Senha alterada com sucesso.");

                //$("#txtSenhaAtual").val("");

                $("#modalAlterarSenha").modal('toggle');
                $("#txtNovaSenha").val("");
                $("#txtConfirmarSenha").val("");
            },
            error: function (xhr, textStatus, errorThrown) {
                TratarErro(xhr, textStatus, errorThrown, "Erro ao alterar a senha.");
            }
        });
    }
});

