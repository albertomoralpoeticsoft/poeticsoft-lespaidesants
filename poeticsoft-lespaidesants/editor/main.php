<?php

add_action( 
  'init', 
  function () {

    require_once(WP_PLUGIN_DIR . '/poeticsoft-lespaidesants/editor/reservas/callback.php');

    wp_register_script(
      'lespaidesants-plugin-block-reservas-js', 
      plugin_dir_url( __FILE__ ) . 'reservas/main.js',
      [
        'wp-blocks',
        'wp-block-editor',
        'wp-element',
        'wp-components',
        'wp-data',
        'wp-hooks',
        'lodash'
      ], 
      filemtime(WP_PLUGIN_DIR . '/poeticsoft-lespaidesants/editor/reservas/main.js'),
      true
    );

    wp_register_style( 
      'lespaidesants-plugin-block-reservas-css',
      plugin_dir_url( __FILE__ ) . 'reservas/main.css', 
      [],
      filemtime(WP_PLUGIN_DIR . '/poeticsoft-lespaidesants/editor/reservas/main.css'),
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