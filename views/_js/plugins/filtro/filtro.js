

function removeFiltro(id){

    $("#filtro"+id).remove();
    $("#inboxContent"+id).remove();

    var qtdFiltro = $("#qtdFiltro").val();

    var removeBtnLimpaFiltros = true;

    for(var i = 2; i < qtdFiltro; i++){

        if($("#removeFiltro"+i).length){
            removeBtnLimpaFiltros = false;
        }

    }

    if(removeBtnLimpaFiltros)
        $("#btnLimparFiltros").hide();

}

function SomenteNumero(e){

     var tecla=(window.event)?event.keyCode:e.which;

     if((tecla>47 && tecla<58)) 
        return true;
     else{
        if (tecla==8 || tecla==0) 
            return true;
        else  
            return false;
     }

}

function carregaFiltros(){

    var urlIcon = "";
    var htmlCampo = "";
    var htmlOperadores = "";
    var fkSelecionado = "";
    var tipoSelecionado = "";
    var dadoSelecionado = "";

    var campos = $("#campos").val();
    var jsonCampos = JSON.parse(campos);
    var qtdCampos = jsonCampos.campos.length;

    for(var i = 0; i < qtdCampos; i++){

        var select = jsonCampos.campos[i].select;
        var descricao = jsonCampos.campos[i].descricao;
        var dado = jsonCampos.campos[i].dado;
        var tipo = jsonCampos.campos[i].tipo;
        var valor = jsonCampos.campos[i].valor;
        var fk = jsonCampos.campos[i].fk;
        var sql = jsonCampos.campos[i].sql;
        var valorEnum = "";

        if(tipo == "enum"){
            
            urlIcon = "enum.png";

            var qtdValorEnum = valor.length;
            valorEnum = "|";
            for(var k = 0; k < qtdValorEnum; k++){
                if(k == 0)
                    valorEnum += valor[k];
                else
                    valorEnum += "-"+valor[k];
            }

        }else if(tipo == "varchar"){

            urlIcon = "varchar.png";

        }else if(tipo == "int"){

            urlIcon = "int.png";
            
        }else if(tipo == "date"){

            urlIcon = "date.png";
            
        }


        if(i == 0){

            htmlCampo += "<option value=\'"+dado+"|"+tipo+""+valorEnum+"|"+select+"|"+sql+"\' >"+descricao+"</option>";
            tipoSelecionado = tipo;
            fkSelecionado = fk;

        }else{

            htmlCampo += "<option value=\'"+dado+"|"+tipo+""+valorEnum+"|"+select+"|"+sql+"\' >"+descricao+"</option>";

        }

    }

    $("#cbCampos1").html(htmlCampo);


    var operadoresTipo = $("#operadoresTipo").val();
    var jsonOperadoresTipo = JSON.parse(operadoresTipo);
    var qtdOperadores = jsonOperadoresTipo[tipoSelecionado].length;

    for(var j = 0; j < qtdOperadores; j++){

        var sinal = jsonOperadoresTipo[tipoSelecionado][j].sinal;
        var descricao = jsonOperadoresTipo[tipoSelecionado][j].descricao;
        var input = jsonOperadoresTipo[tipoSelecionado][j].input;

        htmlOperadores += "<option value=\'"+sinal+"|"+input+"\' >"+descricao+"</option>";

    }

    if(tipoSelecionado == "enum"){

        var campoSelecionado = $("#cbCampos1").val();
        arrayCampoSelecionado = campoSelecionado.split("|");

        var valorEnum = arrayCampoSelecionado[2];

        if(valorEnum.length > 0){

            var arrayValorEnum = valorEnum.split("-");

            var htmlValor = "<select name=\'valorFiltro[]\' id=\'valorFiltro1\' class=\'form-control\' style=\'margin-bottom: 0px !important; width: 200px;\' >";
            
            for(var j = 0; j < arrayValorEnum.length; j++ ){

                htmlValor += "<option value=\'"+arrayValorEnum[j]+"\' >"+arrayValorEnum[j]+"</option>";

            }

            htmlValor += "</select>";

        }else{

            $.ajax({
              type : "POST",
              url : "http://medcel.raizessolucoes.com.br/filtro/fk",
              data : {"sql" : fkSelecionado
                     ,"id" : 1
                     ,"acao" : "select"
                     ,"edicao" : 'sim'
                     ,"conexaoDb" : $("#conexaoDb").val()},
              dataType : "html",
              async: false,
              success : function(data){
                
                htmlValor = data;

              }

            });

        }

        $("#camposFiltro1").html(htmlValor);
    
    }else if(tipoSelecionado == "date"){

        $("#camposFiltro1").html("<input type=\'text\' name=\'valorFiltro[]\' id=\'valorFiltro1\' data-mask=\'99/99/9999\' class=\'form-control input-group.date\' style=\'margin-bottom: 0px !important;\' />");
        var operacao = "";
        datePicker(operacao, 1);

    }else if(tipoSelecionado == "int"){

        $("#camposFiltro1").html("<input type=\'text\' name=\'valorFiltro[]\' id=\'valorFiltro1\' onkeypress=\'return SomenteNumero(event);\' class=\'form-control\' style=\'margin-bottom: 0px !important;\' />");

    }else if(tipoSelecionado == "varchar"){

        $("#camposFiltro1").html("<input type=\'text\' name=\'valorFiltro[]\' id=\'valorFiltro1\' class=\'form-control\' style=\'margin-bottom: 0px !important;\' />");

    }

    $("#cbOperadores1").html(htmlOperadores);

}

