

function removeFiltro(id){

    $("#filtro"+id).remove();
    $("#divisor"+id).remove();

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
     if((tecla>47 && tecla<58)) return true;
     else{
     if (tecla==8 || tecla==0) return true;
     else  return false;
     }
}

function teste(campo){
    

}

function carregaFiltros(){

    var urlIcon = "";
    var htmlCampo = "";
    var htmlOperadores = "";
    var tipoSelecionado = "";
    var dadoSelecionado = "";

    var campos = $("#campos").val();
    var jsonCampos = JSON.parse(campos);
    var qtdCampos = jsonCampos.campos.length;

    for(var i = 0; i < qtdCampos; i++){

        var dado = jsonCampos.campos[i].dado;
        var tipo = jsonCampos.campos[i].tipo;
        var valor = jsonCampos.campos[i].valor;
        var fk = jsonCampos.campos[i].fk;
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

            htmlCampo += "<option value=\'"+dado+"|"+tipo+""+valorEnum+"\' >"+dado+"</option>";
            tipoSelecionado = tipo;

        }else{

            htmlCampo += "<option value=\'"+dado+"|"+tipo+""+valorEnum+"\' >"+dado+"</option>";

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

        var valorEnum = arrayCampoSelecionado[2];
        var arrayValorEnum = valorEnum.split("-");

        var htmlValor = "<select name=\'valorFiltro[]\' id=\'valorFiltro1\' class=\'form-control\' style=\'width: 200px; padding: 0px 10px 3px; margin-left: 10px;\' >";
        
        for(var j = 0; j < arrayValorEnum.length; j++ ){

            htmlValor += "<option value=\'"+arrayValorEnum[j]+"\' >"+arrayValorEnum[j]+"</option>";

        }

        htmlValor += "</select>";

        $("#camposFiltro1").html(htmlValor);
    
    }else if(tipoSelecionado == "date"){

        $("#camposFiltro1").html("<input type=\'text\' name=\'valorFiltro[]\' id=\'valorFiltro1\' data-mask=\'99/99/9999\' class=\'\' style=\' width: 200px; height: 32px; padding: 0px 10px 3px; margin-left: 10px;\' />");

    }else if(tipoSelecionado == "int"){

        $("#camposFiltro1").html("<input type=\'text\' name=\'valorFiltro[]\' id=\'valorFiltro1\' onkeypress=\'return SomenteNumero(event);\' class=\'\' style=\' width: 200px; height: 32px; padding: 0px 10px 3px; margin-left: 10px;\' />");

    }else if(tipoSelecionado == "varchar"){

        $("#camposFiltro1").html("<input type=\'text\' name=\'valorFiltro[]\' id=\'valorFiltro1\' class=\'\' style=\' width: 200px; height: 32px; padding: 0px 10px 3px; margin-left: 10px;\' />");

    }

    $("#cbOperadores1").html(htmlOperadores);

}

function adicionarFiltros(){

    var filtroValor = $("#valorFiltro1").val();

    if(filtroValor.length > 0){

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

        if(tipo == "date"){

            arrayOperadorValor = operadorValor.split("|");
            var operacao = arrayOperadorValor[0];
            if(operacao == "between"){

                novoCamposFiltro = novoCamposFiltro.replace("valorFiltro1-1", "valorFiltro"+qtdFiltro+"-"+qtdFiltro);

                var filtroValor2 = $("#valorFiltro1-1").val();

            }

        }


        $("#filtros").append("<div class=\'hr-line-dashed\' id=\'divisor"+qtdFiltro+"\' ></div><div id=\'filtro"+qtdFiltro+"\'><div class=\'form-group\' ><select id=\'cbCampos"+qtdFiltro+"\' name=\'cbCampos[]\' class=\'form-control\' style=\'width: 200px; \' onchange=\'campos(this)\' >"+novoCbCampo+"</select><select id=\'cbOperadores"+qtdFiltro+"\' name=\'cbOperadores[]\' class=\'form-control\' style=\'width: 200px; margin-left: 3px;\' onchange=\'operadores(this)\' >"+novoCbOperadores+"</select><label id=\'camposFiltro"+qtdFiltro+"\'>"+novoCamposFiltro+"</label><span id=\'erroCampoFiltro"+qtdFiltro+"\'' style=\'margin-left: 15px; color: red; display: none;\''>Preencha o campo!</span></div><p id=\'removeFiltro"+qtdFiltro+"\' class=\'btn btn-danger\' style=\'float: right;\' onclick=\'removeFiltro("+qtdFiltro+")\' title=\'Remover Filtro\' >x</p></div></div>");

        $("#cbCampos"+qtdFiltro).val(campoValor);
        $("#cbOperadores"+qtdFiltro).val(operadorValor);
        $("#valorFiltro"+qtdFiltro).val(filtroValor);
        $("#valorFiltro"+qtdFiltro+"-"+qtdFiltro).val(filtroValor2);

        $("#btnLimparFiltros").show();

        qtdFiltro++;
        $("#qtdFiltro").val(qtdFiltro);

        $("#erroCampoFiltro1").hide();

    }else{

        $("#erroCampoFiltro1").show();

    }

}


