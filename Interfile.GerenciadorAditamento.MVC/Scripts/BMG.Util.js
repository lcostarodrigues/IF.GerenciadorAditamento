/// <reference path="jquery-2.1.4.js" />
/// <reference path="jquery-ui-1.11.4.js" />
/// <reference path="bootstrap.js" />

BMG = {};

BMG.BloquearTela = function () {
    $.blockUI({
        css: {
            border: 'none',
            padding: '15px',
            backgroundColor: '#000',
            '-webkit-border-radius': '10px',
            '-moz-border-radius': '10px',
            opacity: .5,
            color: '#fff'
        },
        message: "Por favor, aguarde..."
    });
}

BMG.DesbloquearTela = function () {
    $.unblockUI();
}

/*
# Método static para formatar a chamada das actions #
*/
BMG.FormatAction = function (s) {
    var href = window.location.href.substring(
        window.location.protocol.length + 2
        + window.location.hostname.length + 1).replace(
            window.location.port
            , "").split("/");

    if (s.indexOf(href[0]) == -1)
        return ("/" + href[0] + s);
    else
        return s;
}

/*
# Formata um número para moeda. #
*/
BMG.FormatReal = function (num) {
    x = 0;

    if (num < 0) {
        num = Math.abs(num);
        x = 1;
    }

    if (isNaN(num))
        num = "0";

    cents = Math.floor((num * 100 + 0.5) % 100);
    num = Math.floor((num * 100 + 0.5) / 100).toString();

    if (cents < 10) cents = "0" + cents;

    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
        num = num.substring(0, num.length - (4 * i + 3)) + '.'
            + num.substring(num.length - (4 * i + 3));

    ret = num + ',' + cents;

    if (x == 1) ret = ' - ' + ret; return ret;
}

/*
# Exibe mensagem ao usuário e da duas opões de ação SIM ou NÃO. #
*/
BMG.ShowConfirm = function (_title, message, funcYes) {
    BMG.ShowConfirm.Action = funcYes;

    var _ac = (typeof (funcYes) == "function") ? "onclick='BMG.ShowConfirm.Action()'" : "";

    $("<div class='modal fade'>"
        + "<div class='modal-dialog  modal-sm'>"
        + "<div class='modal-content'>"
        + "<div class='modal-header'>"
        + "<button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>"
        + "<h4 class='modal-title'>" + _title + "</h4>"
        + "</div>"
        + "<div class='modal-body'>"
        + "<label>" + message + "</label>"
        + "</div>"
        + "<div class='modal-footer'>"
        + "<div class='row' id='btns'>"
        + "<div class='col-md-2'>"
        + "</div>"
        + "<div class='col-md-4'>"
        + "<button class='btn btn-warning' data-dismiss='modal'>Não</button>"
        + "</div>"
        + "<div class='col-md-4'>"
        + "<button class='btn btn-warning' data-dismiss='modal' " + _ac + ">Sim</button>"
        + "</div>"
        + "</div>"
        + "</div>"
        + "</div>"
        + "</div>"
        + "</div>").modal("show");
}

BMG.ShowConfirm.Action = null;

/*
# Exibe mensagem informativa ao usuário. #
*/
BMG.ShowAlert = function (_title, message, funcOk) {
    BMG.ShowAlert.Action = funcOk;

    var _ac = (typeof (funcOk) == "function") ? "onclick='BMG.ShowAlert.Action()'" : "";

    $("<div class='modal fade'>"
        + "<div class='modal-dialog modal-sm'>"
        + "<div class='modal-content'>"
        + "<div class='modal-header'>"
        + "<button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>"
        + "<h4 class='modal-title'>" + _title + "</h4>"
        + "</div>"
        + "<div class='modal-body'>"
        + "<label>" + message + "</label>"
        + "</div>"
        + "<div class='modal-footer'>"
        + "<button type='button' class='btn btn-warning' data-dismiss='modal' " + _ac + ">Fechar</button>"
        + "</div>"
        + "</div>"
        + "</div>"
        + "</div>").on("hidden.bs.modal", function (e) {
            if (typeof (funcOk) == 'function')
                funcOk(e);
        }).modal("show");
}