function adicionarFiltros(){

    var adicionaFiltro = false;

    var operadorSelecionado = $("#cbOperadores1").val();
    arrayOperadorSelecionado = operadorSelecionado.split("|");
    var operador = arrayOperadorSelecionado[0];
    var condicao = "";

    if(operador == "between"){

        var filtroValor1 = $("#valorFiltro1").val();
        var filtroValor2 = $("#valorFiltro1-1").val();

        if(filtroValor1.length > 0 && filtroValor2.length > 0){

            adicionaFiltro = true;

        }

    }else if(operador == "=="){

        adicionaFiltro = true;

    }else if(operador == "<>=="){

        adicionaFiltro = true;

    }else{

        var filtroValor1 = $("#valorFiltro1").val();

        if(filtroValor1.length > 0){

            adicionaFiltro = true;

        }

    }

    if(adicionaFiltro){

        var qtdFiltro = $("#qtdFiltro").val();                        

        var novoCbCampo = $("#cbCampos1").html();
        var novoCbOperadores = $("#cbOperadores1").html();

        var campoValor = $("#cbCampos1").val();
        var operadorValor = $("#cbOperadores1").val();

        arrayCampoValor = campoValor.split("|");
        var campo = arrayCampoValor[0];
        var tipo = arrayCampoValor[1];

        var novoCamposFiltro = $("#camposFiltro1").html();
        
        novoCamposFiltro = novoCamposFiltro.replace("valorFiltro1", "valorFiltro"+qtdFiltro);

        if(tipo == 'enum'){

            var qtd = novoCamposFiltro.indexOf('</select');
            novoCamposFiltro = novoCamposFiltro.substring(0, qtd+9);

        }else if(tipo == "date"){

            arrayOperadorValor = operadorValor.split("|");
            var operacao = arrayOperadorValor[0];
            if(operacao == "between"){

                novoCamposFiltro = novoCamposFiltro.replace("valorFiltro1-1", "valorFiltro"+qtdFiltro+"-"+qtdFiltro);

                var filtroValor2 = $("#valorFiltro1-1").val();

            }

        }

        


        $("#filtros").append("<div  id=\'inboxContent"+qtdFiltro+"\' class=\'ibox-content\'><div id=\'filtro"+qtdFiltro+"\' class=\'form-inline\' ><div class=\'form-group\' ><i style=\'margin-right: 10px; cursor: pointer;\' title=\'Filtro Realizado\' class=\'fa fa-search-plus\'></i></div><div class=\'form-group\' ><select id=\'cbCampos"+qtdFiltro+"\' name=\'cbCampos[]\' class=\'form-control chosen-select\' style=\'width: 200px;\' onchange=\'campos(this)\' >"+novoCbCampo+"</select></div><div class=\'form-group\' style=\'margin-left: 3px;\'><select id=\'cbOperadores"+qtdFiltro+"\' name=\'cbOperadores[]\' class=\'form-control chosen-select\' style=\'width: 200px;\' onchange=\'operadores(this)\' >"+novoCbOperadores+"</select></div><div class=\'form-group\' style=\'margin-left: 3px;\'><label id=\'camposFiltro"+qtdFiltro+"\' style=\'margin-bottom: 0px !important;\'>"+novoCamposFiltro+"</label></div><div class=\'form-group\' style=\'\' ><input type=\'hidden\' id=\'tipoFiltro"+qtdFiltro+"\' name=\'tipoFiltro[]\' value=\'Realizado\' /></div><div class=\'form-group\' style=\'\' ><span id=\'erroCampoFiltro"+qtdFiltro+"\'' style=\'margin: 15px; color: red; display: none;\''>Preencha o campo!</span></div><div class=\'form-group\' style=\'margin-left: 3px;\'><p id=\'removeFiltro"+qtdFiltro+"\' class=\'btn btn-danger\' style=\'margin-bottom: 0px !important;\' onclick=\'removeFiltro("+qtdFiltro+")\' title=\'Remover Filtro\' >x</p><i id=\'statusFiltro"+qtdFiltro+"\' class=\'fa fa-refresh\' title=\'Filtro não realizado\' style=\'font-size: 24px; color: #EC4758; margin-left: 12px;\'></i></div></div></div></div>");

        $("#cbCampos"+qtdFiltro).val(campoValor);
        $("#cbOperadores"+qtdFiltro).val(operadorValor);
        $("#valorFiltro"+qtdFiltro).val(filtroValor1);

        if(tipo == "date"){
            if(operacao == "between"){

                $("#valorFiltro"+qtdFiltro+"-"+qtdFiltro).val(filtroValor2);

            }

            datePicker(operacao, qtdFiltro);
        }

        $("#btnLimparFiltros").show();

        pluginChosen();

        $('#valorFiltro'+qtdFiltro+'_chosen').css('width', '200px');

        qtdFiltro++;
        $("#qtdFiltro").val(qtdFiltro);

        $("#erroCampoFiltro1").hide();

    }else{

        $("#erroCampoFiltro1").show();

    }


}


