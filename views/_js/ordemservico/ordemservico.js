$(document).ready(function(){
    $("#pesquisar").click(function(e){
        e.preventDefault();
        $('#modal-pacientes').modal('show');
    });
    $("#novo").click(function(e){
        e.preventDefault();
        $('#modal-novo').modal('show');
        $("#data_nasc").mask('00/00/0000');
    });
    valorExame();
    
});

function pesquisarCliente(){
    var nome = $("#nome").val();
    $.post( home_uri + "/ordemservico/pesquisarcliente", { nome: nome })
        .done(function( data ) {
            var obj = JSON.parse(data);
            var table = "";
            $("#body").html("");
            for(i = 0; i < obj.length; i++){
                table += "<tr><th scope='row'>"+obj[i].idPaciente+"</th><td id='nome-"+obj[i].idPaciente+"'>"+obj[i].Nome+"</td><td>"+obj[i].Data_Nasc+"</td><td>"+obj[i].Sexo+"</td><td><button class='btn btn-primary' onclick='selecionarPaciente("+obj[i].idPaciente+")'>OK</button></td></tr>";
            }
            $("#body").html(table);
            $("#table").show();
    });
}

function selecionarPaciente(idPaciente){
    $('#modal-pacientes').modal('hide');
    $('#idPaciente').val(idPaciente);
    $('#paciente').val($("#nome-" + idPaciente).html());
}

function valorExame(){
    var idExame = $('#exame').val();
    $.post( home_uri + "/ordemservico/buscarvalorexame", { idExame: idExame })
        .done(function( data ) {
            $("#valor_exame").val(data);
    });
    
}

function confirmaNovoPaciente(){
    var nome_paciente = $("#nome_paciente").val();
    var data_nasc = $("#data_nasc").val();
    var sexo = $("#sexo").val();
    var endereco = $("#endereco").val();
    $.post( home_uri + "/ordemservico/salvarpaciente", { nome_paciente: nome_paciente, data_nasc: data_nasc, sexo: sexo, endereco: endereco })
        .done(function( data ) {
            if(data != "Erro"){
                $('#idPaciente').val(data);
                $('#paciente').val(nome_paciente);
                $('#modal-novo').modal('hide');
            }
    });
}