/*
# Exibe um popup com o conteúdo HTML informado. #
*/
BMG.ShowPopup = function (_title, _body, onClose) {
    $("<div class='modal fade'>"
        + "<div class='modal-dialog-popup'>"
        + "<div class='modal-content-popup'>"
        + "<div class='modal-header-popup'>"
        + "<button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>"
        + "<h4 class='modal-title-popup'>" + _title + "</h4>"
        + "</div>"
        + "<div class='modal-body-popup'>"
        + _body
        + "</div>"
        + "<div class='modal-footer-popup'>"
        + "<button type='button' class='btn btn-default' data-dismiss='modal'>Fechar</button>"
        + "</div>"
        + "</div>"
        + "</div>"
        + "</div>").on("hidden.bs.modal", function (e) {
            if (typeof (onClose) === 'function')
                onClose(e);
        }).modal("show");
}

/*
 #Mensagens notify. #
*/

//configuração
var notifySettings = function (type) {
    return {
        type: type,
        offset: {
            x: 40,
            y: 145
        },
        timer: 1500
    }
}

BMG.notifySettings = function (type) {
    notifySettings(type);
}
/*
 #Notify Sucesso. #
*/
BMG.NotifySuccess = function (title, Message, icon) {

    $.notify({
        icon: 'glyphicon glyphicon-ok',
        title: "<strong> " + title + ":</strong>",
        message: Message
    }, notifySettings('success'));
}
/*
 #Notify Erro. #
*/
BMG.NotifyError = function (title, Message, icon) {
    $.notify({
        icon: 'glyphicon-exclamation-sign',
        title: "<strong>" + title + "</strong>",
        message: Message,
        offset: 150,
    }, notifySettings("danger"));
}
/*
 #Notify Alerta. #
*/
BMG.NotifyWarning = function (title, Message, icon) {
    $.notify({
        icon: 'glyphicon glyphicon-warning-sign',
        title: "<strong>" + title + "</strong>",
        message: Message,
        offset: 150,
    }, notifySettings("warning"));
}


