<?php
/**
 * Configuração geral
 */

// Código de Indentificação do Sistema
define('CODIGO_SISTEMA', 100);

// Caminho para a raiz
define( 'ABSPATH', dirname( __FILE__ ) );

// Caminho para a pasta do tema
define( 'THEME_ABSPATH', 'http://testeshift.ti' );

// URL da home
define( 'HOME_URI', 'http://testeshift.ti' );

// Caminho para a pasta de uploads
define( 'UP_ABSPATH', HOME_URI . '/views/_uploads/' );

define( 'HOSTNAME', '127.0.0.1' );
define( 'DB_NAME', 'teste_shift' );
define( 'DB_USER', 'root' );
define( 'DB_PASSWORD', '123456');


// Charset da conexão PDO
define( 'DB_CHARSET', 'utf8' );

// Se você estiver desenvolvendo, modifique o valor para true
define( 'DEBUG', false );

date_default_timezone_set('America/Sao_Paulo');

/**
 * Não edite daqui em diante
 */

// Carrega o loader, que vai carregar a aplicação inteira
require_once ABSPATH . '/loader.php';
?>