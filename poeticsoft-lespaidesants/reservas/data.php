<?php

function lespaidesants_plugin_reservas_init() {

  global $wpdb;
  $charset_collate = $wpdb->get_charset_collate();
  require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );

  $baseprefix = $wpdb->base_prefix;
  if(is_multisite()) {

    $blogid = get_current_blog_id();
    $baseprefix .= $blogid . '_';
  }    

  $tablename = $baseprefix . 'reservas_events';

  // https://fullcalendar.io/docs/event-parsing

  $createsql = "CREATE TABLE IF NOT EXISTS $tablename (" .
    "id INTEGER NOT NULL AUTO_INCREMENT," .      
    "groupId VARCHAR(256)," .
    "allDay TINYINT(1)," . // Boolean 0/1
    "start BIGINT," . // Date parseable https://fullcalendar.io/docs/date-parsing
    "end BIGINT," . // Date parseable
    "daysOfWeek VARCHAR(256)," . // JSON array [0,1]
    "startTime BIGINT," . // Duration object  https://fullcalendar.io/docs/duration-object
    "endTime BIGINT," . // Duration object
    "startRecur BIGINT," . // Date parseable
    "endRecur BIGINT," . // Date parseable
    "title VARCHAR(256)," .
    "url VARCHAR(256)," .
    "interactive TINYINT(1)," . // Boolean 0/1
    "editable TINYINT(1)," . // Boolean 0/1
    "startEditable TINYINT(1)," . // Boolean 0/1
    "durationEditable TINYINT(1)," . // Boolean 0/1
    "resourceEditable TINYINT(1)," . // Boolean 0/1
    "resourceId VARCHAR(256)," .
    "resourceIds VARCHAR(256)," . // JSON array ["resource id",...]
    "display VARCHAR(256)," . // 'auto','block', 'list-item', 'background', 'inverse-background', or 'none'
    "overlap TINYINT(1)," . // Boolean 0/1
    "restriction VARCHAR(256)," . // fot constraint reserved key A groupId 
    "color VARCHAR(256)," .
    "backgroundColor VARCHAR(256)," .
    "borderColor VARCHAR(256)," .
    "textColor VARCHAR(256)," .
    "extendedProps VARCHAR(4096)," . // JSON object       
    "PRIMARY KEY (id)
  ) $charset_collate;";

  $wpdb->query($createsql);
  $result = dbDelta();
}

/* API DATA EVENTS*/

// CREATE

function lespaidesants_plugin_reservas_data_event_all( WP_REST_Request $req ) {
      
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
    $start = $params['start'];
    $end = $params['end'];

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

// CREATE

function lespaidesants_plugin_reservas_data_event_create( WP_REST_Request $req ) {
      
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

    $wpdb->insert(
      $tablename,
      [
        'title' => $params['title'],
        'start_date' => $params['start_date'],
        'end_date' => $params['end_date']
      ],
      [
        'title' => '%s',
        'start_date' => '%d',
        'end_date' => '%d'
      ]
    );

    $res->set_data($wpdb->insert_id);
  
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
      'lespaidesants/reservas/data',
      'event/all',
      [
        'methods'  => 'POST',
        'callback' => 'lespaidesants_plugin_reservas_data_event_all',
        'permission_callback' => '__return_true'
      ]
    );

    register_rest_route(
      'lespaidesants/reservas/data',
      'event/create',
      [
        'methods'  => 'POST',
        'callback' => 'lespaidesants_plugin_reservas_data_event_create',
        'permission_callback' => '__return_true'
      ]
    );
  }
);