function adicionarFiltrosExistente(campo, operador, valorFiltro, tipoFiltro, edicao){

    var disabled = "";
    var bloqueio = "";

    if(edicao == 'nao'){

        bloqueio = "readonly";
        disabled = "disabled";

    }


    var arrayFiltroCriacao = "";

    var novoCamposFiltro = "";

    var qtdFiltro = $("#qtdFiltro").val();                        

    var novoCbCampo = $("#cbCampos1").html();

    var campoValor = campo;
    var operadorValor = operador;

    arrayCampoValor = campoValor.split("|");
    var campo = arrayCampoValor[0];
    var tipo = arrayCampoValor[1];

    //var novoCbOperadores = $("#cbOperadores1").html();


    var campos = $("#campos").val();
    var jsonCampos = JSON.parse(campos);
    var qtdCampos = jsonCampos.campos.length;

    var fk = "";

    for(var i = 0; i < qtdCampos; i++){

        if(jsonCampos.campos[i].dado == campo){

            var fk = jsonCampos.campos[i].fk;

            if(fk.length > 0){

                $.ajax({
                  type : "POST",
                  url : "http://medcel.raizessolucoes.com.br/filtro/fk",
                  data : {"sql" : fk
                         ,"id" : qtdFiltro
                         ,"acao" : "select"
                         ,"edicao" : edicao
                         ,"conexaoDb" : $("#conexaoDb").val()},
                  dataType : "html",
                  async: false,
                  success : function(data){
                    //console.log(data);
                    novoCamposFiltro = data;

                  }

                });

            }

        }

    }

    var operadoresTipo = $("#operadoresTipo").val();
    var jsonOperadoresTipo = JSON.parse(operadoresTipo);

    var qtdOperadores = jsonOperadoresTipo[tipo].length;
    
    var novoCbOperadores = "";

    for(var j = 0; j < qtdOperadores; j++){

        var sinal = jsonOperadoresTipo[tipo][j].sinal;
        var descricao = jsonOperadoresTipo[tipo][j].descricao;
        var input = jsonOperadoresTipo[tipo][j].input;

        novoCbOperadores += "<option "+disabled+" value=\'"+sinal+"|"+input+"\' >"+descricao+"</option>";

    }

    arrayOperadorValor = operadorValor.split("|");
    var operacao = arrayOperadorValor[0];

    if(fk.length == 0){

        if(tipo == "enum"){

            var valorEnum = arrayCampoValor[2];
            var arrayValorEnum = valorEnum.split("-");

            novoCamposFiltro = "<select name=\'valorFiltro[]\' onChange=\'alteracao("+qtdFiltro+")\' id=\'valorFiltro"+qtdFiltro+"\' class=\'form-control chosen-select\' style=\'margin-bottom: 0px !important; width: 200px;\' >";
            
            for(var j = 0; j < arrayValorEnum.length; j++ ){

                novoCamposFiltro += "<option "+disabled+" value=\'"+arrayValorEnum[j]+"\' >"+arrayValorEnum[j]+"</option>";
                //novoCamposFiltro += "<option value=\'"+arrayValorEnum[j]+"\' >"+arrayValorEnum[j]+"</option>";

            }

            novoCamposFiltro += "</select>";
        
        }else if(tipo == "date"){

            if(operacao == "between" || operacao == "not between"){

                novoCamposFiltro = "<input type=\'text\' "+bloqueio+" onchange=\'alteracao("+qtdFiltro+")\' name=\'valorFiltro[]\' id=\'valorFiltro"+qtdFiltro+"\' data-mask=\'99/99/9999\' class=\'form-control input-group.date\' style=\'margin-bottom: 0px !important;\' /><input type=\'text\' onchange=\'alteracao("+qtdFiltro+")\' name=\'valorFiltro[]\' id=\'valorFiltro"+qtdFiltro+"-"+qtdFiltro+"\' data-mask=\'99/99/9999\' class=\'form-control\' style=\'margin-bottom: 0px !important; margin-left: 3px;\' />";                

            }else if(operacao == "==" || operacao == "<>=="){

                novoCamposFiltro = "<input type=\'hidden\' "+bloqueio+" onchange=\'alteracao("+qtdFiltro+")\' name=\'valorFiltro[]\' id=\'valorFiltro"+qtdFiltro+"\' class=\'form-control\' style=\'margin-bottom: 0px !important;\' />";

            }else{

                novoCamposFiltro = "<input type=\'text\' "+bloqueio+" onchange=\'alteracao("+qtdFiltro+")\' name=\'valorFiltro[]\' id=\'valorFiltro"+qtdFiltro+"\' data-mask=\'99/99/9999\' class=\'form-control input-group.date\' style=\'margin-bottom: 0px !important;\' />";

            }

        }else if(tipo == "int"){

            if(operacao == "==" || operacao == "<>=="){

                novoCamposFiltro = "<input type=\'hidden\' "+bloqueio+" name=\'valorFiltro[]\' id=\'valorFiltro"+qtdFiltro+"\' class=\'form-control\' style=\'margin-bottom: 0px !important;\' />";

            }else if(operacao == "in" || operacao == "not in"){

                novoCamposFiltro = "<input type=\'text\' "+bloqueio+" name=\'valorFiltro[]\' id=\'valorFiltro"+qtdFiltro+"\' class=\'form-control\' style=\'margin-bottom: 0px !important;\' />";

            }else{

                novoCamposFiltro = "<input type=\'text\' "+bloqueio+" name=\'valorFiltro[]\' id=\'valorFiltro"+qtdFiltro+"\' onkeypress=\'alteracao("+qtdFiltro+"); return SomenteNumero(event);\' class=\'form-control\' style=\'margin-bottom: 0px !important;\' />";

            }

        }else if(tipo == "varchar"){


            if(operacao == "==" || operacao == "<>=="){

                novoCamposFiltro = "<input type=\'hidden\' "+bloqueio+" onkeypress=\'alteracao("+qtdFiltro+")\' name=\'valorFiltro[]\' id=\'valorFiltro"+qtdFiltro+"\' class=\'form-control\' style=\'margin-bottom: 0px !important;\' />";

            }else{

                novoCamposFiltro = "<input type=\'text\' "+bloqueio+" onkeypress=\'alteracao("+qtdFiltro+")\' name=\'valorFiltro[]\' id=\'valorFiltro"+qtdFiltro+"\' class=\'form-control\' style=\'margin-bottom: 0px !important;\' />";

            }


        }

    }

    if($("#filtroExecucao").val() == 'naoRealizado'){

        var icone = "fa fa-refresh";

        var textoIcone = "Filtro não realizado";

        var cor = "#EC4758";

    }else{        

        var icone = "fa fa-check";

        var textoIcone = "Filtro Realizado";

        var cor = "#1AB394";


    }

    if($('#modoAdmin').val() == '1'){
        var arrayFiltroCriacao = "<p><b>Filtro:   </b><span style='margin-left: 10px;' >'campo' => '"+campoValor+"', 'operador' => '"+operador+"', 'valor' => '"+valorFiltro+"', 'tipoFiltro' => 'Fixo', 'edicao' => 'sim'</span></p>";
    }

    if(tipoFiltro == 'Fixo'){
    
        $("#filtros").append("<div  id=\'inboxContent"+qtdFiltro+"\' class=\'ibox-content\'><div id=\'filtro"+qtdFiltro+"\' class=\'form-inline\'><div class=\'form-group\' ><i style=\'margin-right: 10px; cursor: pointer;\' title=\'Filtro Fixo\' class=\'fa fa-thumb-tack\'></i></div><div class=\'form-group\' ><select id=\'cbCampos"+qtdFiltro+"\' name=\'cbCampos[]\' class=\'form-control chosen-select\' style=\'width: 200px; \' onchange=\'campos(this)\' >"+novoCbCampo+"</select></div><div class=\'form-group\' style=\'margin-left: 3px;\'><select id=\'cbOperadores"+qtdFiltro+"\' name=\'cbOperadores[]\' class=\'form-control chosen-select\' style=\'width: 200px;\' onchange=\'operadores(this)\' >"+novoCbOperadores+"</select></div><div class=\'form-group\' style=\'margin-left: 3px;\'><label id=\'camposFiltro"+qtdFiltro+"\' style=\'margin-bottom: 0px !important;\'>"+novoCamposFiltro+"</label></div><div class=\'form-group\' style=\'\' ><input type=\'hidden\' id=\'tipoFiltro"+qtdFiltro+"\' name=\'tipoFiltro[]\' value=\'"+tipoFiltro+"\' /></div><div class=\'form-group\' style=\'\' ><span id=\'erroCampoFiltro"+qtdFiltro+"\'' style=\'margin: 15px; color: red; display: none;\''>Preencha o campo!</span></div><div class=\'form-group\' style=\'margin-left: 3px;\'><i id=\'statusFiltro"+qtdFiltro+"\' class=\'"+icone+"\' title=\'"+textoIcone+"\' style=\'font-size: 24px; color: "+cor+"; margin-left: 12px;\'></i></div></div></div></div>");

        $("#cbCampos"+qtdFiltro+" option").each(function(i){ 

            $(this).attr("disabled", "disabled");

        });

    }else if(tipoFiltro == 'Salvo'){

        $("#filtros").append("<div  id=\'inboxContent"+qtdFiltro+"\' class=\'ibox-content\'><div id=\'filtro"+qtdFiltro+"\' class=\'form-inline\'><div class=\'form-group\' ><i style=\'margin-right: 10px; cursor: pointer;\' title=\'Filtro Salvo\' class=\'fa fa-save\'></i></div><div class=\'form-group\' ><select id=\'cbCampos"+qtdFiltro+"\' name=\'cbCampos[]\' class=\'form-control chosen-select\' style=\'width: 200px; \' onchange=\'campos(this)\' >"+novoCbCampo+"</select></div><div class=\'form-group\' style=\'margin-left: 3px;\'><select id=\'cbOperadores"+qtdFiltro+"\' name=\'cbOperadores[]\' class=\'form-control chosen-select\' style=\'width: 200px;\' onchange=\'operadores(this)\' >"+novoCbOperadores+"</select></div><div class=\'form-group\' style=\'margin-left: 3px;\'><label id=\'camposFiltro"+qtdFiltro+"\' style=\'margin-bottom: 0px !important;\'>"+novoCamposFiltro+"</label></div><div class=\'form-group\' style=\'\' ><input type=\'hidden\' id=\'tipoFiltro"+qtdFiltro+"\' name=\'tipoFiltro[]\' value=\'"+tipoFiltro+"\' /></div><div class=\'form-group\' style=\'\' ><span id=\'erroCampoFiltro"+qtdFiltro+"\'' style=\'margin: 15px; color: red; display: none;\''>Preencha o campo!</span></div><div class=\'form-group\' style=\'margin-left: 3px;\'><p id=\'removeFiltro"+qtdFiltro+"\' class=\'btn btn-danger\' style=\'margin-bottom: 0px !important;\' onclick=\'removeFiltro("+qtdFiltro+")\' title=\'Remover Filtro\' >x</p><i id=\'statusFiltro"+qtdFiltro+"\' class=\'"+icone+"\' title=\'"+textoIcone+"\' style=\'font-size: 24px; color: "+cor+"; margin-left: 12px;\'></i></div></div></div><div id=\'filtro"+qtdFiltro+"-"+qtdFiltro+"\' class=\'form-inline\'>"+arrayFiltroCriacao+"</div></div>");

    }else if(tipoFiltro == 'Realizado'){

        $("#filtros").append("<div  id=\'inboxContent"+qtdFiltro+"\' class=\'ibox-content\'><div id=\'filtro"+qtdFiltro+"\' class=\'form-inline\'><div class=\'form-group\' ><i style=\'margin-right: 10px; cursor: pointer;\' title=\'Filtro Realizado\' class=\'fa fa-search-plus\'></i></div><div class=\'form-group\' ><select id=\'cbCampos"+qtdFiltro+"\' name=\'cbCampos[]\' class=\'form-control chosen-select\' style=\'width: 200px; \' onchange=\'campos(this)\' >"+novoCbCampo+"</select></div><div class=\'form-group\' style=\'margin-left: 3px;\'><select id=\'cbOperadores"+qtdFiltro+"\' name=\'cbOperadores[]\' class=\'form-control chosen-select\' style=\'width: 200px;\' onchange=\'operadores(this)\' >"+novoCbOperadores+"</select></div><div class=\'form-group\' style=\'margin-left: 3px;\'><label id=\'camposFiltro"+qtdFiltro+"\' style=\'margin-bottom: 0px !important;\'>"+novoCamposFiltro+"</label></div><div class=\'form-group\' style=\'\' ><input type=\'hidden\' id=\'tipoFiltro"+qtdFiltro+"\' name=\'tipoFiltro[]\' value=\'"+tipoFiltro+"\' /></div><div class=\'form-group\' style=\'\' ><span id=\'erroCampoFiltro"+qtdFiltro+"\'' style=\'margin: 15px; color: red; display: none;\''>Preencha o campo!</span></div><div class=\'form-group\' style=\'margin-left: 3px;\'><p id=\'removeFiltro"+qtdFiltro+"\' class=\'btn btn-danger\' style=\'margin-bottom: 0px !important;\' onclick=\'removeFiltro("+qtdFiltro+")\' title=\'Remover Filtro\' >x</p><i id=\'statusFiltro"+qtdFiltro+"\' class=\'"+icone+"\' title=\'"+textoIcone+"\' style=\'font-size: 24px; color: "+cor+"; margin-left: 12px;\'></i></div></div></div><div id=\'filtro"+qtdFiltro+"-"+qtdFiltro+"\' class=\'form-inline\'>"+arrayFiltroCriacao+"</div></div>");

    }


    $("#cbCampos"+qtdFiltro).val(campoValor);
    $("#cbCampos"+qtdFiltro+" option[value=\'"+campoValor+"\']").removeAttr("disabled");

    $("#cbOperadores"+qtdFiltro).val(operador);
    $("#cbOperadores"+qtdFiltro+" option[value=\'"+operador+"\']").removeAttr("disabled");

    if(tipo == "date"){

        if(operacao == "between" || operacao == "not between"){

            valores = valorFiltro.split("|");

            $("#valorFiltro"+qtdFiltro).val(valores[0]);
            $("#valorFiltro"+qtdFiltro+"-"+qtdFiltro).val(valores[1]);

            datePicker(operacao, qtdFiltro);

        }else{
            
            $("#valorFiltro"+qtdFiltro).val(valorFiltro);
            datePicker(operacao, qtdFiltro);

        }

    }else{

        $("#valorFiltro"+qtdFiltro).val(valorFiltro);

        if(tipo == "enum"){

            $("#valorFiltro"+qtdFiltro+" option[value="+valorFiltro+"]").removeAttr("disabled");

        }


    }


    $("#btnLimparFiltros").show();

    pluginChosen();

    qtdFiltro++;
    $("#qtdFiltro").val(qtdFiltro);

}


