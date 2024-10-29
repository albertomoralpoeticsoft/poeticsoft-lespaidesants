<?php 

add_action( 
	'wp_enqueue_scripts', 
	function () {

    wp_enqueue_script(
      'poeticsoft-lespaidesants-app-js', 
      plugin_dir_url(__DIR__) . 'app/js-css/main.js',
      array(
        'jquery'
      ), 
      filemtime(plugin_dir_path(__DIR__) . 'app/js-css/main.js'),
      true
    );

		wp_enqueue_style( 
			'poeticsoft-lespaidesants-app-css',
			plugin_dir_url(__DIR__) . 'app/js-css/main.css',
			array(
        'astra-theme-css'
      ), 
			filemtime(plugin_dir_path(__DIR__) . 'app/js-css/main.css'),
			'all' 
		);
  }
);