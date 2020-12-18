<?php

class OrdemservicoModel extends MainModel
{
    //ação da operação
    public $acao;

    //Retorna a identificação da pessoa
    public $id;
    
    public function __construct( $db = false, $controller = null ) {

        // Configura o DB (PDO) - Elos
        $this->DBMysql = $controller->DBMysql;
        $this->DBMysql->connect();
        

        // Configura o controlador
        $this->controller = $controller;

        // Configura os parâmetros
        $this->parametros = $this->controller->parametros;

        // Configura os dados do usuário
        $this->userdata = $this->controller->userdata;

    }

    public function listar_medicos(){
        $sql = "SELECT m.idMedico
                        , CONCAT(m.Nome, ' - ', m.Especialidade) AS Medico
                FROM medico m";
        $parametros = array();
        $query = $this->DBMysql->query($sql, $parametros);
        return $query->fetchAll();
    }

    public function listar_exames(){
        $sql = "SELECT e.idExame
                        , e.Descricao
                        , e.Preco
                FROM exame e";
        $parametros = array();
        $query = $this->DBMysql->query($sql, $parametros);
        return $query->fetchAll();
    }

    public function buscar_valor_exame($idExame){
        $sql = "SELECT e.idExame
                        , e.Descricao
                        , e.Preco
                FROM exame e
                WHERE e.idExame = ?";
        $parametros = array($idExame);
        $query = $this->DBMysql->query($sql, $parametros);
        $retorno = $query->fetchAll();
        return isset($retorno[0]["Preco"]) ? $retorno[0]["Preco"] : null;
    }

    public function listar_postos_coleta(){
        $sql = "SELECT pc.idPostoColeta
                        , CONCAT(pc.Descricao, ' - ', pc.Endereco) AS PostoColeta
                FROM posto_coleta pc";
        $parametros = array();
        $query = $this->DBMysql->query($sql, $parametros);
        return $query->fetchAll();
    }


    public function buscar_paciente($nome){
        $sql = "SELECT p.idPaciente
                        , p.Nome
                        , DATE_FORMAT(p.Data_Nasc, '%d/%m/%Y') as Data_Nasc
                        , p.Sexo
                        , p.Endereco
                FROM paciente p
                WHERE UPPER(p.Nome) LIKE UPPER(?)";
        $parametros = array('%'.$nome.'%');
        $query = $this->DBMysql->query($sql, $parametros);
        return $query->fetchAll();
    }

    public function inserir_paciente($nome_paciente, $data_nasc, $sexo, $endereco){
        $sql = "INSERT INTO paciente (Nome, Data_Nasc, Sexo, Endereco) VALUES (?, ?, ?, ?)";

        $parametros = array($nome_paciente, $data_nasc, $sexo, $endereco);

        $query = $this->DBMysql->query($sql,$parametros);

        return $this->DBMysql->lastInsertId(); 
    }
   

    public function inserir_ordem_servico($idPaciente, $Convenio, $idPostoColeta, $idMedico){
        $sql = "INSERT INTO ordem_servico (idPaciente, Convenio, idPostoColeta, idMedico) VALUES (?, ?, ?, ?)";
        $parametros = array($idPaciente, $Convenio, $idPostoColeta, $idMedico);

        $query = $this->DBMysql->query($sql,$parametros);

        return $this->DBMysql->lastInsertId(); 
    }

    public function inserir_ordem_servico_exame($idOrdemServico, $idExame, $Preco){
        $sql = "INSERT INTO ordemservicoexame (idOrdemServico, idExame, Preco) VALUES (?, ?, ?)";
        $parametros = array($idOrdemServico, $idExame, $Preco);

        $query = $this->DBMysql->query($sql,$parametros);

        return $this->DBMysql->lastInsertId(); 
    }
    

   

 
}
?>
