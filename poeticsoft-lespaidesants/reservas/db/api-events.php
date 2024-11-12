<?php

function lespaidesants_plugin_reservas_event_all( WP_REST_Request $req ) {
      
  $res = new WP_REST_Response(); 

  try { 

    global $wpdb;

    $baseprefix = $wpdb->base_prefix;
    if(is_multisite()) {

      $blogid = get_current_blog_id();
      $baseprefix .= $blogid . '_';
    }    

    $tablename = $baseprefix . 'reservas_events';
    
    $params = $req->get_params();
    $start = $params['start']; // In milliseconds
    $end = $params['end'];     //       "

    $query = "
      SELECT * 
      FROM {$tablename};
    ";
    
    $result = $wpdb->get_results($query);

    $res->set_data($result);
  
  } catch (Exception $e) {
    
    $res->set_status($e->getCode());
    $res->set_data($e->getMessage());
  }

  return $res;
}

function lespaidesants_plugin_reservas_event_create( WP_REST_Request $req ) {
      
  $res = new WP_REST_Response(); 

  try { 

    global $wpdb;

    $baseprefix = $wpdb->base_prefix;
    if(is_multisite()) {

      $blogid = get_current_blog_id();
      $baseprefix .= $blogid . '_';
    }
    $tablename = $baseprefix . 'reservas_events'; 

    $query = "
      SELECT * 
      FROM {$tablename};
    ";    
    $allevents = $wpdb->get_results($query);
    $event = $req->get_params();

    $eventoverlap = lespaidesants_plugin_reservas_event_checkoverlap($allevents, $event);

    if($eventoverlap) {

      throw new Exception('Las fechas/horas seleccionadas están ocupadas, por favor selecciona otras.', 500); 

    }    
    
    $wpdb->insert(
      $tablename,
      $event
    );

    $query = "
      SELECT * 
      FROM {$tablename};
    ";    
    $result = $wpdb->get_results($query);

    $res->set_data($result);
  
  } catch (Exception $e) {
    
    $res->set_status($e->getCode());
    $res->set_data($e->getMessage());
  }

  return $res;
}

function lespaidesants_plugin_reservas_event_delete( WP_REST_Request $req ) {
      
  $res = new WP_REST_Response(); 

  try { 

    global $wpdb;

    $baseprefix = $wpdb->base_prefix;
    if(is_multisite()) {

      $blogid = get_current_blog_id();
      $baseprefix .= $blogid . '_';
    }
    $tablename = $baseprefix . 'reservas_events';    
    $eventid = $req->get_param('eventid');

    $delete = $wpdb->delete(
      $tablename,
      [
        'id' => $eventid
      ]
    );

    $res->set_data($delete);
  
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
      'lespaidesants/reservas/event',
      'all',
      [
        'methods'  => 'POST',
        'callback' => 'lespaidesants_plugin_reservas_event_all',
        'permission_callback' => '__return_true'
      ]
    );

    register_rest_route(
      'lespaidesants/reservas/event',
      'create',
      [
        'methods'  => 'POST',
        'callback' => 'lespaidesants_plugin_reservas_event_create',
        'permission_callback' => '__return_true'
      ]
    );

    register_rest_route(
      'lespaidesants/reservas/event',
      'delete',
      [
        'methods'  => 'POST',
        'callback' => 'lespaidesants_plugin_reservas_event_delete',
        'permission_callback' => '__return_true'
      ]
    );
  }
);