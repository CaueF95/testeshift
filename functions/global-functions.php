<?php
/**
 * Verifica chaves de arrays
 *
 * Verifica se a chave existe no array e se ela tem algum valor.
 * Obs.: Essa função está no escopo global, pois, vamos precisar muito da mesma.
 *
 * @param array  $array O array
 * @param string $key   A chave do array
 * @return string|null  O valor da chave do array ou nulo
 */
function chk_array ( $array, $key ) {
	// Verifica se a chave existe no array
	if ( isset( $array[ $key ] ) && ! empty( $array[ $key ] ) ) {
		// Retorna o valor da chave
		return $array[ $key ];
	}
	
	// Retorna nulo por padrão
	return null;
} // chk_array

/**
 * Função para carregar automaticamente todas as classes padrão
 * Ver: http://php.net/manual/pt_BR/function.autoload.php.
 * Nossas classes estão na pasta classes/.
 * O nome do arquivo deverá ser class-NomeDaClasse.php.
 * Por exemplo: para a classe TutsupMVC, o arquivo vai chamar class-TutsupMVC.php
 */

function removeBOM($string) {
    $bom = pack('H*','EFBBBF');
    $string = preg_replace("/^$bom/", '', $string);
    return $string;
}

function __autoload($class_name) {
	if (!(strpos($class_name, 'PHPExcel_') !== false) && !(strpos($class_name, 'Transportadora') !== false))
	{
		$file = ABSPATH . '/classes/class-' . $class_name . '.php';
	}
	else 
	{
		if ((strpos($class_name, 'Transportadora') !== false))
		{
			$class_name = str_replace("Transportadora", "", $class_name);
			$file = ABSPATH .'/includes/Transportadoras/'.$class_name.'.php';
		}
		else
		{
			$file = ABSPATH .'/includes/PHPExcel/'.str_replace('_',DIRECTORY_SEPARATOR,$class_name).'.php';
	   	}
   	}
	
	// Inclui o arquivo da classe
    require_once $file;
} // __autoload


function formataData($data){
    $data = explode('-', $data);
    list($dia, $mes, $ano) = $data;
    $data = $ano.'/'.$mes.'/'.$dia;
    
    return $data;
}
function var_dump_pre($objeto)
{
	echo '<pre>';
	var_dump($objeto);
	echo '</pre>';
}

function exibir_erros()
{
	ini_set('display_errors',1);
	ini_set('display_startup_erros',1);
	error_reporting(E_ALL);
}

function trocaVirgulaPonto($numero){
    return str_replace(',', '.', $numero);
}

function retornaDataDomingoSemana(){

	$data = date('Y-m-d');
	$dia = 0;
	
	while(date('w', strtotime($data)) != 0){

		$data = date('Y-m-d', strtotime("-".$dia." days"));
		$dia++;
	}
	
	return $data;
	
}

function formatadataexcel($data){

	if (isset($data)) {
	  $data = str_replace("-", "/", $data);
	  $temp = substr($data, -3);
	  if ($temp == "/18") {

	    $data = $data."-";
	    $data = str_replace("/18-", "/2018", $data);

	  }
	}


	return $data;
	
}