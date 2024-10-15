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

require_once(dirname(__FILE__) . '/mail.php');
require_once(dirname(__FILE__) . '/analytics/main.php');
require_once(dirname(__FILE__) . '/scripts.php');
require_once(dirname(__FILE__) . '/reservas/main.php');

register_activation_hook(
	__FILE__,
	function() {
    
    lespaidesants_plugin_reservas_init();
  }
);

/**
* Init
*/

add_action( 
  'init', 
  function () {

    /**
    * Dynamic blocks
    */ 

    // Reservas 

    require_once(WP_PLUGIN_DIR . '/poeticsoft-lespaidesants/block/reservas/callback.php');

    wp_register_script(
      'lespaidesants-plugin-block-reservas-js', 
      plugin_dir_url( __FILE__ ) . 'block/reservas/main.js',
      [], 
      filemtime(WP_PLUGIN_DIR . '/poeticsoft-lespaidesants/block/reservas/main.js'),
      true
    );

    wp_register_style( 
      'lespaidesants-plugin-block-reservas-css',
      plugin_dir_url( __FILE__ ) . 'block/reservas/main.css', 
      [],
      filemtime(WP_PLUGIN_DIR . '/poeticsoft-lespaidesants/block/reservas/main.css'),
      'all' 
    );  

    register_block_type( 
      'lespaidesants/reservas', 
      [
        'editor_script' => 'lespaidesants-plugin-block-reservas-js',
        'style' => 'lespaidesants-plugin-block-reservas-css',
        'render_callback' => 'lespaidesants_plugin_block_reservas_callback'
      ]
    );
  }
);   

// Blocks category

add_filter(
  'block_categories_all',
  function ($categories, $post) {

    return array_merge(
      $categories,
      array(
        array(
          'slug' => 'lespaidesants',
          'title' => __(
            'L\'Espai de Sants',
            'lespaidesants' 
          ),
        ),
      )
    );
  },
  10,
  2
);