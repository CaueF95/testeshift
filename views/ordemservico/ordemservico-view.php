<style type="text/css">
    .centralizar {
        text-align: center;
    }

    .width100 {
        width: 100%;
    }

    .invisivel {
        display: none;
    }

    .negrito {
        font-weight: bold;
    }

    .table-responsive {
        overflow-x: unset !important;
    }

    .chosen-container {
        width: 100% !important;
    }

    .chosen-container-single {
        width: 100% !important;
    }

    #DataTables_Table_0_length {
        margin-right: 20px !important;
    }

    .marginTop {
        margin-top: 10px;
    }

    .marginleft {
        margin-left: 15px;
    }

    .validaButton {
        margin-top: 24px;
        margin-left: -18px;
    }

    .marginEndereco {
        margin-left: 10px;
        margin-right: 10px;
    }

    .botao {
        border-radius: .8rem;
    }

    .menuButtons {
        height: auto;
        width: 40px;
        margin-left: 3px;
    }

    .enderecoManual {
        color: black;
    }
</style>

<link rel="stylesheet" href="<?php echo HOME_URI; ?>/views/_css/plugins/animate.css" />
<link href="<?php echo HOME_URI; ?>/views/_css/plugins/footable/footable.core.css" rel="stylesheet">

<!-- Data Tables -->
<link rel="stylesheet" href="https://gyrocode.github.io/jquery-datatables-checkboxes/1.2.11/css/dataTables.checkboxes.css">
<link href="<?php echo HOME_URI; ?>/views/_css/plugins/dataTables/dataTables.bootstrap.css" rel="stylesheet">
<link href="https://cdn.datatables.net/1.10.16/css/jquery.dataTables.min.css" rel="stylesheet">
<link href="<?php echo HOME_URI; ?>/views/_css/plugins/dataTables/dataTables.responsive.css" rel="stylesheet">
<link href="<?php echo HOME_URI; ?>/views/_css/plugins/dataTables/dataTables.tableTools.min.css" rel="stylesheet">
<link href="<?php echo HOME_URI; ?>/views/_css/plugins/iCheck/skins/square/orange.css" rel="stylesheet">

<meta http-equiv="Cache-Control" content="no-store" />

<script>
    var home_uri = '<?= HOME_URI ?>';
</script>