function adicionarFiltrosExistente(campo, operador, valorFiltro){

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
                  url : "http://192.168.0.25/portalvendasprepara/pesquisa/fk",
                  data : {"sql" : fk
                         ,"id" : qtdFiltro
                         ,"acao" : "select"},
                  dataType : "html",
                  async: false,
                  success : function(data){

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

        if(j == 0){
            novoCbOperadores += "<option selected value=\'"+sinal+"|"+input+"\' >"+descricao+"</option>";
        }else{
            novoCbOperadores += "<option value=\'"+sinal+"|"+input+"\' >"+descricao+"</option>";
        }

    }

    arrayOperadorValor = operadorValor.split("|");
    var operacao = arrayOperadorValor[0];

    if(fk.length == 0){

        if(tipo == "enum"){

            var valorEnum = arrayCampoValor[2];
            var arrayValorEnum = valorEnum.split("-");

            novoCamposFiltro = "<select name=\'valorFiltro[]\' id=\'valorFiltro"+qtdFiltro+"\' class=\'form-control\' style=\'width: 200px; padding: 0px 10px 3px; margin-left: 10px;\' >";
            
            for(var j = 0; j < arrayValorEnum.length; j++ ){

                novoCamposFiltro += "<option value=\'"+arrayValorEnum[j]+"\' >"+arrayValorEnum[j]+"</option>";

            }

            novoCamposFiltro += "</select>";
        
        }else if(tipo == "date"){

            if(operacao == "between" || operacao == "not between"){

                novoCamposFiltro = "<input type=\'text\' name=\'valorFiltro[]\' id=\'valorFiltro"+qtdFiltro+"\' data-mask=\'99/99/9999\' class=\'\' style=\' width: 200px; height: 32px; padding: 0px 10px 3px; margin-left: 10px;\' /><input type=\'text\' name=\'valorFiltro[]\' id=\'valorFiltro"+qtdFiltro+"-"+qtdFiltro+"\' data-mask=\'99/99/9999\' class=\'\' style=\' width: 200px; height: 32px; padding: 0px 10px 3px; margin-left: 10px;\' />";

            }else if(operacao == "==" || operacao == "<>=="){

                novoCamposFiltro = "<input type=\'hidden\' name=\'valorFiltro[]\' id=\'valorFiltro"+qtdFiltro+"\' class=\'\' style=\' width: 200px; height: 32px; padding: 0px 10px 3px; margin-left: 10px;\' />";

            }else{

                novoCamposFiltro = "<input type=\'text\' name=\'valorFiltro[]\' id=\'valorFiltro"+qtdFiltro+"\' data-mask=\'99/99/9999\' class=\'\' style=\' width: 200px; height: 32px; padding: 0px 10px 3px; margin-left: 10px;\' />";

            }

        }else if(tipo == "int"){

            if(operacao == "==" || operacao == "<>=="){

                novoCamposFiltro = "<input type=\'hidden\' name=\'valorFiltro[]\' id=\'valorFiltro"+qtdFiltro+"\' class=\'\' style=\' width: 200px; height: 32px; padding: 0px 10px 3px; margin-left: 10px;\' />";

            }else if(operacao == "in" || operacao == "not in"){

                novoCamposFiltro = "<input type=\'text\' name=\'valorFiltro[]\' id=\'valorFiltro"+qtdFiltro+"\' class=\'\' style=\' width: 200px; height: 32px; padding: 0px 10px 3px; margin-left: 10px;\' />";

            }else{

                novoCamposFiltro = "<input type=\'text\' name=\'valorFiltro[]\' id=\'valorFiltro"+qtdFiltro+"\' onkeypress=\'return SomenteNumero(event);\' class=\'\' style=\' width: 200px; height: 32px; padding: 0px 10px 3px; margin-left: 10px;\' />";

            }

        }else if(tipo == "varchar"){


            if(operacao == "==" || operacao == "<>=="){

                novoCamposFiltro = "<input type=\'hidden\' name=\'valorFiltro[]\' id=\'valorFiltro"+qtdFiltro+"\' class=\'\' style=\' width: 200px; height: 32px; padding: 0px 10px 3px; margin-left: 10px;\' />";

            }else{

                novoCamposFiltro = "<input type=\'text\' name=\'valorFiltro[]\' id=\'valorFiltro"+qtdFiltro+"\' class=\'\' style=\' width: 200px; height: 32px; padding: 0px 10px 3px; margin-left: 10px;\' />";

            }


        }

    }
    
    $("#filtros").append("<div class=\'hr-line-dashed\' id=\'divisor"+qtdFiltro+"\' ></div><div id=\'filtro"+qtdFiltro+"\'><div class=\'form-group\' ><select id=\'cbCampos"+qtdFiltro+"\' name=\'cbCampos[]\' class=\'form-control\' style=\'width: 200px; \' onchange=\'campos(this)\' >"+novoCbCampo+"</select><select id=\'cbOperadores"+qtdFiltro+"\' name=\'cbOperadores[]\' class=\'form-control\' style=\'width: 200px; margin-left: 3px;\' onchange=\'operadores(this)\' >"+novoCbOperadores+"</select><label id=\'camposFiltro"+qtdFiltro+"\'>"+novoCamposFiltro+"</label><span id=\'erroCampoFiltro"+qtdFiltro+"\'' style=\'margin-left: 15px; color: red; display: none;\''>Preencha o campo!</span></div><p id=\'removeFiltro"+qtdFiltro+"\' class=\'btn btn-danger\' style=\'float: right;\' onclick=\'removeFiltro("+qtdFiltro+")\' title=\'Remover Filtro\' >x</p></div></div>");

    $("#cbCampos"+qtdFiltro).val(campoValor);

    $("#cbOperadores"+qtdFiltro).val(operador);

    if(tipo == "date"){

        if(operacao == "between"){

            valores = valorFiltro.split("|");

            $("#valorFiltro"+qtdFiltro).val(valores[0]);
            $("#valorFiltro"+qtdFiltro+"-"+qtdFiltro).val(valores[1]);

        }else{
            
            $("#valorFiltro"+qtdFiltro).val(valorFiltro);

        }

    }else{

        $("#valorFiltro"+qtdFiltro).val(valorFiltro);

    }

    $("#btnLimparFiltros").show();

    qtdFiltro++;
    $("#qtdFiltro").val(qtdFiltro);

}


