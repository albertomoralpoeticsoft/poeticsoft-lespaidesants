<?php 

add_action( 
	'wp_enqueue_scripts', 
	function () {

    wp_enqueue_script(
      'poeticsoft-lespaidesants-app-js', 
      plugin_dir_url(__DIR__) . 'poeticsoft-lespaidesants/app/main.js',
      array(
        'jquery',
        'jquery-ui-dialog',
        'jquery-form',
        'jquery-ui-tooltip',
        'jquery-ui-datepicker'
      ), 
      filemtime(plugin_dir_path(__DIR__) . 'poeticsoft-lespaidesants/app/main.js'),
      true
    );

		wp_enqueue_style( 
			'poeticsoft-lespaidesants-app-css',
			plugin_dir_url(__DIR__) . 'poeticsoft-lespaidesants/app/main.css',
			array(
        'astra-theme-css'
      ), 
			filemtime(plugin_dir_path(__DIR__) . 'poeticsoft-lespaidesants/app/main.css'),
			'all' 
		);
  }
);