function campos(campo){

    var campoId = campo.id;
    var id = campoId.replace("cbCampos", "");

    $("#statusFiltro"+id).attr('class', 'fa fa-refresh');
    $("#statusFiltro"+id).css('color', '#EC4758');

    var campoSelecionado = $("#cbCampos"+id).val();
    arrayCampoSelecionado = campoSelecionado.split("|");

    var campo = arrayCampoSelecionado[0];
    var tipo = arrayCampoSelecionado[1];

    var campos = $("#campos").val();
    var jsonCampos = JSON.parse(campos);
    var qtdCampos = jsonCampos.campos.length;
    var fk = "";
    var htmlFk = "";

    for(var i = 0; i < qtdCampos; i++){

        if(jsonCampos.campos[i].dado == campo){

            var fk = jsonCampos.campos[i].fk;

            if(fk.length > 0){

                $.ajax({
                    
                  type : "POST",
                  url : "http://medcel.raizessolucoes.com.br/filtro/fk",
                  data : {"sql" : fk
                         ,"id" : id
                         ,"acao" : "select"
                         ,"edicao" : ""
                         ,"conexaoDb" : $("#conexaoDb").val()},
                  dataType : "text",
                  asynt: false,
                  success : function(data){

                    $("#camposFiltro"+id).html(data);
                    pluginChosen();

                  }

                });

            }

        }

    }

    var operadoresTipo = $("#operadoresTipo").val();
    var jsonOperadoresTipo = JSON.parse(operadoresTipo);

    var qtdOperadores = jsonOperadoresTipo[tipo].length;
    
    var htmlOperadores = "";

    for(var j = 0; j < qtdOperadores; j++){

        var sinal = jsonOperadoresTipo[tipo][j].sinal;
        var descricao = jsonOperadoresTipo[tipo][j].descricao;
        var input = jsonOperadoresTipo[tipo][j].input;

        if(j == 0){
            htmlOperadores += "<option selected value=\'"+sinal+"|"+input+"\' >"+descricao+"</option>";
        }else{
            htmlOperadores += "<option value=\'"+sinal+"|"+input+"\' >"+descricao+"</option>";
        }

    }

    $("#cbOperadores"+id).html(htmlOperadores).trigger("chosen:updated");

    if(fk.length == 0){

        if(tipo == "enum"){

            var valorEnum = arrayCampoSelecionado[2];
            var arrayValorEnum = valorEnum.split("-");

            var htmlValor = "<select name=\'valorFiltro[]\' id=\'valorFiltro"+id+"\' class=\'form-control chosen-select\' style=\'margin-bottom: 0px !important; width: 200px;\' >";
            
            for(var j = 0; j < arrayValorEnum.length; j++ ){

                htmlValor += "<option value=\'"+arrayValorEnum[j]+"\' >"+arrayValorEnum[j]+"</option>";

            }

            htmlValor += "</select>";

            $("#camposFiltro"+id).html(htmlValor);

            pluginChosen();
        
        }else if(tipo == "date"){

            $("#camposFiltro"+id).html("<input type=\'text\' name=\'valorFiltro[]\' id=\'valorFiltro"+id+"\' data-mask=\'99/99/9999\' class=\'form-control input-group.date\' style=\'margin-bottom: 0px !important;\' />");
            var operacao = "";
            datePicker(operacao, id);

        }else if(tipo == "int"){

            $("#camposFiltro"+id).html("<input type=\'text\' name=\'valorFiltro[]\' id=\'valorFiltro"+id+"\' onkeypress=\'return SomenteNumero(event);\' class=\'form-control\' style=\'margin-bottom: 0px !important;\' />");

        }else if(tipo == "varchar"){

            $("#camposFiltro"+id).html("<input type=\'text\' name=\'valorFiltro[]\' id=\'valorFiltro"+id+"\' class=\'form-control\' style=\'margin-bottom: 0px !important;\' />");

        }

    }

}

