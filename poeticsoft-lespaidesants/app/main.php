<?php 

add_action( 
	'wp_enqueue_scripts', 
	function () {

    wp_enqueue_script(
      'poeticsoft-lespaidesants-flickity-js', 
      plugin_dir_url(__DIR__) . 'app/js-css/flickity.pkgd.min.js',
      [
        'jquery'
      ], 
      filemtime(plugin_dir_path(__DIR__) . 'app/js-css/flickity.pkgd.min.js'),
      true
    );

    wp_enqueue_script(
      'poeticsoft-lespaidesants-app-js', 
      plugin_dir_url(__DIR__) . 'app/js-css/main.js',
      [
        'poeticsoft-lespaidesants-flickity-js'
      ], 
      filemtime(plugin_dir_path(__DIR__) . 'app/js-css/main.js'),
      true
    );

		wp_enqueue_style( 
			'poeticsoft-lespaidesants-flickity-css',
			plugin_dir_url(__DIR__) . 'app/js-css/flickity.css', 
			[], 
			filemtime(plugin_dir_path(__DIR__) . 'app/js-css/flickity.css'),
			'all' 
		);

		wp_enqueue_style( 
			'poeticsoft-lespaidesants-app-css',
			plugin_dir_url(__DIR__) . 'app/js-css/main.css',
			[], 
			filemtime(plugin_dir_path(__DIR__) . 'app/js-css/main.css'),
			'all' 
		);
  }
);