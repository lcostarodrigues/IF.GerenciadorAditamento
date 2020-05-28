$(document).ready(function () {

    var baseUrl = $("#BaseURL").val();

    $("#logarId").click(function () {
        Logar();
    });

    $('#login').on("keypress", function (e) {
        if (e.keyCode == 13) {
            Logar();
            return false;
        }
    });

    $('#password').on("keypress", function (e) {
        if (e.keyCode == 13) {
            Logar();
            return false;
        }
    });

    function Logar() {
        if (Validar()) {

            $.ajax({
                url: baseUrl + '/Login/Validate',
                data: JSON.stringify({ 'login': $("#login").val(), 'password': $("#password").val() }),
                type: "POST",
                dataType: 'json',
                contentType: 'application/json',
                cache: false,
                success: function (dados) {
                    if (dados.mensagem != undefined && dados.mensagem != "")
                        BMG.ShowAlert("Notificação", "O usuário ou senha informado é inválido.");
                        //alert("Notificação", "O usuário ou senha informado é inválido.");
                    else
                        window.location.href = baseUrl + dados.redirectUrl;
                },
                error: function (xhr, textStatus, errorThrown) {
                    TratarErro(xhr, textStatus, errorThrown, "Erro ao realizar o login.");
                }
            });
        }
    }

    function Validar() {
        if ($("#login").val() == ""
            || $("#password").val() == "") {
            BMG.ShowAlert("Aviso", "Preencha os campos corretamente.");
            return false;
        }
        return true;
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
});