function operadores(operador){

    var operadorId = operador.id;
    var id = operadorId.replace("cbOperadores", "");

    $("#statusFiltro"+id).attr('class', 'fa fa-refresh');
    $("#statusFiltro"+id).css('color', '#EC4758');

    var campoSelecionado = $("#cbCampos"+id).val();
    arrayCampoSelecionado = campoSelecionado.split("|");
    var campo = arrayCampoSelecionado[0];
    var tipo = arrayCampoSelecionado[1];

    var operacaoSelecionada = $("#cbOperadores"+id).val();
    var arrayOperacao = operacaoSelecionada.split("|");

    var operacao = arrayOperacao[0];

    var campos = $("#campos").val();
    var jsonCampos = JSON.parse(campos);
    var qtdCampos = jsonCampos.campos.length;
    var fk = "";
    var htmlFk = "";

    for(var i = 0; i < qtdCampos; i++){

        if(jsonCampos.campos[i].dado == campo){

            var fk = jsonCampos.campos[i].fk;

            if(fk.length > 0){

                $.ajax({
                  type : "POST",
                  url : "http://medcel.raizessolucoes.com.br/filtro/fk",
                  data : {"sql" : fk
                         ,"id" : id
                         ,"acao" : "select"
                         ,"edicao" : ""
                         ,"conexaoDb" : $("#conexaoDb").val()},
                  dataType : "text",
                  async: false,
                  success : function(data){

                    $("#camposFiltro"+id).html(data);

                  }

                });

            }

        }

    }



    if(fk.length == 0){

        if(tipo == "date"){

            if(operacao == "between" || operacao == "not between"){

                $("#camposFiltro"+id).html("<input type=\'text\' name=\'valorFiltro[]\' id=\'valorFiltro"+id+"\' data-mask=\'99/99/9999\' class=\'form-control input-group.date\' style=\'margin-bottom: 0px !important;\' /><input type=\'text\' name=\'valorFiltro[]\' id=\'valorFiltro"+id+"-"+id+"\' data-mask=\'99/99/9999\' class=\'form-control input-group.date\' style=\'margin-bottom: 0px !important; margin-left: 3px;\' />");
                datePicker(operacao, id);

            }else if(operacao == "==" || operacao == "<>=="){

                $("#camposFiltro"+id).html("<input type=\'hidden\' name=\'valorFiltro[]\' id=\'valorFiltro"+id+"\' class=\'form-control\' style=\'margin-bottom: 0px !important;\' />");

            }else{

                $("#camposFiltro"+id).html("<input type=\'text\' name=\'valorFiltro[]\' id=\'valorFiltro"+id+"\' data-mask=\'99/99/9999\' class=\'form-control input-group.date\' style=\'margin-bottom: 0px !important;\' />");
                datePicker(operacao, id);

            }
        }else if(tipo == "varchar"){

            if(operacao == "==" || operacao == "<>=="){

                $("#camposFiltro"+id).html("<input type=\'hidden\' name=\'valorFiltro[]\' id=\'valorFiltro"+id+"\' class=\'form-control\' style=\'margin-bottom: 0px !important;\' />");


            }else{

                $("#camposFiltro"+id).html("<input type=\'text\' name=\'valorFiltro[]\' id=\'valorFiltro"+id+"\' class=\'form-control\' style=\'margin-bottom: 0px !important;\' />");

            }

        }else if(tipo == "int"){

            if(operacao == "==" || operacao == "<>=="){

                $("#camposFiltro"+id).html("<input type=\'hidden\' name=\'valorFiltro[]\' id=\'valorFiltro"+id+"\' class=\'form-control\' style=\'margin-bottom: 0px !important;\' />");


            }else if(operacao == "in" || operacao == "not in"){

                $("#camposFiltro"+id).html("<input type=\'text\' name=\'valorFiltro[]\' id=\'valorFiltro"+id+"\' class=\'form-control\' style=\'margin-bottom: 0px !important;\' />");

            }else{

                $("#camposFiltro"+id).html("<input type=\'text\' name=\'valorFiltro[]\' id=\'valorFiltro"+id+"\' onkeypress=\'return SomenteNumero(event);\' class=\'form-control\' style=\'margin-bottom: 0px !important;\' />");

            }

        }

    }


}


