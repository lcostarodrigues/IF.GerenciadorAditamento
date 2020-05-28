var baseUrl = $("#BaseURL").val();


var checkAll = false;

$(document).ready(function () {




//var consorcioCadastroPermissao = {
//    Id: 0,
//    Nome: "",
//    FlPreAnalise: false,
//    FlAnalise: false,
//    FlPedidoBem: false,
//    FlAlienarManual: false,
//    FlConsFaturamento: false,
//    FlCheckListSupEspecializado: false,
//    FlReanalisePreAnalise: false,
//    FlReanaliseAnalise: false,
//    FlReanaliseAlienarManual: false,
//    FlPedidoBemChecklist: false,
//    FlRevisarMolicar: false,
//    UsuarioRede: "",
//    IdGrupo: 0
//    };

    function DataTableDemandaControlePermissoes() {

        //var mes = $('select[id=mes]').val() == null ? mesAtual : $('select[id=mes]').val();

        // var ano = $('select[id=ano]').val() == null ? anoAtual : $('select[id=ano]').val();


        $.ajax({
            url: baseUrl + '/ControlePermissoes/RetornoControlePermissoes',
            data: JSON.stringify({}),                //JSON.stringify({ 'mes': mes, 'ano': ano }),
            headers: {
                'RequestVerificationToken': $('#antiForgeryToken').val(),
                'X-Requested-With': 'XMLHttpRequest'
            },
            type: "POST",
            dataType: 'json',
            contentType: 'application/json',
            cache: false,
            success: function (dados) {
                var chart;

                var dataSet = [];
                var data = [];
                for (var i = 0; i < dados.length; i++) {

                    data = [
                        dados[i].Nome,
                        dados[i].UsuarioRede,
                        dados[i].Acesso,
                        1,
                        dados[i].FlPreAnalise,
                        dados[i].FlAnalise,
                        dados[i].FlPedidoBem,
                        dados[i].FlAlienarManual,
                        dados[i].FlConsFaturamento,
                        dados[i].FlCheckListSupEspecializado,
                        dados[i].FlReanalisePreAnalise,
                        dados[i].FlReanaliseAnalise,
                        dados[i].FlReanaliseAlienarManual,
                        dados[i].FlPedidoBemChecklist,
                        dados[i].FlRevisarMolicar,
                        dados[i].Id
                    ]


                    dataSet.push(data);
                }
                $(document).ready(function () {

                    $("#tbControlePermissoes").html("");
                    var table = $('#tbControlePermissoes').DataTable({
                        data: dataSet,
                        "aoColumnDefs": [
                            {
                                "aTargets": [3],
                                //"mData": "download_link",
                                "mRender": function (data, type, full) {

                                        return '<input class="check-all-active" type=\"checkbox\" >';

                                    }
                                
                            },
                            {
                                "aTargets": [4],
                                //"mData": "download_link",
                                "mRender": function (data, type, full) {
                                    

                                    if (data == true) {
                                        
                                        return '<input type=\"checkbox\" checked value="' + true + '">';
                                        
                                    } else {
                                        
                                        return '<input type=\"checkbox\" value="' + false + '">';
                                        
                                    }
                                }
                            },
                            {
                                "aTargets": [5],
                                //"mData": "download_link",
                                "mRender": function (data, type, full) {
                                    if (data == true) {
                                        return '<input type=\"checkbox\" checked value="' + true + '">';
                                    } else {
                                        return '<input type=\"checkbox\" value="' + false + '">';
                                    }
                                }
                            },
                            {
                                "aTargets": [6],
                                //"mData": "download_link",
                                "mRender": function (data, type, full) {
                                    if (data == true) {
                                        return '<input type=\"checkbox\" checked value="' + true + '">';
                                    } else {
                                        return '<input type=\"checkbox\" value="' + false + '">';
                                    }
                                }
                            },
                            {
                                "aTargets": [7],
                                //"mData": "download_link",
                                "mRender": function (data, type, full) {
                                    if (data == true) {
                                        return '<input type=\"checkbox\" checked value="' + true + '">';
                                    } else {
                                        return '<input type=\"checkbox\" value="' + false + '">';
                                    }
                                }
                            },
                            {
                                "aTargets": [8],
                                //"mData": "download_link",
                                "mRender": function (data, type, full) {
                                    if (data == true) {
                                        return '<input type=\"checkbox\" checked value="' + true + '">';
                                    } else {
                                        return '<input type=\"checkbox\" value="' + false + '">';
                                    }
                                }
                            },
                            {
                                "aTargets": [9],
                                //"mData": "download_link",
                                "mRender": function (data, type, full) {
                                    if (data == true) {
                                        return '<input type=\"checkbox\" checked value="' + true + '">';
                                    } else {
                                        return '<input type=\"checkbox\" value="' + false + '">';
                                    }
                                }
                            },
                            {
                                "aTargets": [10],
                                //"mData": "download_link",
                                "mRender": function (data, type, full) {
                                    if (data == true) {
                                        return '<input type=\"checkbox\" checked value="' + true + '">';
                                    } else {
                                        return '<input type=\"checkbox\" value="' + false + '">';
                                    }
                                }
                            },
                            {
                                "aTargets": [11],
                                //"mData": "download_link",
                                "mRender": function (data, type, full) {
                                    if (data == true) {
                                        return '<input type=\"checkbox\" checked value="' + true + '">';
                                    } else {
                                        return '<input type=\"checkbox\" value="' + false + '">';
                                    }
                                }
                            },
                            {
                                "aTargets": [12],
                                //"mData": "download_link",
                                "mRender": function (data, type, full) {
                                    if (data == true) {
                                        return '<input type=\"checkbox\" checked value="' + true + '">';
                                    } else {
                                        return '<input type=\"checkbox\" value="' + false + '">';
                                    }
                                }
                            },
                            {
                                "aTargets": [13],
                                //"mData": "download_link",
                                "mRender": function (data, type, full) {
                                    if (data == true) {
                                        return '<input type=\"checkbox\" checked value="' + true + '">';
                                    } else {
                                        return '<input type=\"checkbox\" value="' + false + '">';
                                    }
                                }
                            },
                            {
                                "aTargets": [14],
                                //"mData": "download_link",
                                "mRender": function (data, type, full) {
                                    
                                    if (data == true) {
                                        return '<input class"editor-active" type=\"checkbox\" checked value="' + true + '">';
                                    } else {
                                        return '<input class"editor-active" type=\"checkbox\" value="' + false + '">';
                                    }
                                }
                            },

                        ],
                        columns: [
                            { title: "Colaborador" },
                            { title: "Usuário Rede" },
                            { title: "Acesso" },
                            { title: "Marcar Todas" },
                            { title: "Pré-Análise" },
                            { title: "Análise" },
                            { title: "Pedido do Bem" },
                            { title: "Alienar Manual" },
                            { title: "Cons. Faturamento" },
                            { title: "Check List Sup. Especialização" },
                            { title: "Reanálise Pré-Análise" },
                            { title: "Reanálise de Análise" },
                            { title: "Reanálise Alienar Manual" },
                            { title: "Reanálise Pedido de Bem Check List" },
                            { title: "Revisar Molicar" },


                        ],
                        rowCallback: function (row, data) {
                            // Set the checked state of the checkbox in the table


                            
                        },
                        "bDestroy": true,
                        deferRender: true,
                        scroller: true,
                        "scrollX": true,
                        bSort: false,
                        "bPaginate": false,
                        "scrollCollapse": true,
                        "scrollY": "400px",
                        "order": [[1, "asc"]],
                        "createdRow": function (row, data, index) {

                            $($(row).children()[3]).on("click", function (e) {


                                if ($($(row).children()[3]).find('input[class=check-all-active]').is(":checked")) {
                                    var data = table.row($(this).parents('tr')).data();

                                    if (data[4] != true) {
                                        $($(row).children()[4]).find('input').click();
                                    }
                                    if (data[5] != true) {
                                        $($(row).children()[5]).find('input').click();
                                    }

                                    if (data[6] != true) {
                                        $($(row).children()[6]).find('input').click();
                                    }


                                    if (data[7] != true) {
                                        $($(row).children()[7]).find('input').click();
                                    }

                                    if (data[8] != true) {
                                        $($(row).children()[8]).find('input').click();
                                    }

                                    if (data[9] != true) {
                                        $($(row).children()[9]).find('input').click();
                                    }

                                    if (data[10] != true) {
                                        $($(row).children()[10]).find('input').click();
                                    }

                                    if (data[11] != true) {
                                        $($(row).children()[11]).find('input').click();
                                    }

                                    if (data[12] != true) {
                                        $($(row).children()[12]).find('input').click();
                                    }

                                    if (data[13] != true) {
                                        $($(row).children()[13]).find('input').click();
                                    }

                                    if (data[14] != true) {
                                        $($(row).children()[14]).find('input').click();
                                    }


                                }
                                else {

                                    var data = table.row($(this).parents('tr')).data();

                                    

                                    if (data[4] == true) {
                                        $($(row).children()[4]).find('input').click();
                                    }

                                    if (data[5] == true) {
                                        $($(row).children()[5]).find('input').click();
                                    }

                                    if (data[6] == true) {
                                        $($(row).children()[6]).find('input').click();
                                    }

                                    if (data[7] == true) {
                                        $($(row).children()[7]).find('input').click();
                                    }

                                    if (data[8] == true) {
                                        $($(row).children()[8]).find('input').click();
                                    }

                                    if (data[9] == true) {
                                        $($(row).children()[9]).find('input').click();
                                    }

                                    if (data[10] == true) {
                                        $($(row).children()[10]).find('input').click();
                                    }

                                    if (data[11] == true) {
                                        $($(row).children()[11]).find('input').click();
                                    }

                                    if (data[12] == true) {
                                        $($(row).children()[12]).find('input').click();
                                    }

                                    if (data[13] == true) {
                                        $($(row).children()[13]).find('input').click();
                                    }

                                    if (data[14] == true) {
                                        $($(row).children()[14]).find('input').click();
                                    }

                                }
                                

                            })

                            $($(row).children()[4]).on("change", function (e) {


                                var data = table.row($(this).parents('tr')).data();

                                if (data[4] == true) {
                                    data[4] = false;
                                } else {
                                    data[4] = true; 
                                }


                            })

                            $($(row).children()[5]).on("change", function (e) {


                                var data = table.row($(this).parents('tr')).data();

                                if (data[5] == true) {
                                    data[5] = false;
                                } else {
                                    data[5] = true;
                                }


                            })


                            $($(row).children()[6]).on("change", function (e) {

                                var data = table.row($(this).parents('tr')).data();

                                if (data[6] == true) {
                                    data[6] = false;
                                } else {
                                    data[6] = true;
                                }

                            })

                            $($(row).children()[7]).on("change", function (e) {
                                
                                var data = table.row($(this).parents('tr')).data();
                                if (data[7] == true) {
                                    data[7] = false;
                                } else {
                                    data[7] = true;
                                }

                            })


                            $($(row).children()[8]).on("change", function (e) {



                                var data = table.row($(this).parents('tr')).data();

                                if (data[8] == true) {
                                    data[8] = false;
                                } else {
                                    data[8] = true;
                                }



                            })


                            $($(row).children()[9]).on("change", function (e) {




                                var data = table.row($(this).parents('tr')).data();

                                if (data[9] == true) {
                                    data[9] = false;
                                } else {
                                    data[9] = true;
                                }



                            })


                            $($(row).children()[10]).on("change", function (e) {




                                var data = table.row($(this).parents('tr')).data();

                                if (data[10] == true) {
                                    data[10] = false;
                                } else {
                                    data[10] = true;
                                }


                            })


                            $($(row).children()[11]).on("change", function (e) {




                                var data = table.row($(this).parents('tr')).data();

                                if (data[11] == true) {
                                    data[11] = false;
                                } else {
                                    data[11] = true;
                                }


                            })



                            $($(row).children()[12]).on("change", function (e) {



                                var data = table.row($(this).parents('tr')).data();

                                if (data[12] == true) {
                                    data[12] = false;
                                } else {
                                    data[12] = true;
                                }



                            })


                            $($(row).children()[13]).on("change", function (e) {



                                var data = table.row($(this).parents('tr')).data();

                                if (data[13] == true) {
                                    data[13] = false;
                                } else {
                                    data[13] = true;
                                }


                            })


                            $($(row).children()[14]).on("change", function (e) {


                                var data = table.row($(this).parents('tr')).data();

                                if (data[14] == true) {
                                    data[14] = false;
                                } else {
                                    data[14] = true;
                                }



                            })
                        }

                    });

   
                    $(document).on('change', 'input[type="checkbox"]', function (e) {

                        if ($(this).is(":checked")) {
                            $(this).attr('checked', true)
                            $(this).val(true);
                        }
                        else {

                            $(this).attr('checked', false)
                            $(this).val(false);
                        }


                    });


                    //$('#filtroOperador').on('keyup', function () {
                    //    table
                    //        .columns(9)
                    //        .search(this.value)
                    //        .draw();
                    //});
                    $("#btnSalvar").click(function () {


                    var listConsorcioCadastroPermissao = [];

                    var retorno = table.rows().data();

                        for (var i = 0; i < retorno.length; i++) {


                            var consorcioCadastroPermissao = {
                                UsuarioRede: retorno[i][1],
                                FlPreAnalise: retorno[i][4],
                                FlAnalise: retorno[i][5],
                                FlPedidoBem: retorno[i][6],
                                FlAlienarManual: retorno[i][7],
                                FlConsFaturamento: retorno[i][8],
                                FlCheckListSupEspecializado: retorno[i][9],
                                FlReanalisePreAnalise: retorno[i][10],
                                FlReanaliseAnalise: retorno[i][11],
                                FlReanaliseAlienarManual: retorno[i][12],
                                FlPedidoBemChecklist: retorno[i][13],
                                FlRevisarMolicar: retorno[i][14],
                                
                            };

                        //consorcioCadastroPermissao.UsuarioRede = retorno[i][1];
                        //consorcioCadastroPermissao.FlPreAnalise = retorno[i][4];
                        //consorcioCadastroPermissao.FlAnalise = retorno[i][5];
                        //consorcioCadastroPermissao.FlPedidoBem = retorno[i][6];
                        //consorcioCadastroPermissao.FlAlienarManual = retorno[i][7];
                        //consorcioCadastroPermissao.FlConsFaturamento = retorno[i][8];
                        //consorcioCadastroPermissao.FlCheckListSupEspecializado = retorno[i][9];
                        //consorcioCadastroPermissao.FlReanalisePreAnalise = retorno[i][10];
                        //consorcioCadastroPermissao.FlReanaliseAnalise = retorno[i][11];
                        //consorcioCadastroPermissao.FlReanaliseAlienarManual = retorno[i][12];
                        //consorcioCadastroPermissao.FlPedidoBemChecklist = retorno[i][13];
                        //consorcioCadastroPermissao.FlRevisarMolicar = retorno[i][14];
                       
                        listConsorcioCadastroPermissao.push(consorcioCadastroPermissao);

                        }

                        SalvarPermissoes(listConsorcioCadastroPermissao);

                    });

                });
            },
            error: function (xhr, textStatus, errorThrown) {
                //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
            }
        });
    }



    function SalvarPermissoes(listConsorcioCadastroPermissao) {

        //var mes = $('select[id=mes]').val() == null ? mesAtual : $('select[id=mes]').val();

        // var ano = $('select[id=ano]').val() == null ? anoAtual : $('select[id=ano]').val();


        $.ajax({
            url: baseUrl + '/ControlePermissoes/SalvarPermissoes',
            data: JSON.stringify({ 'listConsorcioCadastroPermissao': listConsorcioCadastroPermissao }),                //JSON.stringify({ 'mes': mes, 'ano': ano }),
            headers: {
                'RequestVerificationToken': $('#antiForgeryToken').val(),
                'X-Requested-With': 'XMLHttpRequest'
            },
            type: "POST",
            dataType: 'json',
            contentType: 'application/json',
            cache: false,
            success: function (dados) {
                //DataTableDemandaControlePermissoes();
                BMG.ShowAlert("Controle de Permissões", "Permissão liberada com sucesso.");
            },
            error: function (xhr, textStatus, errorThrown) {
                //TratarErro(xhr, textStatus, errorThrown, "Erro ao gravar o produto.");
            }
        });
    }

    DataTableDemandaControlePermissoes();
});