<div>
    <div class="main-content">
        <div class="content-table">
            <div class="ibox float-e-margins">
                <div class="ibox-title centralizado">
                    <h2>Ordem de Serviço </h2>
                    <div class="ibox-tools">
                        <a class="collapse-link">
                            <i class="fa fa-chevron-up"></i>
                        </a>
                    </div>
                </div>
                <div class="ibox-content">
                    <form class="form-horizontal" method="post" action="<?php echo HOME_URI ?>/ordemservico/salvarordemservico">
                        <div class="row marginTop">
                            <div class="col-md-4">
                                <label for="paciente" class="control-label">Paciente</label>
                                <input class="form-control" type="text" placeholder="Selecione um paciente" name="paciente" id="paciente" disabled>
                                <input type="hidden" name="idPaciente" id="idPaciente">
                            </div>
                            <div class="col-md-2">
                                <label>&nbsp;</label>
                                <button class="btn btn-primary" id="pesquisar" style="width: 100%">Pesquisar</button>
                            </div>
                            <div class="col-md-2">
                                <label>&nbsp;</label>
                                <button class="btn btn-primary" style="width: 100%" id="novo">Novo</button>
                            </div>
                            

                        </div>
                        <div class="row marginTop">
                            <div class="col-md-4">
                                <label for="medico" class="control-label">Médico</label>
                                <select class="chosen-select form-control" id="medico" name="medico">
                                    <?php foreach ($lista_medicos as $index => $value) { ?>
                                        <option value="<?= $value['idMedico'] ?>"><?= $value['Medico'] ?></option>
                                    <?php } ?>
                                </select>
                            </div>
                            <div class="col-md-4">
                                <label for="exame" class="control-label">Exame</label>
                                <select class="chosen-select form-control" id="exame" name="exame" onchange="valorExame()">
                                    <?php foreach ($lista_exames as $index => $value) { ?>
                                        <option value="<?= $value['idExame'] ?>"><?= $value['Descricao'] ?></option>
                                    <?php } ?>
                                </select>
                            </div>
                            <div class="col-md-4">
                                <label for="valor_exame" class="control-label">Valor</label>
                                <input class='form-control input-datapicker data' type="text" id="valor_exame" name="valor_exame" disabled>
                            </div>
                            
                        </div>
                        <div class="row marginTop">
                            <div class="col-md-4">
                                <label for="posto_coleta" class="control-label">Posto de coleta</label>
                                <select class="chosen-select form-control" id="posto_coleta" name="posto_coleta">
                                    <?php foreach ($lista_postos_coleta as $index => $value) { ?>
                                        <option value="<?= $value['idPostoColeta'] ?>"><?= $value['PostoColeta'] ?></option>
                                    <?php } ?>
                                </select>
                            </div>
                            <div class="col-md-4">
                                <label for="convenio" class="control-label">Convênio</label>
                                <select class="chosen-select form-control" id="convenio" name="convenio">
                                    <option value="Unimed">Unimed</option>
                                    <option value="Cassi">Cassi</option>
                                    <option value="Bradesco">Bradesco</option>
                                    <option value="Saúde">Saúde</option>
                                    <option value="HB Saúde">HB Saúde</option>
                                    <option value="Outros">Outros</option>
                                </select>
                            </div>
                        </div>
                        <div class="row marginTop">
                            <div class="col-md-6">
                                <input class='btn btn-secondary width100' type="button" value='Voltar'>
                            </div>
                            <div class="col-md-6">
                                <button type="submit" class='btn btn-primary width100' type="button" id="salvar">Confirmar</button>
                            </div>
                        </div>
                        </hr>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modal-pacientes" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Selecione o Paciente</h5>
            </div>
            <div id='modal-body-you' class="modal-body">
                <div class="row">
                    <div class="col-md-8">
                        <label for="nome" class="control-label">Nome</label>
                        <input class="form-control" type="text" placeholder="Digite o nome" id="nome">
                    </div>
                    <div class="col-md-4">
                        <label>&nbsp;</label>
                        <button class="btn btn-primary" style="width: 100%" onclick="pesquisarCliente()">Pesquisar</button>
                    </div>
                </div>
                <table class="table table-bordered marginTop" id="table" style="display:none">
                    <thead>
                        <tr>
                            <th scope="col">Código</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Data Nascimento</th>
                            <th scope="col">Sexo</th>
                            <th scope="col">Selecionar</th>
                        </tr>
                    </thead>
                    <tbody id="body">
                    </tbody>
                </table>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modal-novo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Selecione o Paciente</h5>
            </div>
            <div id='modal-body-you' class="modal-body">
                <div class="row">
                    <div class="col-md-8">
                        <label for="nome" class="control-label">Nome</label>
                        <input class="form-control" type="text" placeholder="Digite o nome" id="nome_paciente">
                    </div>
                    <div class="col-md-4">
                        <label for="nome" class="control-label">Data de nascimento</label>
                        <input class="form-control" type="text" placeholder="Digite a data" id="data_nasc">
                    </div>
                    <div class="col-md-4">
                        <label for="nome" class="control-label">Sexo</label>
                        <select class="chosen-select form-control" id="sexo" name="sexo">
                            <option value="Masculino">Masculino</option>
                            <option value="Feminino">Feminino</option>
                            <option value="Outros">Outros</option>
                        </select>
                    </div>
                    <div class="col-md-8">
                        <label for="nome" class="control-label">Endereço</label>
                        <input class="form-control" type="text" placeholder="Digite o endereco" id="endereco">
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                <button type="button" class="btn btn-primary" id="confirmaNovoPaciente" onclick="confirmaNovoPaciente()">Confirmar</button>
            </div>
        </div>
    </div>
</div>

<script>
    var home_uri = '<?= HOME_URI ?>';
</script>