function carregaFiltrosSelecionados(){

    $("#idFiltro").val("");

    if($("#btnSalvaFiltro").attr("onclick") != "editarFiltroUsuario()"){

        $("#idFiltroAtual").val("");

    }

    var filtrosExistentes = $("#filtrosExistentes").val();
    var jsonFiltrosExistentes = JSON.parse(filtrosExistentes);

    if(jsonFiltrosExistentes["filtros"][1]['limite'] > 0){

        $("#limiteFiltro option[value=\'"+jsonFiltrosExistentes["filtros"][1]['limite']+"\']").prop('selected', true);

    }

    if(jsonFiltrosExistentes["filtros"][2]['campo'].length > 0){

        $("#cbOrdenarCampos option[value=\'"+jsonFiltrosExistentes["filtros"][2]['campo']+"\']").prop('selected', true);

        $("#cbOrdenarCamposTipo option[value=\'"+jsonFiltrosExistentes["filtros"][2]['tipo']+"\']").prop('selected', true);

    }

    if(jsonFiltrosExistentes["filtros"][0] != null){

        var qtdFiltroExistente = jsonFiltrosExistentes["filtros"][0].length;
        
        //var qtdFiltroExistente = 0;
        for(var i = 0; i < qtdFiltroExistente; i++){

            var campo = jsonFiltrosExistentes["filtros"][0][i].campo;
            var operador = jsonFiltrosExistentes["filtros"][0][i].operador;
            var valorFiltro = jsonFiltrosExistentes["filtros"][0][i].valor;
            var tipoFiltro = jsonFiltrosExistentes["filtros"][0][i].tipoFiltro;

            if(tipoFiltro == 'Fixo'){
                var edicao =  jsonFiltrosExistentes["filtros"][0][i].edicao;
            }else{
                var edicao = "sim"; 
            }

            adicionarFiltrosExistente(campo, operador, valorFiltro, tipoFiltro, edicao);

        }

    }

}


function validaCamposFiltros(){

    var qtdFiltro = $("#qtdFiltro").val();
    var valida = true;

    for(var i = 2; i <= qtdFiltro; i++){

        if($("#valorFiltro"+i).length){

            var operadorSelecionado = $("#cbOperadores"+i).val();
            arrayOperadorSelecionado = operadorSelecionado.split("|");
            var operador = arrayOperadorSelecionado[0];

            if(operador == "between"){

                var filtroValor1 = $("#valorFiltro"+i).val();
                var filtroValor2 = $("#valorFiltro"+i+"-"+i+"").val();

                if(filtroValor1.length > 0 && filtroValor2.length > 0){

                    $("#erroCampoFiltro"+i).hide();

                }else{

                    valida = false;
                    $("#erroCampoFiltro"+i).show();

                }

            }else if(operador == "=="){

                $("#erroCampoFiltro"+i).hide();

            }else if(operador == "<>=="){

                $("#erroCampoFiltro"+i).hide();

            }else{

                var filtroValor1 = $("#valorFiltro"+i).val();

                if(filtroValor1.length > 0){

                    $("#erroCampoFiltro"+i).hide();

                }else{

                    valida = false;
                    $("#erroCampoFiltro"+i).show();

                }

            }

        }

    }

    return valida;

}

function limparFiltros(){

    var qtdFiltro = $("#qtdFiltro").val();

    for(var i = 2; i < qtdFiltro; i++){

        if($("#tipoFiltro"+i).val() != 'Fixo'){
            removeFiltro(i);
        }else{
            if($("#inboxContent"+i).length){
                alteracao(i);
            }
        }

    }

    $("#btnLimparFiltros").hide();

}

function criarFiltroUsuario(){

    $("#btnNovoFiltroModal").click();

}

function salvarFiltroUsuario(){

    var idColaborador = $("#idColaborador").val();
    var idRelatorio = $("#idRelatorio").val();
    var nomeFiltro = $("#nomeFiltro").val();
    var filtros = $("#formFiltro").serialize();

    swal({
        title: "Filtro",
        text: "Deseja mesmo criar o filtro realizado?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Sim",
        cancelButtonText: "Não",
        closeOnConfirm: false
    }, function () {

        $.ajax({

          type : "POST",
          url : "http://medcel.raizessolucoes.com.br/filtro/salvar",
          data : {"idColaborador" : idColaborador
                 ,"idRelatorio" : idRelatorio
                 ,"nomeFiltro" : nomeFiltro
                 ,"filtros" : filtros},
          dataType : "json",
          async: false,
          success : function(data){
            //console.log(data);
            if(data['retorno'] == 1){

                 swal({
                      title: "Filtro!", 
                      text: "Filtro criado com sucesso!",
                      type: "success"
                }, function(){

                    selecionarFiltroUsuario(data['idFiltro']);

                });
                

            }else if(data['retorno'] == 0){

                swal("Filtro!", "Não foi possível salvar o filtro, contate o administrador!", "error");

            }else if(data['retorno'] == 2){

                swal("Filtro!", "O filtro existente é fixo portanto não há nenhum para ser salvo!", "error");

            }

          }

        });

    });

}

function editarFiltroUsuario(){

    var idColaborador = $("#idColaborador").val();
    var idFiltro = $("#idFiltroAtual").val();
    var filtros = $("#formFiltro").serialize();

    swal({
        title: "Filtro",
        text: "Deseja mesmo alterar o Filtro? Lembre-se que o mesmo será substituído.",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Sim",
        cancelButtonText: "Cancelar",
        closeOnConfirm: false
    }, function () {

        $.ajax({

          type : "POST",
          url : "http://medcel.raizessolucoes.com.br/filtro/editar",
          data : {"idColaborador" : idColaborador
                 ,"idFiltro" : idFiltro
                 ,"filtros" : filtros},
          dataType : "json",
          async: false,
          success : function(data){
            //console.log(data);
            if(data['retorno'] == 1){

                swal({
                      title: "Filtro!", 
                      text: "Filtro alterado com sucesso!",
                      type: "success"
                }, function(){

                    selecionarFiltroUsuario(idFiltro);
                    //window.location.href= "http://192.168.0.25/portalvendasprepara/pesquisa";
                });

            }else if(data['retorno'] == 0){

                swal("Filtro!", "Não foi possível alterar o filtro, contate o administrador!", "error");

            }else if(data['retorno'] == 2){

                swal({
                      title: "Filtro!", 
                      text: "O filtro existente é fixo portanto não há nenhum para ser salvo!",
                      type: "error"
                }, function(){
                    window.location.href= "http://medcel.raizessolucoes.com.br/pesquisa";
                });

            }

          }

        });

    });


}

