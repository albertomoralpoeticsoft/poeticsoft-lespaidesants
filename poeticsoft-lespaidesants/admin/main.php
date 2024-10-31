<?php 

add_action( 
	'admin_enqueue_scripts', 
	function () {

    wp_enqueue_script(
      'poeticsoft-lespaidesants-admin-js', 
      plugin_dir_url(__DIR__) . 'admin/js-css/main.js',
      [], 
      filemtime(plugin_dir_path(__DIR__) . 'admin/js-css/main.js'),
      true
    );

		wp_enqueue_style( 
			'poeticsoft-lespaidesants-admin-css',
			plugin_dir_url(__DIR__) . 'admin/js-css/main.css',
			[], 
			filemtime(plugin_dir_path(__DIR__) . 'admin/js-css/main.css'),
			'all' 
		);
  }
);