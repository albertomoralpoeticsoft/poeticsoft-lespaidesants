<?php

/**
*
* Plugin Name: poeticsoft-lespaidesants
* Plugin URI: https://poeticsoft.com/plugins/lespaidesants
* Description: Poeticsoft L'espai de Sants Plugin
* Version: 0.00
* Author: Poeticsoft Team
* Author URI: https://poeticsoft.com/about
*/

// Calendar -- AIzaSyC9mAJ8ylhMf_nXJm0RSUVNhx3DUmh2HiI

function core_log($display) { 

  $text = is_string($display) ? $display : json_encode($display, JSON_PRETTY_PRINT);

  file_put_contents(
    WP_CONTENT_DIR . '/core_log.txt',
    $text . PHP_EOL,
    FILE_APPEND
  );
}

add_filter('xmlrpc_enabled', '__return_false');
add_filter('login_display_language_dropdown', '__return_false');

require_once(dirname(__FILE__) . '/editor/main.php');
require_once(dirname(__FILE__) . '/app/main.php');
require_once(dirname(__FILE__) . '/reservas/main.php');
require_once(dirname(__FILE__) . '/mail/main.php');
require_once(dirname(__FILE__) . '/analytics/main.php');
