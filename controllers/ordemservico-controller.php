<?php

/**
 * home - Controller de exemplo
 *
 * @package TutsupMVC
 * @since 0.1
 */
class OrdemservicoController extends MainController {

  //INDEX - Listagem
  public function index() {
      exibir_erros();
     
          $this->title = 'Ordem de serviço';

          $ordemservico = $this->load_model('ordemservico/ordemservico-model');

          $lista_medicos = $ordemservico->listar_medicos();
          $lista_exames = $ordemservico->listar_exames();
          $lista_postos_coleta = $ordemservico->listar_postos_coleta();
          // var_dump_pre($lista_exames); die;

        //Fim controle
        // echo "dasd"; die;
          require ABSPATH . '/views/_includes/content.php';
          

          require ABSPATH . '/views/ordemservico/ordemservico-view.php';

          require ABSPATH . '/views/_includes/footer.php';


        echo '
          <script src="'.HOME_URI.'/views/_js/plugins/footable/footable.all.min.js"></script>

          <!-- Data picker -->
          <link href="'.HOME_URI.'/views/_css/plugins/datapicker/datepicker3.css" rel="stylesheet">
          <script src="'.HOME_URI.'/views/_js/plugins/datapicker/bootstrap-datepicker.js"></script>

          <!-- Data Tables -->
          <script src="'.HOME_URI.'/views/_js/plugins/dataTables/datatables.min.js"></script>


          
          <!-- Chosen -->
          <link href="'.HOME_URI.'/views/_css/plugins/chosen/chosen.css" rel="stylesheet">

          <script src="'.HOME_URI.'/views/_js/plugins/chosen/chosen.jquery.js"></script>

          <script src="'.HOME_URI.'/views/_js/plugins/fancybox3/dist/jquery.fancybox.min.js"></script>
          <script src="'.HOME_URI.'/views/_js/jquery.mask.min.js"></script>

          <script src="'.HOME_URI.'/views/_js/plugins/daterangepicker/daterangepicker.js"></script>
          <script src="'.HOME_URI.'/views/_js/ordemservico/ordemservico.js"></script>
          <script>

        </script>';
      
  }// index

  public function pesquisarcliente(){
    $ordemservico = $this->load_model('ordemservico/ordemservico-model');
    $nome = $_POST["nome"];
    $paciente = $ordemservico->buscar_paciente($nome);
    echo json_encode($paciente);
  }

  public function salvarpaciente(){
    $ordemservico = $this->load_model('ordemservico/ordemservico-model');
    $nome_paciente = $_POST["nome_paciente"];
    $data_nasc = $_POST["data_nasc"];
    $data_nasc = explode("/", $data_nasc);
    $data_nasc = $data_nasc[2]."-".$data_nasc[1]."-".$data_nasc[0];
    $sexo = $_POST["sexo"];
    $endereco = $_POST["endereco"];
    $idPaciente = $ordemservico->inserir_paciente($nome_paciente, $data_nasc, $sexo, $endereco);
    if(isset($idPaciente)){
      echo $idPaciente;
    } else {
      echo "Erro";
    } 
  }

  public function buscarvalorexame(){
    $ordemservico = $this->load_model('ordemservico/ordemservico-model');
    $idExame = $_POST["idExame"];
    $valor_exame = $ordemservico->buscar_valor_exame($idExame);
    echo $valor_exame;
  }

  public function salvarordemservico(){
    $ordemservico = $this->load_model('ordemservico/ordemservico-model');
    $idPaciente = $_POST["idPaciente"];
    $idMedico = $_POST["medico"];
    $idExame = $_POST["exame"];
    $idPostoColeta = $_POST["posto_coleta"];
    $convenio = $_POST["convenio"];
    $valor = $ordemservico->buscar_valor_exame($idExame);
    $idOrdemServico = $ordemservico->inserir_ordem_servico($idPaciente, $convenio, $idPostoColeta, $idMedico);
    $idOrdemServicoExame = $ordemservico->inserir_ordem_servico_exame($idOrdemServico, $idExame, $valor);
    header("Location: ".HOME_URI."/ordemservico");
  }

} //CodigobarrasController