function campos(campo){

    var campoId = campo.id;
    var id = campoId.replace("cbCampos", "");

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
                  url : "http://192.168.0.25/portalvendasprepara/pesquisa/fk",
                  data : {"sql" : fk
                         ,"id" : id
                         ,"acao" : "select"},
                  dataType : "text",
                  asynt: false,
                  success : function(data){

                    $("#camposFiltro"+id).html(data);

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

    $("#cbOperadores"+id).html(htmlOperadores);

    if(fk.length == 0){

        if(tipo == "enum"){

            var valorEnum = arrayCampoSelecionado[2];
            var arrayValorEnum = valorEnum.split("-");

            var htmlValor = "<select name=\'valorFiltro[]\' id=\'valorFiltro"+id+"\' class=\'form-control\' style=\'width: 200px; padding: 0px 10px 3px; margin-left: 10px;\' >";
            
            for(var j = 0; j < arrayValorEnum.length; j++ ){

                htmlValor += "<option value=\'"+arrayValorEnum[j]+"\' >"+arrayValorEnum[j]+"</option>";

            }

            htmlValor += "</select>";

            $("#camposFiltro"+id).html(htmlValor);
        
        }else if(tipo == "date"){

            $("#camposFiltro"+id).html("<input type=\'text\' name=\'valorFiltro[]\' id=\'valorFiltro"+id+"\' data-mask=\'99/99/9999\' class=\'\' style=\' width: 200px; height: 32px; padding: 0px 10px 3px; margin-left: 10px;\' />");

        }else if(tipo == "int"){

            $("#camposFiltro"+id).html("<input type=\'text\' name=\'valorFiltro[]\' id=\'valorFiltro"+id+"\' onkeypress=\'return SomenteNumero(event);\' class=\'\' style=\' width: 200px; height: 32px; padding: 0px 10px 3px; margin-left: 10px;\' />");

        }else if(tipo == "varchar"){

            $("#camposFiltro"+id).html("<input type=\'text\' name=\'valorFiltro[]\' id=\'valorFiltro"+id+"\' class=\'\' style=\' width: 200px; height: 32px; padding: 0px 10px 3px; margin-left: 10px;\' />");

        }

    }

}

function operadores(operador){

    var operadorId = operador.id;
    var id = operadorId.replace("cbOperadores", "");

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
                  url : "http://192.168.0.25/portalvendasprepara/pesquisa/fk",
                  data : {"sql" : fk
                         ,"id" : id
                         ,"acao" : "select"},
                  dataType : "text",
                  asynt: false,
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

                $("#camposFiltro"+id).html("<input type=\'text\' name=\'valorFiltro[]\' id=\'valorFiltro"+id+"\' data-mask=\'99/99/9999\' class=\'\' style=\' width: 200px; height: 32px; padding: 0px 10px 3px; margin-left: 10px;\' /><input type=\'text\' name=\'valorFiltro[]\' id=\'valorFiltro"+id+"-"+id+"\' data-mask=\'99/99/9999\' class=\'\' style=\' width: 200px; height: 32px; padding: 0px 10px 3px; margin-left: 10px;\' />");

            }else if(operacao == "==" || operacao == "<>=="){

                $("#camposFiltro"+id).html("<input type=\'hidden\' name=\'valorFiltro[]\' id=\'valorFiltro"+id+"\' class=\'\' style=\' width: 200px; height: 32px; padding: 0px 10px 3px; margin-left: 10px;\' />");

            }else{

                $("#camposFiltro"+id).html("<input type=\'text\' name=\'valorFiltro[]\' id=\'valorFiltro"+id+"\' data-mask=\'99/99/9999\' class=\'\' style=\' width: 200px; height: 32px; padding: 0px 10px 3px; margin-left: 10px;\' />");

            }
        }else if(tipo == "varchar"){

            if(operacao == "==" || operacao == "<>=="){

                $("#camposFiltro"+id).html("<input type=\'hidden\' name=\'valorFiltro[]\' id=\'valorFiltro"+id+"\' class=\'\' style=\' width: 200px; height: 32px; padding: 0px 10px 3px; margin-left: 10px;\' />");


            }else{

                $("#camposFiltro"+id).html("<input type=\'text\' name=\'valorFiltro[]\' id=\'valorFiltro"+id+"\' class=\'\' style=\' width: 200px; height: 32px; padding: 0px 10px 3px; margin-left: 10px;\' />");

            }

        }else if(tipo == "int"){

            if(operacao == "==" || operacao == "<>=="){

                $("#camposFiltro"+id).html("<input type=\'hidden\' name=\'valorFiltro[]\' id=\'valorFiltro"+id+"\' class=\'\' style=\' width: 200px; height: 32px; padding: 0px 10px 3px; margin-left: 10px;\' />");


            }else if(operacao == "in" || operacao == "not in"){

                $("#camposFiltro"+id).html("<input type=\'text\' name=\'valorFiltro[]\' id=\'valorFiltro"+id+"\' class=\'\' style=\' width: 200px; height: 32px; padding: 0px 10px 3px; margin-left: 10px;\' />");

            }else{

                $("#camposFiltro"+id).html("<input type=\'text\' name=\'valorFiltro[]\' id=\'valorFiltro"+id+"\' onkeypress=\'return SomenteNumero(event);\' class=\'\' style=\' width: 200px; height: 32px; padding: 0px 10px 3px; margin-left: 10px;\' />");

            }

        }

    }


}