function excluirFiltroUsuario(idFiltro){

    var idColaborador = $("#idColaborador").val();

    swal({
        title: "Filtro",
        text: "Deseja mesmo excluir o Filtro?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Sim",
        cancelButtonText: "Não",
        closeOnConfirm: false
    }, function () {

        
        $.ajax({

          type : "POST",
          url : "http://medcel.raizessolucoes.com.br/filtro/excluir",
          data : {"idColaborador" : idColaborador
                 ,"idFiltro" : idFiltro},
          dataType : "json",
          async: false,
          success : function(data){

            if(data['retorno'] == 1){

                swal({
                      title: "Filtro!", 
                      text: "Filtro excluído com sucesso!",
                      type: "success"
                }, function(){
                    
                    $("#opcaoFiltro"+idFiltro).remove();

                });

            }else if(data['retorno'] == 0){

                swal("Filtro!", "Não foi possível excluir o filtro, contate o administrador!", "error");

            }

          }

        });

    });

}

function selecionarFiltroUsuario(idFiltro){

    $("#idFiltro").val(idFiltro);
    $("#idFiltroAtual").val(idFiltro);

    $("#formFiltro").submit();

}


function alteracao(id){

    if($("#statusFiltro"+id).hasClass('fa fa-check')){

        $("#statusFiltro"+id).attr('class', 'fa fa-refresh');
        $("#statusFiltro"+id).css('color', '#EC4758');

    }

}

function pluginChosen(){

    var config = { ".chosen-select" : {} }
    for (var selector in config) {
        $(selector).chosen(config[selector]);
    }
}

function datePicker(operacao, id){

    if(operacao == "between" || operacao == "not between"){

        $("#valorFiltro"+id).datepicker({
            format: "dd/mm/yyyy",
            todayHighlight: true
        });

        $("#valorFiltro"+id+"-"+id).datepicker({
            format: "dd/mm/yyyy",
            todayHighlight: true
        });

    }else{

        $("#valorFiltro"+id).datepicker({
            format: "dd/mm/yyyy",
            todayHighlight: true
        });

    }

}