/*
# Método static para comunicação do cliente com o servidor via ajax #
*/
BMG.ServerAction = {
    _queue: [],
    addQueue: function (context
        , urlAction
        , type
        , dataType
        , contentType
        , timeout
        , dataValue
        , funBeforeSend
        , funComplete
        , funError
        , callBackFuction
        , optArgs) {
        this._queue.push(arguments);
    },
    processData: true,
    ShiftQueue: function () {
        BMG.ServerAction._queue.shift();
    },
    ValidateAccess: function (data) {
        if (data.LoginExpired) {
            BMG.ShowAlert("Acesso Expirado.", "O seu tempo de acesso terminou. Faça login novamente.", function () {
                location.href = BMG.FormatAction("/" + data.Controller + "/" + data.Action + "/");
            });

            return false;
        }

        return true;
    },
    send: function () {
        if (BMG.ServerAction._queue.length > 0) {
            var current = BMG.ServerAction._queue[0];
            var _args = [];

            for (var i = 11; i < current.length; i++)
                _args.push(current[i]);

            $.ajax({
                url: current[1],
                type: current[2],
                dataType: current[3],
                contentType: current[4],
                timeout: current[5],
                processData: BMG.ServerAction.processData,
                global: true,
                cache: false,
                async: true,
                data: current[6],
                beforeSend: function () {
                    if (typeof (current[7]) === 'function')
                        current[7].apply(current, _args);
                },
                complete: function (jqXHR, textStatus) {
                    if (typeof (current[8]) === 'function') {
                        for (var i = 0; i < arguments.length; i++)
                            _args.push(arguments[i]);

                        current[8].apply(current[0], _args);
                    }
                },
                success: function (data) {
                    if (BMG.ServerAction.ValidateAccess(data) && typeof (current[10]) === 'function') {
                        _args.push(data);

                        current[10].apply(current[0], _args);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    if (errorThrown != "LoginExpired"
                        && errorThrown != null
                        && errorThrown != ''
                        && typeof (current[9]) === 'function') {
                        for (var i = 0; i < arguments.length; i++)
                            _args.push(arguments[i]);

                        current[9].apply(current[0], _args);
                    }
                }
            });
        }
    }
}

BMG.TratarErro = function (xhr, textStatus, errorThrown, msg) {
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

BMG.FormataCampo = function (campo, Mascara) {

    var boleanoMascara;

    exp = /\-|\.|\/|\(|\)| /g;
    campoSoNumeros = campo.toString().replace(exp, "");

    var posicaoCampo = 0;
    var NovoValorCampo = "";
    var TamanhoMascara = campoSoNumeros.length;;

    for (i = 0; i <= TamanhoMascara; i++) {
        boleanoMascara = ((Mascara.charAt(i) == "-") || (Mascara.charAt(i) == ".")
            || (Mascara.charAt(i) == "/"))
        boleanoMascara = boleanoMascara || ((Mascara.charAt(i) == "(")
            || (Mascara.charAt(i) == ")") || (Mascara.charAt(i) == " "))
        if (boleanoMascara) {
            NovoValorCampo += Mascara.charAt(i);
            TamanhoMascara++;
        } else {
            NovoValorCampo += campoSoNumeros.charAt(posicaoCampo);
            posicaoCampo++;
        }
    }

    return NovoValorCampo;
}

BMG.ConverteDataJson = function (dataJson) {

    var data = new Date(parseInt(dataJson.substr(6)));

    var dia = data.getDate().toString().length > 1 ? data.getDate() : "0" + data.getDate();
    var mes = (data.getMonth() + 1).toString().length > 1 ? data.getMonth() + 1 : "0" + (data.getMonth() + 1);
    var ano = data.getFullYear();

    return dia + "/" + mes + "/" + ano;
}

BMG.ConverteDataHoraJson = function (dataJson) {

    var data = new Date(parseInt(dataJson.substr(6)));

    var dia = data.getDate().toString().length > 1 ? data.getDate() : "0" + data.getDate();
    var mes = (data.getMonth() + 1).length > 1 ? data.getMonth() + 1 : "0" + (data.getMonth() + 1);
    var ano = data.getFullYear();
    var hora = data.getHours().toString().length > 1 ? data.getHours() : "0" + data.getHours();
    var minuto = data.getMinutes().toString().length > 1 ? data.getMinutes() : "0" + data.getMinutes();
    var segundos = data.getSeconds().toString().length > 1 ? data.getSeconds() : "0" + data.getSeconds();

    return dia + "/" + mes + "/" + ano + " " + hora + ":" + minuto + ":" + segundos;
}

BMG.RetornaDataAtual = function () {

    var data = new Date();

    var dia = data.getDate().toString().length > 1 ? data.getDate() : "0" + data.getDate();
    var mes = (data.getMonth() + 1).length > 1 ? data.getMonth() + 1 : "0" + (data.getMonth() + 1);
    var ano = data.getFullYear();

    return dia + "/" + mes + "/" + ano;
}

BMG.ConverteParaNumero = function (valor) {

    return parseFloat(valor.replace(/[^0-9,]/g, '').replace(',', '.'));
}

BMG.FormataFloatValorMonetario = function (valor) {

    return "R$ " + valor.toFixed(2).toString().replace(".", ",").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}

$(document)
    .ajaxStart(function () {
        $("#loading").show();
    })
    .ajaxStop(function () {
        $("#loading").hide();
    });