<?php

function lespaidesants_reservas_product_create( WP_REST_Request $req ) {
      
  $res = new WP_REST_Response(); 

  try { 

    $post_id = wp_insert_post(array(
      'post_title' => 'Sample Product',
      'post_content' => 'This is a sample product created programmatically.',
      'post_status' => 'publish',
      'post_type' => 'product',
    ));

    if ($post_id) {
      wp_set_object_terms($post_id, 'simple', 'product_type');
      update_post_meta($post_id, '_regular_price', '19.99');
      update_post_meta($post_id, '_price', '19.99');
      update_post_meta($post_id, '_sku', 'sample-product-sku');
      update_post_meta($post_id, '_stock_status', 'instock');
      update_post_meta($post_id, '_stock', '100');
      update_post_meta($post_id, '_visibility', 'visible');
      $image_id = attachment_url_to_postid('https://yourwebsite.com/path/to/image.jpg');
      set_post_thumbnail($post_id, $image_id);
      wp_set_object_terms(
        $post_id, 
        [
          'Category 1', 
          'Category 2'
        ], 
        'product_cat'
      );

      $res->set_data('created');

    } else {

      $res->set_data('cagada');
    }
  
  } catch (Exception $e) {
    
    $res->set_status($e->getCode());
    $res->set_data($e->getMessage());
  }

  return $res;
}

add_action(
  'rest_api_init',
  function () {

    register_rest_route(
      'lespaidesants/reservas',
      'product/create',
      [
        'methods'  => 'GET',
        'callback' => 'lespaidesants_reservas_product_create',
        'permission_callback' => '__return_true'
      ]
    );
  }
);