function stepsExplicacaoFiltro(){

    return [{
        element: "#step1",
        title: "1º Passo",
        content: "Siga os passos para aprender a utilizar o construtor de filtro.<br>No campo abaixo selecione um dado que deseje filtrar.",
        placement: "auto",
        backdropContainer: "#wrapper",
        template: "<div class=\'popover tour\'><div class=\'arrow\'></div><h3 class=\'popover-title\'></h3><div class=\'popover-content\'></div><div class=\'popover-navigation\'><button class=\'btn btn-default\' style=\'font-size: 12px;\' data-role=\'prev\'>« Anterior</button><span data-role=\'separator\'> </span><button class=\'btn btn-default\' style=\'font-size: 12px;\' data-role=\'next\'>Próximo »</button><button class=\'btn btn-default\' style=\'font-size: 12px;\' data-role=\'end\'><i class=\'fa fa-times\'></i></button></div></div>"
    },
    {
        element: "#step2",
        title: "2º Passo",
        content: "Com o dado selecionado, selecione a operação que deseja realizar.",
        placement: "auto",
        backdropContainer: "#wrapper",
        template: "<div class=\'popover tour\'><div class=\'arrow\'></div><h3 class=\'popover-title\'></h3><div class=\'popover-content\'></div><div class=\'popover-navigation\'><button class=\'btn btn-default\' style=\'font-size: 12px;\' data-role=\'prev\'>« Anterior</button><span data-role=\'separator\'> </span><button class=\'btn btn-default\' style=\'font-size: 12px;\' data-role=\'next\'>Próximo »</button><button class=\'btn btn-default\' style=\'font-size: 12px;\' data-role=\'end\'><i class=\'fa fa-times\'></i></button></div></div>"
    },
    {
        element: "#step3",
        title: "3º Passo",
        content: "Agora, selecione ou inserira o valor a ser filtrado.",
        placement: "auto",
        backdropContainer: "#wrapper",
        template: "<div class=\'popover tour\'><div class=\'arrow\'></div><h3 class=\'popover-title\'></h3><div class=\'popover-content\'></div><div class=\'popover-navigation\'><button class=\'btn btn-default\' style=\'font-size: 12px;\' data-role=\'prev\'>« Anterior</button><span data-role=\'separator\'> </span><button class=\'btn btn-default\' style=\'font-size: 12px;\' data-role=\'next\'>Próximo »</button><button class=\'btn btn-default\' style=\'font-size: 12px;\' data-role=\'end\'><i class=\'fa fa-times\'></i></button></div></div>"
    },
    {
       element: "#step4",
        title: "4º Passo",
        content: "Com todas opções selecionadas, clique no botão Adicionar filtro.",
        placement: "auto",
        backdropContainer: "#wrapper",
        template: "<div class=\'popover tour\'><div class=\'arrow\'></div><h3 class=\'popover-title\'></h3><div class=\'popover-content\'></div><div class=\'popover-navigation\'><button class=\'btn btn-default\' style=\'font-size: 12px;\' data-role=\'prev\'>« Anterior</button><span data-role=\'separator\'> </span><button class=\'btn btn-default\' style=\'font-size: 12px;\' data-role=\'next\'>Próximo »</button><button class=\'btn btn-default\' style=\'font-size: 12px;\' data-role=\'end\'><i class=\'fa fa-times\'></i></button></div></div>"
    },
    {
       element: "#step5",
        title: "Explicação",
        content: "<p>Caso você tenha executado os passos anteriores, verá que o filtro foi inserido na lista abaixo.</p> Note que um ícone é exibido no lado esquerdo do filtro identificando a sua origem, que podem ser as seguintes: <br> <i class=\'fa fa-thumb-tack\'> <b> Fixo:</b> Não é possível removê-lo, toda pesquisa será realizada com o mesmo.</i><br><i class=\'fa fa-search-plus\'><b> Realizado: </b> Filtro que foi inserido.</i><br><i class=\'fa fa-save\'><b> Salvo: </b>Salvo pelo usuário. ( Vera à seugir como salvá-lo ).</i>",
        placement: "top",
        backdropContainer: "#wrapper",
        template: "<div class=\'popover tour\' style=\'max-width: 400px;\'><div class=\'arrow\'></div><h3 class=\'popover-title\'></h3><div class=\'popover-content\'></div><div class=\'popover-navigation\'><button class=\'btn btn-default\' style=\'font-size: 12px;\' data-role=\'prev\'>« Anterior</button><span data-role=\'separator\'> </span><button class=\'btn btn-default\' style=\'font-size: 12px;\' data-role=\'next\'>Próximo »</button><button class=\'btn btn-default\' style=\'font-size: 12px;\' data-role=\'end\'><i class=\'fa fa-times\'></i></button></div></div>"
    },
    {
       element: "#step6",
        title: "Explicação",
        content: "Veja também, que no lado direito do filtro está disponível um botão para remoção do mesmo <img src=\'http://192.168.0.25/portalvendasprepara/views/_img/filtro/02.jpg\' style=\'height: 22px;\' /> e um ícone <i class=\'fa fa-refresh\' style=\'font-size: 22px; color: #EC4758; margin-left: 5px; margin-right: 5px;\'></i> identificando que o filtro não foi realizado.",
        placement: "top",
        backdropContainer: "#wrapper",
        template: "<div class=\'popover tour\' style=\'max-width: 400px;\'><div class=\'arrow\'></div><h3 class=\'popover-title\'></h3><div class=\'popover-content\'></div><div class=\'popover-navigation\'><button class=\'btn btn-default\' style=\'font-size: 12px;\' data-role=\'prev\'>« Anterior</button><span data-role=\'separator\'> </span><button class=\'btn btn-default\' style=\'font-size: 12px;\' data-role=\'next\'>Próximo »</button><button class=\'btn btn-default\' style=\'font-size: 12px;\' data-role=\'end\'><i class=\'fa fa-times\'></i></button></div></div>"
    },
    {
       element: "#step7",
        title: "5º Passo",
        content: "Clique no botão Filtrar, para buscar os dados de acordo com o filtro definido. Caso já tenha clicado, prossiga.",
        placement: "top",
        backdropContainer: "#wrapper",
        template: "<div class=\'popover tour\' style=\'max-width: 400px;\'><div class=\'arrow\'></div><h3 class=\'popover-title\'></h3><div class=\'popover-content\'></div><div class=\'popover-navigation\'><button class=\'btn btn-default\' style=\'font-size: 12px;\' data-role=\'prev\'>« Anterior</button><span data-role=\'separator\'> </span><button class=\'btn btn-default\' style=\'font-size: 12px;\' data-role=\'next\'>Próximo »</button><button class=\'btn btn-default\' style=\'font-size: 12px;\' data-role=\'end\'><i class=\'fa fa-times\'></i></button></div></div>"
    },
    {
       element: "#step8",
        title: "Explicação",
        content: "Veja que o filtro foi realizado, identifique pelo ícone <i class=\'fa fa-check\'' title=\'Filtro Realizado\' style=\'font-size: 24px; color: #1AB394;\'></i>.",
        placement: "top",
        backdropContainer: "#wrapper",
        template: "<div class=\'popover tour\' style=\'\'><div class=\'arrow\'></div><h3 class=\'popover-title\'></h3><div class=\'popover-content\'></div><div class=\'popover-navigation\'><button class=\'btn btn-default\' style=\'font-size: 12px;\' data-role=\'prev\'>« Anterior</button><span data-role=\'separator\'> </span><button class=\'btn btn-default\' style=\'font-size: 12px;\' data-role=\'next\'>Próximo »</button><button class=\'btn btn-default\' style=\'font-size: 12px;\' data-role=\'end\'><i class=\'fa fa-times\'></i></button></div></div>"
    },
    {
       element: "#step9",
        title: "Explicação",
        content: "Se houver dados de acordo com o filtro realizado, veja que será listado abaixo.",
        placement: "top",
        backdropContainer: "#wrapper",
        template: "<div class=\'popover tour\' style=\'\'><div class=\'arrow\'></div><h3 class=\'popover-title\'></h3><div class=\'popover-content\'></div><div class=\'popover-navigation\'><button class=\'btn btn-default\' style=\'font-size: 12px;\' data-role=\'prev\'>« Anterior</button><span data-role=\'separator\'> </span><button class=\'btn btn-default\' style=\'font-size: 12px;\' data-role=\'next\'>Próximo »</button><button class=\'btn btn-default\' style=\'font-size: 12px;\' data-role=\'end\'><i class=\'fa fa-times\'></i></button></div></div>"
    },
    {
       element: "#step10",
        title: "Explicação",
        content: "Note que é possível realizar um filtro nos dados filtrados, através do campo 'Pesquisa' disponível na tabela, além de poder copiar os dados exibidos, exportar para o excel e gerar um pdf: <img src=\'http://192.168.0.25/portalvendasprepara/views/_img/filtro/03.jpg\' style=\'height: 40px;\' />",
        placement: "top",
        backdropContainer: "#wrapper",
        template: "<div class=\'popover tour\' style=\'max-width: 400px;\'><div class=\'arrow\'></div><h3 class=\'popover-title\'></h3><div class=\'popover-content\'></div><div class=\'popover-navigation\'><button class=\'btn btn-default\' style=\'font-size: 12px;\' data-role=\'prev\'>« Anterior</button><span data-role=\'separator\'> </span><button class=\'btn btn-default\' style=\'font-size: 12px;\' data-role=\'next\'>Próximo »</button><button class=\'btn btn-default\' style=\'font-size: 12px;\' data-role=\'end\'><i class=\'fa fa-times\'></i></button></div></div>"
    }]

}

function filtro(){

    $(".footable").footable();

    var filtrosExistentes = $("#filtrosExistentes").val();
    var jsonFiltrosExistentes = JSON.parse(filtrosExistentes);

    var coluna = jsonFiltrosExistentes["filtros"][2]["campo"];
    var tipoOrderBy = jsonFiltrosExistentes["filtros"][2]["tipo"];

    var ordenacaoCamposTabela = $("#ordenacaoCamposTabela").val();

    var array = ordenacaoCamposTabela.split(',');

    var arrayColunas = new Array();
    for(var i = 0; i < array.length; i++){

        var valor = array[i];

        if(String(valor) == "s"){
            arrayColunas.push(null);
        }else{
            var obj = new Object();
            obj.orderable = false;
            arrayColunas.push(obj);
        }

    }    

    $(".dataTables-example").DataTable({
        "dom": "lTfigtip",
        "tableTools": {
            "sSwfPath": "http://medcel.raizessolucoes.com.br/views/_js/plugins/dataTables/swf/copy_csv_xls_pdf.swf"
        },
        "paging": true,
        order: [[coluna, tipoOrderBy]],
        "columns": arrayColunas
        
        
    });

    $("[name=\'DataTables_Table_0_length\']").addClass("chosen-select");

    carregaFiltros();
    carregaFiltrosSelecionados();
    pluginChosen();

    var steps = stepsExplicacaoFiltro();
    // Instance the tour
    var tour = new Tour({
        steps: steps
    });

    // Initialize the tour
    tour.init();
    
    $("#startTour").click(function(){
        
        tour.restart();

        // Start the tour
        tour.start();
        
    })

}