function carregaFiltrosSelecionados(){

    var filtrosExistentes = $("#filtrosExistentes").val();

    if(filtrosExistentes.length > 0){

        var jsonFiltrosExistentes = JSON.parse(filtrosExistentes);
        var qtdFiltroExistente = jsonFiltrosExistentes["filtros"][0].length;
        //var qtdFiltroExistente = 0;
        for(var i = 0; i < qtdFiltroExistente; i++){

            var campo = jsonFiltrosExistentes["filtros"][0][i].campo;
            var operador = jsonFiltrosExistentes["filtros"][0][i].operador;
            var valorFiltro = jsonFiltrosExistentes["filtros"][0][i].valor;

            adicionarFiltrosExistente(campo, operador, valorFiltro);

        }

        if(jsonFiltrosExistentes["filtros"][1]['limite'] > 0){

            $("#limiteFiltro").val(jsonFiltrosExistentes["filtros"][1]['limite']);

        }

    }

}

function validaCamposFiltros(){

    var qtdFiltro = $("#qtdFiltro").val();
    var valida = true;

    for(var i = 2; i <= qtdFiltro; i++){

        if($("#valorFiltro"+i).length){

            var valor = $("#valorFiltro"+i).val();

            if(valor.length == 0){

                $("#erroCampoFiltro"+i).show();
                valida = false;

            }else{

                $("#erroCampoFiltro"+i).hide();

            }

        }

    }

    return valida;

}

function limparFiltros(){

    var qtdFiltro = $("#qtdFiltro").val();

    for(var i = 2; i < qtdFiltro; i++){

        removeFiltro(i);

    }

    $("#btnLimparFiltros").hide();

}